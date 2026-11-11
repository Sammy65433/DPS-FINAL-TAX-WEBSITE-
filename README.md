
DPS Professional Tax Services Website

**Live application:** https://www.dpstaxpro.com/

DPS Professional Tax Services Website is a full-stack web application built for DPS Professional Tax Services and DPS Realty. It provides a professional public-facing website, tax and real estate booking forms, admin appointment management, client authentication, customer document upload, secure document portal guidance, official IRS resource links, and email-based appointment communication.

The project includes:

- a React frontend
- an Express backend
- Supabase database integration
- Resend email integration
- MongoDB integration (appointments + customer accounts/documents)
- modular CSS structure
- admin appointment tools
- client portal authentication and document upload

## Live Project Purpose

This platform helps DPS:

- present business services professionally online
- allow clients to request tax appointments
- allow clients to request real estate appointments
- allow clients to create accounts and upload documents
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
- bcryptjs
- jsonwebtoken
- MongoDB driver (appointments + customers/documents)

### Services
- Supabase
- Resend
- XLSX
- Twilio (SMS; mock mode in dev)

## Core Features

### Public Website
- homepage with hero, stats, services, process, testimonials, contact, and realty preview
- service pages for tax preparation, notary, immigration, translation, insurance, and copy/fax
- FAQ page
- moments/community gallery page
- purpose/mission page
- booking page
- real estate booking page

### Client Authentication
- client login with email/password (bcrypt hashed, JWT issued, 7-day expiry)
- client registration with email confirmation token flow
- client password reset flow via expiring tokens
- client account link redemption for CRM contact connections
- protected client endpoints (`/api/customer/*`) require a valid `Bearer` JWT with `role: customer`

### Customer Document Upload
- clients can upload PDF, JPG, or PNG documents (max 5 MB) through the client portal
- documents are stored against the customer record
- staff can retrieve document metadata and download via staff-protected endpoints

### Staff Authentication
- staff endpoints protected by `X-DPS-Staff-Key` header with timing-safe comparison
- key shared between DPS backend and CRM backend server-to-server
- staff appointment CRUD operations require the staff key

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
- password-protected admin view (frontend password check + server-side staff key)
- list tax appointments
- list realty appointments
- edit appointments
- cancel appointments
- archive appointments
- delete appointments
- export archived appointments to JSON or CSV
- add tax and realty appointments to Google Calendar

### Staff Appointment Management
- staff-only create, list, edit, cancel, archive, delete operations
- staff availability lookup by date, preparer, and duration
- staff bookings include expiring manage token hash + expiry

### Customer Appointment Management
- private manage link flow with expiring token
- customers can view, reschedule, or cancel their own appointments
- manage tokens are hashed (SHA-256) and expire after 7 days

### IRS Resources
- official IRS resource section on booking page
- refund status link
- IRS payment link
- transcript/tax record link
- navigation and hero shortcuts to taxpayer resources

### Security Guidance
- secure portal instructions for client documents
- visible warnings not to submit sensitive tax information through the public form
- client document uploads limited to PDF/JPG/PNG, max 5 MB, no malware scanning
- manage tokens are stored hashed and expire

## How It Works

### 1. Client Visits the Website
A user lands on the DPS site and can:
- browse services
- read FAQs
- view contact and office details
- visit tax booking, realty booking, or client portal

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
The React frontend sends requests to the Express backend API using `VITE_API_URL`.

Examples:
- `POST /api/appointments`
- `POST /api/realty-appointments`

### 4. Backend Validates and Stores Data
The backend:
- validates availability for tax appointments
- prevents duplicate bookings for same date/time/preparer
- inserts data into Supabase tables
- manages expiring manage tokens (hashed, 7-day expiry)
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

### 7. Client Uploads Documents
An authenticated client can go to `/client-portal` and:
- upload PDF/JPG/PNG documents (max 5 MB)
- view uploaded document metadata

Staff can then retrieve and download those documents through staff-protected endpoints linked to the CRM contact.

## Project Structure

```bash
DPS-FINAL-TAX/
├── Backend/
│   ├── config/
│   │   ├── env.js
│   │   ├── resend.js
│   │   ├── supabase.js
│   │   └── mongo.js
│   ├── controllers/
│   │   ├── appointmentController.js
│   │   ├── realtyAppointmentController.js
│   │   ├── emailController.js
│   │   ├── customerAuthController.js
│   │   └── manageAppointmentController.js
│   ├── routes/
│   │   ├── appointmentRoutes.js
│   │   ├── realtyAppointmentRoutes.js
│   │   ├── emailRoutes.js
│   │   ├── customerRoutes.js
│   │   ├── staffDocumentRoutes.js
│   │   └── customerDocumentRoutes.js
│   ├── services/
│   │   ├── appointmentService.js
│   │   ├── realtyAppointmentService.js
│   │   ├── emailService.js
│   │   ├── spreadsheetService.js
│   │   └── customerService.js
│   ├── middleware/
│   │   ├── requireCustomer.js
│   │   └── requireStaffServiceKey.js
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
    │   │   ├── CustomerDocuments.jsx
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
    │   │   ├── ClientLogin.jsx
    │   │   ├── ClientPortal.jsx
    │   │   ├── ClientLink.jsx
    │   │   ├── ClientSignup.jsx
    │   │   ├── ContactPage.jsx
    │   │   ├── CopyFax.jsx
    │   │   ├── FAQPage.jsx
    │   │   ├── HomePage.jsx
    │   │   ├── HowItWorksPage.jsx
    │   │   ├── Immigration.jsx
    │   │   ├── InsuranceServices.jsx
    │   │   ├── LoginChoice.jsx
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
    │   ├── lib/
    │   │   └── customerAuth.js
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

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

DPS_STAFF_API_KEY=your_staff_api_key

CRM_BACKEND_URL=https://dps-crm-1.onrender.com
CRM_LINK_REDEEM_KEY=your_crm_link_redeem_key
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

### Client Auth
- `POST /api/customer/register`
- `POST /api/customer/login`
- `POST /api/customer/confirm-email`
- `POST /api/customer/forgot-password`
- `POST /api/customer/reset-password`
- `GET /api/customer/me` (staff/customer JWT required)
- `POST /api/customer/link` (staff/customer JWT required, CRM redemption)

### Customer Documents
- `GET /api/customer/documents` (customer JWT required)
- `POST /api/customer/documents` (customer JWT + multipart upload required)

### Staff Documents
- `GET /api/staff/documents/:customerId` (staff JWT or `X-DPS-Staff-Key` required)
- `GET /api/staff/documents/:customerId/:documentId/download` (staff JWT or `X-DPS-Staff-Key` required)

### Staff Auth
- `POST /api/staff/login` (body: `{ password }`) — verifies staff admin password and returns a staff JWT
- JWT signed with `JWT_SECRET`, staff/admin role, 8-hour expiry

### Tax Appointments
- `GET /api/appointments` (staff JWT or `X-DPS-Staff-Key` required)
- `GET /api/appointments/availability`
- `POST /api/appointments`
- `GET /api/appointments/manage?token=...` (customer manage token)
- `GET /api/appointments/manage/availability?token=...&date=...&preparer=...&duration_minutes=...` (customer manage token)
- `PATCH /api/appointments/manage/reschedule` (customer manage token)
- `PATCH /api/appointments/manage/cancel` (customer manage token)
- `PATCH /api/appointments/:id/cancel` (staff key required)
- `PATCH /api/appointments/:id/archive` (staff key required)
- `PATCH /api/appointments/:id` (staff key required)
- `DELETE /api/appointments/:id` (staff key required)

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
- `manage_token_hash`
- `manage_token_expires_at`
- `visit_format`
- `duration_minutes`

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
  created_at timestamp with time zone default now(),
  manage_token_hash text,
  manage_token_expires_at timestamp with time zone,
  visit_format text,
  duration_minutes integer
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
- client login / JWT flow works
- client document upload flow works
- staff appointment key-protected operations work
- customer manage link flow works

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
- `MONGODB_URI`
- `JWT_SECRET`
- `DPS_STAFF_API_KEY`
- `CRM_BACKEND_URL`
- `CRM_LINK_REDEEM_KEY`

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

### Staff endpoints return `401 Unauthorized`
Cause:
- missing or incorrect `X-DPS-Staff-Key` header

Fix:
- send the header on staff-only requests:
```http
X-DPS-Staff-Key: <staff_key>
```

### Customer document upload fails
Cause:
- missing or invalid customer JWT

Fix:
- sign in through `/client-login` first, then upload through `/client-portal`

## Suggested Future Improvements

- move admin auth fully to backend or a proper auth system
- add better success and error alerts
- add loading states for all admin actions
- improve mobile header/nav behavior
- add server-side validation for all request fields
- add analytics and error logging
- add spam protection for public forms
- enable stronger role-based access control later
- add document malware scanning before staff access

## Overall Summary

This project is now a functioning full-stack appointment and services platform for DPS Professional Tax Services and DPS Realty.

It successfully supports:
- public business presentation
- tax booking
- real estate booking
- client authentication
- client document upload
- staff appointment management
- customer private appointment management
- client email communication
- admin appointment management
- secure client guidance
- official IRS resource access

At this stage, the application is in deployment-ready condition pending final Render environment setup and one last production verification pass.

## Author
Samuel Jacquet
DPS Professional Tax Services Website

Sept 1, 2026





