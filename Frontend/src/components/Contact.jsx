import { useState } from "react";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
  website: "",
};

function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: "", text: "" });
  const [submitting, setSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setStatus({ type: "", text: "" });

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      if (!apiUrl) throw new Error("Contact form is not configured.");

      const response = await fetch(`${apiUrl.replace(/\/$/, "")}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.error || "We couldn't send your message.");
      }

      setForm(initialForm);
      setStatus({
        type: "success",
        text: "Thanks! Your message has been sent.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        text: error.message || "Something went wrong. Please call our office.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <div className="contact-heading">
          <p className="eyebrow">Contact Us</p>
          <h2>We’re Here to Help</h2>
        </div>

        <div className="contact-layout">
          <div className="contact-visual" data-aos="fade-right">
            <div className="contact-brand-box">
              <img
                src="/DPS-LOGO1.png"
                alt="DPS Professional Tax Services logo"
                className="contact-logo"
              />
              <strong className="contact-brand-title">
                DPS Professional Tax Services
                <span>&amp; Realty Management</span>
              </strong>
            </div>

            <img
              src="/client-all.jpg"
              alt="DPS Professional Tax Services clients"
              className="contact-photo"
              loading="lazy"
            />

          </div>

          <div className="contact-form-card" data-aos="fade-up">
            <h3>Send Us a Message</h3>
            <p className="contact-form-intro">
              Have a general question? Send us a note and we’ll get back to you.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="contact-form-row">
                <div className="contact-field">
                  <label htmlFor="contact-name">Name</label>
                  <input
                    id="contact-name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    autoComplete="name"
                    maxLength={100}
                    required
                  />
                </div>

                <div className="contact-field">
                  <label htmlFor="contact-email">Email</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="email"
                    maxLength={254}
                    required
                  />
                </div>
              </div>

              <div className="contact-form-row">
                <div className="contact-field">
                  <label htmlFor="contact-phone">Phone (optional)</label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                    maxLength={30}
                  />
                </div>

                <div className="contact-field">
                  <label htmlFor="contact-subject">Subject</label>
                  <select
                    id="contact-subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="Tax services">Tax services</option>
                    <option value="Real estate">Real estate</option>
                    <option value="Other services">Other services</option>
                    <option value="General question">General question</option>
                  </select>
                </div>
              </div>

              <div className="contact-field">
                <label htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={6}
                  minLength={10}
                  maxLength={2000}
                  placeholder="How can we help?"
                  required
                />
              </div>

              <div className="contact-honeypot" aria-hidden="true">
                <label htmlFor="contact-website">Website</label>
                <input
                  id="contact-website"
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <p className="contact-privacy-note">
                Please don’t include Social Security numbers, tax documents,
                or other sensitive information in this form.
              </p>

              {status.text && (
                <p
                  className={`contact-status contact-status--${status.type}`}
                  role="status"
                  aria-live="polite"
                >
                  {status.text}
                </p>
              )}

              <button
                className="contact-submit"
                type="submit"
                disabled={submitting}
              >
                {submitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>

        <div className="map-embed" data-aos="fade-up">
          <iframe
            src="https://www.google.com/maps?q=1811+Springfield+Ave+Maplewood+NJ+07040&output=embed"
            width="100%"
            height="280"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="DPS Professional Tax Services Location"
          />
        </div>
      </div>
    </section>
  );
}

export default Contact;
