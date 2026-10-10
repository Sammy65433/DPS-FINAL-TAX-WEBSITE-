import express from "express";
import cors from "cors";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import realtyAppointmentRoutes from "./routes/realtyAppointmentRoutes.js";
import emailRoutes from "./routes/emailRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import customerDocumentRoutes from "./routes/customerDocumentRoutes.js";

// After app.use(express.json()):

const app = express();



app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "http://127.0.0.1:5173",
            "http://localhost:5174",
            "http://127.0.0.1:5174",
            "https://dpstaxpro.com",
            "https://www.dpstaxpro.com",
            "https://dps-final-taxwebsite.onrender.com",
            "https://dps-textellent-frontend.onrender.com",

        ],
        methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);
app.use(express.json());

app.use("/api/contact", contactRoutes);
app.use("/api/customer/documents", customerDocumentRoutes);
app.use("/api/customer", customerRoutes);


app.get("/", (req, res) => {
    res.json({ message: "DPS Tax API is running" });
});

app.get("/health", (req, res) => {
    res.status(200).json({ ok: true });
});

app.use("/api/appointments", appointmentRoutes);
app.use("/api/realty-appointments", realtyAppointmentRoutes);
app.use("/api", emailRoutes);

export default app;
