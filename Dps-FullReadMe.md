```md
DPS Professional Tax Services Website

DPS Professional Tax Services Website is a full-stack web application built for DPS Professional Tax Services and DPS Realty. It provides a professional public-facing website, tax and real estate booking forms, admin appointment management, secure document portal guidance, official IRS resource links, and email-based appointment communication.

The project includes:

- a React frontend
- an Express backend
- Supabase database integration
- Resend email integration
- modular CSS structure
- admin appointment tools

## Live Project Purpose

This platform helps DPS:

- present business services professionally online
- allow clients to request tax appointments
- allow clients to request real estate appointments
- guide clients to secure document upload workflows
- provide official IRS resource links
- manage bookings internally through an admin dashboard
- send client and office email notifications automatically

## Tech Stack

### Frontend
- React
- Vite
- React Router DOM
- React Icons
- modular CSS

### Backend
- Node.js
- Express
- CORS
- dotenv

### Services
- Supabase
- Resend
- XLSX

## Core Features

### Public Website
- homepage with hero, stats, services, process, testimonials, contact, and realty preview
- service pages for tax preparation, notary, immigration, translation, insurance, and copy/fax
- FAQ page
- moments/community gallery page
- purpose/mission page
- booking page
- real estate booking page

### Tax Appointment Booking
- online booking form
- live availability by date and preparer
- duplicate booking protection
- automatic Supabase insert
- client confirmation email
- office notification email

### Realty Appointment Booking
- real estate request form
- Supabase insert
- client confirmation email
- office notification email

### Admin Dashboard
- password-protected admin view
- list tax appointments
- list realty appointments
- edit appointments
- cancel appointments
- archive appointments
- delete appointments
- export archived appointments to JSON or CSV
- add tax and realty appointments to Google Calendar

### IRS Resources
- official IRS resource section on booking page
- refund status link
- IRS payment link
- transcript/tax record link
- navigation and hero shortcuts to taxpayer resources

### Security Guidance
- secure portal instructions for client documents
- visible warnings not to submit sensitive tax information through the public form

## How It Works

### 1. Client Visits the Website
A user lands on the DPS site and can:
- browse services
- read FAQs
- view contact and office details
- visit tax booking or real estate booking

### 2. Client Books an Appointment
On the tax booking page, the user:
- enters contact information
- selects service
- selects tax preparer
- selects date
- sees available times based on current bookings
- submits the request

On the real estate page, the user:
- enters contact information
- selects real estate service
- optionally selects date and time
- submits the request

### 3. Frontend Sends Data to Backend
The React frontend sends a `POST` request to the Express backend API using `VITE_API_URL`.

Examples:
- `POST /api/appointments`
- `POST /api/realty-appointments`

### 4. Backend Validates and Stores Data
The backend:
- validates availability for tax appointments
- prevents duplicate bookings for same date/time/preparer
- inserts data into Supabase tables
- returns the saved appointment object

### 5. Email Notifications Are Sent
Using Resend, the backend sends:
- a client appointment request email
- an office notification email

Tax and realty emails include action links such as:
- confirm
- cancel
- reschedule guidance

### 6. Admin Manages Appointments
An internal admin user can go to `/admin` and:
- log in with the frontend admin password
- search and filter appointments
- edit appointments
- cancel or archive them
- delete them if needed
- export archived data
- open Google Calendar links for appointments

## Project Structure

```bash
DPS-FINAL-TAX/
├── Backend/
│   ├── config/
│   │   ├── env.js
│   │   ├── resend.js
│   │   └── supabase.js
│   ├── controllers/
│   │   ├── appointmentController.js
│   │   ├── emailController.js
│   │   └── realtyAppointmentController.js
│   ├── routes/
│   │   ├── appointmentRoutes.js
│   │   ├── emailRoutes.js
│   │   └── realtyAppointmentRoutes.js
│   ├── services/
│   │   ├── appointmentService.js
│   │   ├── emailService.js
│   │   ├── realtyAppointmentService.js
│   │   └── spreadsheetService.js
│   ├── utils/
│   │   ├── chunkArray.js
│   │   └── normalizeEmails.js
│   ├── public/
│   │   └── DPS Client List.xls
│   ├── app.js
│   ├── server.js
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── package-lock.json
│
└── Frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── admin/
    │   │   │   ├── AdminAppointments.jsx
    │   │   │   ├── AdminLogin.jsx
    │   │   │   ├── AdminToolbar.jsx
    │   │   │   ├── RealtyAppointmentCard.jsx
    │   │   │   ├── TaxAppointmentCard.jsx
    │   │   │   ├── adminConstants.js
    │   │   │   └── adminUtils.js
    │   │   ├── Booking.jsx
    │   │   ├── Contact.jsx
    │   │   ├── FAQ.jsx
    │   │   ├── Footer.jsx
    │   │   ├── Gallery.jsx
    │   │   ├── Header.jsx
    │   │   ├── Hero.jsx
    │   │   ├── HowItWorks.jsx
    │   │   ├── IRSLinksBox.jsx
    │   │   ├── Languages.jsx
    │   │   ├── Layout.jsx
    │   │   ├── Realty.jsx
    │   │   ├── RealtyPreview.jsx
    │   │   ├── ScrollToTop.jsx
    │   │   ├── Services.jsx
    │   │   ├── Stats.jsx
    │   │   ├── Testimonials.jsx
    │   │   ├── TopBar.jsx
    │   │   └── WhyChoose.jsx
    │   ├── pages/
    │   │   ├── AboutPage.jsx
    │   │   ├── AdminPage.jsx
    │   │   ├── BookingPage.jsx
    │   │   ├── ContactPage.jsx
    │   │   ├── CopyFax.jsx
    │   │   ├── FAQPage.jsx
    │   │   ├── HomePage.jsx
    │   │   ├── HowItWorksPage.jsx
    │   │   ├── Immigration.jsx
    │   │   ├── InsuranceServices.jsx
    │   │   ├── MomentsPage.jsx
    │   │   ├── Notary.jsx
    │   │   ├── PurposePage.jsx
    │   │   ├── RealEstateBookingPage.jsx
    │   │   ├── ServicesPage.jsx
    │   │   ├── TaxPrep.jsx
    │   │   └── Translation.jsx
    │   ├── styles/
    │   │   ├── base/
    │   │   ├── components/
    │   │   ├── pages/
    │   │   └── index.css
    │   ├── App.jsx
    │   └── main.jsx
    ├── .env
    ├── .env.example
    ├── package.json
    └── vite.config.js
```

## Environment Variables

## Backend `.env`
```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_key
PORT=5001
RESEND_API_KEY=your_resend_api_key
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_API_KEY=your_twilio_api_key
TWILIO_API_SECRET=your_twilio_api_secret
TWILIO_PHONE_NUMBER=your_twilio_phone_number
FRONTEND_URL=https://www.dpstaxpro.com
BASE_URL=http://localhost:5001
```

## Frontend `.env`
```env
VITE_API_URL=http://localhost:5001
VITE_ADMIN_PASSWORD=your_admin_password
```

## Local Development

### Backend
```bash
cd Backend
npm install
npm start
nodemon server.js
```

Backend runs at:

```txt
http://localhost:5001
```

### Frontend
```bash
cd Frontend
npm install
npm run dev
```

Frontend runs at:

```txt
http://localhost:5173
```

## Backend API Summary

### General
- `GET /`
- `GET /health`

### Tax Appointments
- `GET /api/appointments`
- `GET /api/appointments/availability`
- `POST /api/appointments`
- `GET /api/appointments/:id/confirm`
- `GET /api/appointments/:id/cancel-from-email`
- `PATCH /api/appointments/:id`
- `PATCH /api/appointments/:id/cancel`
- `PATCH /api/appointments/:id/archive`
- `DELETE /api/appointments/:id`

### Realty Appointments
- `GET /api/realty-appointments`
- `POST /api/realty-appointments`
- `GET /api/realty-appointments/:id/confirm`
- `GET /api/realty-appointments/:id/cancel-from-email`
- `PATCH /api/realty-appointments/:id`
- `PATCH /api/realty-appointments/:id/confirm`
- `PATCH /api/realty-appointments/:id/cancel`
- `PATCH /api/realty-appointments/:id/archive`
- `DELETE /api/realty-appointments/:id`

### Email Utilities
- `POST /api/send-client-bulk-email`
- `GET /api/parse-client-emails`

## Database Tables Required

### `appointments`
Suggested columns:
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

### `realty_appointments`
Suggested columns:
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

## SQL Setup

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

## Current Working Status

Confirmed working:

- backend server starts successfully
- frontend routes render
- frontend can reach backend
- `GET /health` works
- `GET /api/appointments` works
- `GET /api/realty-appointments` works
- tax appointment `POST` works
- realty appointment `POST` works
- Supabase inserts work
- Resend client email sends work
- admin dashboard displays appointments
- modular admin refactor works
- official IRS resource section works
- payment anchor and IRS anchor support are in place

## Deployment Plan for Render

### Frontend Deployment
Deploy the Vite frontend as a static site on Render.

Set environment variables:
- `VITE_API_URL=https://your-backend-service.onrender.com`
- `VITE_ADMIN_PASSWORD=your_admin_password`

Build command:
```bash
npm install && npm run build
```

Publish directory:
```bash
dist
```

### Backend Deployment
Deploy the Express backend as a web service on Render.

Set environment variables:
- `SUPABASE_URL`
- `SUPABASE_KEY`
- `PORT`
- `RESEND_API_KEY`
- `TWILIO_ACCOUNT_SID`
- `TWILIO_API_KEY`
- `TWILIO_API_SECRET`
- `TWILIO_PHONE_NUMBER`
- `FRONTEND_URL`
- `BASE_URL`

Start command:
```bash
node server.js
```

Important:
- set `BASE_URL` to your backend Render URL
- set `FRONTEND_URL` to your frontend Render URL
- update backend CORS if needed for the deployed frontend domain



## Troubleshooting

### `undefined/api/appointments`
Cause:
- `VITE_API_URL` missing in frontend `.env`

Fix:
- set `VITE_API_URL=http://localhost:5001`
- restart Vite

### `Cannot use import.meta outside a module`
Cause:
- trying to use `import.meta.env` in browser console

Fix:
- use direct backend URL in console tests instead

### CSS import errors
Cause:
- wrong relative paths in modular CSS setup

Fix:
- if using `src/styles/index.css`, imports should look like:
```css
@import "./base/variables.css";
```

### Supabase `ENOTFOUND`
Cause:
- wrong `SUPABASE_URL`

Fix:
- copy the real project URL from Supabase dashboard

### `Could not find table public.appointments`
Cause:
- tables were not created yet

Fix:
- run the SQL table setup

## Suggested Future Improvements

- move admin auth fully to backend or a proper auth system
- add better success and error alerts
- add loading states for all admin actions
- improve mobile header/nav behavior
- add server-side validation for all request fields
- add analytics and error logging
- add spam protection for public forms
- add file upload integration directly to secure portal workflow
- enable stronger role-based access control later

## Overall Summary

This project is now a functioning full-stack appointment and services platform for DPS Professional Tax Services and DPS Realty.

It successfully supports:
- public business presentation
- tax booking
- real estate booking
- client email communication
- admin appointment management
- secure client guidance
- official IRS resource access

At this stage, the application is in deployment-ready condition pending final Render environment setup and one last production verification pass.

## Author
Samuel Jacquet
DPS Professional Tax Services Website
```
Sept 1, 2026

