import { useEffect, useMemo, useState } from "react";

const serviceOptions = [
    "Tax Preparation",
    "Copy & Fax Services",
    "Notary Public",
    "Translation Services",
    "Immigration Services",
    "Insurance Services",
];

const preparerOptions = [
    "Pierre Polidor",
    "Dalia Pierre",
    "Severe Jacquet",
    "Jean P Cifrant",
    "Ricot Casimir",
];

const timeOptions = [];

for (let hour = 9; hour <= 17; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
        if (hour === 17 && minute > 0) break;

        const period = hour >= 12 ? "PM" : "AM";
        const displayHour = hour % 12 === 0 ? 12 : hour % 12;
        const displayMinute = minute.toString().padStart(2, "0");

        timeOptions.push(`${displayHour}:${displayMinute} ${period}`);
    }
}

function formatGoogleDate(dateString, timeString, durationMinutes = 60) {
    const [time, period] = timeString.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;

    const start = new Date(`${dateString}T00:00:00`);
    start.setHours(hours, minutes, 0, 0);

    const end = new Date(start.getTime() + durationMinutes * 60000);

    const format = date =>
        date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

    return `${format(start)}/${format(end)}`;
}
function getRealtyGoogleCalendarLink(appointment) {
    if (!appointment.appointment_date || !appointment.appointment_time) {
        return "#";
    }

    const dates = formatGoogleDate(
        appointment.appointment_date,
        appointment.appointment_time,
        60
    );

    const text = encodeURIComponent(
        `DPS Realty Appointment - ${appointment.first_name} ${appointment.last_name}`
    );

    const details = encodeURIComponent(
        `Service: ${appointment.service} Phone: ${appointment.phone} Email: ${appointment.email} Message: ${appointment.message || "None"}`
    );

    const location = encodeURIComponent(
        "DPS Realty, 1811 Springfield Ave, Maplewood, NJ 07040"
    );

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${dates}&details=${details}&location=${location}`;
}




function getGoogleCalendarLink(appointment) {
    const dates = formatGoogleDate(
        appointment.appointment_date,
        appointment.appointment_time,
        60
    );

    const text = encodeURIComponent(
        `DPS Tax Appointment - ${appointment.first_name} ${appointment.last_name}`
    );

    const details = encodeURIComponent(
        `Service: ${appointment.service}
Preparer: ${appointment.tax_preparer}
Phone: ${appointment.phone}
Email: ${appointment.email}
Message: ${appointment.message || "None"}`
    );

    const location = encodeURIComponent(
        "DPS Professional Tax Services, 1811 Springfield Ave, Maplewood, NJ 07040"
    );

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${dates}&details=${details}&location=${location}`;
}

function AdminAppointments() {
    const [appointments, setAppointments] = useState([]);
    const [realtyAppointments, setRealtyAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusMessage, setStatusMessage] = useState("");
    const [statusType, setStatusType] = useState("success");
    const [filter, setFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");

    const [adminPassword, setAdminPassword] = useState("");
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [loginError, setLoginError] = useState("");

    const [editingId, setEditingId] = useState(null);
    const [editBookedTimes, setEditBookedTimes] = useState([]);

    const [editForm, setEditForm] = useState({
        first_name: "",
        last_name: "",
        phone: "",
        email: "",
        service: "",
        tax_preparer: "",
        appointment_date: "",
        appointment_time: "",
        message: "",
        status: "booked",
    });
    const [editingRealtyId, setEditingRealtyId] = useState(null);
    const [editRealtyForm, setEditRealtyForm] = useState({
        first_name: "",
        last_name: "",
        phone: "",
        email: "",
        service: "",
        appointment_date: "",
        appointment_time: "",
        message: "",
        status: "pending",
    });



    async function fetchAppointments() {
        try {
            const [taxResponse, realtyResponse] = await Promise.all([
                fetch(`${import.meta.env.VITE_API_URL}/api/appointments`),
                fetch(`${import.meta.env.VITE_API_URL}/api/realty-appointments`),
            ]);

            const taxData = await taxResponse.json();
            const realtyData = await realtyResponse.json();

            setAppointments(taxData);
            setRealtyAppointments(realtyData);
        } catch (error) {
            console.error("Error fetching appointments:", error);
            setStatusMessage("Could not load appointments.");
            setStatusType("error");
        } finally {
            setLoading(false);
        }
    }

    async function handleRefresh() {
        await fetchAppointments();
        setStatusMessage("Appointments refreshed.");
        setStatusType("success");
    }

    async function handleCancel(id) {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/appointments/${id}/cancel`,
                { method: "PATCH" }
            );

            const data = await response.json();

            if (response.ok) {
                setStatusMessage("Appointment cancelled successfully.");
                setStatusType("success");
                fetchAppointments();
            } else {
                setStatusMessage(data.message || "Could not cancel appointment.");
                setStatusType("error");
            }
        } catch (error) {
            setStatusMessage("Server error while cancelling appointment.");
            setStatusType("error");
        }
    }

    async function handleArchive(id) {
        const confirmed = window.confirm(
            "Are you sure you want to archive this appointment? Contact information will be kept."
        );

        if (!confirmed) return;

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/appointments/${id}/archive`,
                { method: "PATCH" }
            );

            const data = await response.json();

            if (response.ok) {
                setStatusMessage("Appointment archived successfully.");
                setStatusType("success");
                fetchAppointments();
            } else {
                setStatusMessage(data.message || "Could not archive appointment.");
                setStatusType("error");
            }
        } catch (error) {
            setStatusMessage("Server error while archiving appointment.");
            setStatusType("error");
        }
    }

    async function handleDelete(id) {
        const confirmed = window.confirm(
            "Are you sure you want to permanently delete this appointment?"
        );

        if (!confirmed) return;

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/appointments/${id}`,
                { method: "DELETE" }
            );

            const data = await response.json();

            if (response.ok) {
                setStatusMessage("Appointment deleted successfully.");
                setStatusType("success");
                fetchAppointments();
            } else {
                setStatusMessage(data.message || "Could not delete appointment.");
                setStatusType("error");
            }
        } catch (error) {
            setStatusMessage("Server error while deleting appointment.");
            setStatusType("error");
        }
    }

    async function handleRealtyConfirm(id) {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/realty-appointments/${id}/confirm`,
                { method: "PATCH" }
            );

            const data = await response.json();

            if (response.ok) {
                setStatusMessage("Realty request confirmed successfully.");
                setStatusType("success");
                fetchAppointments();
            } else {
                setStatusMessage(data.message || "Could not confirm realty request.");
                setStatusType("error");
            }
        } catch (error) {
            setStatusMessage("Server error while confirming realty request.");
            setStatusType("error");
        }
    }

    async function handleRealtyCancel(id) {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/realty-appointments/${id}/cancel`,
                { method: "PATCH" }
            );

            const data = await response.json();

            if (response.ok) {
                setStatusMessage("Realty request cancelled successfully.");
                setStatusType("success");
                fetchAppointments();
            } else {
                setStatusMessage(data.message || "Could not cancel realty request.");
                setStatusType("error");
            }
        } catch (error) {
            setStatusMessage("Server error while cancelling realty request.");
            setStatusType("error");
        }
    }

    async function handleRealtyArchive(id) {
        const confirmed = window.confirm(
            "Are you sure you want to archive this realty request?"
        );

        if (!confirmed) return;

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/realty-appointments/${id}/archive`,
                { method: "PATCH" }
            );

            const data = await response.json();

            if (response.ok) {
                setStatusMessage("Realty request archived successfully.");
                setStatusType("success");
                fetchAppointments();
            } else {
                setStatusMessage(data.message || "Could not archive realty request.");
                setStatusType("error");
            }
        } catch (error) {
            setStatusMessage("Server error while archiving realty request.");
            setStatusType("error");
        }
    }

    async function handleRealtyDelete(id) {
        const confirmed = window.confirm(
            "Are you sure you want to permanently delete this realty request?"
        );

        if (!confirmed) return;

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/realty-appointments/${id}`,
                { method: "DELETE" }
            );

            const data = await response.json();

            if (response.ok) {
                setStatusMessage("Realty request deleted successfully.");
                setStatusType("success");
                fetchAppointments();
            } else {
                setStatusMessage(data.message || "Could not delete realty request.");
                setStatusType("error");
            }
        } catch (error) {
            setStatusMessage("Server error while deleting realty request.");
            setStatusType("error");
        }
    }

    function handleLogin(e) {
        e.preventDefault();

        if (adminPassword === import.meta.env.VITE_ADMIN_PASSWORD) {
            setIsAuthorized(true);
            setLoginError("");
            setStatusMessage("");
        } else {
            setLoginError("Incorrect password.");
        }
    }

    function handleLogout() {
        setIsAuthorized(false);
        setAdminPassword("");
        setLoginError("");
        setStatusMessage("");
        setEditingId(null);
        setEditBookedTimes([]);
    }

    function startEdit(appointment) {
        setEditingId(appointment.id);
        setEditForm({
            first_name: appointment.first_name || "",
            last_name: appointment.last_name || "",
            phone: appointment.phone || "",
            email: appointment.email || "",
            service: appointment.service || "",
            tax_preparer: appointment.tax_preparer || "",
            appointment_date: appointment.appointment_date || "",
            appointment_time: appointment.appointment_time || "",
            message: appointment.message || "",
            status: appointment.status || "booked",
        });
    }

    function cancelEdit() {
        setEditingId(null);
        setEditBookedTimes([]);
    }

    function handleEditChange(e) {
        const { name, value } = e.target;

        setEditForm(prev => ({
            ...prev,
            [name]: value,
        }));
    }

    async function handleUpdate(id) {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/appointments/${id}`,
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(editForm),
                }
            );

            const data = await response.json();

            if (response.ok) {
                setStatusMessage("Appointment updated successfully.");
                setStatusType("success");
                setEditingId(null);
                setEditBookedTimes([]);
                fetchAppointments();
            } else {
                setStatusMessage(data.message || "Could not update appointment.");
                setStatusType("error");
            }
        } catch (error) {
            setStatusMessage("Server error while updating appointment.");
            setStatusType("error");
        }
    }

    useEffect(() => {
        if (isAuthorized) {
            fetchAppointments();
        }
    }, [isAuthorized]);

    useEffect(() => {
        async function fetchEditAvailability() {
            if (!editingId || !editForm.appointment_date || !editForm.tax_preparer) {
                setEditBookedTimes([]);
                return;
            }

            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/appointments/availability?date=${encodeURIComponent(
                        editForm.appointment_date
                    )}&preparer=${encodeURIComponent(editForm.tax_preparer)}`
                );

                const data = await response.json();
                setEditBookedTimes(data.bookedTimes || []);
            } catch (error) {
                console.error("Error fetching edit availability:", error);
                setEditBookedTimes([]);
            }
        }

        fetchEditAvailability();
    }, [editingId, editForm.appointment_date, editForm.tax_preparer]);

    const filteredAppointments = useMemo(() => {
        return appointments
            .filter(appointment => {
                if (filter === "all") return true;
                return appointment.status === filter;
            })
            .filter(appointment => {
                const fullName =
                    `${appointment.first_name} ${appointment.last_name}`.toLowerCase();

                const searchableText = `
          ${fullName}
          ${appointment.email}
          ${appointment.phone}
          ${appointment.tax_preparer}
          ${appointment.service}
          ${appointment.appointment_date}
          ${appointment.appointment_time}
          ${appointment.status}
        `.toLowerCase();

                return searchableText.includes(searchTerm.toLowerCase());
            });
    }, [appointments, filter, searchTerm]);

    const filteredRealtyAppointments = useMemo(() => {
        return realtyAppointments.filter(appointment => {
            const fullName =
                `${appointment.first_name} ${appointment.last_name}`.toLowerCase();

            const searchableText = `
      ${fullName}
      ${appointment.email}
      ${appointment.phone}
      ${appointment.service}
      ${appointment.appointment_date}
      ${appointment.appointment_time}
      ${appointment.status}
    `.toLowerCase();

            return searchableText.includes(searchTerm.toLowerCase());
        });
    }, [realtyAppointments, searchTerm]);


    const availableEditTimes = timeOptions.filter(time => {
        if (time === editForm.appointment_time) return true;
        return !editBookedTimes.includes(time);
    });
    const archivedAppointments = appointments
        .filter(appointment => appointment.status === "archived")
        .map(appointment => ({
            name: `${appointment.first_name} ${appointment.last_name}`,
            email: appointment.email,
            phone: appointment.phone,
        }));

    function startRealtyEdit(appointment) {
        setEditingRealtyId(appointment.id);
        setEditRealtyForm({
            first_name: appointment.first_name || "",
            last_name: appointment.last_name || "",
            phone: appointment.phone || "",
            email: appointment.email || "",
            service: appointment.service || "",
            appointment_date: appointment.appointment_date || "",
            appointment_time: appointment.appointment_time || "",
            message: appointment.message || "",
            status: appointment.status || "pending",
        });
    }

    function cancelRealtyEdit() {
        setEditingRealtyId(null);
    }

    function handleRealtyEditChange(e) {
        const { name, value } = e.target;
        setEditRealtyForm(prev => ({ ...prev, [name]: value }));
    }

    async function handleRealtyUpdate(id) {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/realty-appointments/${id}`,
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(editRealtyForm),
                }
            );

            const data = await response.json();

            if (response.ok) {
                setStatusMessage("Realty appointment updated successfully.");
                setStatusType("success");
                setEditingRealtyId(null);
                fetchAppointments();
            } else {
                setStatusMessage(data.message || "Could not update realty appointment.");
                setStatusType("error");
            }
        } catch (error) {
            setStatusMessage("Server error while updating realty appointment.");
            setStatusType("error");
        }
    }


    function exportArchivedJson() {
        const dataStr = JSON.stringify(archivedAppointments, null, 2);
        const blob = new Blob([dataStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "archived-appointments.json";
        a.click();
        URL.revokeObjectURL(url);
    }

    function exportArchivedCsv() {
        const headers = ["name", "email", "phone"];


        const rows = archivedAppointments.map(a =>
            headers.map(header =>
                `"${(a[header] || "").toString().replace(/"/g, '""')}"`
            ).join(",")
        );

        const csv = [headers.join(","), ...rows].join("\n");
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "archived-appointments.csv";
        link.click();
        URL.revokeObjectURL(url);
    }


    function formatDate(dateString) {
        if (!dateString) return "Not provided";

        const date = new Date(`${dateString}T00:00:00`);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    }

    if (!isAuthorized) {
        return (
            <section className="section">
                <div className="container" style={{ maxWidth: "500px" }}>
                    <p className="eyebrow">Admin Access</p>
                    <h2 className="h2-sub">Enter Password</h2>

                    <form className="contact-form" onSubmit={handleLogin}>
                        <input
                            type="password"
                            placeholder="Enter admin password"
                            value={adminPassword}
                            onChange={e => setAdminPassword(e.target.value)}
                            required
                        />

                        <button type="submit" className="btn">
                            Enter Admin
                        </button>

                        {loginError && (
                            <p className="form-status error">{loginError}</p>
                        )}
                    </form>
                </div>
            </section>
        );
    }

    if (loading) {
        return (
            <section className="section">
                <div className="container">
                    <p>Loading appointments...</p>
                </div>
            </section>
        );
    }

    return (
        <section className="section">
            <div className="container">
                <p className="eyebrow">Admin</p>
                <h2 className="h2-sub">Manage Appointments</h2>

                <div
                    style={{
                        display: "flex",
                        gap: "1rem",
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "1rem",
                    }}
                >
                    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                        <div>
                            <label htmlFor="status-filter" style={{ marginRight: "0.5rem" }}>
                                Filter tax by status:
                            </label>
                            <select
                                id="status-filter"
                                value={filter}
                                onChange={e => setFilter(e.target.value)}
                            >
                                <option value="all">All</option>
                                <option value="booked">Booked</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="cancelled">Cancelled</option>
                                <option value="archived">Archived</option>
                            </select>
                        </div>

                        <input
                            type="text"
                            placeholder="Search by name, email, date, service..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            style={{
                                padding: "0.7rem 0.9rem",
                                border: "1px solid #dfe8e4",
                                borderRadius: "10px",
                                minWidth: "260px",
                            }}
                        />
                    </div>

                    <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                        <button className="btn" type="button" onClick={handleRefresh}>
                            Refresh Appointments
                        </button>

                        <button className="btn" type="button" onClick={exportArchivedJson}>
                            Export Archived JSON
                        </button>

                        <button className="btn" type="button" onClick={exportArchivedCsv}>
                            Export Archived CSV
                        </button>

                        <button className="btn" type="button" onClick={handleLogout}>
                            Logout
                        </button>

                    </div>
                </div>

                {statusMessage && (
                    <p className={`form-status ${statusType}`}>{statusMessage}</p>
                )}

                <div style={{ marginBottom: "2rem" }}>
                    <p className="eyebrow">Tax Appointments</p>
                    <div className="card-grid">
                        {filteredAppointments.length === 0 ? (
                            <p>No tax appointments found.</p>
                        ) : (
                            filteredAppointments.map(appointment => (
                                <div className="card" key={appointment.id}>
                                    {editingId === appointment.id ? (
                                        <>
                                            <h3>Edit Appointment</h3>

                                            <input
                                                type="text"
                                                name="first_name"
                                                value={editForm.first_name}
                                                onChange={handleEditChange}
                                                placeholder="First Name"
                                            />
                                            <input
                                                type="text"
                                                name="last_name"
                                                value={editForm.last_name}
                                                onChange={handleEditChange}
                                                placeholder="Last Name"
                                            />
                                            <input
                                                type="text"
                                                name="phone"
                                                value={editForm.phone}
                                                onChange={handleEditChange}
                                                placeholder="Phone"
                                            />
                                            <input
                                                type="email"
                                                name="email"
                                                value={editForm.email}
                                                onChange={handleEditChange}
                                                placeholder="Email"
                                            />

                                            <select
                                                name="service"
                                                value={editForm.service}
                                                onChange={handleEditChange}
                                            >
                                                <option value="">Select Service</option>
                                                {serviceOptions.map(service => (
                                                    <option key={service} value={service}>
                                                        {service}
                                                    </option>
                                                ))}
                                            </select>

                                            <select
                                                name="tax_preparer"
                                                value={editForm.tax_preparer}
                                                onChange={handleEditChange}
                                            >
                                                <option value="">Select Preparer</option>
                                                {preparerOptions.map(preparer => (
                                                    <option key={preparer} value={preparer}>
                                                        {preparer}
                                                    </option>
                                                ))}
                                            </select>

                                            <input
                                                type="date"
                                                name="appointment_date"
                                                value={editForm.appointment_date}
                                                onChange={handleEditChange}
                                            />

                                            <select
                                                name="appointment_time"
                                                value={editForm.appointment_time}
                                                onChange={handleEditChange}

                                            >
                                                <option value="">Select Time</option>
                                                {timeOptions.map(time => (
                                                    <option key={time} value={time}>
                                                        {time}
                                                    </option>
                                                ))}
                                            </select>


                                            <textarea
                                                name="message"
                                                value={editForm.message}
                                                onChange={handleEditChange}
                                                placeholder="Message"
                                            />

                                            <select
                                                name="status"
                                                value={editForm.status}
                                                onChange={handleEditChange}
                                            >
                                                <option value="booked">Booked</option>
                                                <option value="confirmed">Confirmed</option>
                                                <option value="cancelled">Cancelled</option>
                                                <option value="archived">Archived</option>
                                            </select>

                                            <div
                                                style={{
                                                    display: "flex",
                                                    gap: "0.75rem",
                                                    marginTop: "1rem",
                                                    flexWrap: "wrap",
                                                }}
                                            >
                                                <button
                                                    className="btn"
                                                    type="button"
                                                    onClick={() => handleUpdate(appointment.id)}
                                                >
                                                    Save Changes
                                                </button>
                                                <button
                                                    className="btn"
                                                    type="button"
                                                    onClick={cancelEdit}
                                                >
                                                    Cancel Edit
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <h3>
                                                {appointment.first_name} {appointment.last_name}
                                            </h3>

                                            <p><strong>Service:</strong> {appointment.service}</p>
                                            <p><strong>Preparer:</strong> {appointment.tax_preparer}</p>
                                            <p><strong>Date:</strong> {formatDate(appointment.appointment_date)}</p>
                                            <p><strong>Time:</strong> {appointment.appointment_time}</p>
                                            <p><strong>Phone:</strong> {appointment.phone}</p>
                                            <p><strong>Email:</strong> {appointment.email}</p>
                                            <p><strong>Message:</strong> {appointment.message || "None"}</p>
                                            <p>
                                                <strong>Status:</strong>{" "}
                                                <span
                                                    style={{
                                                        color:
                                                            appointment.status === "booked"
                                                                ? "#1d7e75"
                                                                : appointment.status === "confirmed"
                                                                    ? "#0f5c54"
                                                                    : appointment.status === "archived"
                                                                        ? "#6f42a8"
                                                                        : "#a12626",
                                                        fontWeight: "700",
                                                        textTransform: "capitalize",
                                                    }}
                                                >
                                                    {appointment.status}
                                                </span>
                                            </p>

                                            <div
                                                style={{
                                                    display: "flex",
                                                    gap: "0.75rem",
                                                    marginTop: "1rem",
                                                    flexWrap: "wrap",
                                                }}
                                            >
                                                <button
                                                    className="btn"
                                                    type="button"
                                                    onClick={() => startEdit(appointment)}
                                                >
                                                    Edit Appointment
                                                </button>

                                                {appointment.status === "booked" && (
                                                    <button
                                                        className="btn"
                                                        type="button"
                                                        onClick={() => handleCancel(appointment.id)}
                                                    >
                                                        Cancel Appointment
                                                    </button>
                                                )}

                                                {appointment.status !== "archived" && (
                                                    <button
                                                        className="btn"
                                                        type="button"
                                                        onClick={() => handleArchive(appointment.id)}
                                                    >
                                                        Archive Appointment
                                                    </button>
                                                )}

                                                <button
                                                    className="btn"
                                                    type="button"
                                                    onClick={() => handleDelete(appointment.id)}
                                                >
                                                    Delete Appointment
                                                </button>
                                                {appointment.appointment_date && appointment.appointment_time && (
                                                    <a
                                                        className="btn"
                                                        href={getGoogleCalendarLink(appointment)}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        Add to Google Calendar
                                                    </a>
                                                )}


                                            </div>
                                        </>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div>
                    <p className="eyebrow">Realty Appointments</p>
                    <div className="card-grid">
                        {filteredRealtyAppointments.length === 0 ? (
                            <p>No realty appointments found.</p>
                        ) : (
                            filteredRealtyAppointments.map(appointment => (
                                <div className="card" key={`realty-${appointment.id}`}>
                                    {editingRealtyId === appointment.id ? (
                                        <>
                                            <h3>Edit Realty Appointment</h3>

                                            <input
                                                type="text"
                                                name="first_name"
                                                value={editRealtyForm.first_name}
                                                onChange={handleRealtyEditChange}
                                                placeholder="First Name"
                                            />

                                            <input
                                                type="text"
                                                name="last_name"
                                                value={editRealtyForm.last_name}
                                                onChange={handleRealtyEditChange}
                                                placeholder="Last Name"
                                            />

                                            <input
                                                type="text"
                                                name="phone"
                                                value={editRealtyForm.phone}
                                                onChange={handleRealtyEditChange}
                                                placeholder="Phone"
                                            />

                                            <input
                                                type="email"
                                                name="email"
                                                value={editRealtyForm.email}
                                                onChange={handleRealtyEditChange}
                                                placeholder="Email"
                                            />

                                            <select
                                                name="service"
                                                value={editRealtyForm.service}
                                                onChange={handleRealtyEditChange}
                                            >
                                                <option value="">Select Service</option>
                                                <option value="Buying">Buying</option>
                                                <option value="Selling">Selling</option>
                                                <option value="Renting">Renting</option>
                                                <option value="Consultation">Consultation</option>
                                            </select>

                                            <input
                                                type="date"
                                                name="appointment_date"
                                                value={editRealtyForm.appointment_date}
                                                onChange={handleRealtyEditChange}
                                            />

                                            <select
                                                name="appointment_time"
                                                value={editRealtyForm.appointment_time}
                                                onChange={handleRealtyEditChange}
                                            >
                                                <option value="">Select Time</option>
                                                {timeOptions.map(time => (
                                                    <option key={time} value={time}>
                                                        {time}
                                                    </option>
                                                ))}
                                            </select>

                                            <textarea
                                                name="message"
                                                value={editRealtyForm.message}
                                                onChange={handleRealtyEditChange}
                                                placeholder="Message"
                                            />

                                            <select
                                                name="status"
                                                value={editRealtyForm.status}
                                                onChange={handleRealtyEditChange}
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="confirmed">Confirmed</option>
                                                <option value="cancelled">Cancelled</option>
                                                <option value="archived">Archived</option>
                                            </select>

                                            <div
                                                style={{
                                                    display: "flex",
                                                    gap: "0.75rem",
                                                    marginTop: "1rem",
                                                    flexWrap: "wrap",
                                                }}
                                            >
                                                <button
                                                    className="btn"
                                                    type="button"
                                                    onClick={() => handleRealtyUpdate(appointment.id)}
                                                >
                                                    Save Changes
                                                </button>

                                                <button
                                                    className="btn"
                                                    type="button"
                                                    onClick={cancelRealtyEdit}
                                                >
                                                    Cancel Edit
                                                </button>
                                            </div>
                                        </>

                                    ) : (
                                        <>
                                            <h3>
                                                {appointment.first_name} {appointment.last_name}
                                            </h3>

                                            <p><strong>Service:</strong> {appointment.service}</p>
                                            <p><strong>Date:</strong> {formatDate(appointment.appointment_date)}</p>
                                            <p><strong>Phone:</strong> {appointment.phone}</p>
                                            <p><strong>Email:</strong> {appointment.email}</p>
                                            <p><strong>Message:</strong> {appointment.message || "None"}</p>
                                            <p><strong>Time:</strong> {appointment.appointment_time}</p>


                                            <p>
                                                <strong>Status:</strong>{" "}
                                                <span
                                                    style={{
                                                        color:
                                                            appointment.status === "pending"
                                                                ? "#7a5a14"
                                                                : appointment.status === "confirmed"
                                                                    ? "#1d7e75"
                                                                    : appointment.status === "archived"
                                                                        ? "#6f42a8"
                                                                        : "#a12626",
                                                        fontWeight: "700",
                                                        textTransform: "capitalize",
                                                    }}
                                                >
                                                    {appointment.status}
                                                </span>
                                            </p>

                                            <div
                                                style={{
                                                    display: "flex",
                                                    gap: "0.75rem",
                                                    marginTop: "1rem",
                                                    flexWrap: "wrap",
                                                }}
                                            >
                                                <button
                                                    className="btn"
                                                    type="button"
                                                    onClick={() => startRealtyEdit(appointment)}
                                                >
                                                    Edit Realty
                                                </button>

                                                {appointment.status !== "confirmed" && (
                                                    <button
                                                        className="btn"
                                                        type="button"
                                                        onClick={() => handleRealtyConfirm(appointment.id)}
                                                    >
                                                        Confirm Realty
                                                    </button>
                                                )}

                                                {appointment.status !== "cancelled" && (
                                                    <button
                                                        className="btn"
                                                        type="button"
                                                        onClick={() => handleRealtyCancel(appointment.id)}
                                                    >
                                                        Cancel Realty
                                                    </button>
                                                )}

                                                {appointment.status !== "archived" && (
                                                    <button
                                                        className="btn"
                                                        type="button"
                                                        onClick={() => handleRealtyArchive(appointment.id)}
                                                    >
                                                        Archive Realty
                                                    </button>
                                                )}

                                                <button
                                                    className="btn"
                                                    type="button"
                                                    onClick={() => handleRealtyDelete(appointment.id)}
                                                >
                                                    Delete Realty
                                                </button>

                                                <a
                                                    className="btn"
                                                    href={getRealtyGoogleCalendarLink(appointment)}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    Add to Google Calendar
                                                </a>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))

                        )}

                    </div>
                </div>
            </div>
        </section>
    );
}

export default AdminAppointments;







