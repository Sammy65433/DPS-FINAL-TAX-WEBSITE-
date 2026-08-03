import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function generateTimeOptions(selectedDate) {
  if (!selectedDate) return [];

  const date = new Date(`${selectedDate}T00:00:00`);
  const day = date.getDay();

  if (day === 0) return []; // Sunday by appointment only

  const closingHour = day === 6 ? 18 : 17; // Saturday 6 PM, weekdays 5 PM
  const options = [];

  for (let hour = 9; hour <= closingHour; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      if (hour === closingHour && minute > 0) break;

      const period = hour >= 12 ? "PM" : "AM";
      const displayHour = hour % 12 === 0 ? 12 : hour % 12;
      const displayMinute = minute.toString().padStart(2, "0");

      options.push(`${displayHour}:${displayMinute} ${period}`);
    }
  }

  return options;
}

function Booking() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    service: "",
    tax_preparer: "",
    appointment_date: "",
    appointment_time: "",
    message: "",
  });

  const [bookedTimes, setBookedTimes] = useState([]);
  const [status, setStatus] = useState({ message: "", type: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();


  const timeOptions = generateTimeOptions(formData.appointment_date);
  
  useEffect(() => {
  if (location.hash === "#payment") {
    const el = document.getElementById("payment");
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }
}, [location]);


  useEffect(() => {
    async function fetchAvailability() {
      if (!formData.appointment_date || !formData.tax_preparer) {
        setBookedTimes([]);
        return;
      }

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/appointments/availability?date=${encodeURIComponent(
            formData.appointment_date
          )}&preparer=${encodeURIComponent(formData.tax_preparer)}`
        );

        const data = await response.json();
        setBookedTimes(data.bookedTimes || []);
      } catch (error) {
        console.error("Error fetching availability:", error);
        setBookedTimes([]);
      }
    }

    fetchAvailability();
  }, [formData.appointment_date, formData.tax_preparer]);

  const availableTimes = timeOptions.filter(
    time => !bookedTimes.includes(time)
  );

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ message: "Sending...", type: "sending" });

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/appointments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setStatus({
          message: "Thank you. Your appointment request has been sent.",
          type: "success",
        });

        setFormData({
          first_name: "",
          last_name: "",
          phone: "",
          email: "",
          service: "",
          tax_preparer: "",
          appointment_date: "",
          appointment_time: "",
          message: "",
        });

        setBookedTimes([]);
      } else {
        setStatus({
          message: data.message || "Something went wrong. Please try again.",
          type: "error",
        });
      }
    } catch (error) {
      setStatus({
        message: "Could not connect to booking server.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section
      className="section booking-section"
      id="booking"
      data-aos="fade-up"
    >
      <div className="container">
        <p className="eyebrow">Schedule Your Visit</p>
        <h2 className="h2-sub">Book Your Appointment</h2>
        <p className="section-text">
          Fill out the form below, select your service and preferred preparer,
          and we will contact you to confirm your appointment.
        </p>

        <div
          className="card"
          style={{ maxWidth: "720px", margin: "0 auto 1.5rem" }}
        >
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
          <p>
            Phone: <a href="tel:9733272340">(973) 327-2340</a>
          </p>
          <a
            href="https://dpsprofessionaltaxservices.cchifirm.us"
            target="_blank"
            rel="noopener noreferrer"
            className="card-link"
          >
            Open Secure CCH iFirm Portal
          </a>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
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
            <option value="Immigration Services">Immigration Services</option>
            <option value="Insurance Services">Insurance Services</option>
          </select>

          <select
            id="preparer-select"
            name="tax_preparer"
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

          <label htmlFor="appointment-date">Preferred Date</label>
          <input
            id="appointment-date"
            type="date"
            name="appointment_date"
            required
            value={formData.appointment_date}
            onChange={handleChange}
          />

          <label htmlFor="appointment-time">Preferred Time</label>
          <select
            id="appointment-time"
            name="appointment_time"
            required
            value={formData.appointment_time}
            onChange={handleChange}
          >
            <option value="">Select a Time</option>
            {availableTimes.map(time => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>

          {formData.appointment_date && timeOptions.length === 0 && (
            <p className="sunday-note">
              <span className="sunday-note-icon">📞</span>
              Sunday is by appointment only. Please call our office at{" "}
              <a href="tel:9733272340" className="sunday-note-link">
                (973) 327-2340
              </a>{" "}
              to schedule.
            </p>
          )}




          {formData.appointment_date &&
            formData.tax_preparer &&
            timeOptions.length > 0 &&
            availableTimes.length === 0 && (
              <p className="form-status error">
                No appointment times are currently available for this date and
                preparer.
              </p>
            )}

          <section className="card payment-card" id="payment">
            <h3>Payment Options</h3>
            <p>Please include your last name and tax year in the payment note.</p>
            <p>
              <strong>Venmo:</strong>{" "}
              <a
                href="https://venmo.com/u/DPSTax"
                target="_blank"
                rel="noopener noreferrer"
                className="payment-link"
              >
                @DPSTax
              </a>
            </p>
            <p>
              <strong>Cash App:</strong> <strong>$DPSTAX1811</strong>
            </p>
            <p>
              <strong>Zelle:</strong>{" "}
              <a href="tel:8627661725" className="payment-link">
                862-766-1725
              </a>
            </p>
            <p>
              <strong>Apple Pay:</strong>{" "}
              <a href="tel:8627661725" className="payment-link">
                862-766-1725
              </a>
            </p>
            <p>
              Phone: <a href="tel:9733272340">(973) 327-2340</a>
            </p>
          </section>

          <textarea
            name="message"
            placeholder="Write any questions or details here"
            value={formData.message}
            onChange={handleChange}
          />

          <p className="form-note">
            Please do not submit Social Security numbers, tax IDs, or sensitive
            tax documents through this form. Use our secure CCH iFirm portal for
            document uploads.
          </p>

          <button type="submit" className="btn" disabled={isSubmitting}>
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
