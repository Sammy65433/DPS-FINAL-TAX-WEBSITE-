# DPS Professional Tax Services — Website & Booking Platform

**Live:** https://www.dpstaxpro.com/

Full-stack web application for DPS Professional Tax Services and DPS Realty. Provides a professional public-facing website, tax & real estate booking, client authentication, document portal, and admin appointment management.

## Tech Stack

### Frontend
- React (Vite), React Router DOM, React Icons, modular CSS

### Backend
- Node.js, Express, MongoDB (Mongoose), JWT, CORS, dotenv, bcryptjs

### Services
- Resend (email), Google Translate widget (en/es/fr/ht), Render hosting

## Features

### Public Website
- Homepage: hero, stats, services, process, testimonials, contact, realty preview
- Service pages: Tax Prep, Notary, Immigration, Translation, Insurance, Copy & Fax, Business Services, Real Estate
- Pricing page (per service, with "Book This Service" buttons)
- Contact page, FAQ, Moments, How It Works, Purpose, Taxpayer Resources

### Booking
- Tax + real estate appointment booking with service selection
- Dynamic office hours (tax season Feb–Apr vs. off-season)
- 15-min slot increments, only exact booked times blocked, slots up to closing
- Same-day booking allowed
- Pre-filled booking form from pricing/service pages
- Google Translate widget on all pages
- Dynamic ticker above Contact Us
- Show-password toggles on auth forms
- DPS chatbot widget (client-facing)
- Professional DPS-branded styling (teal/purple/gold)

### Client Portal
- Client signup/login/confirm/reset password
- Document upload (≤5MB, PDF/JPG/PNG) stored in MongoDB
- Manage My Appointment (reschedule/cancel via email link)
- DPS-branded styling, Google Translate on manage page

### Backend (MongoDB)
- Customer auth (register/login/confirm/forgot/reset)
- Document routes (customer + staff)
- Appointment routes (create, availability, block time, manage, by-email lookup)
- Realty appointment routes
- AI chat endpoint (Groq)
- Auto-registration: DPS signup → CRM contact creation (best-effort)
- Staff API key protection for internal endpoints

### Deployment
- 2 services on Render (backend + frontend)
- Environment variables: MONGODB_URI, JWT_SECRET, CRM_BACKEND_URL, CRM_LINK_REDEEM_KEY, GROQ_API_KEY



