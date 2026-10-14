import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, "");

const PREPARERS = [
    "Pierre Polidor",
    "Dalia Pierre",
    "Severe Jacquet",
    "Jean P Cifrant",
    "Ricot Casimir",
];

const SERVICES = [
    "Tax Preparation",
    "Copy & Fax Services",
    "Notary Public",
    "Translation Services",
];

const VISIT_FORMAT_LABELS = {
    in_person: "In person",
    phone: "Over the phone",
    virtual: "Virtual/online",
};

function dateKey(value) {
    return (
        `${value.getFullYear()}-` +
        `${String(value.getMonth() + 1).padStart(2, "0")}-` +
        `${String(value.getDate()).padStart(2, "0")}`
    );
}

export default function ManageAppointment() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const [appointment, setAppointment] = useState(null);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [preparer, setPreparer] = useState("");
    const [service, setService] = useState("");
    const [visitFormat, setVisitFormat] = useState("");
    const [duration, setDuration] = useState(30);
    const [month, setMonth] = useState(new Date());

    const [availableTimes, setAvailableTimes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingTimes, setLoadingTimes] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    function applyAppointment(nextAppointment) {
        setAppointment(nextAppointment);
        setDate(nextAppointment.appointment_date);
        setTime(nextAppointment.appointment_time);
        setPreparer(nextAppointment.tax_preparer);
        setService(nextAppointment.service);
        setVisitFormat(nextAppointment.visit_format || "");
        setDuration(Number(nextAppointment.duration_minutes ?? 30));
        setMonth(new Date(`${nextAppointment.appointment_date}T00:00:00`));
    }

    useEffect(() => {
        if (!token || !API_URL) {
            setError("This appointment link is missing or unavailable.");
            setLoading(false);
            return undefined;
        }

        const controller = new AbortController();

        async function loadAppointment() {
            setLoading(true);
            setError("");

            try {
                const response = await fetch(
                    `${API_URL}/api/appointments/manage?token=${encodeURIComponent(token)}`,
                    { signal: controller.signal }
                );
                const data = await response.json().catch(() => ({}));

                if (!response.ok || !data.appointment) {
                    throw new Error(data.message || "This link is invalid or expired.");
                }

                if (!controller.signal.aborted) applyAppointment(data.appointment);
            } catch (requestError) {
                if (requestError.name !== "AbortError") {
                    setError(requestError.message || "Could not load appointment.");
                }
            } finally {
                if (!controller.signal.aborted) setLoading(false);
            }
        }

        loadAppointment();
        return () => controller.abort();
    }, [token]);

    useEffect(() => {
        if (
            !API_URL ||
            !token ||
            !date ||
            !preparer ||
            !appointment ||
            !["booked", "confirmed"].includes(appointment.status)
        ) {
            setAvailableTimes([]);
            setLoadingTimes(false);
            return undefined;
        }

        const controller = new AbortController();

        async function loadTimes() {
            setLoadingTimes(true);
            setAvailableTimes([]);

            try {
                const params = new URLSearchParams({
                    token,
                    date,
                    preparer,
                    duration_minutes: String(duration),
                });

                const response = await fetch(
                    `${API_URL}/api/appointments/manage/availability?${params}`,
                    { signal: controller.signal }
                );
                const data = await response.json().catch(() => ({}));

                if (!response.ok || !Array.isArray(data.availableTimes)) {
                    throw new Error(data.message || "Could not load available times.");
                }

                if (!controller.signal.aborted) {
                    setAvailableTimes(data.availableTimes);
                }
            } catch (requestError) {
                if (requestError.name !== "AbortError") {
                    setError(requestError.message || "Could not load available times.");
                }
            } finally {
                if (!controller.signal.aborted) setLoadingTimes(false);
            }
        }

        loadTimes();
        return () => controller.abort();
    }, [token, date, preparer, duration, appointment?.status]);

    async function sendAction(action) {
        if (!API_URL || !token || saving) return;

        if (
            action === "reschedule" &&
            (!service || !visitFormat || !time || !availableTimes.includes(time))
        ) {
            setError("Choose an available time and meeting format.");
            return;
        }

        if (
            action === "cancel" &&
            !window.confirm("Cancel this appointment?")
        ) {
            return;
        }

        setSaving(true);
        setError("");
        setMessage("");

        try {
            const response = await fetch(
                `${API_URL}/api/appointments/manage/${action}`,
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(
                        action === "reschedule"
                            ? {
                                token,
                                service,
                                appointment_date: date,
                                appointment_time: time,
                                tax_preparer: preparer,
                                duration_minutes: duration,
                                visit_format: visitFormat,
                            }
                            : { token }
                    ),
                }
            );

            const data = await response.json().catch(() => ({}));

            if (!response.ok || !data.appointment) {
                throw new Error(data.message || "Could not update appointment.");
            }

            applyAppointment(data.appointment);
            setMessage(
                action === "cancel"
                    ? "Appointment cancelled."
                    : "Appointment updated. Check your email for the new details."
            );
        } catch (requestError) {
            setError(requestError.message || "Could not update appointment.");
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return (
            <main className="manage-page">
                <div className="manage-card">
                    <p>Loading appointment...</p>
                </div>
            </main>
        );
    }

    return (
        <main className="manage-page">
            <div className="manage-card">
                <h1>Manage My Appointment</h1>

                {error && (
                    <p className="manage-error" role="alert">
                        {error}
                    </p>
                )}
                {message && (
                    <p className="manage-success" role="status">
                        {message}
                    </p>
                )}

                {appointment && (
                    <>
                        <div className="manage-details">
                            {[
                                ["Service", appointment.service],
                                ["Preparer", appointment.tax_preparer],
                                ["Date", appointment.appointment_date],
                                ["Time", appointment.appointment_time],
                                ["Length", `${appointment.duration_minutes} minutes`],
                                [
                                    "Meeting format",
                                    VISIT_FORMAT_LABELS[appointment.visit_format] ||
                                    "Not specified",
                                ],
                                ["Status", appointment.status],
                            ].map(([label, value]) => (
                                <div className="manage-detail" key={label}>
                                    <strong>{label}</strong>
                                    <span>{value}</span>
                                </div>
                            ))}
                        </div>

                        {["booked", "confirmed"].includes(appointment.status) && (
                            <section className="manage-form">
                                <h2>Change Appointment</h2>

                                <div className="manage-field">
                                    <label htmlFor="new-service">Service</label>
                                    <select
                                        id="new-service"
                                        value={service}
                                        onChange={(event) => setService(event.target.value)}
                                    >
                                        {SERVICES.map((item) => (
                                            <option key={item} value={item}>
                                                {item}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="manage-field">
                                    <label>New date</label>
                                    <div className="manage-month-controls">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setMonth(
                                                    new Date(
                                                        month.getFullYear(),
                                                        month.getMonth() - 1,
                                                        1
                                                    )
                                                )
                                            }
                                        >
                                            Previous
                                        </button>
                                        <strong>
                                            {month.toLocaleDateString("en-US", {
                                                month: "long",
                                                year: "numeric",
                                            })}
                                        </strong>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setMonth(
                                                    new Date(
                                                        month.getFullYear(),
                                                        month.getMonth() + 1,
                                                        1
                                                    )
                                                )
                                            }
                                        >
                                            Next
                                        </button>
                                    </div>

                                    <div className="manage-calendar">
                                        {[
                                            "Sun",
                                            "Mon",
                                            "Tue",
                                            "Wed",
                                            "Thu",
                                            "Fri",
                                            "Sat",
                                        ].map((name) => (
                                            <strong key={name}>{name}</strong>
                                        ))}

                                        {Array.from({ length: 42 }, (_, index) => {
                                            const first = new Date(
                                                month.getFullYear(),
                                                month.getMonth(),
                                                1
                                            );
                                            const day = new Date(first);
                                            day.setDate(1 - first.getDay() + index);

                                            const value = dateKey(day);
                                            const today = new Date();
                                            today.setHours(0, 0, 0, 0);

                                            const unavailable =
                                                day < today ||
                                                day.getMonth() !== month.getMonth() ||
                                                day.getDay() === 0;


                                            return (
                                                <button
                                                    key={value}
                                                    type="button"
                                                    disabled={unavailable}
                                                    className={value === date ? "selected" : ""}
                                                    onClick={() => {
                                                        setDate(value);
                                                        setTime("");
                                                    }}
                                                >
                                                    {day.getDate()}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="manage-field">
                                    <label htmlFor="new-duration">Appointment length</label>
                                    <select
                                        id="new-duration"
                                        value={duration}
                                        onChange={(event) => {
                                            setDuration(Number(event.target.value));
                                            setTime("");
                                        }}
                                    >
                                        <option value={30}>30 minutes</option>
                                        <option value={60}>1 hour</option>
                                    </select>
                                </div>

                                <div className="manage-field">
                                    <label htmlFor="new-visit-format">
                                        How would you like to meet?
                                    </label>
                                    <select
                                        id="new-visit-format"
                                        value={visitFormat}
                                        onChange={(event) =>
                                            setVisitFormat(event.target.value)
                                        }
                                    >
                                        <option value="">Select how you’ll meet</option>
                                        <option value="in_person">In person</option>
                                        <option value="phone">Over the phone</option>
                                        <option value="virtual">Virtual/online</option>
                                    </select>
                                </div>

                                <div className="manage-field">
                                    <label htmlFor="new-preparer">New preparer</label>
                                    <select
                                        id="new-preparer"
                                        value={preparer}
                                        onChange={(event) => {
                                            setPreparer(event.target.value);
                                            setTime("");
                                            setAvailableTimes([]);
                                        }}
                                    >
                                        {PREPARERS.map((name) => (
                                            <option key={name} value={name}>
                                                {name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="manage-field">
                                    <label htmlFor="new-time">New time</label>
                                    <select
                                        id="new-time"
                                        value={time}
                                        onChange={(event) => setTime(event.target.value)}
                                        disabled={loadingTimes}
                                    >
                                        <option value="">Choose a time</option>
                                        {availableTimes.map((slot) => (
                                            <option key={slot} value={slot}>
                                                {slot}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {loadingTimes && <p>Loading available times...</p>}

                                <div className="manage-actions">
                                    <button
                                        className="manage-save"
                                        type="button"
                                        disabled={
                                            saving ||
                                            loadingTimes ||
                                            !service ||
                                            !visitFormat ||
                                            !time ||
                                            !availableTimes.includes(time)
                                        }
                                        onClick={() => sendAction("reschedule")}
                                    >
                                        {saving ? "Saving..." : "Save Changes"}
                                    </button>

                                    <button
                                        className="manage-cancel"
                                        type="button"
                                        disabled={saving}
                                        onClick={() => sendAction("cancel")}
                                    >
                                        Cancel Appointment
                                    </button>
                                </div>
                            </section>
                        )}
                    </>
                )}
            </div>
        </main>
    );
}
