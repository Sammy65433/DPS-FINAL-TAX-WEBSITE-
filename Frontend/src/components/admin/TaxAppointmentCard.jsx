function TaxAppointmentCard({
    appointment,
    editingId,
    editForm,
    handleEditChange,
    handleUpdate,
    cancelEdit,
    startEdit,
    handleCancel,
    handleArchive,
    handleDelete,
    getGoogleCalendarLink,
    formatDate,
    serviceOptions,
    preparerOptions,
    timeOptions,
}) {
    const isEditing = editingId === appointment.id;

    return (
        <div className="card">
            {isEditing ? (
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
                        {serviceOptions.map((service) => (
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
                        {preparerOptions.map((preparer) => (
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
                        {timeOptions.map((time) => (
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

                    <div className="admin-card-actions">
                        <button
                            className="btn"
                            type="button"
                            onClick={() => handleUpdate(appointment.id)}
                        >
                            Save Changes
                        </button>

                        <button className="btn" type="button" onClick={cancelEdit}>
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
                        <strong>Preparer:</strong> {appointment.tax_preparer}
                    </p>

                    <p>
                        <strong>Date:</strong> {formatDate(appointment.appointment_date)}
                    </p>

                    <p>
                        <strong>Time:</strong> {appointment.appointment_time}
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

                    <div className="admin-card-actions">
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
                                className="btn admin-wide-action"
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
    );
}

export default TaxAppointmentCard;
