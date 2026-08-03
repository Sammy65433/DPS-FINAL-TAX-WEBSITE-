import dotenv from "dotenv";

dotenv.config();

export const env = {
    PORT: process.env.PORT || 5001,
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_KEY: process.env.SUPABASE_KEY,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_API_KEY: process.env.TWILIO_API_KEY,
    TWILIO_API_SECRET: process.env.TWILIO_API_SECRET,
    TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER,
    BASE_URL: process.env.BASE_URL || "http://localhost:5001",
    FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173",
};

console.log("SUPABASE_URL exists:", !!env.SUPABASE_URL);
console.log("SUPABASE_KEY exists:", !!env.SUPABASE_KEY);
console.log("RESEND_API_KEY exists:", !!env.RESEND_API_KEY);
console.log("PORT:", env.PORT);
