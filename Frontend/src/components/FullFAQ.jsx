import { Link } from "react-router-dom";
import {
  FaCalendarAlt,
  FaCalendarCheck,
  FaExternalLinkAlt,
  FaFileAlt,
  FaLanguage,
  FaPhoneAlt,
} from "react-icons/fa";

const questions = [
  {
    icon: FaFileAlt,
    image: "/notary2.jpg",
    title: "What should I bring to my tax appointment?",
    answer:
      "Bring a valid photo ID, tax identification information, income records, and documents related to deductions, credits, dependents, or business income. Prior-year returns and IRS letters may also help.",
  },
  {
    icon: FaCalendarCheck,
    image: "/walk-ins1.jpg",
    title: "Do you accept walk-ins?",
    answer:
      "Walk-ins may be accepted depending on availability. Booking ahead helps reserve time with the right team member.",
  },
  {
    icon: FaLanguage,
    image: "/language1.jpg",
    title: "Do you offer help in multiple languages?",
    answer:
      "Ask our team about support in English, Kreyòl, French, and Spanish when scheduling your appointment.",
  },
];

const deadlineYears = [
  {
    year: "2026",
    taxYear: "2025",
    dates: [
      { title: "Individual filing", date: "April 15, 2026" },
      { title: "S Corporation", date: "March 16, 2026" },
      {
        title: "Partnerships and multi-member LLCs taxed as partnerships",
        date: "March 16, 2026",
      },
      { title: "Individual extension to file", date: "October 15, 2026" },
    ],
  },
  {
    year: "2027",
    taxYear: "2026",
    dates: [
      { title: "Individual filing", date: "April 15, 2027" },
      { title: "S Corporation", date: "March 15, 2027" },
      {
        title: "Partnerships and multi-member LLCs taxed as partnerships",
        date: "March 15, 2027",
      },
      { title: "Individual extension to file", date: "October 15, 2027" },
    ],
  },
];

const documents = [
  { form: "W-2", description: "Wage and Tax Statement" },
  { form: "W-2G", description: "Certain Gambling Winnings" },
  { form: "1098", description: "Mortgage Interest Statement" },
  { form: "1098-T", description: "Tuition Statement" },
  { form: "1099-MISC", description: "Miscellaneous Information" },
  { form: "1099-C", description: "Cancellation of Debt" },
  { form: "1099-NEC", description: "Nonemployee Compensation" },
  { form: "Rental records", description: "Rental income and expense records" },
  {
    form: "1099-B",
    description: "Proceeds from Broker and Barter Exchange Transactions",
  },
  { form: "1099-DIV", description: "Dividends and Distributions" },
  { form: "1099-INT", description: "Interest Income" },
  { form: "1099-R", description: "Retirement plan and annuity distributions" },
  { form: "1099-S", description: "Proceeds from Real Estate Transactions" },
  { form: "SSA-1099", description: "Social Security Benefit Statement" },
  {
    form: "CSA 1099-R",
    description: "Civil service annuity statement, if applicable",
  },
  {
    form: "5498-SA",
    description: "HSA, Archer MSA, or Medicare Advantage MSA information",
  },
];

const resources = [
  {
    title: "Check Your Refund",
    text: "View your federal refund status using the IRS’s official tool.",
    href: "https://www.irs.gov/refunds",
  },
  {
    title: "Make an IRS Payment",
    text: "Review secure federal tax payment options.",
    href: "https://www.irs.gov/payments",
  },
  {
    title: "Get a Tax Transcript",
    text: "Request your tax records directly from the IRS.",
    href: "https://www.irs.gov/individuals/get-transcript",
  },
];

function FullFAQ() {
  return (
    <section id="faq" className="section full-faq-section">
      <div className="container">
        <div className="faq-page-hero">
          <p className="eyebrow">Dates &amp; Resources</p>
          <h1>What to Bring &amp; FAQ</h1>
          <p>
            Prepare for your visit, review common questions, and find official
            sources for current tax deadlines and taxpayer tools.
          </p>
        </div>

        <section className="faq-page-group" aria-labelledby="faq-visit-title">
          <h2 id="faq-visit-title">Plan Your Visit</h2>
          <div className="faq-page-grid">
            {questions.map(({ icon: Icon, image, title, answer }) => (
              <article className="faq-page-card" key={title}>
                <img src={image} alt="" loading="lazy" />
                <div className="faq-page-card-content">
                  <Icon className="faq-page-icon" aria-hidden="true" />
                  <h3>{title}</h3>
                  <p>{answer}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="faq-page-group" aria-labelledby="faq-dates-title">
          <div className="faq-feature-grid faq-deadlines-feature">
            <div className="faq-feature-image">
              <img
                src="/tax-desktop.jpg"
                alt="Tax planning materials"
                loading="lazy"
              />
            </div>

            <div className="faq-feature-content">
              <h2 id="faq-dates-title">
                <FaCalendarAlt aria-hidden="true" /> Tax Deadlines
              </h2>

              {deadlineYears.map(({ year, taxYear, dates }) => (
                <div className="faq-deadline-year" key={year}>
                  <h3>
                    {year} deadlines{" "}
                    <span>for {taxYear} calendar-year returns</span>
                  </h3>
                  <dl className="faq-info-list">
                    {dates.map(({ title, date }) => (
                      <div className="faq-info-row" key={`${year}-${title}`}>
                        <dt>{title}</dt>
                        <dd>{date}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}

              <p className="faq-date-disclaimer">
                General federal dates for calendar-year filers. LLC deadlines
                depend on tax classification. An extension gives more time to
                file, not to pay. Confirm your deadline and any applicable
                relief with the IRS before relying on these dates.
              </p>

              <a
                className="faq-official-link"
                href="https://www.irs.gov/filing"
                target="_blank"
                rel="noopener noreferrer"
              >
                Confirm dates on IRS.gov
                <FaExternalLinkAlt aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <section
          className="faq-page-group"
          aria-labelledby="faq-documents-title"
        >
          <div className="faq-feature-grid faq-feature-grid-reverse">
            <div className="faq-feature-content">
              <h2 id="faq-documents-title">
                <FaFileAlt aria-hidden="true" /> What to Bring
              </h2>
              <p>Bring the documents that apply to your tax situation.</p>

              <dl className="faq-info-list faq-document-list">
                {documents.map(({ form, description }) => (
                  <div className="faq-info-row" key={form}>
                    <dt>{form}</dt>
                    <dd>{description}</dd>
                  </div>
                ))}
              </dl>

              <p className="faq-date-disclaimer">
                Also bring a photo ID, tax identification information,
                applicable business records, prior-year returns, and IRS
                notices. Do not send sensitive documents through the public
                contact form.
              </p>
            </div>

            <div className="faq-feature-image">
              <img
                src="/notary-2.jpg"
                alt="Documents prepared for an appointment"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        <section
          className="faq-page-group"
          aria-labelledby="faq-resources-title"
        >
          <h2 id="faq-resources-title">Helpful Resources</h2>
          <div className="faq-resource-grid">
            {resources.map(({ title, text, href }) => (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="faq-resource-card"
                key={title}
              >
                <h3>{title}</h3>
                <p>{text}</p>
                <span>
                  Visit IRS.gov <FaExternalLinkAlt aria-hidden="true" />
                </span>
              </a>
            ))}
          </div>
        </section>

        <div className="faq-page-contact">
          <div>
            <h2>Have another question?</h2>
            <p>Contact DPS or book a time to discuss your specific needs.</p>
          </div>
          <div className="faq-page-actions">
            <Link to="/contact">Contact Us</Link>
            <a href="tel:+19733272340">
              <FaPhoneAlt aria-hidden="true" /> Call the Office
            </a>
            <Link to="/booking">Book Now</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FullFAQ;
