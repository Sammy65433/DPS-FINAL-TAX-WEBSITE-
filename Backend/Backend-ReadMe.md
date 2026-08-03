```md
DPS Tax API is the backend service for the DPS Professional Tax Services and DPS Realty website. It handles appointment booking, appointment management, email notifications, availability checks, and client email utilities.

## Tech Stack

- Node.js
- Express
- Supabase
- Resend
- XLSX
- CORS
- dotenv

## Features

- Tax appointment booking
- Realty appointment booking
- Appointment availability lookup
- Appointment confirmation from email links
- Appointment cancellation from email links
- Admin update, archive, cancel, and delete actions
- Bulk email sending to clients
- Parse client emails from Excel spreadsheet
- Health check endpoint

## Project Structure

```bash
DPS-FINAL-TAX/
├── Backend/
│   ├── config/
│   │   ├── env.js
│   │   ├── supabase.js
│   │   └── resend.js
│   ├── controllers/
│   │   ├── appointmentController.js
│   │   ├── realtyAppointmentController.js
│   │   └── emailController.js
│   ├── routes/
│   │   ├── appointmentRoutes.js
│   │   ├── realtyAppointmentRoutes.js
│   │   └── emailRoutes.js
│   ├── services/
│   │   ├── appointmentService.js
│   │   ├── realtyAppointmentService.js
│   │   ├── emailService.js
│   │   └── spreadsheetService.js
│   ├── utils/
│   │   ├── chunkArray.js
│   │   └── normalizeEmails.js
│   ├── app.js
│   └── server.js
├── public/
├── .env
├── .env.example
└── package.json
```

## Installation

1. Clone the repository
2. Go into the backend folder
3. Install dependencies

```bash
npm install
```

## Environment Variables

Create a `.env` file in the `Backend` folder.

Example:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_service_or_anon_key
PORT=5001
RESEND_API_KEY=your_resend_api_key
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_API_KEY=your_twilio_api_key
TWILIO_API_SECRET=your_twilio_api_secret
TWILIO_PHONE_NUMBER=your_twilio_phone_number
FRONTEND_URL=http://localhost:5173
BASE_URL=http://localhost:5001
```

## Run the Server

```bash
npm start
```

Server runs on:

```bash
http://localhost:5001
```

## CORS Allowed Origins

This backend currently allows requests from:

- `http://localhost:5173`
- `http://127.0.0.1:5173`
- `http://localhost:5174`
- `http://127.0.0.1:5174`
- `https://dpstaxpro.com`
- `https://www.dpstaxpro.com`

## API Endpoints

### General

#### `GET /`
Returns API status message.

#### `GET /health`
Returns health check response.

Example response:

```json
{
  "ok": true
}
```

## Tax Appointments

#### `GET /api/appointments`
Get all tax appointments.

#### `GET /api/appointments/availability?date=YYYY-MM-DD&preparer=NAME`
Get booked time slots for a specific date and tax preparer.

#### `POST /api/appointments`
Create a new tax appointment.

Example request body:

```json
{
  "first_name": "John",
  "last_name": "Doe",
  "phone": "9735551234",
  "email": "john@example.com",
  "service": "Tax Preparation",
  "tax_preparer": "DPS Staff",
  "appointment_date": "2026-02-10",
  "appointment_time": "10:00 AM",
  "message": "Need help with filing"
}
```

#### `GET /api/appointments/:id/confirm`
Confirm a tax appointment from email link.

#### `GET /api/appointments/:id/cancel-from-email`
Cancel a tax appointment from email link.

#### `PATCH /api/appointments/:id`
Update a tax appointment.

#### `PATCH /api/appointments/:id/cancel`
Cancel a tax appointment.

#### `PATCH /api/appointments/:id/archive`
Archive a tax appointment.

#### `DELETE /api/appointments/:id`
Delete a tax appointment.

## Realty Appointments

#### `GET /api/realty-appointments`
Get all realty appointments.

#### `POST /api/realty-appointments`
Create a new realty appointment.

Example request body:

```json
{
  "first_name": "Jane",
  "last_name": "Smith",
  "phone": "9735557890",
  "email": "jane@example.com",
  "service": "Property Consultation",
  "appointment_date": "2026-02-12",
  "appointment_time": "2:00 PM",
  "message": "Interested in buying a home"
}
```

#### `GET /api/realty-appointments/:id/confirm`
Confirm a realty appointment from email link.

#### `GET /api/realty-appointments/:id/cancel-from-email`
Cancel a realty appointment from email link.

#### `PATCH /api/realty-appointments/:id`
Update a realty appointment.

#### `PATCH /api/realty-appointments/:id/confirm`
Confirm a realty appointment.

#### `PATCH /api/realty-appointments/:id/cancel`
Cancel a realty appointment.

#### `PATCH /api/realty-appointments/:id/archive`
Archive a realty appointment.

#### `DELETE /api/realty-appointments/:id`
Delete a realty appointment.

## Client Email Utilities

#### `POST /api/send-client-bulk-email`
Send a bulk email to a list of client email addresses.

Example request body:

```json
{
  "emails": ["client1@example.com", "client2@example.com"],
  "subject": "Important Update",
  "html": "<p>Hello clients</p>"
}
```

#### `GET /api/parse-client-emails`
Reads `./public/DPS Client List.xls` and returns cleaned email addresses.

## Email Behavior

This backend uses Resend to:

- send appointment request emails to clients
- send office notification emails
- send updated appointment emails
- send realty request emails
- send bulk client emails

## Supabase Tables Expected

This backend expects at least these tables:

- `appointments`
- `realty_appointments`

Suggested fields for `appointments`:

- `id`
- `first_name`
- `last_name`
- `phone`
- `email`
- `service`
- `tax_preparer`
- `appointment_date`
- `appointment_time`
- `message`
- `status`
- `created_at`

Suggested fields for `realty_appointments`:

- `id`
- `first_name`
- `last_name`
- `phone`
- `email`
- `service`
- `appointment_date`
- `appointment_time`
- `message`
- `status`
- `created_at`

## Notes

- `SUPABASE_URL` and `SUPABASE_KEY` are required or the server will crash on startup
- `RESEND_API_KEY` is required for email features
- `TWILIO` variables are present in the environment but not currently used in the shown backend code
- `BASE_URL` is used for email action links
- `FRONTEND_URL` is used for reschedule links

## Troubleshooting

### Error: `supabaseUrl is required`
Your `.env` file is missing, in the wrong folder, or incorrectly formatted.

Make sure:

- `.env` is inside the backend folder
- variable names match exactly
- each variable uses `KEY=value` format

### Environment variables not loading
Add this near the top of `server.js`:

```js
console.log("cwd:", process.cwd());
console.log("SUPABASE_URL exists:", !!process.env.SUPABASE_URL);
```

## Scripts

```json
{
  "start": "node server.js"
}
```

## Dependencies

- `@supabase/supabase-js`
- `cors`
- `dotenv`
- `express`
- `resend`
- `twilio`
- `xlsx`

## Author

DPS Tax API
```
- `config/` = env vars and client setup
- `routes/` = endpoint definitions only
- `controllers/` = request/response logic
- `services/` = Supabase, Resend, XLSX business logic
- `utils/` = helper functions like `chunkArray`, `normalizeEmails`

Minimal flow:

```txt
route -> controller -> service -> config/client
```

Example:

`src/config/env.js`
```js
import dotenv from "dotenv";
dotenv.config();

export const env = {
  PORT: process.env.PORT || 5001,
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_KEY: process.env.SUPABASE_KEY,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  BASE_URL: process.env.BASE_URL || "http://localhost:5001",
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173",
};
```

`src/config/supabase.js`
```js
import { createClient } from "@supabase/supabase-js";
import { env } from "./env.js";

export const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_KEY);
```

`src/config/resend.js`
```js
import { Resend } from "resend";
import { env } from "./env.js";

export const resend = new Resend(env.RESEND_API_KEY);
```

`src/utils/chunkArray.js`
```js
export function chunkArray(array, size) {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}
```

`src/utils/normalizeEmails.js`
```js
export function normalizeEmails(emails = []) {
  return [
    ...new Set(
      emails
        .map(email => String(email || "").trim().toLowerCase())
        .filter(email => email && email.includes("@"))
    ),
  ];
}
```

`src/routes/appointmentRoutes.js`
```js
import express from "express";
import {
  getAppointments,
  createAppointment,
  getAvailability,
} from "../controllers/appointmentController.js";

const router = express.Router();

router.get("/", getAppointments);
router.get("/availability", getAvailability);
router.post("/", createAppointment);

export default router;
```

`src/app.js`
```js
import express from "express";
import cors from "cors";
import appointmentRoutes from "./routes/appointmentRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "DPS Tax API is running" });
});

app.get("/health", (req, res) => {
  res.status(200).json({ ok: true });
});

app.use("/api/appointments", appointmentRoutes);

export default app;
```

`src/server.js`
```js
import app from "./app.js";
import { env } from "./config/env.js";

app.listen(env.PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${env.PORT}`);
});
```

Best way to refactor your current file:

1. move env + client setup first
2. move helper functions into `utils`
3. move email template builders into `services/emailService.js`
4. move tax appointment logic into appointment controller/service
5. move realty logic into realty controller/service
6. move bulk email + spreadsheet parsing into email controller/service
7. leave `app.js` only for middleware and route mounting
8. leave `server.js` only for startup

Your file is big enough that I would split it into these first 6 files immediately:

- `app.js`
- `server.js`
- `config/supabase.js`
- `config/resend.js`
- `routes/appointmentRoutes.js`
- `routes/realtyAppointmentRoutes.js`

Then second pass:

- `controllers/*`
- `services/*`
- `utils/*`

