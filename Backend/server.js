import app from "./app.js";
import { env } from "./config/env.js";

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
