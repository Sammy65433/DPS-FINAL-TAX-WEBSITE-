import { useEffect, useRef, useState } from "react";
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
const SERVICES = [
  { name: "Tax Consultation", duration: 15, description: "Discuss your tax questions and next steps." },
  { name: "Personal Tax Preparation", duration: 90, description: "Get help preparing an individual tax return." },
  { name: "Business Tax Preparation", duration: 120, description: "Review and prepare your business tax return." },
  { name: "Notary Public", duration: 15, description: "Have an eligible document notarized in our office." },
  { name: "Mobile Notary Public", duration: 15, description: "Arrange notarization at an agreed location." },
  { name: "S Corporation", duration: 120, description: "Get help preparing an S corporation tax return." },
  { name: "Amended Return", duration: 60, description: "Review changes needed to a previously filed return." },
  { name: "Partnership, LLC & Form 8825", duration: 60, description: "Discuss partnership or LLC filings and Form 8825." },
  { name: "Return for Estates and Trusts", duration: 90, description: "Get help with an estate or trust tax return." },
  { name: "Tax Return Pickup", duration: 60, description: "Schedule a time to collect your completed return." },
  { name: "Translation", duration: 30, description: "Discuss translation needs for your documents." },
  { name: "Form Preparation Support", duration: 60, description: "Get help organizing forms using information you provide." },
  { name: "Copy & Fax", duration: 15, description: "Make copies or send documents by fax." },
  { name: "Other Services", duration: 30, description: "Tell us what you need help with." },
  { name: "Business Services", duration: 120, description: "Discuss your small-business service needs." },
];

const PREPARERS = [
  "Pierre Polidor",
  "Dalia Pierre",
  "Severe Jacquet",
  "Jean P Cifrant",
  "Ricot Casimir",
];

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

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function dateKey(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(
    2,
    "0"
  )}`;
}

function parseDateKey(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || "")) return null;

  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
}

function easternTodayKey() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());

  const values = Object.fromEntries(
    parts.map((part) => [part.type, part.value])
  );

  return `${values.year}-${values.month}-${values.day}`;
}

function isSunday(value) {
  return parseDateKey(value)?.getDay() === 0;
}

function formatTime(totalMinutes) {
  const hour24 = Math.floor(totalMinutes / 60);
  const minute = totalMinutes % 60;

  return `${hour24 % 12 || 12}:${String(minute).padStart(2, "0")} ${hour24 >= 12 ? "PM" : "AM"
    }`;
}

function formatDuration(minutes) {
  if (minutes < 60) return `${minutes} min`;

  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;

  return remaining
    ? `${hours} hr ${remaining} min`
    : `${hours} hr${hours === 1 ? "" : "s"}`;
}

function getDisplayTimes(dateKeyValue, duration) {
  const date = parseDateKey(dateKeyValue);
  if (!date || date.getDay() === 0) return [];

  const opens = 9 * 60;
  const closes = date.getDay() === 6 ? 18 * 60 : 17 * 60;
  const times = [];

  for (let start = opens; start + duration <= closes; start += 30) {
    times.push(formatTime(start));
  }

  return times;
}

function Booking() {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const today = parseDateKey(easternTodayKey());
    return { year: today.getFullYear(), month: today.getMonth() };
  });
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [schedulingOpen, setSchedulingOpen] = useState(false);
  const [availability, setAvailability] = useState(null);
  const [loadingTimes, setLoadingTimes] = useState(false);
  const [availabilityError, setAvailabilityError] = useState("");
  const [status, setStatus] = useState({ message: "", type: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const summaryRef = useRef(null);
  const lastFocusedRef = useRef(null);
  const schedulerRef = useRef(null);
  const location = useLocation();

  const selectedService = SERVICES.find(
    (service) => service.name === formData.service
  );
  const todayKey = easternTodayKey();
  const selectedDate = parseDateKey(formData.appointment_date);
  const selectedDateLabel = selectedDate
    ? new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    }).format(selectedDate)
    : "";

  const availabilityKey = `${formData.appointment_date}|${formData.tax_preparer}|${formData.duration_minutes}`;
  const availabilityIsCurrent = availability?.key === availabilityKey;
  const availableTimes = availabilityIsCurrent ? availability.times : [];

  const ready =
    schedulingOpen &&
    Boolean(selectedService) &&
    Boolean(formData.appointment_date && formData.tax_preparer) &&
    !isSunday(formData.appointment_date) &&
    availabilityIsCurrent &&
    !loadingTimes &&
    !availabilityError;

  const displayTimes = getDisplayTimes(
    formData.appointment_date,
    Number(formData.duration_minutes)
  );

  const firstDay = new Date(
    calendarMonth.year,
    calendarMonth.month,
    1
  ).getDay();
  const daysInMonth = new Date(
    calendarMonth.year,
    calendarMonth.month + 1,
    0
  ).getDate();
  const calendarCells = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];

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
    if (!summaryOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    summaryRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setSummaryOpen(false);
        return;
      }

      if (event.key !== "Tab" || !summaryRef.current) return;

      const focusable = Array.from(
        summaryRef.current.querySelectorAll(
          'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );

      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === last
      ) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      lastFocusedRef.current?.focus();
    };
  }, [summaryOpen]);

  useEffect(() => {
    setAvailability(null);
    setAvailabilityError("");

    if (
      !schedulingOpen ||
      !selectedService ||
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

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(
            data.message || "Could not load available times."
          );
        }

        if (!Array.isArray(data.availableTimes)) {
          throw new Error("Unexpected availability response.");
        }

        if (!controller.signal.aborted) {
          setAvailability({
            key: availabilityKey,
            times: data.availableTimes,
          });
        }
      } catch (error) {
        if (error.name !== "AbortError" && !controller.signal.aborted) {
          setAvailabilityError(error.message);
        }
      } finally {
        if (!controller.signal.aborted) setLoadingTimes(false);
      }
    }

    fetchAvailability();
    return () => controller.abort();
  }, [
    schedulingOpen,
    selectedService,
    formData.appointment_date,
    formData.tax_preparer,
    formData.duration_minutes,
    availabilityKey,
  ]);

  function chooseService(service, event) {
    lastFocusedRef.current = event.currentTarget;
    setStatus({ message: "", type: "" });
    setAvailability(null);
    setSchedulingOpen(false);
    setFormData((current) => ({
      ...current,
      service: service.name,
      duration_minutes: service.duration,
      appointment_date: "",
      appointment_time: "",
    }));
    setSummaryOpen(true);
  }

  function scheduleAppointment() {
    setSummaryOpen(false);
    setSchedulingOpen(true);

    window.setTimeout(() => {
      schedulerRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 0);
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setStatus({ message: "", type: "" });
    setFormData((current) => ({
      ...current,
      [name]: value,
      ...(name === "tax_preparer"
        ? { appointment_time: "" }
        : {}),
    }));
  }

  function changeMonth(direction) {
    const next = new Date(
      calendarMonth.year,
      calendarMonth.month + direction,
      1
    );

    setCalendarMonth({
      year: next.getFullYear(),
      month: next.getMonth(),
    });
  }

  function chooseDate(value) {
    setStatus({ message: "", type: "" });
    setFormData((current) => ({
      ...current,
      appointment_date: value,
      appointment_time: "",
    }));
  }

  function chooseTime(value) {
    if (!ready || !availableTimes.includes(value)) return;

    setStatus({ message: "", type: "" });
    setFormData((current) => ({
      ...current,
      appointment_time: value,
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

    if (
      !selectedService ||
      formData.duration_minutes !== selectedService.duration ||
      !ready ||
      !availableTimes.includes(formData.appointment_time)
    ) {
      setStatus({
        message: "Choose a service and an available appointment time.",
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
        message:
          "Thank you. Your appointment request has been sent.",
        type: "success",
      });
      setFormData({ ...EMPTY_FORM });
      setAvailability(null);
      setSchedulingOpen(false);
    } catch (error) {
      setStatus({
        message:
          error.message || "Could not connect to booking server.",
        type: "error",
      });

      if (
        error.message?.includes("unavailable") ||
        error.message?.includes("overlap") ||
        error.message?.includes("24 hours")
      ) {
        setAvailability(null);
      }
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
            Choose one service, review your appointment, then select an
            available time.
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

        <div className="booking-service-list">
          <h3>Our Services</h3>
          <div className="booking-service-grid">
            {SERVICES.map((service) => (
              <article
                className="booking-service-card"
                key={service.name}
              >
                <div>
                  <h4>{service.name}</h4>
                  <p className="booking-service-description">{service.description}</p>
                  <p className="booking-service-duration">
                    {formatDuration(service.duration)}
                  </p>

                </div>
                <button
                  type="button"
                  className="booking-service-button"
                  onClick={(event) => chooseService(service, event)}
                >
                  Book Now
                </button>
              </article>
            ))}
          </div>
          <p className="booking-service-disclaimer">
            Appointment lengths are provisional. Our team will confirm service
            details and pricing.
          </p>
        </div>

        {schedulingOpen && selectedService && (
          <form
            className="booking-form"
            onSubmit={handleSubmit}
            ref={schedulerRef}
          >
            <div className="booking-form-title">
              <FaCalendarAlt aria-hidden="true" />
              <h3>Schedule Your Appointment</h3>
            </div>

            <div className="booking-chosen-service">
              <div>
                <strong>{selectedService.name}</strong>
                <span>{formatDuration(selectedService.duration)}</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSchedulingOpen(false);
                  setAvailability(null);
                  setStatus({ message: "", type: "" });
                }}
              >
                Change service
              </button>
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
                {PREPARERS.map((preparer) => (
                  <option value={preparer} key={preparer}>
                    {preparer}
                  </option>
                ))}
              </select>
            </div>

            <div className="booking-scheduler">
              <div className="booking-calendar">
                <div className="booking-calendar-top">
                  <button
                    type="button"
                    className="booking-calendar-nav"
                    onClick={() => changeMonth(-1)}
                    aria-label="Previous month"
                  >
                    ‹
                  </button>
                  <strong>
                    {new Intl.DateTimeFormat("en-US", {
                      month: "long",
                      year: "numeric",
                    }).format(
                      new Date(
                        calendarMonth.year,
                        calendarMonth.month,
                        1
                      )
                    )}
                  </strong>
                  <button
                    type="button"
                    className="booking-calendar-nav"
                    onClick={() => changeMonth(1)}
                    aria-label="Next month"
                  >
                    ›
                  </button>
                </div>

                <div className="booking-calendar-grid">
                  {WEEKDAYS.map((day) => (
                    <span
                      className="booking-calendar-weekday"
                      key={day}
                    >
                      {day}
                    </span>
                  ))}

                  {calendarCells.map((day, index) => {
                    if (!day) {
                      return (
                        <span
                          key={`empty-${index}`}
                          className="booking-calendar-empty"
                        />
                      );
                    }

                    const value = dateKey(
                      calendarMonth.year,
                      calendarMonth.month,
                      day
                    );
                    const disabled =
                      value < todayKey ||
                      new Date(
                        calendarMonth.year,
                        calendarMonth.month,
                        day
                      ).getDay() === 0;
                    const selected =
                      value === formData.appointment_date;

                    return (
                      <button
                        key={value}
                        type="button"
                        className={`booking-calendar-day${selected ? " selected" : ""
                          }`}
                        onClick={() => chooseDate(value)}
                        disabled={disabled}
                        aria-label={new Intl.DateTimeFormat(
                          "en-US",
                          {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          }
                        ).format(
                          new Date(
                            calendarMonth.year,
                            calendarMonth.month,
                            day
                          )
                        )}
                        aria-pressed={selected}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="booking-times-panel">
                <h4>
                  <FaClock aria-hidden="true" />{" "}
                  {selectedDate
                    ? `Availability for ${selectedDateLabel}`
                    : "Select a date"}
                </h4>
                <p className="booking-cutoff-note">
                  Bookings close 24 hours before the session starts.
                  All times are Eastern Time.
                </p>

                {!formData.tax_preparer && (
                  <p className="booking-times-message">
                    Select a preparer to see their availability.
                  </p>
                )}
                {!selectedDate && (
                  <p className="booking-times-message">
                    Choose a date on the calendar.
                  </p>
                )}
                {loadingTimes && (
                  <p
                    className="booking-times-message"
                    role="status"
                  >
                    Loading times...
                  </p>
                )}
                {availabilityError && (
                  <p
                    className="form-status error"
                    role="alert"
                  >
                    {availabilityError}
                  </p>
                )}
                {ready && availableTimes.length === 0 && (
                  <p className="booking-times-message">
                    No times are available for this date and
                    preparer.
                  </p>
                )}
                {ready && (
                  <div
                    className="booking-time-grid"
                    aria-label="Appointment times"
                  >
                    {displayTimes.map((time) => {
                      const available =
                        availableTimes.includes(time);
                      const selected =
                        formData.appointment_time === time;

                      return (
                        <button
                          key={time}
                          type="button"
                          className={`booking-time-slot${selected ? " selected" : ""
                            }`}
                          onClick={() => chooseTime(time)}
                          disabled={!available}
                          aria-pressed={
                            available ? selected : undefined
                          }
                          aria-label={`${time} Eastern Time, ${available
                              ? "available"
                              : "unavailable"
                            }`}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                )}
                {formData.appointment_time && (
                  <p className="booking-selected-time">
                    Selected: {formData.appointment_time} Eastern
                    Time
                  </p>
                )}
              </div>
            </div>

            <div className="booking-field">
              <label htmlFor="visit-format">
                How would you like to meet?
              </label>
              <select
                id="visit-format"
                name="visit_format"
                required
                value={formData.visit_format}
                onChange={handleChange}
              >
                <option value="">Choose a meeting option</option>
                <option value="in_person">In Person</option>
                <option value="virtual">By Video or Phone</option>
              </select>
            </div>

            <div className="name-row">
              <div className="booking-field">
                <label htmlFor="booking-first-name">
                  First Name
                </label>
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
                <label htmlFor="booking-last-name">
                  Last Name
                </label>
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
                <label htmlFor="booking-phone">
                  Phone Number
                </label>
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
                <label htmlFor="booking-email">
                  Email Address
                </label>
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

            <div className="booking-field">
              <label htmlFor="booking-message">
                Questions or details (optional)
              </label>
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
              {isSubmitting
                ? "Sending..."
                : "Book Your Appointment"}
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
                <strong>Important Security Notice:</strong> Do not
                enter Social Security numbers, tax IDs, banking
                details, driver’s license numbers, or tax documents
                in this form. Use the secure CCH iFirm portal above
                for document uploads.
              </p>
            </div>
          </form>
        )}

        {!schedulingOpen && status.message && (
          <p
            className={`form-status ${status.type}`}
            role="status"
            aria-live="polite"
          >
            {status.message}
          </p>
        )}

        <div className="booking-help">
          <p>Need help choosing a service or preparing for your visit?</p>
          <Link to="/faq">See What to Bring &amp; FAQ</Link>
        </div>
      </div>

      {summaryOpen && selectedService && (
        <div
          className="booking-summary-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSummaryOpen(false);
            }
          }}
        >
          <div
            className="booking-summary-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-summary-title"
            tabIndex={-1}
            ref={summaryRef}
          >
            <div className="booking-summary-header">
              <h3 id="booking-summary-title">
                Appointment Summary
              </h3>
              <button
                type="button"
                className="booking-summary-close"
                onClick={() => setSummaryOpen(false)}
                aria-label="Close appointment summary"
              >
                ×
              </button>
            </div>

            <div className="booking-summary-details">
              <strong>{selectedService.name}</strong>
              <p>
                <p>Choose a preparer when scheduling</p>

              </p>
              <p>DPS Professional Tax Services</p>
              <p>{formatDuration(selectedService.duration)}</p>
            </div>

            <div className="booking-summary-footer">
              <button
                type="button"
                className="booking-summary-schedule"
                onClick={scheduleAppointment}
              >
                Schedule Appointment
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Booking;
