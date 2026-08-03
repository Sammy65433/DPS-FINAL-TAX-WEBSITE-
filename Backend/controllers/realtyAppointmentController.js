import {
    archiveRealtyAppointmentService,
    cancelRealtyAppointmentService,
    confirmRealtyAppointmentService,
    createRealtyAppointmentService,
    deleteRealtyAppointmentService,
    getRealtyAppointmentByIdService,
    getRealtyAppointmentsService,
    updateRealtyAppointmentService,
} from "../services/realtyAppointmentService.js";

import {
    sendRealtyAppointmentRequestEmail,
    sendRealtyOfficeNotificationEmail,
    sendRealtyUpdateEmail,
} from "../services/emailService.js";

export async function getRealtyAppointments(req, res) {
    try {
        const { data, error } = await getRealtyAppointmentsService();

        if (error) {
            return res.status(500).json({ message: error.message });
        }

        res.json(data);
    } catch (error) {
        console.error("Error fetching realty appointments:", error);
        res.status(500).json({ message: "Error fetching realty appointments." });
    }
}

export async function createRealtyAppointment(req, res) {
    const {
        first_name,
        last_name,
        phone,
        email,
        service,
        appointment_date,
        appointment_time,
        message,
    } = req.body;

    try {
        const { data, error } = await createRealtyAppointmentService({
            first_name,
            last_name,
            phone,
            email,
            service,
            appointment_date,
            appointment_time,
            message,
        });

        if (error) {
            return res.status(500).json({ message: error.message });
        }

        const newRealtyAppointment = data[0];

        await sendRealtyAppointmentRequestEmail(newRealtyAppointment);
        await sendRealtyOfficeNotificationEmail(newRealtyAppointment);

        res.status(201).json(newRealtyAppointment);
    } catch (error) {
        console.error("Error creating realty appointment:", error);
        res.status(500).json({ message: "Error creating realty appointment." });
    }
}

export async function confirmRealtyAppointmentFromEmail(req, res) {
    const { id } = req.params;

    try {
        const { data, error } = await confirmRealtyAppointmentService(id);

        if (error) {
            return res.status(500).send("<h2>Error confirming realty request.</h2>");
        }

        if (!data || data.length === 0) {
            return res.status(404).send("<h2>Realty request not found.</h2>");
        }

        res.send(`
      <div style="font-family: Arial, sans-serif; padding: 30px;">
        <h2 style="color: #8a6a3f;">Realty Request Confirmed</h2>
        <p>Your realty request has been successfully confirmed.</p>
        <p>Thank you for choosing DPS Realty.</p>
      </div>
    `);
    } catch (error) {
        console.error("Error confirming realty request:", error);
        res.status(500).send("<h2>Error confirming realty request.</h2>");
    }
}

export async function cancelRealtyAppointmentFromEmail(req, res) {
    const { id } = req.params;

    try {
        const { data, error } = await cancelRealtyAppointmentService(id);

        if (error) {
            return res.status(500).send("<h2>Error cancelling realty request.</h2>");
        }

        if (!data || data.length === 0) {
            return res.status(404).send("<h2>Realty request not found.</h2>");
        }

        res.send(`
      <div style="font-family: Arial, sans-serif; padding: 30px;">
        <h2 style="color: #a12626;">Realty Request Cancelled</h2>
        <p>Your realty request has been cancelled successfully.</p>
        <p>If you would like to reschedule, please contact DPS Realty.</p>
      </div>
    `);
    } catch (error) {
        console.error("Error cancelling realty request:", error);
        res.status(500).send("<h2>Error cancelling realty request.</h2>");
    }
}

export async function updateRealtyAppointment(req, res) {
    const { id } = req.params;
    const {
        first_name,
        last_name,
        phone,
        email,
        service,
        appointment_date,
        appointment_time,
        message,
        status,
    } = req.body;

    try {
        const { data: currentAppointment, error: currentError } =
            await getRealtyAppointmentByIdService(id);

        if (currentError) {
            return res.status(500).json({ message: currentError.message });
        }

        if (!currentAppointment) {
            return res.status(404).json({ message: "Realty request not found." });
        }

        const oldDate = currentAppointment.appointment_date;
        const oldTime = currentAppointment.appointment_time;

        const { data, error } = await updateRealtyAppointmentService(id, {
            first_name,
            last_name,
            phone,
            email,
            service,
            appointment_date,
            appointment_time,
            message,
            status,
        });

        if (error) {
            return res.status(500).json({ message: error.message });
        }

        if (!data || data.length === 0) {
            return res.status(404).json({ message: "Realty request not found." });
        }

        const updatedAppointment = data[0];

        if (
            String(oldDate) !== String(updatedAppointment.appointment_date) ||
            String(oldTime) !== String(updatedAppointment.appointment_time)
        ) {
            await sendRealtyUpdateEmail(updatedAppointment);
        }

        res.json({
            message: "Realty appointment updated successfully.",
            appointment: updatedAppointment,
        });
    } catch (error) {
        console.error("Error updating realty appointment:", error);
        res.status(500).json({ message: "Error updating realty appointment." });
    }
}

export async function confirmRealtyAppointment(req, res) {
    const { id } = req.params;

    try {
        const { data, error } = await confirmRealtyAppointmentService(id);

        if (error) {
            return res.status(500).json({ message: error.message });
        }

        if (!data || data.length === 0) {
            return res.status(404).json({ message: "Realty request not found." });
        }

        res.json({
            message: "Realty request confirmed successfully.",
            appointment: data[0],
        });
    } catch (error) {
        console.error("Error confirming realty request:", error);
        res.status(500).json({ message: "Error confirming realty request." });
    }
}

export async function cancelRealtyAppointment(req, res) {
    const { id } = req.params;

    try {
        const { data, error } = await cancelRealtyAppointmentService(id);

        if (error) {
            return res.status(500).json({ message: error.message });
        }

        if (!data || data.length === 0) {
            return res.status(404).json({ message: "Realty request not found." });
        }

        res.json({
            message: "Realty request cancelled successfully.",
            appointment: data[0],
        });
    } catch (error) {
        console.error("Error cancelling realty request:", error);
        res.status(500).json({ message: "Error cancelling realty request." });
    }
}

export async function archiveRealtyAppointment(req, res) {
    const { id } = req.params;

    try {
        const { data, error } = await archiveRealtyAppointmentService(id);

        if (error) {
            return res.status(500).json({ message: error.message });
        }

        if (!data || data.length === 0) {
            return res.status(404).json({ message: "Realty request not found." });
        }

        res.json({
            message: "Realty request archived successfully.",
            appointment: data[0],
        });
    } catch (error) {
        console.error("Error archiving realty request:", error);
        res.status(500).json({ message: "Error archiving realty request." });
    }
}

export async function deleteRealtyAppointment(req, res) {
    const { id } = req.params;

    try {
        const { data, error } = await deleteRealtyAppointmentService(id);

        if (error) {
            return res.status(500).json({ message: error.message });
        }

        if (!data || data.length === 0) {
            return res.status(404).json({ message: "Realty request not found." });
        }

        res.json({
            message: "Realty request deleted successfully.",
            appointment: data[0],
        });
    } catch (error) {
        console.error("Error deleting realty request:", error);
        res.status(500).json({ message: "Error deleting realty request." });
    }
}
