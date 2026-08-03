import { useEffect, useMemo, useState } from "react";
import {
  preparerOptions,
  serviceOptions,
  timeOptions,
} from "./adminConstants";
import {
  formatDate,
  getGoogleCalendarLink,
  getRealtyGoogleCalendarLink,
} from "./adminUtils";
import AdminLogin from "./AdminLogin";
import AdminToolbar from "./AdminToolbar";
import TaxAppointmentCard from "./TaxAppointmentCard";
import RealtyAppointmentCard from "./RealtyAppointmentCard";

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
        setEditingRealtyId(null);
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
                    headers: {
                        "Content-Type": "application/json",
                    },
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

        setEditRealtyForm(prev => ({
            ...prev,
            [name]: value,
        }));
    }

    async function handleRealtyUpdate(id) {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/realty-appointments/${id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
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

    const archivedAppointments = appointments
        .filter(appointment => appointment.status === "archived")
        .map(appointment => ({
            name: `${appointment.first_name} ${appointment.last_name}`,
            email: appointment.email,
            phone: appointment.phone,
        }));

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

        const rows = archivedAppointments.map(appointment =>
            headers
                .map(
                    header =>
                        `"${(appointment[header] || "")
                            .toString()
                            .replace(/"/g, '""')}"`
                )
                .join(",")
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

    if (!isAuthorized) {
        return (
            <AdminLogin
                adminPassword={adminPassword}
                setAdminPassword={setAdminPassword}
                handleLogin={handleLogin}
                loginError={loginError}
            />
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

                <AdminToolbar
                    filter={filter}
                    setFilter={setFilter}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    handleRefresh={handleRefresh}
                    exportArchivedJson={exportArchivedJson}
                    exportArchivedCsv={exportArchivedCsv}
                    handleLogout={handleLogout}
                />

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
                                <TaxAppointmentCard
                                    key={appointment.id}
                                    appointment={appointment}
                                    editingId={editingId}
                                    editForm={editForm}
                                    handleEditChange={handleEditChange}
                                    handleUpdate={handleUpdate}
                                    cancelEdit={cancelEdit}
                                    startEdit={startEdit}
                                    handleCancel={handleCancel}
                                    handleArchive={handleArchive}
                                    handleDelete={handleDelete}
                                    getGoogleCalendarLink={getGoogleCalendarLink}
                                    formatDate={formatDate}
                                    serviceOptions={serviceOptions}
                                    preparerOptions={preparerOptions}
                                    timeOptions={availableEditTimes}
                                />
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
                                <RealtyAppointmentCard
                                    key={`realty-${appointment.id}`}
                                    appointment={appointment}
                                    editingRealtyId={editingRealtyId}
                                    editRealtyForm={editRealtyForm}
                                    handleRealtyEditChange={handleRealtyEditChange}
                                    handleRealtyUpdate={handleRealtyUpdate}
                                    cancelRealtyEdit={cancelRealtyEdit}
                                    startRealtyEdit={startRealtyEdit}
                                    handleRealtyConfirm={handleRealtyConfirm}
                                    handleRealtyCancel={handleRealtyCancel}
                                    handleRealtyArchive={handleRealtyArchive}
                                    handleRealtyDelete={handleRealtyDelete}
                                    getRealtyGoogleCalendarLink={getRealtyGoogleCalendarLink}
                                    formatDate={formatDate}
                                    timeOptions={timeOptions}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AdminAppointments;
