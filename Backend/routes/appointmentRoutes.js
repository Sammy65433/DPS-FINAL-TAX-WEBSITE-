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
import crypto from "node:crypto";

function requireStaffServiceKey(req, res, next) {
  const expected = process.env.DPS_STAFF_API_KEY;
  const supplied = req.get("X-DPS-Staff-Key");

  if (!expected || !supplied) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  const expectedBuffer = Buffer.from(expected);
  const suppliedBuffer = Buffer.from(supplied);

  if (
    expectedBuffer.length !== suppliedBuffer.length ||
    !crypto.timingSafeEqual(expectedBuffer, suppliedBuffer)
  ) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  next();
}

const router = express.Router();

router.get("/", requireStaffServiceKey, getAppointments);
router.get("/availability", getAvailability);
router.post("/", createAppointment);
router.get("/:id/confirm", confirmAppointmentFromEmail);
router.get("/:id/cancel-from-email", cancelAppointmentFromEmail);
router.patch("/:id/cancel", cancelAppointment);
router.patch("/:id/archive", archiveAppointment);
router.patch("/:id", updateAppointment);
router.delete("/:id", deleteAppointment);

export default router;
