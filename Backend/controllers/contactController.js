import { sendContactEmail } from "../services/contactService.js";

const allowedSubjects = new Set([
  "Tax services",
  "Real estate",
  "Other services",
  "General question",
]);

export async function submitContact(req, res) {
  const { name, email, phone = "", subject, message, website = "" } = req.body ?? {};

  if (website) return res.json({ ok: true });

  const cleanName = typeof name === "string" ? name.trim() : "";
  const cleanEmail = typeof email === "string" ? email.trim() : "";
  const cleanPhone = typeof phone === "string" ? phone.trim() : "";
  const cleanMessage = typeof message === "string" ? message.trim() : "";

  if (
    !cleanName ||
    cleanName.length > 100 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail) ||
    cleanEmail.length > 254 ||
    cleanPhone.length > 30 ||
    !allowedSubjects.has(subject) ||
    cleanMessage.length < 10 ||
    cleanMessage.length > 2000
  ) {
    return res.status(400).json({
      error: "Please check your contact details and message.",
    });
  }

  try {
    await sendContactEmail({
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      subject,
      message: cleanMessage,
    });

    return res.json({ ok: true });
  } catch (error) {
    console.error("Contact email failed:", error);
    return res.status(500).json({
      error: "Unable to send your message right now.",
    });
  }
}
