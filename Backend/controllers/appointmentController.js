import crypto from "node:crypto";

import {
  archiveAppointmentService,
  cancelAppointmentService,
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
  sendAppointmentCancellationEmail,
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

function getPublicDuration(value) {
  const duration = Number(value ?? 30);
  return [30, 60].includes(duration) ? duration : null;
}

function formatTime(totalMinutes) {
  const hour24 = Math.floor(totalMinutes / 60);
  const minute = totalMinutes % 60;
  return `${hour24 % 12 || 12}:${String(minute).padStart(2, "0")} ${
    hour24 >= 12 ? "PM" : "AM"
  }`;
}

function getTimeRange(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value ?? "")) return null;

  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day ||
    date.getDay() === 0
  ) {
    return null;
  }

  // Keep aligned with the DPS site's actual booking hours.
  return {
    opens: 9 * 60,
    closes: date.getDay() === 6 ? 18 * 60 : 17 * 60,
  };
}

function overlaps(requestedStart, requestedDuration, appointment) {
  const existingStart = toMinutes(appointment.appointment_time);
  if (existingStart === null) return true;

  const existingDuration = Number(appointment.duration_minutes ?? 30);

  return (
    requestedStart < existingStart + existingDuration &&
    existingStart < requestedStart + requestedDuration
  );
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
    if (!appointments.some((item) => overlaps(start, duration, item))) {
      slots.push(formatTime(start));
    }
  }

  return slots;
}

function safeAppointment(appointment) {
  const {
    manage_token_hash: _hash,
    manage_token_expires_at: _expires,
    ...safe
  } = appointment;

  return safe;
}

export async function getAvailability(req, res) {
  const { date, preparer } = req.query;
  const duration = getPublicDuration(req.query.duration_minutes);

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
      bookedTimes: [
        ...new Set(appointments.map((item) => item.appointment_time)),
      ],
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

    return res.json((data ?? []).map(safeAppointment));
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

  const duration = getPublicDuration(req.body.duration_minutes);
  const start = toMinutes(appointment_time);

  if (
    !first_name ||
    !last_name ||
    !phone ||
    !email ||
    !service ||
    !tax_preparer ||
    !appointment_date ||
    !duration ||
    start === null
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

    const manageToken = crypto.randomBytes(32).toString("hex");
    const manageTokenHash = crypto
      .createHash("sha256")
      .update(manageToken)
      .digest("hex");

    const manageTokenExpiresAt = new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000
    ).toISOString();

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
      manage_token_hash: manageTokenHash,
      manage_token_expires_at: manageTokenExpiresAt,
    });

    if (error?.code === "23P01") {
      return res.status(409).json({
        message: "That time overlaps another appointment.",
      });
    }

    if (error) {
      console.error("Create appointment error:", error);
      return res.status(500).json({ message: "Could not create appointment." });
    }

    const newAppointment = data?.[0];
    if (!newAppointment) {
      return res.status(500).json({ message: "Appointment was not returned." });
    }

    try {
      await sendTaxAppointmentRequestEmail(newAppointment, manageToken);
      await sendTaxOfficeNotificationEmail(newAppointment);
    } catch (emailError) {
      console.error("Appointment email error:", emailError);
    }

    return res.status(201).json(safeAppointment(newAppointment));
  } catch (error) {
    console.error("Error creating appointment:", error);
    return res.status(500).json({ message: "Error creating appointment." });
  }
}

export async function cancelAppointment(req, res) {
  try {
    const { data, error } = await cancelAppointmentService(req.params.id);

    if (error) return res.status(500).json({ message: error.message });
    if (!data?.length) {
      return res.status(404).json({ message: "Appointment not found." });
    }

    try {
      await sendAppointmentCancellationEmail(data[0]);
    } catch (emailError) {
      console.error("Cancellation email failed:", emailError);
    }

    return res.json({
      message: "Appointment cancelled successfully.",
      appointment: safeAppointment(data[0]),
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
      appointment: safeAppointment(data[0]),
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

    const staffDuration = Number(
      req.body.duration_minutes ?? current.duration_minutes
    );

    if (![15, 30, 60].includes(staffDuration)) {
      return res.status(400).json({
        message: "Choose 15, 30, or 60 minutes.",
      });
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
      duration_minutes: staffDuration,
      message: req.body.message ?? current.message,
      status: req.body.status ?? current.status,
    };

    if (!updated.tax_preparer) {
      return res.status(400).json({ message: "Invalid preparer." });
    }

    if (["booked", "confirmed"].includes(updated.status)) {
      const start = toMinutes(updated.appointment_time);
      const range = getTimeRange(updated.appointment_date);

      if (
        start === null ||
        !range ||
        start < range.opens ||
        start + staffDuration > range.closes
      ) {
        return res.status(400).json({
          message: "Choose a time within booking hours.",
        });
      }

      const { data: existing, error: existingError } =
        await findConflictingAppointmentService({
          id,
          appointment_date: updated.appointment_date,
          tax_preparer: updated.tax_preparer,
        });

      if (existingError) {
        return res.status(500).json({
          message: "Could not check availability.",
        });
      }

      if (
        (existing ?? []).some((item) =>
          overlaps(start, staffDuration, item)
        )
      ) {
        return res.status(409).json({
          message: "That time overlaps another appointment.",
        });
      }
    }

    const { data, error } = await updateAppointmentService(id, updated);

    if (error?.code === "23P01") {
      return res.status(409).json({
        message: "That time overlaps another appointment.",
      });
    }

    if (error) {
      return res.status(500).json({ message: error.message });
    }

    if (!data?.length) {
      return res.status(404).json({ message: "Appointment not found." });
    }

    const saved = data[0];

    if (
      String(current.appointment_date) !== String(saved.appointment_date) ||
      String(current.appointment_time) !== String(saved.appointment_time) ||
      Number(current.duration_minutes ?? 30) !==
        Number(saved.duration_minutes) ||
      current.tax_preparer !== saved.tax_preparer ||
      current.service !== saved.service
    ) {
      try {
        await sendAppointmentUpdateEmail(saved);
      } catch (emailError) {
        console.error("Update email failed:", emailError);
      }
    }

    return res.json({
      message: "Appointment updated successfully.",
      appointment: safeAppointment(saved),
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
      appointment: safeAppointment(data[0]),
    });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    return res.status(500).json({ message: "Error deleting appointment." });
  }
}
