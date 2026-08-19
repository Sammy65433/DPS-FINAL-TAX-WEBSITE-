import cors from "cors";
import app from "./app.js";
import { env } from "./config/env.js";


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
    ],
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

process.on("uncaughtException", err => {
  console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", err => {
  console.error("Unhandled Rejection:", err);
});

console.log("Starting server...");
console.log("BASE_URL:", env.BASE_URL);
console.log("FRONTEND_URL:", env.FRONTEND_URL);

app.listen(env.PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${env.PORT}`);
});
