import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  FaCloudUploadAlt,
  FaPhoneAlt,
  FaCalendarAlt,
  FaClock,
} from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL;

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
  if (!value) return false;
  return new Date(`${value}T00:00:00`).getDay() === 0;
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
    if (location.hash !== "#irs-links") {

    }

    const id = location.hash.slice(1);
    const timer = setTimeout(() => {
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);

    return () => clearTimeout(timer);
  }, [location.hash]);

  useEffect(() => {
    setAvailableTimes([]);
    setAvailabilityError("");

    if (!formData.appointment_date || !formData.tax_preparer) return;
    if (isSunday(formData.appointment_date)) return;

    if (!API_URL) {
      setAvailabilityError("Booking server is not configured.");
      return;
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

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong. Please try again.");
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
    <section className="section booking-section" id="booking" data-aos="fade-up">
      <div className="container">
        <div className="booking-heading">
          <p className="eyebrow">Schedule Your Visit</p>
          <h2 className="h2-sub">Book Your Appointment</h2>
          <p className="section-text">
            Fill out the form below, choose your service and preferred
            preparer, and we will contact you to confirm your appointment.
          </p>
        </div>

        <div className="booking-top-card card">
          <div className="booking-card-icon">
            <FaCloudUploadAlt />
          </div>
          <h3>Secure Document Upload Portal</h3>
          <p>
            Clients can safely upload tax documents, download completed files,
            and share information with our office using the secure CCH iFirm
            portal.
          </p>
          <p>
            You can upload W-2s, 1099s, IDs, proof of address, direct deposit
            information, and other requested documents.
          </p>
          <p>
            If you need portal access, please contact our office first so we
            can send you the secure upload link.
          </p>
          <p className="booking-inline-contact">
            <FaPhoneAlt /> <a href="tel:9733272340">(973) 327-2340</a>
          </p>
          <a
            href="https://dpsprofessionaltaxservices.cchifirm.us/2/login/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            Open Secure CCH iFirm Portal
          </a>
        </div>

        <form className="contact-form booking-form" onSubmit={handleSubmit}>
          <div className="name-row">
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              required
              value={formData.first_name}
              onChange={handleChange}
            />
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              required
              value={formData.last_name}
              onChange={handleChange}
            />
          </div>

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            required
            value={formData.phone}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            value={formData.email}
            onChange={handleChange}
          />

          <select
            id="service-select"
            name="service"
            required
            value={formData.service}
            onChange={handleChange}
          >
            <option value="">Select a Service</option>
            <option value="Tax Preparation">Tax Preparation</option>
            <option value="Copy & Fax Services">Copy & Fax Services</option>
            <option value="Notary Public">Notary Public</option>
            <option value="Translation Services">Translation Services</option>
          </select>

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

          <label htmlFor="visit-format" className="booking-label">
            Visit format
          </label>
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

          <div className="booking-label">
            <FaCalendarAlt />
            <label htmlFor="appointment-date">Preferred Date</label>
          </div>
          <input
            id="appointment-date"
            type="date"
            name="appointment_date"
            required
            value={formData.appointment_date}
            onChange={handleChange}
          />

          <div className="booking-label">
            <FaClock />
            <label htmlFor="appointment-time">Preferred Time</label>
          </div>
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

          {availabilityError && (
            <p className="form-status error" role="alert">
              {availabilityError}
            </p>
          )}

          {isSunday(formData.appointment_date) && (
            <div className="sunday-note">
              <p>Sunday is by appointment only. Please call our office to schedule.</p>
              <a href="tel:9733272340" className="btn btn-outline-light">
                <FaPhoneAlt /> <span>Call the Office</span>
              </a>
            </div>
          )}

          {formData.appointment_date &&
            formData.tax_preparer &&
            !isSunday(formData.appointment_date) &&
            !loadingTimes &&
            !availabilityError &&
            availableTimes.length === 0 && (
              <p className="form-status error">
                No appointment times are currently available for this date
                and preparer.
              </p>
            )}

          <textarea
            name="message"
            placeholder="Write any questions or details here"
            value={formData.message}
            onChange={handleChange}
          />
<a
  href="https://www.irs.gov/"
  target="_blank"
  rel="noopener noreferrer"
  className="btn btn-outline-light"
>
  Visit the Official IRS Website
</a>

          <p className="form-note">
            <strong>Important Security Notice:</strong> For your privacy and
            protection, do not submit <strong>Social Security numbers</strong>,
            <strong> tax IDs</strong>, <strong>banking details</strong>,
            <strong> driver’s license numbers</strong>, or other{" "}
            <strong>sensitive tax documents</strong> through this form. Please
            use our secure <strong>CCH iFirm portal</strong> for document
            uploads.
          </p>

          <button
            type="submit"
            className="btn booking-submit-btn"
            disabled={isSubmitting || loadingTimes}
          >
            {isSubmitting ? "Sending..." : "Book Your Appointment"}
          </button>

          {status.message && (
            <p className={`form-status ${status.type}`}>{status.message}</p>
          )}
        </form>
      </div>
    </section>
  );
}

export default Booking;
