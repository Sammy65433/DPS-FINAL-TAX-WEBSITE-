export function formatGoogleDate(dateString, timeString, durationMinutes = 60) {
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

export function getGoogleCalendarLink(appointment) {
    const dates = formatGoogleDate(
        appointment.appointment_date,
        appointment.appointment_time,
        60
    );

    const text = encodeURIComponent(
        `DPS Tax Appointment - ${appointment.first_name} ${appointment.last_name}`
    );

    const details = encodeURIComponent(
        `Service: ${appointment.service} Preparer: ${appointment.tax_preparer} Phone: ${appointment.phone} Email: ${appointment.email} Message: ${appointment.message || "None"}`
    );

    const location = encodeURIComponent(
        "DPS Professional Tax Services, 1811 Springfield Ave, Maplewood, NJ 07040"
    );

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${dates}&details=${details}&location=${location}`;
}

export function getRealtyGoogleCalendarLink(appointment) {
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

export function formatDate(dateString) {
    if (!dateString) return "Not provided";

    const date = new Date(`${dateString}T00:00:00`);

    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}
