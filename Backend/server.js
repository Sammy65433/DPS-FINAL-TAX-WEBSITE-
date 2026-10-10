import app from "./app.js";
import { env } from "./config/env.js";

process.on("uncaughtException", (error) => {
  console.error("Uncaught exception:", error);
  process.exit(1);
});

process.on("unhandledRejection", (error) => {
  console.error("Unhandled rejection:", error);
  process.exit(1);
});

console.log("Starting server...");
console.log("BASE_URL:", env.BASE_URL);
console.log("FRONTEND_URL:", env.FRONTEND_URL);

app.listen(env.PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${env.PORT}`);
});
