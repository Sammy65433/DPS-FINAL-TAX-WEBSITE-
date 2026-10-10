import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaCalendarAlt,
  FaClock,
  FaCloudUploadAlt,
  FaExternalLinkAlt,
  FaPhoneAlt,
  FaShieldAlt,
} from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, "");

const EMPTY_FORM = {
  first_name: "",
  last_name: "",
  phone: "",
  email: "",
  service: "",
  tax_preparer: "",
  appointment_date: "",
  appointment_time: "",
  duration_minutes: 30,
  visit_format: "",
  message: "",
};

function isSunday(value) {
  return Boolean(value) && new Date(`${value}T00:00:00`).getDay() === 0;
}

function Booking() {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [loadingTimes, setLoadingTimes] = useState(false);
  const [availabilityError, setAvailabilityError] = useState("");
  const [status, setStatus] = useState({ message: "", type: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return undefined;

    const timer = setTimeout(() => {
      document
        .getElementById(location.hash.slice(1))
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);

    return () => clearTimeout(timer);
  }, [location.hash]);

  useEffect(() => {
    setAvailableTimes([]);
    setAvailabilityError("");

    if (
      !formData.appointment_date ||
      !formData.tax_preparer ||
      isSunday(formData.appointment_date)
    ) {
      setLoadingTimes(false);
      return undefined;
    }

    if (!API_URL) {
      setAvailabilityError("Booking server is not configured.");
      setLoadingTimes(false);
      return undefined;
    }

    const controller = new AbortController();

    async function fetchAvailability() {
      setLoadingTimes(true);

      try {
        const params = new URLSearchParams({
          date: formData.appointment_date,
          preparer: formData.tax_preparer,
          duration_minutes: String(formData.duration_minutes),
        });

        const response = await fetch(
          `${API_URL}/api/appointments/availability?${params}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Could not load available times.");
        }

        const data = await response.json();

        if (!Array.isArray(data.availableTimes)) {
          throw new Error("Unexpected availability response.");
        }

        if (!controller.signal.aborted) {
          setAvailableTimes(data.availableTimes);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          setAvailabilityError(error.message);
        }
      } finally {
        if (!controller.signal.aborted) setLoadingTimes(false);
      }
    }

    fetchAvailability();
    return () => controller.abort();
  }, [
    formData.appointment_date,
    formData.tax_preparer,
    formData.duration_minutes,
  ]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
      ...(name === "appointment_date" || name === "tax_preparer"
        ? { appointment_time: "" }
        : {}),
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (isSubmitting) return;

    if (!API_URL) {
      setStatus({
        message: "Booking server is not configured.",
        type: "error",
      });
      return;
    }

    if (!availableTimes.includes(formData.appointment_time)) {
      setStatus({
        message: "Choose an available appointment time.",
        type: "error",
      });
      return;
    }

    setIsSubmitting(true);
    setStatus({ message: "Sending...", type: "sending" });

    try {
      const response = await fetch(`${API_URL}/api/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message || "Something went wrong. Please try again."
        );
      }

      setStatus({
        message: "Thank you. Your appointment request has been sent.",
        type: "success",
      });
      setFormData({ ...EMPTY_FORM });
      setAvailableTimes([]);
    } catch (error) {
      setStatus({
        message: error.message || "Could not connect to booking server.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="section booking-section" id="booking">
      <div className="container">
        <div className="booking-heading">
          <p className="eyebrow">Schedule Your Visit</p>
          <h2 className="h2-sub">Book Your Appointment</h2>
          <p className="section-text">
            Choose your service, preferred preparer, and an available time.
            Our team will follow up about your request.
          </p>
        </div>

        <div className="booking-top-card" id="irs-links">
          <span className="booking-card-icon">
            <FaCloudUploadAlt aria-hidden="true" />
          </span>
          <h3>Secure Document Upload Portal</h3>
          <p>
            Use the secure CCH iFirm portal to share requested tax documents
            with our office. Contact us if you need help getting portal access.
          </p>
          <p className="booking-inline-contact">
            <FaPhoneAlt aria-hidden="true" />
            <a href="tel:+19733272340">(973) 327-2340</a>
          </p>
          <div className="booking-portal-actions">
            <a
              href="https://dpsprofessionaltaxservices.cchifirm.us/2/login/"
              target="_blank"
              rel="noopener noreferrer"
              className="booking-portal-link"
            >
              Open Secure CCH iFirm Portal
              <FaExternalLinkAlt aria-hidden="true" />
            </a>
            <a
              href="https://www.irs.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="booking-portal-link booking-portal-link-secondary"
            >
              Visit the Official IRS Website
              <FaExternalLinkAlt aria-hidden="true" />
            </a>
          </div>
        </div>

        <form className="booking-form" onSubmit={handleSubmit}>
          <div className="booking-form-title">
            <FaCalendarAlt aria-hidden="true" />
            <h3>Appointment Request</h3>
          </div>

          <div className="name-row">
            <div className="booking-field">
              <label htmlFor="booking-first-name">First Name</label>
              <input
                id="booking-first-name"
                type="text"
                name="first_name"
                autoComplete="given-name"
                required
                value={formData.first_name}
                onChange={handleChange}
              />
            </div>
            <div className="booking-field">
              <label htmlFor="booking-last-name">Last Name</label>
              <input
                id="booking-last-name"
                type="text"
                name="last_name"
                autoComplete="family-name"
                required
                value={formData.last_name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="name-row">
            <div className="booking-field">
              <label htmlFor="booking-phone">Phone Number</label>
              <input
                id="booking-phone"
                type="tel"
                name="phone"
                autoComplete="tel"
                required
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="booking-field">
              <label htmlFor="booking-email">Email Address</label>
              <input
                id="booking-email"
                type="email"
                name="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="name-row">
            <div className="booking-field">
              <label htmlFor="service-select">Service</label>
              <select
                id="service-select"
                name="service"
                required
                value={formData.service}
                onChange={handleChange}
              >
                <option value="">Select a Service</option>
                <option value="Tax Preparation">Tax Preparation</option>
                <option value="Copy & Fax Services">Copy &amp; Fax Services</option>
                <option value="Notary Public">Notary Public</option>
                <option value="Translation Services">Translation Services</option>
              </select>
            </div>
            <div className="booking-field">
              <label htmlFor="preparer-select">Preferred Preparer</label>
              <select
                id="preparer-select"
                name="tax_preparer"
                required
                value={formData.tax_preparer}
                onChange={handleChange}
              >
                <option value="">Select a Preparer</option>
                <option value="Pierre Polidor">Pierre Polidor</option>
                <option value="Dalia Pierre">Dalia Pierre</option>
                <option value="Severe Jacquet">Severe Jacquet</option>
                <option value="Jean P Cifrant">Jean P Cifrant</option>
                <option value="Ricot Casimir">Ricot Casimir</option>
              </select>
            </div>
          </div>

          <div className="booking-field">
            <label htmlFor="visit-format">How would you like to meet?</label>
            <select
              id="visit-format"
              name="visit_format"
              required
              value={formData.visit_format}
              onChange={handleChange}
            >
              <option value="">Select how you’ll meet</option>
              <option value="in_person">In person</option>
              <option value="phone">Over the phone</option>
              <option value="virtual">Virtual/online</option>
            </select>
          </div>

          <div className="name-row">
            <div className="booking-field">
              <label htmlFor="appointment-date">
                <FaCalendarAlt aria-hidden="true" /> Preferred Date
              </label>
              <input
                id="appointment-date"
                type="date"
                name="appointment_date"
                required
                min={new Date().toLocaleDateString("en-CA")}
                value={formData.appointment_date}
                onChange={handleChange}
              />
            </div>
            <div className="booking-field">
              <label htmlFor="appointment-time">
                <FaClock aria-hidden="true" /> Preferred Time
              </label>
              <select
                id="appointment-time"
                name="appointment_time"
                required
                value={formData.appointment_time}
                onChange={handleChange}
                disabled={
                  loadingTimes ||
                  !formData.appointment_date ||
                  !formData.tax_preparer ||
                  isSunday(formData.appointment_date)
                }
              >
                <option value="">
                  {loadingTimes ? "Loading times..." : "Select a Time"}
                </option>
                {availableTimes.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {availabilityError && (
            <p className="form-status error" role="alert">
              {availabilityError}
            </p>
          )}

          {isSunday(formData.appointment_date) && (
            <div className="sunday-note">
              <p>Sunday appointments must be scheduled by phone.</p>
              <a href="tel:+19733272340">Call (973) 327-2340</a>
            </div>
          )}

          {formData.appointment_date &&
            formData.tax_preparer &&
            !isSunday(formData.appointment_date) &&
            !loadingTimes &&
            !availabilityError &&
            availableTimes.length === 0 && (
              <p className="form-status error">
                No times are currently available for this date and preparer.
              </p>
            )}

          <div className="booking-field">
            <label htmlFor="booking-message">Questions or details (optional)</label>
            <textarea
              id="booking-message"
              name="message"
              placeholder="Tell us anything helpful for your appointment"
              value={formData.message}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="booking-submit-btn"
            disabled={isSubmitting || loadingTimes}
          >
            {isSubmitting ? "Sending..." : "Book Your Appointment"}
          </button>

          {status.message && (
            <p
              className={`form-status ${status.type}`}
              role="status"
              aria-live="polite"
            >
              {status.message}
            </p>
          )}

          <div className="booking-security-note">
            <FaShieldAlt aria-hidden="true" />
            <p>
              <strong>Important Security Notice:</strong> Do not enter Social
              Security numbers, tax IDs, banking details, driver’s license
              numbers, or tax documents in this form. Use the secure CCH iFirm
              portal above for document uploads.
            </p>
          </div>
        </form>

        <div className="booking-help">
          <p>Need help choosing a service or preparing for your visit?</p>
          <Link to="/faq">See What to Bring &amp; FAQ</Link>
        </div>
      </div>
    </section>
  );
}

export default Booking;
