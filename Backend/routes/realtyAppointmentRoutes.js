import express from "express";
import { requireStaff } from "../middleware/requireStaff.js";
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

router.post("/", createRealtyAppointment);
router.get("/:id/confirm", confirmRealtyAppointmentFromEmail);
router.get("/:id/cancel-from-email", cancelRealtyAppointmentFromEmail);

router.get("/", requireStaff, getRealtyAppointments);
router.patch("/:id", requireStaff, updateRealtyAppointment);
router.patch("/:id/confirm", requireStaff, confirmRealtyAppointment);
router.patch("/:id/cancel", requireStaff, cancelRealtyAppointment);
router.patch("/:id/archive", requireStaff, archiveRealtyAppointment);
router.delete("/:id", requireStaff, deleteRealtyAppointment);

export default router;
