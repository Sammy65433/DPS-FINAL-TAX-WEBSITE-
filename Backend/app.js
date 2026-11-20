import express from "express";
import cors from "cors";

import appointmentRoutes from "./routes/appointmentRoutes.js";
import realtyAppointmentRoutes from "./routes/realtyAppointmentRoutes.js";
import emailRoutes from "./routes/emailRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import customerDocumentRoutes from "./routes/customerDocumentRoutes.js";
import staffDocumentRoutes from "./routes/staffDocumentRoutes.js";
import staffRoutes from "./routes/staffRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

const app = express();

app.use(
    cors({
        origin: true,
        credentials: true,
        methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "X-DPS-Staff-Key"],
    })
);

app.use(express.json());
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-DPS-Staff-Key");
  res.header("Access-Control-Allow-Credentials", "true");
  return res.sendStatus(204);
});

app.get("/", (_req, res) => {
    res.json({ message: "DPS Tax API is running" });
});

app.get("/health", (_req, res) => {
    res.status(200).json({ ok: true });
});
app.use("/api/staff/documents", staffDocumentRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/customer/documents", customerDocumentRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/realty-appointments", realtyAppointmentRoutes);
app.use("/api", emailRoutes);
app.use("/api/ai", aiRoutes);

export default app;
