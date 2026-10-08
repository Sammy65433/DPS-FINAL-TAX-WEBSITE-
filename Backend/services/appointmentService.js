import { supabase } from "../config/supabase.js";

export async function getAppointmentsService() {
  return supabase
    .from("appointments")
    .select(
      "id, first_name, last_name, phone, email, service, tax_preparer, appointment_date, appointment_time, duration_minutes, visit_format, message, status, created_at"
    )

    .order("created_at", { ascending: false });
}

export async function getAvailabilityService(date, preparer) {
  return supabase
    .from("appointments")
    .select("id, appointment_time, duration_minutes")
    .eq("appointment_date", date)
    .eq("tax_preparer", preparer)
    .in("status", ["booked", "confirmed"]);
}

export async function findExistingAppointmentSlotService({
  appointment_date,
  tax_preparer,
}) {
  return supabase
    .from("appointments")
    .select("id, appointment_time, duration_minutes, status")
    .eq("appointment_date", appointment_date)
    .eq("tax_preparer", tax_preparer)
    .in("status", ["booked", "confirmed"]);
}

export async function createAppointmentService(payload) {
  return supabase
    .from("appointments")
    .insert([{ ...payload, status: "booked" }])
    .select();
}

export async function confirmAppointmentService(id) {
  return supabase
    .from("appointments")
    .update({ status: "confirmed" })
    .eq("id", id)
    .select();
}

export async function cancelAppointmentService(id) {
  return supabase
    .from("appointments")
    .update({ status: "cancelled" })
    .eq("id", id)
    .select();
}

export async function archiveAppointmentService(id) {
  return supabase
    .from("appointments")
    .update({ status: "archived" })
    .eq("id", id)
    .select();
}

export async function getAppointmentByIdService(id) {
  return supabase
    .from("appointments")
    .select("*")
    .eq("id", id)
    .single();
}

export async function findConflictingAppointmentService({
  id,
  appointment_date,
  tax_preparer,
}) {
  return supabase
    .from("appointments")
    .select("id, appointment_time, duration_minutes, status")
    .eq("appointment_date", appointment_date)
    .eq("tax_preparer", tax_preparer)
    .in("status", ["booked", "confirmed"])
    .neq("id", id);
}

export async function updateAppointmentService(id, payload) {
  return supabase
    .from("appointments")
    .update(payload)
    .eq("id", id)
    .select();
}

export async function deleteAppointmentService(id) {
  return supabase
    .from("appointments")
    .delete()
    .eq("id", id)
    .select();
}
