import { resend } from "../config/resend.js";
import { env } from "../config/env.js";

export function buildEmailTemplate({
    first_name,
    service,
    tax_preparer,
    appointment_date,
    appointment_time,
    manageLink,
}) {

    return `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#1a1a1a;">
      <h2 style="color:#0f5c54;">Appointment Request Received</h2>
      <p>Hello ${first_name},</p>
      <p>Thank you for booking with DPS Professional Tax Services.</p>
      <p><strong>Service:</strong> ${service}</p>
      <p><strong>Preparer:</strong> ${tax_preparer}</p>
      <p><strong>Date:</strong> ${appointment_date}</p>
      <p><strong>Time:</strong> ${appointment_time}</p>
      <p><strong>Phone:</strong> (973) 327-2340</p>
      <p><strong>Location:</strong> 1811 Springfield Ave, Maplewood, NJ 07040</p>
      <p>
  To review your appointment, or request a change to
  your service, preparer, date, or time, click the private link below.
</p>
<p>
  <a href="${manageLink}">Manage My Appointment</a>
</p>
<p>
  If you need help, call our office at
  <a href="tel:+19733272340">(973) 327-2340</a>.
</p>

    </div>
  `;
}

export function buildRealtyEmailTemplate({
    first_name,
    service,
    appointment_date,
    appointmentId,
}) {
    const confirmLink =
        `${env.BASE_URL}/api/realty-appointments/${appointmentId}/confirm`;
    const cancelLink =
        `${env.BASE_URL}/api/realty-appointments/${appointmentId}/cancel-from-email`;
    const rescheduleLink = `${env.FRONTEND_URL}/real-estate-booking`;

    return `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#1a1a1a;">
      <h2 style="color:#8a6a3f;">Realty Appointment Request Received</h2>
      <p>Hello ${first_name},</p>
      <p>Thank you for contacting DPS Realty.</p>
      <p><strong>Service:</strong> ${service}</p>
      <p><strong>Date:</strong> ${appointment_date || "Not provided"}</p>
      <p>Please confirm, cancel, or reschedule your request using the buttons below:</p>
      <div style="margin:20px 0;">
        <a href="${confirmLink}" style="display:inline-block;padding:12px 18px;margin-right:10px;background:#2ca79b;color:#fff;text-decoration:none;border-radius:8px;font-weight:bold;">
          Confirm Request
        </a>
        <a href="${cancelLink}" style="display:inline-block;padding:12px 18px;margin-right:10px;background:#a12626;color:#fff;text-decoration:none;border-radius:8px;font-weight:bold;">
          Cancel Request
        </a>
        <a href="${rescheduleLink}" style="display:inline-block;padding:12px 18px;background:#6f42a8;color:#fff;text-decoration:none;border-radius:8px;font-weight:bold;">
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
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#1a1a1a;">
          <h2 style="color:#0f5c54;">Appointment Updated</h2>
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
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#1a1a1a;">
          <h2 style="color:#8a6a3f;">Realty Appointment Updated</h2>
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

export async function sendTaxAppointmentRequestEmail(appointment, manageToken) {
    try {
        const manageLink =
            `${env.FRONTEND_URL}/manage-appointment?token=${encodeURIComponent(manageToken)}`;

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
                manageLink,
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
            to: process.env.OFFICE_NOTIFICATION_EMAIL,
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
        <p><a href="${env.FRONTEND_URL}/admin">Open Admin Panel</a></p>
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
export async function sendCustomerRescheduleEmail(appointment, manageToken) {
  const manageLink =
    `${env.FRONTEND_URL}/manage-appointment?token=${encodeURIComponent(manageToken)}`;

  const result = await resend.emails.send({
    from: "appointments@dpstaxpro.com",
    to: appointment.email,
    subject: "Your DPS Appointment Was Rescheduled",
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6">
        <h2>Appointment Updated</h2>
        <p>Your appointment details have changed:</p>
        <p><strong>Service:</strong> ${appointment.service}</p>
        <p><strong>Preparer:</strong> ${appointment.tax_preparer}</p>
        <p><strong>Date:</strong> ${appointment.appointment_date}</p>
        <p><strong>Time:</strong> ${appointment.appointment_time}</p>
        <p><a href="${manageLink}">Review or Change My Appointment</a></p>
        <p>If you did not make this change, call (973) 327-2340.</p>
      </div>
    `,
  });

  if (result.error) {
    console.error("Reschedule email failed:", result.error);
  }
}
export async function sendAppointmentCancellationEmail(appointment) {
  const result = await resend.emails.send({
    from: "appointments@dpstaxpro.com",
    to: appointment.email,
    subject: "Your DPS Appointment Was Cancelled",
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6">
        <h2>Appointment Cancelled</h2>
        <p>Hello ${appointment.first_name},</p>
        <p>Your appointment has been cancelled.</p>
        <p><strong>Service:</strong> ${appointment.service}</p>
        <p><strong>Preparer:</strong> ${appointment.tax_preparer}</p>
        <p><strong>Date:</strong> ${appointment.appointment_date}</p>
        <p><strong>Time:</strong> ${appointment.appointment_time}</p>
        <p><strong>Length:</strong> ${appointment.duration_minutes ?? 30} minutes</p>
        <p>If this was a mistake, call (973) 327-2340.</p>
      </div>
    `,
  });

  if (result.error) throw result.error;
  return result;
}
