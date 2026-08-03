import express from "express";
import {
    archiveRealtyAppointment,
    cancelRealtyAppointment,
    cancelRealtyAppointmentFromEmail,
    confirmRealtyAppointment,
    confirmRealtyAppointmentFromEmail,
    createRealtyAppointment,
    deleteRealtyAppointment,
    getRealtyAppointments,
    updateRealtyAppointment,
} from "../controllers/realtyAppointmentController.js";

const router = express.Router();

router.get("/", getRealtyAppointments);
router.post("/", createRealtyAppointment);
router.get("/:id/confirm", confirmRealtyAppointmentFromEmail);
router.get("/:id/cancel-from-email", cancelRealtyAppointmentFromEmail);
router.patch("/:id", updateRealtyAppointment);
router.patch("/:id/confirm", confirmRealtyAppointment);
router.patch("/:id/cancel", cancelRealtyAppointment);
router.patch("/:id/archive", archiveRealtyAppointment);
router.delete("/:id", deleteRealtyAppointment);

export default router;
