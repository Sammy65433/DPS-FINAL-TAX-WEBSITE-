function RealtyAppointmentCard({
    appointment,
    editingRealtyId,
    editRealtyForm,
    handleRealtyEditChange,
    handleRealtyUpdate,
    cancelRealtyEdit,
    startRealtyEdit,
    handleRealtyConfirm,
    handleRealtyCancel,
    handleRealtyArchive,
    handleRealtyDelete,
    getRealtyGoogleCalendarLink,
    formatDate,
    timeOptions,
}) {
    const isEditing = editingRealtyId === appointment.id;

    return (
        <div className="card">
            {isEditing ? (
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

                        <button className="btn" type="button" onClick={cancelRealtyEdit}>
                            Cancel Edit
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <h3>
                        {appointment.first_name} {appointment.last_name}
                    </h3>

                    <p>
                        <strong>Service:</strong> {appointment.service}
                    </p>

                    <p>
                        <strong>Date:</strong> {formatDate(appointment.appointment_date)}
                    </p>

                    <p>
                        <strong>Phone:</strong> {appointment.phone}
                    </p>

                    <p>
                        <strong>Email:</strong> {appointment.email}
                    </p>

                    <p>
                        <strong>Message:</strong> {appointment.message || "None"}
                    </p>

                    <p>
                        <strong>Time:</strong> {appointment.appointment_time}
                    </p>

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
    );
}

export default RealtyAppointmentCard;
