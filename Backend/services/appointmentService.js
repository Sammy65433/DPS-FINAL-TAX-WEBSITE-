import { supabase } from "../config/supabase.js";

export async function getAppointmentsService() {
    return await supabase
        .from("appointments")
        .select("*")
        .order("created_at", { ascending: false });
}

export async function getAvailabilityService(date, preparer) {
    return await supabase
        .from("appointments")
        .select("appointment_time")
        .eq("appointment_date", date)
        .eq("tax_preparer", preparer)
        .in("status", ["booked", "confirmed"]);
}

export async function findExistingAppointmentSlotService({
    appointment_date,
    appointment_time,
    tax_preparer,
}) {
    return await supabase
        .from("appointments")
        .select("*")
        .eq("appointment_date", appointment_date)
        .eq("appointment_time", appointment_time)
        .eq("tax_preparer", tax_preparer)
        .in("status", ["booked", "confirmed"]);
}

export async function createAppointmentService(payload) {
    return await supabase
        .from("appointments")
        .insert([
            {
                ...payload,
                status: "booked",
            },
        ])
        .select();
}

export async function confirmAppointmentService(id) {
    return await supabase
        .from("appointments")
        .update({ status: "confirmed" })
        .eq("id", id)
        .select();
}

export async function cancelAppointmentService(id) {
    return await supabase
        .from("appointments")
        .update({ status: "cancelled" })
        .eq("id", id)
        .select();
}

export async function archiveAppointmentService(id) {
    return await supabase
        .from("appointments")
        .update({ status: "archived" })
        .eq("id", id)
        .select();
}

export async function getAppointmentByIdService(id) {
    return await supabase
        .from("appointments")
        .select("*")
        .eq("id", id)
        .single();
}

export async function findConflictingAppointmentService({
    id,
    appointment_date,
    appointment_time,
    tax_preparer,
}) {
    return await supabase
        .from("appointments")
        .select("*")
        .eq("appointment_date", appointment_date)
        .eq("appointment_time", appointment_time)
        .eq("tax_preparer", tax_preparer)
        .in("status", ["booked", "confirmed"])
        .neq("id", id);
}

export async function updateAppointmentService(id, payload) {
    return await supabase
        .from("appointments")
        .update(payload)
        .eq("id", id)
        .select();
}

export async function deleteAppointmentService(id) {
    return await supabase
        .from("appointments")
        .delete()
        .eq("id", id)
        .select();
}
