```md
DPS Tax Frontend

DPS Tax Frontend is the client-facing React application for DPS Professional Tax Services and DPS Realty. It powers the public website, appointment booking experience, service pages, resource pages, admin interface, and supporting navigation for clients seeking tax, document, language, insurance, and real estate support.

This frontend is designed to present the business professionally while connecting users to the backend API for appointment creation, appointment management, and service-related workflows.

## Overview

This application is built with React, React Router, Vite, and modular CSS. It works together with the DPS backend API to provide:

- tax appointment booking
- real estate appointment booking
- appointment availability checks
- admin dashboard management
- official taxpayer resource access
- payment guidance
- public service information
- community, FAQ, and process pages

## Tech Stack

- React
- Vite
- React Router DOM
- CSS
- React Icons
- AOS if enabled in the project

## Main Goals

The frontend was built to:

- create a clean and professional online presence for DPS
- allow clients to book appointments online
- make services easier to understand
- connect clients with real estate support
- provide trusted official taxpayer resource links
- let admin users manage bookings in one place
- organize content into reusable components and dedicated pages

## Key Features

### Public Website
- homepage with hero, stats, services, process preview, testimonials preview, contact, and realty preview
- dedicated service pages
- purpose page
- FAQ page
- client feedback page
- moments/community page
- process page
- taxpayer resources page

### Booking
- tax appointment booking form
- live availability by date and tax preparer
- duplicate booking prevention through backend logic
- payment options section
- secure document portal guidance
- important security notice for sensitive tax information

### Realty
- dedicated real estate page
- real estate intro section
- real estate booking form
- RC Realty Group referral support
- partner contact details and office location

### Admin
- admin login using frontend env password
- tax appointment list
- realty appointment list
- search and filter controls
- edit, cancel, archive, and delete actions
- export archived appointments to JSON and CSV
- Google Calendar links for bookings

### Resource Pages
- official taxpayer resources page
- full FAQ page
- full client feedback page
- full how-it-works page
- full purpose page
- full contact page

## How It Works

### 1. Client Visits the Website
A visitor lands on the homepage and can browse:

- services
- process overview
- FAQ preview
- client feedback preview
- contact details
- real estate support preview

### 2. Client Navigates to a Dedicated Page
The site uses React Router to route users to pages such as:

- `/booking`
- `/real-estate-booking`
- `/faq`
- `/how-it-works`
- `/client-feedback`
- `/taxpayer-resources`
- `/contact`

This makes the site easier to explore and keeps the homepage from becoming overloaded.

### 3. Client Books an Appointment
On the booking page, the user can:

- enter first and last name
- provide phone and email
- select a tax service
- select a tax preparer
- choose a date
- view available times
- add a message
- submit the request

On the real estate page, the user can:

- enter contact details
- choose the type of real estate support
- optionally choose date and time
- submit a request

### 4. Frontend Sends Request to Backend
The frontend uses the backend API base URL from:

```env
VITE_API_URL
```

Examples:
- `POST /api/appointments`
- `POST /api/realty-appointments`
- `GET /api/appointments/availability`

### 5. Backend Responds
The backend:

- validates data
- checks appointment conflicts
- writes to Supabase
- sends emails when configured
- returns JSON responses

### 6. Admin Reviews and Manages Appointments
An admin visits `/admin`, enters the admin password, and can:

- view all bookings
- manage tax appointments
- manage realty appointments
- edit status and details
- export archived records

## Project Structure

```bash
Frontend/
├── public/
│   ├── DPS-LOGO1.png
│   ├── tax-desktop.jpg
│   ├── real-estate.jpg
│   ├── real-estate-keys2.jpg
│   ├── office-pics/
│   └── ...
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
│   │   ├── FullContact.jsx
│   │   ├── FullFAQ.jsx
│   │   ├── FullHowItWorks.jsx
│   │   ├── FullPurpose.jsx
│   │   ├── FullTestimonials.jsx
│   │   ├── Gallery.jsx
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── HowItWorks.jsx
│   │   ├── IRSLinksBox.jsx
│   │   ├── Languages.jsx
│   │   ├── Layout.jsx
│   │   ├── RealtyBookingForm.jsx
│   │   ├── RealtyIntro.jsx
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
│   │   ├── ClientFeedbackPage.jsx
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
│   │   ├── TaxPayerResourcesPage.jsx
│   │   ├── TaxPrep.jsx
│   │   └── Translation.jsx
│   ├── styles/
│   │   ├── base/
│   │   │   ├── global.css
│   │   │   ├── reset.css
│   │   │   ├── utilities.css
│   │   │   └── variables.css
│   │   ├── components/
│   │   │   ├── booking.css
│   │   │   ├── buttons.css
│   │   │   ├── cards.css
│   │   │   ├── contact.css
│   │   │   ├── faq.css
│   │   │   ├── footer.css
│   │   │   ├── gallery.css
│   │   │   ├── header.css
│   │   │   ├── hero.css
│   │   │   ├── how-it-works.css
│   │   │   ├── irs-links.css
│   │   │   ├── languages.css
│   │   │   ├── purpose.css
│   │   │   ├── realty.css
│   │   │   ├── services.css
│   │   │   ├── stats.css
│   │   │   ├── testimonials.css
│   │   │   └── topbar.css
│   │   ├── pages/
│   │   │   ├── admin-page.css
│   │   │   ├── taxprep-page.css
│   │   │   └── taxpayer-resources-page.css
│   │   └── index.css
│   ├── App.jsx
│   └── main.jsx
├── .env
├── .env.example
├── package.json
└── vite.config.js
```

## Routing

Main routes:

- `/`
- `/about`
- `/contact`
- `/services`
- `/tax-preparation`
- `/notary`
- `/insurance-services`
- `/copy-fax`
- `/immigration`
- `/translation`
- `/booking`
- `/real-estate-booking`
- `/purpose`
- `/faq`
- `/moments`
- `/how-it-works`
- `/client-feedback`
- `/taxpayer-resources`
- `/admin`

## Environment Variables

Create a `.env` file in the frontend root.

Example:

```env
VITE_API_URL=http://localhost:5001
VITE_ADMIN_PASSWORD=your_admin_password
```

Production example:

```env
VITE_API_URL=https://dps-final-tax-website.onrender.com
VITE_ADMIN_PASSWORD=your_admin_password
```

Example `.env.example`:

```env
VITE_API_URL=http://localhost:5001
VITE_ADMIN_PASSWORD=your_admin_password
```

## Installation

1. Go to the frontend directory
2. Install dependencies

```bash
npm install
```

## Run the Frontend

```bash
npm run dev
```

Vite usually runs on:

```txt
http://localhost:5173
```

## Backend Connection

The frontend depends on the DPS backend API.

Important routes used by the frontend include:

### General
- `GET /health`

### Tax Appointments
- `GET /api/appointments`
- `GET /api/appointments/availability`
- `POST /api/appointments`
- `PATCH /api/appointments/:id`
- `PATCH /api/appointments/:id/cancel`
- `PATCH /api/appointments/:id/archive`
- `DELETE /api/appointments/:id`

### Realty Appointments
- `GET /api/realty-appointments`
- `POST /api/realty-appointments`
- `PATCH /api/realty-appointments/:id`
- `PATCH /api/realty-appointments/:id/confirm`
- `PATCH /api/realty-appointments/:id/cancel`
- `PATCH /api/realty-appointments/:id/archive`
- `DELETE /api/realty-appointments/:id`

## Important Components

### `Layout`
Shared wrapper used by many pages.

Includes:
- `TopBar`
- `Header`
- `Footer`

### `Header`
Contains:
- main navigation
- booking shortcut
- call action
- resource navigation

### `Hero`
Homepage hero section with:
- business positioning
- CTA buttons
- office trust signals

### `Booking`
Tax appointment form with:
- availability fetching
- form submission
- payment section
- secure upload information
- security notice

### `RealtyIntro`
Provides the informational top section for the real estate page.

### `RealtyBookingForm`
Handles the real estate appointment request form.

### `FAQ`
Short homepage FAQ preview cards.

### `FullFAQ`
Detailed FAQ page content.

### `HowItWorks`
Homepage process preview cards.

### `FullHowItWorks`
Detailed process page with full descriptions and disclaimer.

### `Testimonials`
Homepage client feedback preview cards.

### `FullTestimonials`
Dedicated client feedback page.

### `FullContact`
Expanded contact page with a more descriptive and polished presentation.

### `AdminAppointments`
Main admin booking management interface.

## CSS Structure

The frontend uses modular CSS separated by responsibility.

### Base
- `variables.css`
- `reset.css`
- `global.css`
- `utilities.css`

### Components
- `topbar.css`
- `header.css`
- `hero.css`
- `buttons.css`
- `cards.css`
- `stats.css`
- `languages.css`
- `forms.css`
- `booking.css`
- `realty.css`
- `contact.css`
- `gallery.css`
- `footer.css`
- `irs-links.css`
- `faq.css`
- `how-it-works.css`
- `services.css`
- `testimonials.css`
- `purpose.css`

### Pages
- `taxprep-page.css`
- `admin-page.css`
- `taxpayer-resources-page.css`

Main stylesheet:

```css
src/styles/index.css
```

Imported in:

```jsx
src/main.jsx
```

## Dedicated Resource and Content Pages

The frontend has been expanded beyond simple preview sections to include full dedicated pages.

### Full FAQ Page
The homepage shows short FAQ cards, while `/faq` includes full detailed answers.

### Full How It Works Page
The homepage gives a short process preview, while `/how-it-works` provides step-by-step explanations and guidance.

### Full Client Feedback Page
The homepage includes a small client feedback preview, while `/client-feedback` shows the full set of testimonials.

### Full Purpose Page
The purpose page expands the mission, vision, and commitment into a fuller narrative.

### Full Contact Page
The contact page includes a longer thank-you message, office details, hours, contact information, and map.

### Taxpayer Resources Page
The taxpayer resources page provides official IRS links and related guidance in a more professional standalone format.

## Admin Notes

The admin interface currently uses a frontend environment password:

```env
VITE_ADMIN_PASSWORD=...
```

This is acceptable for simple internal access during development and light internal use, but it is not secure enough for a production-grade admin system on its own.

For stronger security in the future:
- move authentication to the backend
- use a proper auth provider
- implement role-based access

## Testing Checklist

### Backend Connectivity
Test in browser or console:

```js
fetch("http://localhost:5001/health")
  .then(res => res.json())
  .then(data => console.log(data));
```

Expected:

```json
{ "ok": true }
```

### Appointment Read
```js
fetch("http://localhost:5001/api/appointments")
  .then(res => res.json())
  .then(data => console.log(data));
```

### Appointment Create
Successful booking should:
- submit from UI
- return success message
- insert into database
- appear in admin

### Frontend Flow Testing
- submit tax appointment from UI
- submit realty appointment from UI
- verify duplicate booking protection
- test admin edit, cancel, archive, delete
- test full FAQ page
- test full How It Works page
- test full Client Feedback page
- test real estate page
- test Taxpayer Resources page
- test contact page
- test mobile responsiveness

## Deployment Checklist

Before deployment:

- set `VITE_API_URL` to the production backend URL
- set `VITE_ADMIN_PASSWORD`
- confirm backend CORS allows the production frontend domain
- confirm all CSS files exist and import correctly
- confirm `main.jsx` imports `./styles/index.css`
- confirm all routes render
- confirm booking and admin pages work
- verify assets in `public/` exist
- verify React Router routes work in production

## React Router Production Note

Because this project uses React Router, production hosting must be configured to route unknown paths back to `index.html`.

If using Render static hosting:
- Source: `/*`
- Destination: `/index.html`
- Action: `Rewrite`

If using Netlify:
- use a redirect/rewrite rule so React routes resolve properly

## Common Issues

### `Cannot use import.meta outside a module`
This happens if you try to use `import.meta.env` directly in the browser console.

Use direct URLs in browser console tests instead.

### Vite CSS import errors
If using `src/styles/index.css`, imports inside that file should look like:

```css
@import "./base/variables.css";
```

not:

```css
@import "./styles/base/variables.css";
```

### Missing CSS file error
If you import:

```css
@import "./components/testimonials.css";
```

then this file must exist exactly at:

```txt
src/styles/components/testimonials.css
```

### Admin folder import errors
If `AdminAppointments.jsx` is inside `src/components/admin/`, imports should look like:

```jsx
import AdminLogin from "./AdminLogin";
```

not:

```jsx
import AdminLogin from "./admin/AdminLogin";
```

### Undefined API URL
If frontend calls look like:

```txt
undefined/api/appointments
```

then `VITE_API_URL` is missing or not loaded.

Fix:
- update frontend `.env`
- restart Vite

## Scripts

Typical Vite scripts:

```json
{
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

## Current Status

Current frontend status:

- routes set up
- booking form connected to backend
- real estate booking connected to backend
- admin interface modularized
- full FAQ page added
- full How It Works page added
- full Client Feedback page added
- full Contact page added
- full Purpose page added
- real estate page separated into intro and booking form
- taxpayer resources separated into dedicated page
- CSS modularized into styles folders
- backend connectivity confirmed
- appointment creation confirmed
- production backend reachable
- frontend deployment configured

## Author

Samuel Jacquet  
DPS Tax Frontend
```
