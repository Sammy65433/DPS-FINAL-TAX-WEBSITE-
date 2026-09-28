import {
    archiveAppointmentService,
    cancelAppointmentService,
    confirmAppointmentService,
    createAppointmentService,
    deleteAppointmentService,
    findConflictingAppointmentService,
    findExistingAppointmentSlotService,
    getAppointmentByIdService,
    getAppointmentsService,
    getAvailabilityService,
    updateAppointmentService,
} from "../services/appointmentService.js";

import {
    sendAppointmentUpdateEmail,
    sendTaxAppointmentRequestEmail,
    sendTaxOfficeNotificationEmail,
} from "../services/emailService.js";

function toMinutes(time) {
    if (typeof time !== "string") return null;

    const match = /^(\d{1,2}):(\d{2}) (AM|PM)$/.exec(time);
    if (!match) return null;

    const hour = Number(match[1]);
    const minute = Number(match[2]);

    if (hour < 1 || hour > 12 || minute > 59) return null;

    return ((hour % 12) + (match[3] === "PM" ? 12 : 0)) * 60 + minute;
}

function isOverlap(requestedStart, requestedDuration, existing) {
    const existingStart = toMinutes(existing.appointment_time);
    if (existingStart === null) return true;

    const existingDuration = Number(existing.duration_minutes ?? 30);

    return (
        requestedStart < existingStart + existingDuration &&
        existingStart < requestedStart + requestedDuration
    );
}

function getDuration(value) {
    const duration = Number(value ?? 30);
    return [30, 60].includes(duration) ? duration : null;
}

function formatTime(totalMinutes) {
    const hour24 = Math.floor(totalMinutes / 60);
    const minute = totalMinutes % 60;
    const period = hour24 >= 12 ? "PM" : "AM";
    const hour12 = hour24 % 12 || 12;

    return `${hour12}:${String(minute).padStart(2, "0")} ${period}`;
}

function getTimeRange(date) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date ?? "")) return null;

    const parsed = new Date(`${date}T00:00:00`);
    if (Number.isNaN(parsed.getTime())) return null;

    const day = parsed.getDay();
    if (day === 0) return null;

    // Matches the DPS booking form's CURRENT hours.
    // Update both frontend and backend when seasonal hours are finalized.
    return {
        opens: 9 * 60,
        closes: day === 6 ? 18 * 60 : 17 * 60,
    };
}

function availableTimesFor(date, duration, appointments) {
    const range = getTimeRange(date);
    if (!range) return [];

    const slots = [];

    for (
        let start = range.opens;
        start + duration <= range.closes;
        start += 30
    ) {
        const blocked = appointments.some((appointment) =>
            isOverlap(start, duration, appointment)
        );

        if (!blocked) slots.push(formatTime(start));
    }

    return slots;
}

export async function getAvailability(req, res) {
    const { date, preparer } = req.query;
    const duration = getDuration(req.query.duration_minutes);

    if (!date || !preparer || !duration || !getTimeRange(date)) {
        return res.status(400).json({
            message: "Provide a valid open date, preparer, and 30- or 60-minute duration.",
        });
    }

    try {
        const { data, error } = await getAvailabilityService(date, preparer);

        if (error) {
            console.error("Availability error:", error);
            return res.status(500).json({ message: "Could not load availability." });
        }

        const appointments = data ?? [];

        return res.json({
            availableTimes: availableTimesFor(date, duration, appointments),
            bookedTimes: [...new Set(
                appointments.map((appointment) => appointment.appointment_time)
            )],
        });
    } catch (error) {
        console.error("Error fetching availability:", error);
        return res.status(500).json({ message: "Error fetching availability." });
    }
}

export async function getAppointments(req, res) {
    try {
        const { data, error } = await getAppointmentsService();

        if (error) {
            return res.status(500).json({ message: error.message });
        }

        return res.json(data);
    } catch (error) {
        console.error("Error fetching appointments:", error);
        return res.status(500).json({ message: "Error fetching appointments." });
    }
}

export async function createAppointment(req, res) {
    const {
        first_name,
        last_name,
        phone,
        email,
        service,
        tax_preparer,
        appointment_date,
        appointment_time,
        message,
    } = req.body;

    const duration = getDuration(req.body.duration_minutes);
    const start = toMinutes(appointment_time);

    if (
        !first_name || !last_name || !phone || !email || !service ||
        !tax_preparer || !appointment_date || !duration || start === null
    ) {
        return res.status(400).json({
            message: "Complete all required fields and choose a valid duration.",
        });
    }

    try {
        const { data: existing, error: existingError } =
            await findExistingAppointmentSlotService({
                appointment_date,
                tax_preparer,
            });

        if (existingError) {
            console.error("Availability lookup error:", existingError);
            return res.status(500).json({ message: "Could not check availability." });
        }

        const allowedTimes = availableTimesFor(
            appointment_date,
            duration,
            existing ?? []
        );

        if (!allowedTimes.includes(appointment_time)) {
            return res.status(409).json({
                message: "That time is unavailable or outside booking hours.",
            });
        }

        const { data, error } = await createAppointmentService({
            first_name,
            last_name,
            phone,
            email,
            service,
            tax_preparer,
            appointment_date,
            appointment_time,
            duration_minutes: duration,
            message,
        });

        if (error) {
            console.error("Create appointment error:", error);
            return res.status(500).json({ message: "Could not create appointment." });
        }

        const newAppointment = data?.[0];
        if (!newAppointment) {
            return res.status(500).json({ message: "Appointment was not returned." });
        }

        try {
            await sendTaxAppointmentRequestEmail(newAppointment);
            await sendTaxOfficeNotificationEmail(newAppointment);
        } catch (emailError) {
            console.error("Appointment email error:", emailError);
        }

        return res.status(201).json(newAppointment);
    } catch (error) {
        console.error("Error creating appointment:", error);
        return res.status(500).json({ message: "Error creating appointment." });
    }
}

export async function confirmAppointmentFromEmail(req, res) {
    try {
        const { data, error } = await confirmAppointmentService(req.params.id);

        if (error) return res.status(500).send("<h2>Error confirming appointment.</h2>");
        if (!data?.length) return res.status(404).send("<h2>Appointment not found.</h2>");

        return res.send(`
      <div style="font-family:Arial,sans-serif;padding:30px">
        <h2 style="color:#0f5c54">Appointment Confirmed</h2>
        <p>Your appointment has been successfully confirmed.</p>
        <p>Thank you for choosing DPS Professional Tax Services.</p>
      </div>
    `);
    } catch (error) {
        console.error("Error confirming appointment:", error);
        return res.status(500).send("<h2>Error confirming appointment.</h2>");
    }
}

export async function cancelAppointmentFromEmail(req, res) {
    try {
        const { data, error } = await cancelAppointmentService(req.params.id);

        if (error) return res.status(500).send("<h2>Error cancelling appointment.</h2>");
        if (!data?.length) return res.status(404).send("<h2>Appointment not found.</h2>");

        return res.send(`
      <div style="font-family:Arial,sans-serif;padding:30px">
        <h2 style="color:#a12626">Appointment Cancelled</h2>
        <p>Your appointment has been cancelled successfully.</p>
        <p>If you would like to reschedule, please contact DPS Professional Tax Services.</p>
      </div>
    `);
    } catch (error) {
        console.error("Error cancelling appointment:", error);
        return res.status(500).send("<h2>Error cancelling appointment.</h2>");
    }
}

export async function cancelAppointment(req, res) {
    try {
        const { data, error } = await cancelAppointmentService(req.params.id);

        if (error) return res.status(500).json({ message: error.message });
        if (!data?.length) {
            return res.status(404).json({ message: "Appointment not found." });
        }

        return res.json({
            message: "Appointment cancelled successfully.",
            appointment: data[0],
        });
    } catch (error) {
        console.error("Error cancelling appointment:", error);
        return res.status(500).json({ message: "Error cancelling appointment." });
    }
}

export async function archiveAppointment(req, res) {
    try {
        const { data, error } = await archiveAppointmentService(req.params.id);

        if (error) return res.status(500).json({ message: error.message });
        if (!data?.length) {
            return res.status(404).json({ message: "Appointment not found." });
        }

        return res.json({
            message: "Appointment archived successfully.",
            appointment: data[0],
        });
    } catch (error) {
        console.error("Error archiving appointment:", error);
        return res.status(500).json({ message: "Error archiving appointment." });
    }
}

export async function updateAppointment(req, res) {
    const { id } = req.params;

    try {
        const { data: current, error: currentError } =
            await getAppointmentByIdService(id);

        if (currentError || !current) {
            return res.status(404).json({ message: "Appointment not found." });
        }

        const updated = {
            first_name: req.body.first_name ?? current.first_name,
            last_name: req.body.last_name ?? current.last_name,
            phone: req.body.phone ?? current.phone,
            email: req.body.email ?? current.email,
            service: req.body.service ?? current.service,
            tax_preparer: req.body.tax_preparer ?? current.tax_preparer,
            appointment_date: req.body.appointment_date ?? current.appointment_date,
            appointment_time: req.body.appointment_time ?? current.appointment_time,
            duration_minutes: getDuration(
                req.body.duration_minutes ?? current.duration_minutes
            ),
            message: req.body.message ?? current.message,
            status: req.body.status ?? current.status,
        };

        const start = toMinutes(updated.appointment_time);

        if (
            !updated.tax_preparer ||
            !updated.duration_minutes ||
            start === null
        ) {
            return res.status(400).json({ message: "Invalid appointment details." });
        }

        if (["booked", "confirmed"].includes(updated.status)) {
            const { data: existing, error: existingError } =
                await findConflictingAppointmentService({
                    id,
                    appointment_date: updated.appointment_date,
                    tax_preparer: updated.tax_preparer,
                });

            if (existingError) {
                return res.status(500).json({ message: "Could not check availability." });
            }

            const allowedTimes = availableTimesFor(
                updated.appointment_date,
                updated.duration_minutes,
                existing ?? []
            );

            if (!allowedTimes.includes(updated.appointment_time)) {
                return res.status(409).json({
                    message: "That time is unavailable or outside booking hours.",
                });
            }
        }

        const { data, error } = await updateAppointmentService(id, updated);

        if (error) return res.status(500).json({ message: error.message });
        if (!data?.length) {
            return res.status(404).json({ message: "Appointment not found." });
        }

        const saved = data[0];

        if (
            String(current.appointment_date) !== String(saved.appointment_date) ||
            String(current.appointment_time) !== String(saved.appointment_time) ||
            Number(current.duration_minutes ?? 30) !== Number(saved.duration_minutes)
        ) {
            await sendAppointmentUpdateEmail(saved);
        }

        return res.json({
            message: "Appointment updated successfully.",
            appointment: saved,
        });
    } catch (error) {
        console.error("Error updating appointment:", error);
        return res.status(500).json({ message: "Error updating appointment." });
    }
}

export async function deleteAppointment(req, res) {
    try {
        const { data, error } = await deleteAppointmentService(req.params.id);

        if (error) return res.status(500).json({ message: error.message });
        if (!data?.length) {
            return res.status(404).json({ message: "Appointment not found." });
        }

        return res.json({
            message: "Appointment deleted successfully.",
            appointment: data[0],
        });
    } catch (error) {
        console.error("Error deleting appointment:", error);
        return res.status(500).json({ message: "Error deleting appointment." });
    }
}
