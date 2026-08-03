import { supabase } from "../config/supabase.js";

export async function getRealtyAppointmentsService() {
    return await supabase
        .from("realty_appointments")
        .select("*")
        .order("created_at", { ascending: false });
}

export async function createRealtyAppointmentService(payload) {
    return await supabase
        .from("realty_appointments")
        .insert([
            {
                ...payload,
                status: "pending",
            },
        ])
        .select();
}

export async function confirmRealtyAppointmentService(id) {
    return await supabase
        .from("realty_appointments")
        .update({ status: "confirmed" })
        .eq("id", id)
        .select();
}

export async function cancelRealtyAppointmentService(id) {
    return await supabase
        .from("realty_appointments")
        .update({ status: "cancelled" })
        .eq("id", id)
        .select();
}

export async function archiveRealtyAppointmentService(id) {
    return await supabase
        .from("realty_appointments")
        .update({ status: "archived" })
        .eq("id", id)
        .select();
}

export async function getRealtyAppointmentByIdService(id) {
    return await supabase
        .from("realty_appointments")
        .select("*")
        .eq("id", id)
        .single();
}

export async function updateRealtyAppointmentService(id, payload) {
    return await supabase
        .from("realty_appointments")
        .update(payload)
        .eq("id", id)
        .select();
}

export async function deleteRealtyAppointmentService(id) {
    return await supabase
        .from("realty_appointments")
        .delete()
        .eq("id", id)
        .select();
}
