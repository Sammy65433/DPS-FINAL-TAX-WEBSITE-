

```md
# DPS Professional Tax Services Website

A full-stack business website and appointment platform for DPS Professional Tax Services in Maplewood, New Jersey.

**Live site:** https://www.dpstaxpro.com  
**Built by:** Samuel Jacquet

## Project Overview

DPS Professional Tax Services needed more than a brochure website. Clients needed a way to understand the services available, prepare for a visit, request appointments, and find reliable tax resources. The business also needed a way to review and manage requests without relying entirely on phone calls or scattered messages.

I built a responsive React frontend and connected it to an Express backend. The application supports tax and real estate appointment requests, an administrative appointment interface, general contact inquiries, and email notifications. It also presents service, pricing, FAQ, contact, and official IRS resource pages in one cohesive experience.

The frontend is organized into reusable components, dedicated pages, and modular CSS. The visual design uses the business’s teal and purple brand colors, glass-style cards, consistent typography, and responsive layouts.

## My Role

I worked on the website’s design, frontend implementation, backend integration, and deployment workflow. My responsibilities included:

- Translating business requirements into pages, forms, navigation, and user flows
- Building reusable React components and dedicated service pages
- Creating responsive layouts for desktop and mobile
- Connecting booking and contact forms to Express API endpoints
- Displaying appointment availability returned by the backend
- Building staff-facing appointment management views
- Integrating official IRS resources and clear document-security guidance
- Testing local and deployed frontend-to-backend requests
- Configuring the frontend to use different API URLs in development and production
- Updating page content and navigation based on feedback from the business

This was a practical client project: content, service descriptions, office hours, and pricing were revised as I received feedback.

## The Problem

The business offers several services, and visitors may arrive with very different needs. A client might want to book tax preparation, ask about a document, contact the office, or connect with a real estate partner.

The site needed to make those paths easy to find while supporting the business behind the scenes:

1. **Clients need clarity.** They should be able to understand available services and what to bring.
2. **Appointments need structure.** Requests should capture useful details and show tax booking availability.
3. **Staff need visibility.** Appointment records should be accessible from a management interface.
4. **Communication matters.** Clients and the office should receive relevant email notifications.
5. **Sensitive information requires care.** Public forms should not invite clients to submit Social Security numbers or tax documents.

## The Solution

I organized the site around three main visitor actions:

- **Explore:** Browse services, pricing, FAQs, business information, and community pages.
- **Prepare:** Review document checklists, general filing-date information, and official IRS links.
- **Connect:** Book a tax appointment, request real estate support, call the office, or send a general inquiry.

Behind those public flows, the frontend sends requests to the backend API. The backend handles validation, appointment records, availability checks, and email delivery.

## Tech Stack

| Area | Technology | Purpose |
| --- | --- | --- |
| Frontend | React | Component-based user interface |
| Build tool | Vite | Local development and production builds |
| Routing | React Router DOM | Dedicated pages and client-side navigation |
| Styling | Modular CSS | Responsive layouts and reusable visual patterns |
| Icons | React Icons | Navigation, service, and action icons |
| Backend | Node.js and Express | API routes and request handling |
| Database | Supabase | Appointment data storage |
| Email | Resend | Appointment and contact notifications |
| Hosting | Render | Deployed frontend and backend services |

## Core Features

### Responsive Public Website

The website includes a homepage with clear paths to services, booking, resources, and contact information. Dedicated pages provide room for more detailed information without making the homepage difficult to navigate.

The header has desktop navigation and a compact mobile menu. Services, About, and Resources are grouped into dropdowns. Pricing and Book Appointment remain easy to find.

The design is consistent across pages:

- Teal and purple colors inspired by the DPS brand
- Glass-style cards over photographic backgrounds
- Responsive image grids and service cards
- Reusable calls to action
- Clear focus states on interactive elements

### Tax Appointment Booking

The tax booking flow lets clients enter their contact information, choose a service and preparer, select a date, review available times, and submit an appointment request.

The frontend requests availability from the backend using the selected date and preparer. The backend is responsible for checking conflicts and preventing duplicate bookings for the same slot.

The booking page also points clients toward appropriate tax resources and warns them not to send sensitive tax documents through unsecured public forms.

### Real Estate Appointment Requests

A separate real estate page introduces DPS’s independent real estate partner and provides a request form. Clients can select the type of support they need, provide contact details, and optionally indicate a preferred date and time.

The page clearly states that real estate services are provided by the partner, not by DPS as a brokerage.

### General Contact Form

The contact form submits general questions to `POST /api/contact`. The frontend handles loading, success, and error states. The backend validates submissions and uses Resend to notify the office.

The form includes a hidden honeypot field to help filter simple bot submissions. It also warns visitors not to include Social Security numbers, tax documents, or other sensitive information.

### Appointment Management

The staff-facing admin interface provides tools to review tax and real estate requests. Depending on the appointment type, staff can search and filter records, edit details, change status, archive or delete records, and export archived data.

**Security limitation:** The current admin password is configured through a Vite environment variable. Values prefixed with `VITE_` are included in the browser build, so this is **not secure production authentication**. Backend-enforced authentication and authorization are required before treating the admin interface as a secure staff portal.

### Pricing and Payments

The `/pricing` page groups starting rates by service type and displays payment options. It tells visitors to confirm the final price with the office before sending payment because tax preparation fees can vary by filing complexity.

The previous `/payments` path redirects to `/pricing`.

### FAQ and Taxpayer Resources

The `/faq` page includes:

- Common appointment questions
- A list of documents clients may need to bring
- General federal filing dates for the displayed tax years
- Links to official IRS information
- A reminder that deadlines can vary by entity classification, tax year, or IRS relief

The `/taxpayer-resources` page links directly to official IRS pages for refund status, payments, transcripts, and phishing guidance. The site does not collect IRS account credentials.

### Service and Community Pages

Dedicated pages describe tax preparation, notary, form preparation support, copy and fax, business services, and other services. The site also includes About, Purpose, Moments, and Client Feedback pages.

Service copy was updated as business requirements changed. For example, an earlier insurance-focused page was revised into a general **Other Services** page rather than continuing to advertise unconfirmed insurance offerings.

## How the Application Works

### Tax Booking Flow

```text
Client selects service, preparer, and date
             ↓
Frontend requests available times
             ↓
Client selects a time and submits the form
             ↓
Express API validates the request and checks conflicts
             ↓
Appointment is stored in Supabase
             ↓
Email notifications are attempted through Resend
             ↓
Frontend displays the API result
```

### Contact Flow

```text
Visitor completes the general inquiry form
             ↓
Frontend sends POST /api/contact
             ↓
Backend validates fields and checks the honeypot
             ↓
Resend sends the message to the configured office inbox
             ↓
Frontend displays success or error feedback
```

The frontend uses `VITE_API_URL` as the backend base URL rather than hard-coding separate local and production addresses.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Homepage |
| `/about` | Business information |
| `/purpose` | Mission, vision, and commitment |
| `/moments` | Community photo gallery |
| `/services` | Services overview |
| `/tax-preparation` | Tax preparation information |
| `/notary` | Notary information |
| `/immigration` | Form preparation support |
| `/copy-fax` | Copy and fax information |
| `/business-services` | Small-business support |
| `/other-services` | General inquiries about additional services |
| `/pricing` | Starting prices and payment options |
| `/booking` | Tax appointment booking |
| `/real-estate-booking` | Real estate partner information and request form |
| `/faq` | What to bring, dates, and common questions |
| `/taxpayer-resources` | Official IRS resource links |
| `/client-feedback` | Client feedback page |
| `/contact` | Office details and general inquiry form |
| `/admin` | Appointment management interface |

Legacy URLs redirect to the newer names:

- `/payments` → `/pricing`
- `/insurance-services` → `/other-services`

## Frontend Architecture

The frontend separates shared components from route-level pages.

```text
Frontend/
├── public/                 Static images and logo
├── src/
│   ├── components/         Shared UI, forms, navigation, and page sections
│   │   └── admin/          Appointment management components
│   ├── pages/              Components rendered by React Router
│   ├── styles/
│   │   ├── base/           Variables, reset, and global styles
│   │   ├── components/     Shared component styles
│   │   ├── pages/          Page-specific styles
│   │   └── index.css       Stylesheet imports
│   ├── App.jsx             Route definitions
│   └── main.jsx            Application entry point
├── .env.example
└── package.json
```

Examples of reusable components include `Header`, `Footer`, `Contact`, `Services`, `RealtyBookingForm`, and the admin appointment components.

The dedicated page components compose these pieces rather than placing the entire application in one file.

## API Integration

The frontend communicates with the Express backend. Important requests include:

| Request | Purpose |
| --- | --- |
| `GET /api/appointments/availability` | Retrieve booked tax appointment times |
| `POST /api/appointments` | Submit a tax appointment request |
| `POST /api/realty-appointments` | Submit a real estate request |
| `POST /api/contact` | Submit a general contact message |
| Appointment management requests | Update, cancel, archive, or delete records |

The API base URL is supplied through a frontend environment variable:

```env
VITE_API_URL=http://localhost:5001
```

For the deployed frontend, `VITE_API_URL` points to the production backend. The frontend must be rebuilt after changing a Vite environment variable.

## Running Locally

Install frontend dependencies:

```bash
cd Frontend
npm install
```

Create `Frontend/.env`:

```env
VITE_API_URL=http://localhost:5001
```

Start the frontend:

```bash
npm run dev
```

The Vite development server normally runs at `http://localhost:5173`.

The booking and contact forms require the backend to be running separately. See the backend README for its setup, environment variables, database tables, and email configuration.

## Deployment

The frontend is deployed as a static Vite application on Render, while the Express API runs as a separate backend service.

Production setup requires:

- `VITE_API_URL` pointing to the deployed backend
- Backend CORS allowing the frontend domain
- Backend database and Resend environment variables
- A React Router rewrite from `/*` to `/index.html` on static hosting
- Verification that deep links such as `/pricing` and `/contact` load directly

Secrets such as the Supabase service key and Resend API key belong on the backend and must not be stored in frontend environment variables.

## Challenges and Decisions

### Keeping a Multi-Service Site Understandable

The business offers several kinds of support. Putting every detail on the homepage made navigation harder, so I used short previews with links to dedicated pages. This gave visitors a quick overview while keeping detailed information available when needed.

### Connecting Forms to a Separate API

The frontend and backend deploy independently. Using `VITE_API_URL` kept API requests consistent between local development and production. Testing both environments helped identify configuration errors rather than assuming a form that worked locally would also work after deployment.

### Resolving Contact Email Failures

After deploying the contact endpoint, the live form initially returned an error. Render logs showed first that the sender or recipient environment variable was missing, then that the sender domain was an unverified placeholder. I updated the backend service’s Render configuration to use the sender address already used for appointment emails and retested the live form.

### Revising Services Based on Client Feedback

The initial site included insurance-specific copy. After discussing the business’s requirements, I changed the public-facing offering to **Other Services** and removed unconfirmed coverage claims. This reinforced the importance of validating content with the business, not just making the UI look complete.

### Maintaining a Consistent Design

As more pages were added, styles began to diverge. I standardized the layout with modular CSS, consistent glass cards, typography, spacing, and mobile breakpoints. I also kept the homepage previews separate from full-page content so changes to one did not unintentionally affect the other.

## Testing Performed

I tested the following flows during development:

- Page navigation and direct route loading
- Tax booking form submission and backend connectivity
- Real estate request submission
- Tax appointment availability lookup
- Contact form submission on the deployed site
- Contact form success and error feedback
- Admin appointment display and management actions
- Mobile menu and responsive layouts
- Internal navigation to pricing, FAQ, services, and contact pages
- Official IRS external links

A successful form response should also be checked against its expected outcome, such as a stored appointment or an email arriving in the office inbox.

## Current Limitations and Next Steps

- Replace frontend-only admin password handling with backend-enforced authentication and role-based authorization.
- Add rate limiting or CAPTCHA to public forms to reduce spam.
- Confirm that office hours, starting prices, and service descriptions match current business information across all pages.
- Review published tax deadlines against current IRS guidance each tax year.
- Publish client testimonials and photos only with appropriate permission.
- Improve accessibility testing, including keyboard navigation and screen-reader review.
- Add monitoring and more comprehensive automated tests.

## What This Project Demonstrates

This project gave me experience turning a real business’s needs into a deployed full-stack application. It demonstrates React component design, responsive CSS, API integration, form state and feedback, client-side routing, deployment configuration, and debugging production issues using logs.

It also taught me that building software for a real client requires more than writing code. The site has to reflect accurate business information, communicate clearly with users, and handle sensitive workflows responsibly.

## Author

Samuel Jacquet
```