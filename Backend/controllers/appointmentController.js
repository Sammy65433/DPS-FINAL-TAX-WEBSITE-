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

export async function getAvailability(req, res) {
    const { date, preparer } = req.query;

    try {
        const { data, error } = await getAvailabilityService(date, preparer);

        if (error) {
            return res.status(500).json({ message: error.message });
        }

        const bookedTimes = [...new Set(data.map(item => item.appointment_time))];
        res.json({ bookedTimes });
    } catch (error) {
        console.error("Error fetching availability:", error);
        res.status(500).json({ message: "Error fetching availability." });
    }
}

export async function getAppointments(req, res) {
    try {
        const { data, error } = await getAppointmentsService();

        if (error) {
            return res.status(500).json({ message: error.message });
        }

        res.json(data);
    } catch (error) {
        console.error("Error fetching appointments:", error);
        res.status(500).json({ message: "Error fetching appointments." });
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

    try {
        const { data: existingAppointments, error: existingError } =
            await findExistingAppointmentSlotService({
                appointment_date,
                appointment_time,
                tax_preparer,
            });

        if (existingError) {
            return res.status(500).json({ message: existingError.message });
        }

        if (existingAppointments.length > 0) {
            return res.status(409).json({
                message: "That appointment slot is already booked.",
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
            message,
        });

        if (error) {
            return res.status(500).json({ message: error.message });
        }

        const newAppointment = data[0];

        await sendTaxAppointmentRequestEmail(newAppointment);
        await sendTaxOfficeNotificationEmail(newAppointment);

        res.status(201).json(newAppointment);
    } catch (error) {
        console.error("Error creating appointment:", error);
        res.status(500).json({ message: "Error creating appointment." });
    }
}

export async function confirmAppointmentFromEmail(req, res) {
    const { id } = req.params;

    try {
        const { data, error } = await confirmAppointmentService(id);

        if (error) {
            return res.status(500).send("<h2>Error confirming appointment.</h2>");
        }

        if (!data || data.length === 0) {
            return res.status(404).send("<h2>Appointment not found.</h2>");
        }

        res.send(`
      <div style="font-family: Arial, sans-serif; padding: 30px;">
        <h2 style="color: #0f5c54;">Appointment Confirmed</h2>
        <p>Your appointment has been successfully confirmed.</p>
        <p>Thank you for choosing DPS Professional Tax Services.</p>
      </div>
    `);
    } catch (error) {
        console.error("Error confirming appointment:", error);
        res.status(500).send("<h2>Error confirming appointment.</h2>");
    }
}

export async function cancelAppointmentFromEmail(req, res) {
    const { id } = req.params;

    try {
        const { data, error } = await cancelAppointmentService(id);

        if (error) {
            return res.status(500).send("<h2>Error cancelling appointment.</h2>");
        }

        if (!data || data.length === 0) {
            return res.status(404).send("<h2>Appointment not found.</h2>");
        }

        res.send(`
      <div style="font-family: Arial, sans-serif; padding: 30px;">
        <h2 style="color: #a12626;">Appointment Cancelled</h2>
        <p>Your appointment has been cancelled successfully.</p>
        <p>If you would like to reschedule, please contact DPS Professional Tax Services.</p>
      </div>
    `);
    } catch (error) {
        console.error("Error cancelling appointment:", error);
        res.status(500).send("<h2>Error cancelling appointment.</h2>");
    }
}

export async function cancelAppointment(req, res) {
    const { id } = req.params;

    try {
        const { data, error } = await cancelAppointmentService(id);

        if (error) {
            return res.status(500).json({ message: error.message });
        }

        if (!data || data.length === 0) {
            return res.status(404).json({ message: "Appointment not found." });
        }

        res.json({
            message: "Appointment cancelled successfully.",
            appointment: data[0],
        });
    } catch (error) {
        console.error("Error cancelling appointment:", error);
        res.status(500).json({ message: "Error cancelling appointment." });
    }
}

export async function archiveAppointment(req, res) {
    const { id } = req.params;

    try {
        const { data, error } = await archiveAppointmentService(id);

        if (error) {
            return res.status(500).json({ message: error.message });
        }

        if (!data || data.length === 0) {
            return res.status(404).json({ message: "Appointment not found." });
        }

        res.json({
            message: "Appointment archived successfully.",
            appointment: data[0],
        });
    } catch (error) {
        console.error("Error archiving appointment:", error);
        res.status(500).json({ message: "Error archiving appointment." });
    }
}

export async function updateAppointment(req, res) {
    const { id } = req.params;
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
        status,
    } = req.body;

    try {
        const { data: currentAppointment, error: currentError } =
            await getAppointmentByIdService(id);

        if (currentError) {
            return res.status(500).json({ message: currentError.message });
        }

        if (!currentAppointment) {
            return res.status(404).json({ message: "Appointment not found." });
        }

        const oldDate = currentAppointment.appointment_date;
        const oldTime = currentAppointment.appointment_time;

        const { data: existingAppointments, error: existingError } =
            await findConflictingAppointmentService({
                id,
                appointment_date,
                appointment_time,
                tax_preparer,
            });

        if (existingError) {
            return res.status(500).json({ message: existingError.message });
        }

        if (existingAppointments.length > 0) {
            return res.status(409).json({
                message: "That appointment slot is already booked.",
            });
        }

        const { data, error } = await updateAppointmentService(id, {
            first_name,
            last_name,
            phone,
            email,
            service,
            tax_preparer,
            appointment_date,
            appointment_time,
            message,
            status,
        });

        if (error) {
            return res.status(500).json({ message: error.message });
        }

        if (!data || data.length === 0) {
            return res.status(404).json({ message: "Appointment not found." });
        }

        const updatedAppointment = data[0];

        if (
            String(oldDate) !== String(updatedAppointment.appointment_date) ||
            String(oldTime) !== String(updatedAppointment.appointment_time)
        ) {
            await sendAppointmentUpdateEmail(updatedAppointment);
        }

        res.json({
            message: "Appointment updated successfully.",
            appointment: updatedAppointment,
        });
    } catch (error) {
        console.error("Error updating appointment:", error);
        res.status(500).json({ message: "Error updating appointment." });
    }
}

export async function deleteAppointment(req, res) {
    const { id } = req.params;

    try {
        const { data, error } = await deleteAppointmentService(id);

        if (error) {
            return res.status(500).json({ message: error.message });
        }

        if (!data || data.length === 0) {
            return res.status(404).json({ message: "Appointment not found." });
        }

        res.json({
            message: "Appointment deleted successfully.",
            appointment: data[0],
        });
    } catch (error) {
        console.error("Error deleting appointment:", error);
        res.status(500).json({ message: "Error deleting appointment." });
    }
}
