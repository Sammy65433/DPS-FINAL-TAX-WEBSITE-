import crypto from "node:crypto";
import { ObjectId } from "mongodb";
import { getDatabase } from "../config/mongo.js";
import {
  findManagedAppointmentByTokenService,
  getAvailabilityService,
} from "../services/appointmentService.js";
import { sendAppointmentCancellationEmail, sendCustomerRescheduleEmail } from "../services/emailService.js";

const INVALID_LINK = "This appointment link is invalid or expired.";
const VISIT_FORMATS = new Set(["in_person", "phone", "virtual"]);

const PREPARERS = new Set([
  "Pierre Polidor",
  "Dalia Pierre",
  "Severe Jacquet",
  "Jean P Cifrant",
  "Ricot Casimir",
]);
const SERVICES = new Set([
  "Tax Consultation",
  "Personal Tax Preparation",
  "Business Tax Preparation",
  "Notary Public",
  "Mobile Notary Public",
  "S Corporation",
  "Amended Return",
  "Partnership, LLC & Form 8825",
  "Return for Estates and Trusts",
  "Tax Return Pickup",
  "Translation",
  "Form Preparation Support",
  "Copy & Fax",
  "Other Services",
  "Business Services",
]);


function tokenHash(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

async function findByToken(token) {
  if (typeof token !== "string" || !/^[a-f0-9]{64}$/i.test(token)) {
    return null;
  }

  const tokenHashValue = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  const { data, error } = await findManagedAppointmentByTokenService(
    tokenHashValue
  );

  if (error) throw error;
  return data;
}

function publicAppointment(appointment) {
  return {
    service: appointment.service,
    tax_preparer: appointment.tax_preparer,
    appointment_date: appointment.appointment_date,
    appointment_time: appointment.appointment_time,
    duration_minutes: appointment.duration_minutes ?? 30,
    status: appointment.status,
    visit_format: appointment.visit_format,

  };
}

function toMinutes(time) {
  const match = /^(\d{1,2}):(\d{2}) (AM|PM)$/.exec(time ?? "");
  if (!match) return null;

  const hour = Number(match[1]);
  const minute = Number(match[2]);

  if (hour < 1 || hour > 12 || minute > 59) return null;

  return ((hour % 12) + (match[3] === "PM" ? 12 : 0)) * 60 + minute;
}

function formatTime(minutes) {
  const hour = Math.floor(minutes / 60);
  const minute = minutes % 60;

  return `${hour % 12 || 12}:${String(minute).padStart(2, "0")} ${hour >= 12 ? "PM" : "AM"
    }`;
}

function validDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value ?? "")) return null;

  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
}

function openHours(value) {
  const date = validDate(value);
  const today = new Date();
today.setHours(0, 0, 0, 0);

if (!date || date < today || date.getDay() === 0) return null;

  

  // Keep these hours aligned with the main DPS booking backend.
  return {
    start: 9 * 60,
    end: date.getDay() === 6 ? 18 * 60 : 17 * 60,
  };
}

function availableTimes(date, duration, bookings) {
  const hours = openHours(date);
  if (!hours) return [];

  const result = [];

  for (
    let start = hours.start;
    start + duration <= hours.end;
    start += 30
  ) {
    const overlaps = bookings.some((booking) => {
      const bookedStart = toMinutes(booking.appointment_time);
      if (bookedStart === null) return true;

      const bookedDuration = Number(booking.duration_minutes ?? 30);

      return (
        start < bookedStart + bookedDuration &&
        bookedStart < start + duration
      );
    });

    if (!overlaps) result.push(formatTime(start));
  }

  return result;
}

async function loadOtherBookings(appointment, date, preparer) {
  const { data, error } = await getAvailabilityService(date, preparer);

  if (error) throw error;

  return (data ?? []).filter(
    (booking) => String(booking.id) !== String(appointment.id)
  );
}

export async function getManagedAppointment(req, res) {
  try {
    const appointment = await findByToken(req.query.token);

    if (!appointment) {
      console.error("Manage lookup failed for token:", String(req.query.token).slice(0, 8) + "...");
      return res.status(404).json({ message: INVALID_LINK });
    }

    return res.json({ appointment: publicAppointment(appointment) });
  } catch (error) {
    console.error("Manage appointment lookup failed:", error);
    return res.status(500).json({ message: "Could not load appointment." });
  }
}

export async function getManagedAvailability(req, res) {
  try {
    const appointment = await findByToken(req.query.token);
    if (!appointment) return res.status(404).json({ message: INVALID_LINK });

    if (!["booked", "confirmed"].includes(appointment.status)) {
      return res.status(409).json({
        message: "This appointment can no longer be changed.",
      });
    }

    const { date, preparer } = req.query;
    const duration = Number(req.query.duration_minutes);

    if (!PREPARERS.has(preparer) || ![15, 30, 60, 90, 120].includes(duration)) {
      return res.status(400).json({
        message: "Choose a valid preparer and appointment length.",
      });
    }

    if (!openHours(date)) return res.json({ availableTimes: [] });

    const bookings = await loadOtherBookings(appointment, date, preparer);

    return res.json({
      availableTimes: availableTimes(date, duration, bookings),
    });
  } catch (error) {
    console.error("Manage availability failed:", error);
    return res.status(500).json({ message: "Could not load availability." });
  }
}

export async function rescheduleManagedAppointment(req, res) {
  try {
    const appointment = await findByToken(req.body?.token);
    if (!appointment) return res.status(404).json({ message: INVALID_LINK });

    if (!["booked", "confirmed"].includes(appointment.status)) {
      return res.status(409).json({
        message: "This appointment can no longer be changed.",
      });
    }
    const {
      service,
      tax_preparer: preparer,
      appointment_date: date,
      appointment_time: time,
      visit_format,
    } = req.body;

    const duration = Number(req.body.duration_minutes);

    if (
      !SERVICES.has(service) ||
      !PREPARERS.has(preparer) ||
      ![15, 30, 60, 90, 120].includes(duration) ||
      !openHours(date) ||
      !VISIT_FORMATS.has(visit_format) ||
      toMinutes(time) === null

    ) {
      return res.status(400).json({
        message: "Choose a valid service, preparer, length, date, time, and meeting format.",
      });
    }

    const bookings = await loadOtherBookings(appointment, date, preparer);
    const slots = availableTimes(date, duration, bookings);

    if (!slots.includes(time)) {
      return res.status(409).json({
        message: "That time is no longer available.",
      });
    }

    const database = await getDatabase();
    const updatedAppointment = await database
      .collection("appointments")
      .findOneAndUpdate(
        {
          _id: new ObjectId(appointment.id),
          manage_token_hash: appointment.manage_token_hash,
          manage_token_expires_at: { $gt: new Date() },
          status: { $in: ["booked", "confirmed"] },
        },
        {
          $set: {
            service,
            tax_preparer: preparer,
            appointment_date: date,
            appointment_time: time,
            duration_minutes: duration,
            visit_format,
          },
        },
        { returnDocument: "after" }
      );

    const data = updatedAppointment.value;

    if (!data) {
      return res.status(409).json({
        message: "Appointment was not updated.",
      });
    }

    try {
      await sendCustomerRescheduleEmail(data, req.body.token);
    } catch (emailError) {
      console.error("Could not send update email:", emailError);
    }

    return res.json({ appointment: publicAppointment(data) });
  } catch (error) {
    console.error("Manage reschedule failed:", error);
    return res.status(500).json({ message: "Could not update appointment." });
  }
}

export async function cancelManagedAppointment(req, res) {
  try {
    const appointment = await findByToken(req.body?.token);

    if (!appointment) {
      return res.status(404).json({ message: INVALID_LINK });
    }

    const database = await getDatabase();
    const updated = await database
      .collection("appointments")
      .findOneAndUpdate(
        {
          _id: new ObjectId(appointment.id),
          manage_token_hash: appointment.manage_token_hash,
          manage_token_expires_at: { $gt: new Date() },
          status: { $in: ["booked", "confirmed"] },
        },
        { $set: { status: "cancelled" } },
        { returnDocument: "after" }
      );

    const data = updated.value;

    if (!data) {
      return res.status(409).json({
        message: "This appointment can no longer be cancelled.",
      });
    }

    try {
      await sendAppointmentCancellationEmail(data);
    } catch (emailError) {
      console.error("Could not send cancellation email:", emailError);
    }

    return res.json({ appointment: publicAppointment(data) });
  } catch (error) {
    console.error("Manage cancellation failed:", error);
    return res.status(500).json({
      message: "Could not cancel appointment.",
    });
  }
}
