import { resend } from "../config/resend.js";
import { env } from "../config/env.js";

export function buildEmailTemplate({
    first_name,
    service,
    tax_preparer,
    appointment_date,
    appointment_time,
    appointmentId,
}) {
    const confirmLink = `${env.BASE_URL}/api/appointments/${appointmentId}/confirm`;
    const cancelLink = `${env.BASE_URL}/api/appointments/${appointmentId}/cancel-from-email`;
    const rescheduleLink = `${env.FRONTEND_URL}/booking`;

    return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1a1a1a;">
      <h2 style="color: #0f5c54;">Appointment Request Received</h2>
      <p>Hello ${first_name},</p>
      <p>Thank you for booking with DPS Professional Tax Services.</p>
      <p><strong>Service:</strong> ${service}</p>
      <p><strong>Preparer:</strong> ${tax_preparer}</p>
      <p><strong>Date:</strong> ${appointment_date}</p>
      <p><strong>Time:</strong> ${appointment_time}</p>
      <p><strong>Phone:</strong> (973) 327-2340</p>
      <p><strong>Location:</strong> 1811 Springfield Ave, Maplewood, NJ 07040</p>
      <p>Please confirm, cancel, or reschedule your appointment using the buttons below:</p>
      <div style="margin: 20px 0;">
        <a href="${confirmLink}" style="display:inline-block; padding:12px 18px; margin-right:10px; background:#2ca79b; color:#ffffff; text-decoration:none; border-radius:8px; font-weight:bold;">
          Confirm Appointment
        </a>
        <a href="${cancelLink}" style="display:inline-block; padding:12px 18px; margin-right:10px; background:#a12626; color:#ffffff; text-decoration:none; border-radius:8px; font-weight:bold;">
          Cancel Appointment
        </a>
        <a href="${rescheduleLink}" style="display:inline-block; padding:12px 18px; background:#6f42a8; color:#ffffff; text-decoration:none; border-radius:8px; font-weight:bold;">
          Reschedule Appointment
        </a>
      </div>
      <p>If you need to reschedule, you can use the button above or contact our office.</p>
      <p>Please do not reply with sensitive tax documents by email. Use our secure client portal for document uploads.</p>
      <p>Thank you,<br />DPS Professional Tax Services</p>
    </div>
  `;
}

export function buildRealtyEmailTemplate({
    first_name,
    service,
    appointment_date,
    appointmentId,
}) {
    const confirmLink = `${env.BASE_URL}/api/realty-appointments/${appointmentId}/confirm`;
    const cancelLink = `${env.BASE_URL}/api/realty-appointments/${appointmentId}/cancel-from-email`;
    const rescheduleLink = `${env.FRONTEND_URL}/real-estate-booking`;

    return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1a1a1a;">
      <h2 style="color: #8a6a3f;">Realty Appointment Request Received</h2>
      <p>Hello ${first_name},</p>
      <p>Thank you for contacting DPS Realty.</p>
      <p><strong>Service:</strong> ${service}</p>
      <p><strong>Date:</strong> ${appointment_date || "Not provided"}</p>
      <p>Please confirm, cancel, or reschedule your request using the buttons below:</p>
      <div style="margin: 20px 0;">
        <a href="${confirmLink}" style="display:inline-block; padding:12px 18px; margin-right:10px; background:#2ca79b; color:#ffffff; text-decoration:none; border-radius:8px; font-weight:bold;">
          Confirm Request
        </a>
        <a href="${cancelLink}" style="display:inline-block; padding:12px 18px; margin-right:10px; background:#a12626; color:#ffffff; text-decoration:none; border-radius:8px; font-weight:bold;">
          Cancel Request
        </a>
        <a href="${rescheduleLink}" style="display:inline-block; padding:12px 18px; background:#6f42a8; color:#ffffff; text-decoration:none; border-radius:8px; font-weight:bold;">
          Reschedule Request
        </a>
      </div>
      <p>We will contact you soon to follow up on your request.</p>
      <p>Thank you,<br />DPS Realty</p>
    </div>
  `;
}

export async function sendAppointmentUpdateEmail(appointment) {
    try {
        const result = await resend.emails.send({
            from: "appointments@dpstaxpro.com",
            to: appointment.email,
            subject: "Your DPS Tax Appointment Has Been Updated",
            html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1a1a1a;">
          <h2 style="color: #0f5c54;">Appointment Updated</h2>
          <p>Hello ${appointment.first_name},</p>
          <p>Your appointment has been updated.</p>
          <p><strong>Service:</strong> ${appointment.service}</p>
          <p><strong>Preparer:</strong> ${appointment.tax_preparer}</p>
          <p><strong>New Date:</strong> ${appointment.appointment_date}</p>
          <p><strong>New Time:</strong> ${appointment.appointment_time}</p>
          <p><strong>Phone:</strong> (973) 327-2340</p>
          <p><strong>Location:</strong> 1811 Springfield Ave, Maplewood, NJ 07040</p>
          <p>If you have any questions, please contact our office.</p>
          <p>Thank you,<br />DPS Professional Tax Services</p>
        </div>
      `,
        });

        console.log("Updated appointment email sent:", result);
    } catch (error) {
        console.error("Error sending updated appointment email:", error);
    }
}

export async function sendRealtyUpdateEmail(appointment) {
    try {
        const result = await resend.emails.send({
            from: "appointments@dpstaxpro.com",
            to: appointment.email,
            subject: "Your DPS Realty Appointment Has Been Updated",
            html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1a1a1a;">
          <h2 style="color: #8a6a3f;">Realty Appointment Updated</h2>
          <p>Hello ${appointment.first_name},</p>
          <p>Your realty appointment has been updated.</p>
          <p><strong>Service:</strong> ${appointment.service}</p>
          <p><strong>New Date:</strong> ${appointment.appointment_date || "Not provided"}</p>
          <p><strong>Phone:</strong> ${appointment.phone}</p>
          <p><strong>Location:</strong> 1811 Springfield Ave, Maplewood, NJ 07040</p>
          <p>If you have any questions, please contact our office.</p>
          <p>Thank you,<br />DPS Realty</p>
        </div>
      `,
        });

        console.log("Updated realty appointment email sent:", result);
    } catch (error) {
        console.error("Error sending updated realty appointment email:", error);
    }
}

export async function sendTaxAppointmentRequestEmail(appointment) {
    try {
        const emailResult = await resend.emails.send({
            from: "appointments@dpstaxpro.com",
            to: appointment.email,
            subject: "Your DPS Tax Appointment Request",
            html: buildEmailTemplate({
                first_name: appointment.first_name,
                service: appointment.service,
                tax_preparer: appointment.tax_preparer,
                appointment_date: appointment.appointment_date,
                appointment_time: appointment.appointment_time,
                appointmentId: appointment.id,
            }),
        });

        console.log("Tax email result:", emailResult);
    } catch (emailError) {
        console.error("Error sending tax confirmation email:", emailError);
    }
}

export async function sendTaxOfficeNotificationEmail(appointment) {
    try {
        await resend.emails.send({
            from: "appointments@dpstaxpro.com",
            to: "appointments@dpstaxpro.com",
            subject: "New DPS Tax Appointment Booked",
            html: `
        <h2>New Tax Appointment Booked</h2>
        <p><strong>Name:</strong> ${appointment.first_name} ${appointment.last_name}</p>
        <p><strong>Phone:</strong> ${appointment.phone}</p>
        <p><strong>Email:</strong> ${appointment.email}</p>
        <p><strong>Service:</strong> ${appointment.service}</p>
        <p><strong>Preparer:</strong> ${appointment.tax_preparer}</p>
        <p><strong>Date:</strong> ${appointment.appointment_date}</p>
        <p><strong>Time:</strong> ${appointment.appointment_time}</p>
        <p><strong>Message:</strong> ${appointment.message || "None"}</p>
      `,
        });
    } catch (officeEmailError) {
        console.error("Error sending office notification email:", officeEmailError);
    }
}

export async function sendRealtyAppointmentRequestEmail(appointment) {
    try {
        const emailResult = await resend.emails.send({
            from: "appointments@dpstaxpro.com",
            to: appointment.email,
            subject: "Your DPS Realty Appointment Request",
            html: buildRealtyEmailTemplate({
                first_name: appointment.first_name,
                service: appointment.service,
                appointment_date: appointment.appointment_date,
                appointmentId: appointment.id,
            }),
        });

        console.log("Realty email result:", emailResult);
    } catch (emailError) {
        console.error("Error sending realty confirmation email:", emailError);
    }
}

export async function sendRealtyOfficeNotificationEmail(appointment) {
    try {
        await resend.emails.send({
            from: "appointments@dpstaxpro.com",
            to: "appointments@dpstaxpro.com",
            subject: "New DPS Realty Request",
            html: `
        <h2>New Realty Appointment Request</h2>
        <p><strong>Name:</strong> ${appointment.first_name} ${appointment.last_name}</p>
        <p><strong>Phone:</strong> ${appointment.phone}</p>
        <p><strong>Email:</strong> ${appointment.email}</p>
        <p><strong>Service:</strong> ${appointment.service}</p>
        <p><strong>Date:</strong> ${appointment.appointment_date || "Not provided"}</p>
        <p><strong>Message:</strong> ${appointment.message || "None"}</p>
      `,
        });
    } catch (officeEmailError) {
        console.error("Error sending office realty notification email:", officeEmailError);
    }
}

export async function sendBulkEmails({ emails, subject, html }) {
    const results = [];

    for (const email of emails) {
        try {
            const result = await resend.emails.send({
                from: "appointments@dpstaxpro.com",
                to: email,
                subject,
                html,
            });

            results.push({
                email,
                success: true,
                id: result?.data?.id || null,
            });
        } catch (error) {
            results.push({
                email,
                success: false,
                error: error.message || "Unknown email error",
            });
        }
    }

    return results;
}
