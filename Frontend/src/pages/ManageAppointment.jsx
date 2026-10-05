import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const PREPARERS = [
    "Pierre Polidor",
    "Dalia Pierre",
    "Severe Jacquet",
    "Jean P Cifrant",
    "Ricot Casimir",
];

export default function ManageAppointment() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const [appointment, setAppointment] = useState(null);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [preparer, setPreparer] = useState("");
    const [availableTimes, setAvailableTimes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingTimes, setLoadingTimes] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!token || !API_URL) {
            setError("This appointment link is missing or unavailable.");
            setLoading(false);
            return;
        }

        const controller = new AbortController();

        async function loadAppointment() {
            try {
                const response = await fetch(
                    `${API_URL}/api/appointments/manage?token=${encodeURIComponent(token)}`,
                    { signal: controller.signal }
                );
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "This link is invalid or expired.");
                }

                setAppointment(data.appointment);
                setDate(data.appointment.appointment_date);
                setTime(data.appointment.appointment_time);
                setPreparer(data.appointment.tax_preparer);
            } catch (err) {
                if (err.name !== "AbortError") setError(err.message);
            } finally {
                if (!controller.signal.aborted) setLoading(false);
            }
        }

        loadAppointment();
        return () => controller.abort();
    }, [token]);

    useEffect(() => {
        if (!token || !date || !preparer || !appointment ||
            !["booked", "confirmed"].includes(appointment.status)) {
            setAvailableTimes([]);
            return;
        }

        const controller = new AbortController();

        async function loadTimes() {
            setLoadingTimes(true);
            setAvailableTimes([]);

            try {
                const params = new URLSearchParams({ token, date, preparer });
                const response = await fetch(
                    `${API_URL}/api/appointments/manage/availability?${params}`,
                    { signal: controller.signal }
                );
                const data = await response.json();

                if (!response.ok || !Array.isArray(data.availableTimes)) {
                    throw new Error(data.message || "Could not load available times.");
                }

                if (!controller.signal.aborted) {
                    setAvailableTimes(data.availableTimes);
                }
            } catch (err) {
                if (err.name !== "AbortError") setError(err.message);
            } finally {
                if (!controller.signal.aborted) setLoadingTimes(false);
            }
        }

        loadTimes();
        return () => controller.abort();
    }, [token, date, preparer, appointment?.status]);

    async function sendAction(action) {
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
                                appointment_date: date,
                                appointment_time: time,
                                tax_preparer: preparer,
                            }
                            : { token }
                    ),
                }
            );

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Could not update appointment.");
            }

            setAppointment(data.appointment);
            setDate(data.appointment.appointment_date);
            setTime(data.appointment.appointment_time);
            setPreparer(data.appointment.tax_preparer);
            setMessage(
                action === "cancel"
                    ? "Appointment cancelled."
                    : "Appointment rescheduled."
            );
        } catch (err) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    }

    if (loading) return <main><p>Loading appointment...</p></main>;

    return (
        <main className="container" style={{ padding: "40px 16px" }}>
            <h1>Manage My Appointment</h1>
            {error && <p role="alert">{error}</p>}
            {message && <p role="status">{message}</p>}

            {appointment && (
                <>
                    <p><strong>Service:</strong> {appointment.service}</p>
                    <p><strong>Preparer:</strong> {appointment.tax_preparer}</p>
                    <p><strong>Date:</strong> {appointment.appointment_date}</p>
                    <p><strong>Time:</strong> {appointment.appointment_time}</p>
                    <p><strong>Length:</strong> {appointment.duration_minutes} minutes</p>
                    <p><strong>Status:</strong> {appointment.status}</p>

                    {["booked", "confirmed"].includes(appointment.status) && (
                        <section>
                            <h2>Reschedule</h2>

                            <label htmlFor="new-date">New date</label>
                            <input
                                id="new-date"
                                type="date"
                                value={date}
                                onChange={(event) => {
                                    setDate(event.target.value);
                                    setTime("");
                                }}
                            />

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
                                    <option key={name} value={name}>{name}</option>
                                ))}
                            </select>

                            <label htmlFor="new-time">New time</label>
                            <select
                                id="new-time"
                                value={time}
                                onChange={(event) => setTime(event.target.value)}
                            >
                                <option value="">Choose a time</option>
                                {availableTimes.map((slot) => (
                                    <option key={slot} value={slot}>{slot}</option>
                                ))}
                            </select>

                            {loadingTimes && <p>Loading available times...</p>}

                            <button
                                type="button"
                                disabled={
                                    saving || loadingTimes || !time ||
                                    !availableTimes.includes(time)
                                }
                                onClick={() => sendAction("reschedule")}
                            >
                                Save New Time
                            </button>

                            <button
                                type="button"
                                disabled={saving}
                                onClick={() => sendAction("cancel")}
                            >
                                Cancel Appointment
                            </button>
                        </section>
                    )}
                </>
            )}
        </main>
    );
}
