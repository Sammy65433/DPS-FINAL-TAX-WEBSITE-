```md
DPS Tax Frontend

DPS Tax Frontend is the client-facing React application for DPS Professional Tax Services and DPS Realty. It provides the public website, booking experience, real estate appointment flow, admin appointment management interface, payment information, IRS quick links, and service pages.

## Overview

This frontend is built with React, React Router, Vite, and modular CSS. It connects to the DPS backend API for:

- tax appointment booking
- realty appointment booking
- appointment availability checks
- admin appointment management
- IRS quick links support
- payment and contact workflows

## Tech Stack

- React
- Vite
- React Router DOM
- CSS
- React Icons
- AOS if enabled in the project

## Key Features

### Public Website
- homepage with hero, services, testimonials, contact, and realty preview
- service-specific pages
- purpose page
- FAQ page
- moments/gallery page
- process page

### Booking
- tax appointment booking form
- live appointment availability by date and preparer
- payment options section
- secure upload portal section
- IRS quick links section
- smooth anchor navigation for payment and IRS links

### Realty
- real estate preview section
- real estate appointment booking page
- RC Realty group contact and website links

### Admin
- admin login
- tax appointment management
- realty appointment management
- edit, cancel, archive, delete
- export archived appointments to JSON or CSV
- Google Calendar links for appointments

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
│   │   │   ├── TaxAppointmentCard.jsx
│   │   │   ├── RealtyAppointmentCard.jsx
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
- `/admin`

## Environment Variables

Create a `.env` file in the frontend root.

Example:

```env
VITE_API_URL=http://localhost:5001
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

Vite will usually run on:

```bash
http://localhost:5173
```

## Backend Connection

The frontend depends on the DPS backend API.

Important backend routes used:

- `GET /health`
- `GET /api/appointments`
- `GET /api/appointments/availability`
- `POST /api/appointments`
- `PATCH /api/appointments/:id`
- `PATCH /api/appointments/:id/cancel`
- `PATCH /api/appointments/:id/archive`
- `DELETE /api/appointments/:id`

- `GET /api/realty-appointments`
- `POST /api/realty-appointments`
- `PATCH /api/realty-appointments/:id`
- `PATCH /api/realty-appointments/:id/confirm`
- `PATCH /api/realty-appointments/:id/cancel`
- `PATCH /api/realty-appointments/:id/archive`
- `DELETE /api/realty-appointments/:id`

## Main Components

### Layout
Wraps most pages with:
- `TopBar`
- `Header`
- `Footer`

### Header
Contains navigation links for:
- home
- services
- purpose
- process
- real estate
- FAQ
- contact
- booking
- payments
- IRS links
- call now

### Hero
Homepage hero with:
- main CTA
- payment shortcut
- IRS links shortcut
- call shortcut

### Booking
Main tax appointment form with:
- first name
- last name
- phone
- email
- service
- preparer
- date
- time
- message
- payment card
- IRS quick links
- secure portal section

### IRSLinksBox
Displays official IRS quick links for:
- refund status
- payments
- transcripts

It supports the anchor:

```txt
/booking#irs-links
```

### AdminAppointments
Admin interface for:
- viewing all tax appointments
- viewing all realty appointments
- filtering and searching
- editing appointments
- confirming, cancelling, archiving, deleting
- exporting archived data

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

### Pages
- `taxprep-page.css`
- `admin-page.css`

Main stylesheet import:

```css
src/styles/index.css
```

Imported in:

```jsx
src/main.jsx
```

## IRS Links Feature

The frontend includes official IRS quick links inside the booking flow.

Supported anchor links:

- `/booking#payment`
- `/booking#irs-links`

IRS links currently include:

- `https://www.irs.gov/refunds`
- `https://www.irs.gov/payments`
- `https://www.irs.gov/individuals/get-transcript`

## Admin Notes

The admin interface currently uses a frontend environment password check:

```env
VITE_ADMIN_PASSWORD=...
```

This is okay for simple internal testing, but not secure enough for production-grade authentication on its own.

For stronger production security, move admin authentication fully to the backend or use a real auth provider.

## Testing Checklist

### Backend Connectivity
Open browser console and test:

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
Confirmed working if a POST returns an inserted record.

### Frontend Flow Testing
- submit tax appointment from UI
- submit realty appointment from UI
- test duplicate booking protection
- test admin CRUD actions
- test IRS anchor link
- test payment anchor link
- test mobile responsiveness

## Deployment Checklist

Before deployment:

- set `VITE_API_URL` to production backend URL
- set `VITE_ADMIN_PASSWORD`
- confirm backend CORS allows production frontend domain
- remove unused imports
- remove commented component imports if not needed
- verify all CSS paths resolve correctly
- ensure assets in `public/` exist
- test all booking and admin flows one more time

## Common Issues

### `Cannot use import.meta outside a module`
This happens when trying to run `import.meta.env` directly in the browser console. Use direct URLs in console instead.

### Vite CSS import errors
If using `src/styles/index.css`, imports inside that file should use:

```css
@import "./base/variables.css";
```

not:

```css
@import "./styles/base/variables.css";
```

### Failed import in admin folder
If `AdminAppointments.jsx` is already inside `src/components/admin/`, imports should use:

```jsx
import AdminLogin from "./AdminLogin";
```

not:

```jsx
import AdminLogin from "./admin/AdminLogin";
```

## Scripts

Typical Vite scripts:

```json
{
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

## Status

Current frontend status:

- routes set up
- booking form connected to backend
- IRS links added
- admin interface modularized
- CSS being modularized into styles folders
- backend connectivity confirmed
- appointment creation confirmed

## Author

DPS Tax Frontend
```