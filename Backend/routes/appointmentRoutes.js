import express from "express";

import { requireStaff } from "../middleware/requireStaff.js";
import {
  archiveAppointment,
  cancelAppointment,
  clearAppointmentMessage,
  createAppointment,
  createStaffAppointment,
  deleteAppointment,
  getAppointments,
  getAvailability,
  getStaffAvailability,
  updateAppointment,
} from "../controllers/appointmentController.js";

import {
  getManagedAppointment,
  getManagedAvailability,
  rescheduleManagedAppointment,
  cancelManagedAppointment,
} from "../controllers/manageAppointmentController.js";


const router = express.Router();

// Staff appointment list
router.get("/", requireStaff, getAppointments);

// Public booking
router.get("/availability", getAvailability);
router.post("/", createAppointment);

router.get("/manage", getManagedAppointment);
router.get("/manage/availability", getManagedAvailability);
router.patch("/manage/reschedule", rescheduleManagedAppointment);
router.patch("/manage/cancel", cancelManagedAppointment);

router.get("/staff/availability", requireStaff, getStaffAvailability);
router.post("/staff", requireStaff, createStaffAppointment);

// Staff-only changes
router.patch("/:id/cancel", requireStaff, cancelAppointment);
router.patch("/:id/archive", requireStaff, archiveAppointment);
router.patch("/:id", requireStaff, updateAppointment);
router.patch("/:id/clear-message", requireStaff, clearAppointmentMessage);
router.delete("/:id", requireStaff, deleteAppointment);

export default router;
