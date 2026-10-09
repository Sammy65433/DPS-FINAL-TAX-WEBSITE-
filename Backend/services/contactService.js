import { resend } from "../config/resend.js";

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[char]);
}

export async function sendContactEmail({
  name,
  email,
  phone,
  subject,
  message,
}) {
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.CONTACT_EMAIL;

  if (!from || !to) {
    throw new Error("Contact email sender or recipient is missing");
  }

  const { data, error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: `DPS website inquiry: ${subject}`,
    html: `
      <h2>New website contact message</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone || "Not provided")}</p>
      <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
      <p><strong>Message:</strong><br>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
    `,
  });

  if (error) throw error;
  return data;
}
