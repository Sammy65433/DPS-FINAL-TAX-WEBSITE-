import express from "express";
import {
    archiveAppointment,
    cancelAppointment,
    cancelAppointmentFromEmail,
    confirmAppointmentFromEmail,
    createAppointment,
    deleteAppointment,
    getAppointments,
    getAvailability,
    updateAppointment,
} from "../controllers/appointmentController.js";

const router = express.Router();

router.get("/", getAppointments);
router.get("/availability", getAvailability);
router.post("/", createAppointment);
router.get("/:id/confirm", confirmAppointmentFromEmail);
router.get("/:id/cancel-from-email", cancelAppointmentFromEmail);
router.patch("/:id/cancel", cancelAppointment);
router.patch("/:id/archive", archiveAppointment);
router.patch("/:id", updateAppointment);
router.delete("/:id", deleteAppointment);

export default router;
