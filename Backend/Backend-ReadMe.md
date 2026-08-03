```md
DPS Tax API

DPS Tax API is the backend service for the DPS Professional Tax Services and DPS Realty website. It handles tax appointment booking, realty appointment booking, email notifications, appointment updates, refund-related support links on the frontend, and client email utilities.

This backend is built with Express and uses Supabase as the database, Resend for email delivery, and XLSX for spreadsheet parsing.

## Overview

The backend supports:

- tax appointment booking
- realty appointment booking
- appointment availability lookups
- client confirmation and cancellation from email links
- admin update, archive, cancel, and delete actions
- bulk email sending
- parsing client email addresses from an Excel file
- health check monitoring

## Tech Stack

- Node.js
- Express
- Supabase
- Resend
- XLSX
- CORS
- dotenv

## Current Backend Structure

```bash
DPS-FINAL-TAX/
└── Backend/
    ├── config/
    │   ├── env.js
    │   ├── supabase.js
    │   └── resend.js
    ├── controllers/
    │   ├── appointmentController.js
    │   ├── realtyAppointmentController.js
    │   └── emailController.js
    ├── routes/
    │   ├── appointmentRoutes.js
    │   ├── realtyAppointmentRoutes.js
    │   └── emailRoutes.js
    ├── services/
    │   ├── appointmentService.js
    │   ├── realtyAppointmentService.js
    │   ├── emailService.js
    │   └── spreadsheetService.js
    ├── utils/
    │   ├── chunkArray.js
    │   └── normalizeEmails.js
    ├── public/
    │   └── DPS Client List.xls
    ├── app.js
    ├── server.js
    ├── .env
    ├── .env.example
    ├── package.json
    └── package-lock.json
```

## Architecture

This backend was refactored from a single large `server.js` file into smaller modules.

Responsibilities are split like this:

- `config/` = environment variables and third-party client setup
- `routes/` = endpoint definitions only
- `controllers/` = request and response handling
- `services/` = business logic and database or email operations
- `utils/` = reusable helper functions

Application flow:

```txt
route -> controller -> service -> config/client
```

## Features

### Tax Appointments
- create tax appointments
- get all tax appointments
- check booked appointment times by date and preparer
- confirm appointment from email
- cancel appointment from email
- cancel appointment from admin action
- archive appointment
- update appointment
- delete appointment
- send appointment confirmation emails
- send office notification emails
- send updated appointment emails when date or time changes

### Realty Appointments
- create realty appointments
- get all realty appointments
- confirm realty request from email
- cancel realty request from email
- confirm realty request from admin action
- cancel realty request from admin action
- archive realty request
- update realty request
- delete realty request
- send client and office realty emails
- send update emails when date or time changes

### Email Utilities
- send bulk emails to client lists
- parse and clean email addresses from spreadsheet file

### Monitoring
- root route for API status
- `/health` endpoint for health checks

## Installation

1. Clone the repository
2. Navigate to the backend directory
3. Install dependencies

```bash
cd Backend
npm install
```

## Environment Variables

Create a `.env` file inside the `Backend` folder.

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
FRONTEND_URL=https://www.dpstaxpro.com
BASE_URL=http://localhost:5001
```

Example `.env.example`:

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

## Running the Server

Start the backend with:

```bash
npm start
```

or

```bash
node server.js
```

The API runs locally at:

```bash
http://localhost:5001
```

## Scripts

```json
{
  "start": "node server.js"
}
```

## CORS Configuration

This backend currently allows requests from:

- `http://localhost:5173`
- `http://127.0.0.1:5173`
- `http://localhost:5174`
- `http://127.0.0.1:5174`
- `https://dpstaxpro.com`
- `https://www.dpstaxpro.com`

## API Endpoints

## General

### `GET /`
Returns API status message.

Example response:

```json
{
  "message": "DPS Tax API is running"
}
```

### `GET /health`
Returns health check response.

Example response:

```json
{
  "ok": true
}
```

## Tax Appointment Endpoints

### `GET /api/appointments`
Returns all tax appointments ordered by newest first.

### `GET /api/appointments/availability?date=YYYY-MM-DD&preparer=NAME`
Returns booked appointment times for a specific date and tax preparer.

Example response:

```json
{
  "bookedTimes": ["10:00 AM", "11:00 AM"]
}
```

### `POST /api/appointments`
Creates a new tax appointment.

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

### `GET /api/appointments/:id/confirm`
Confirms a tax appointment from an email link.

### `GET /api/appointments/:id/cancel-from-email`
Cancels a tax appointment from an email link.

### `PATCH /api/appointments/:id`
Updates an existing tax appointment.

### `PATCH /api/appointments/:id/cancel`
Cancels a tax appointment from an admin action.

### `PATCH /api/appointments/:id/archive`
Archives a tax appointment.

### `DELETE /api/appointments/:id`
Deletes a tax appointment.

## Realty Appointment Endpoints

### `GET /api/realty-appointments`
Returns all realty appointments ordered by newest first.

### `POST /api/realty-appointments`
Creates a new realty appointment.

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

### `GET /api/realty-appointments/:id/confirm`
Confirms a realty appointment from an email link.

### `GET /api/realty-appointments/:id/cancel-from-email`
Cancels a realty appointment from an email link.

### `PATCH /api/realty-appointments/:id`
Updates a realty appointment.

### `PATCH /api/realty-appointments/:id/confirm`
Confirms a realty appointment from an admin action.

### `PATCH /api/realty-appointments/:id/cancel`
Cancels a realty appointment from an admin action.

### `PATCH /api/realty-appointments/:id/archive`
Archives a realty appointment.

### `DELETE /api/realty-appointments/:id`
Deletes a realty appointment.

## Email Utility Endpoints

### `POST /api/send-client-bulk-email`
Sends a bulk email to a list of client email addresses.

Example request body:

```json
{
  "emails": ["client1@example.com", "client2@example.com"],
  "subject": "Important Update",
  "html": "<p>Hello clients</p>"
}
```

### `GET /api/parse-client-emails`
Reads the spreadsheet file at `./public/DPS Client List.xls`, normalizes the email addresses, removes duplicates, and returns the cleaned list.

Example response:

```json
{
  "totalRows": 1732,
  "totalEmails": 1499,
  "emails": ["example1@gmail.com", "example2@gmail.com"]
}
```

## Email Behavior

This backend uses Resend to send:

- tax appointment request emails to clients
- realty appointment request emails to clients
- office notification emails
- appointment update emails
- realty update emails
- bulk client emails

## Supabase Tables Required

This backend expects at least these two tables:

- `appointments`
- `realty_appointments`

### Suggested `appointments` table fields

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

### Suggested `realty_appointments` table fields

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

## SQL Table Setup

Use this in Supabase SQL Editor:

```sql
create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  first_name text,
  last_name text,
  phone text,
  email text,
  service text,
  tax_preparer text,
  appointment_date date,
  appointment_time text,
  message text,
  status text default 'booked',
  created_at timestamp with time zone default now()
);

create table if not exists public.realty_appointments (
  id uuid primary key default gen_random_uuid(),
  first_name text,
  last_name text,
  phone text,
  email text,
  service text,
  appointment_date date,
  appointment_time text,
  message text,
  status text default 'pending',
  created_at timestamp with time zone default now()
);
```

## Key Files

### `app.js`
Sets up:
- Express app
- CORS
- JSON middleware
- root route
- health route
- route mounting

### `server.js`
Starts the server and handles:
- uncaught exceptions
- unhandled rejections
- port binding

### `config/env.js`
Loads and exports environment variables.

### `config/supabase.js`
Creates the Supabase client.

### `config/resend.js`
Creates the Resend client.

### `controllers/`
These files handle request and response logic for appointments, realty appointments, and email utilities.

### `services/`
These files contain the database calls, email behavior, and spreadsheet parsing logic.

### `utils/`
These files contain helper functions such as:
- `chunkArray`
- `normalizeEmails`

## Frontend Integration Notes

The frontend can now test forms against:

- `POST /api/appointments`
- `POST /api/realty-appointments`

Since both table endpoints already return `[]`, the backend and Supabase connection are working correctly.

Frontend should also be able to test:

- availability route
- confirmation and cancellation links
- admin CRUD operations

## Troubleshooting

### Error: `supabaseUrl is required`
Cause:
- `.env` missing
- `.env` in wrong folder
- variable names incorrect
- missing `=` in `.env`

Fix:
- make sure `.env` is inside `Backend`
- use exact variable names
- use `KEY=value` format

### Error: `ENOTFOUND ...supabase.co`
Cause:
- bad Supabase project URL
- typo in `SUPABASE_URL`
- old or deleted project
- DNS resolution failure

Fix:
- copy the correct project URL from Supabase
- update `.env`
- restart the server

### Error: `Could not find the table 'public.appointments' in the schema cache`
Cause:
- table not created yet

Fix:
- create `appointments` and `realty_appointments` in Supabase

### Route returns `[]`
Cause:
- route is working but table has no records yet

Fix:
- no fix needed
- test a form submission or POST request

### Spreadsheet route fails
Cause:
- missing Excel file
- wrong path

Fix:
- ensure file exists at:

```bash
Backend/public/DPS Client List.xls
```

## Dependencies

- `@supabase/supabase-js`
- `cors`
- `dotenv`
- `express`
- `resend`
- `twilio`
- `xlsx`

## Notes

- `SUPABASE_URL` and `SUPABASE_KEY` are required for database access
- `RESEND_API_KEY` is required for email features
- `TWILIO` variables exist in the environment but are not actively used in the shown backend flow
- `BASE_URL` is used for confirm and cancel links in emails
- `FRONTEND_URL` is used for reschedule links
- secrets should never be committed to GitHub
- rotate exposed keys if they were shown publicly

## Status

Current backend status:

- Express server running
- Environment variables loading
- Supabase connection working
- `appointments` endpoint working
- `realty_appointments` endpoint working
- spreadsheet parsing working
- backend refactor completed into modular structure

## Author

DPS Tax API
```

Replace your current README with that full version.