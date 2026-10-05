import crypto from "node:crypto";
import { supabase } from "../config/supabase.js";
import { getAvailabilityService } from "../services/appointmentService.js";
import { sendCustomerRescheduleEmail } from "../services/emailService.js";

const INVALID_LINK = "This appointment link is invalid or expired.";

const PREPARERS = new Set([
    "Pierre Polidor",
    "Dalia Pierre",
    "Severe Jacquet",
    "Jean P Cifrant",
    "Ricot Casimir",
]);
const SERVICES = new Set([
    "Tax Preparation",
    "Copy & Fax Services",
    "Notary Public",
    "Translation Services",
]);


function tokenHash(token) {
    return crypto.createHash("sha256").update(token).digest("hex");
}

async function findByToken(token) {
    if (typeof token !== "string" || !/^[a-f0-9]{64}$/i.test(token)) {
        return null;
    }

    const { data, error } = await supabase
        .from("appointments")
        .select("*")
        .eq("manage_token_hash", tokenHash(token))
        .gt("manage_token_expires_at", new Date().toISOString())
        .maybeSingle();

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
    if (!date || date.getDay() === 0) return null;

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

        if (!appointment) {
            return res.status(404).json({ message: INVALID_LINK });
        }

        if (!["booked", "confirmed"].includes(appointment.status)) {
            return res.status(409).json({
                message: "This appointment can no longer be rescheduled.",
            });
        }

        const date = req.query.date;
        const preparer = req.query.preparer;

        if (!PREPARERS.has(preparer)) {
            return res.status(400).json({ message: "Choose a valid preparer." });
        }

        if (!openHours(date)) {
            return res.json({ availableTimes: [] });
        }

        const bookings = await loadOtherBookings(appointment, date, preparer);

        return res.json({
            availableTimes: availableTimes(
                date,
                Number(appointment.duration_minutes ?? 30),
                bookings
            ),
        });
    } catch (error) {
        console.error("Manage availability failed:", error);
        return res.status(500).json({ message: "Could not load availability." });
    }
}

export async function rescheduleManagedAppointment(req, res) {
    try {
        const appointment = await findByToken(req.body?.token);

        if (!appointment) {
            return res.status(404).json({ message: INVALID_LINK });
        }

        if (!["booked", "confirmed"].includes(appointment.status)) {
            return res.status(409).json({
                message: "This appointment can no longer be rescheduled.",
            });
        }

        const preparer = req.body?.tax_preparer;
        const date = req.body?.appointment_date;
        const time = req.body?.appointment_time;
        const service = req.body?.service;

        if (!SERVICES.has(service)) {
            return res.status(400).json({ message: "Choose a valid service." });
        }

        if (!PREPARERS.has(preparer)) {
            return res.status(400).json({ message: "Choose a valid preparer." });
        }

        if (!openHours(date) || toMinutes(time) === null) {
            return res.status(400).json({
                message: "Choose a valid date and time.",
            });
        }

        const bookings = await loadOtherBookings(appointment, date, preparer);
        const slots = availableTimes(
            date,
            Number(appointment.duration_minutes ?? 30),
            bookings
        );

        if (!slots.includes(time)) {
            return res.status(409).json({
                message: "That time is no longer available.",
            });
        }

        const { data, error } = await supabase
            .from("appointments")
            .update({
                appointment_date: date,
                appointment_time: time,
                tax_preparer: preparer,
                service,
            })
            .eq("id", appointment.id)
            .eq("manage_token_hash", appointment.manage_token_hash)
            .gt("manage_token_expires_at", new Date().toISOString())
            .in("status", ["booked", "confirmed"])
            .select()
            .maybeSingle();

        if (error) throw error;

        if (!data) {
            return res.status(409).json({
                message: "Appointment was not updated.",
            });
        }
        try {
            await sendCustomerRescheduleEmail(data, req.body.token);
        } catch (emailError) {
            console.error("Could not send reschedule confirmation:", emailError);
        }

        return res.json({ appointment: publicAppointment(data) });
    } catch (error) {
        console.error("Manage reschedule failed:", error);
        return res.status(500).json({
            message: "Could not reschedule appointment.",
        });
    }
}

export async function cancelManagedAppointment(req, res) {
    try {
        const appointment = await findByToken(req.body?.token);

        if (!appointment) {
            return res.status(404).json({ message: INVALID_LINK });
        }

        const { data, error } = await supabase
            .from("appointments")
            .update({ status: "cancelled" })
            .eq("id", appointment.id)
            .eq("manage_token_hash", appointment.manage_token_hash)
            .gt("manage_token_expires_at", new Date().toISOString())
            .in("status", ["booked", "confirmed"])
            .select()
            .maybeSingle();

        if (error) throw error;

        if (!data) {
            return res.status(409).json({
                message: "This appointment can no longer be cancelled.",
            });
        }

        return res.json({ appointment: publicAppointment(data) });
    } catch (error) {
        console.error("Manage cancellation failed:", error);
        return res.status(500).json({
            message: "Could not cancel appointment.",
        });
    }
}
