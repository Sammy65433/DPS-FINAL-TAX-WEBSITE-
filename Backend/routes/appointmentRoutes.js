import express from "express";
import crypto from "node:crypto";

import {
  archiveAppointment,
  cancelAppointment,
  createAppointment,
  deleteAppointment,
  getAppointments,
  getAvailability,
  updateAppointment,
} from "../controllers/appointmentController.js";

import {
  getManagedAppointment,
  getManagedAvailability,
  rescheduleManagedAppointment,
  cancelManagedAppointment,
} from "../controllers/manageAppointmentController.js";


const router = express.Router();

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

// Staff appointment list
router.get("/", requireStaffServiceKey, getAppointments);

// Public booking
router.get("/availability", getAvailability);
router.post("/", createAppointment);

router.get("/manage", getManagedAppointment);
router.get("/manage/availability", getManagedAvailability);
router.patch("/manage/reschedule", rescheduleManagedAppointment);
router.patch("/manage/cancel", cancelManagedAppointment);


// Staff-only changes
router.patch("/:id/cancel", requireStaffServiceKey, cancelAppointment);
router.patch("/:id/archive", requireStaffServiceKey, archiveAppointment);
router.patch("/:id", requireStaffServiceKey, updateAppointment);
router.delete("/:id", requireStaffServiceKey, deleteAppointment);

export default router;
