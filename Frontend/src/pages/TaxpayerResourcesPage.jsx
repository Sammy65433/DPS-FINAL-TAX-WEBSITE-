import { Link } from "react-router-dom";
import {
  FaCalendarAlt,
  FaExternalLinkAlt,
  FaFileAlt,
  FaFileInvoiceDollar,
  FaMoneyCheckAlt,
  FaShieldAlt,
} from "react-icons/fa";
import Layout from "../components/Layout";

const resources = [
  {
    icon: FaFileInvoiceDollar,
    title: "Check Your Refund",
    text: "Track the status of a federal tax refund using the IRS’s official refund tool. Have your filing status, refund amount, and identifying information ready when visiting IRS.gov.",
    href: "https://www.irs.gov/refunds",
    linkText: "Check refund status",
  },
  {
    icon: FaMoneyCheckAlt,
    title: "Make an IRS Payment",
    text: "Review the IRS’s payment options and choose the method that fits your situation. Payments to the IRS should be made directly through an official IRS service.",
    href: "https://www.irs.gov/payments",
    linkText: "View IRS payment options",
  },
  {
    icon: FaFileAlt,
    title: "Get Tax Records & Transcripts",
    text: "Request a tax transcript or review available tax records directly from the IRS. These records can be useful when preparing a return or resolving an account question.",
    href: "https://www.irs.gov/individuals/get-transcript",
    linkText: "Get a tax transcript",
  },
];

const photos = [
  { src: "/tax-prep-hands.jpg", alt: "Preparing tax documents" },
  { src: "/tax-prep-people.jpg", alt: "Discussing tax records" },
  { src: "/tax-prep1.jpg", alt: "Tax preparation consultation" },
];

function TaxpayerResourcesPage() {
  return (
    <Layout>
      <main className="section taxpayer-resources-page">
        <div className="container">
          <div className="taxpayer-hero-card">
            <p className="eyebrow">Taxpayer Resources</p>
            <h1>Official IRS Resources</h1>
            <p>
              Find official tools for refund status, federal tax payments,
              and tax records in one place. These links take you directly
              to IRS.gov, so you can use the most current information
              available.
            </p>
          </div>

          <div className="taxpayer-resource-grid">
            {resources.map(({ icon: Icon, title, text, href, linkText }) => (
              <a
                key={title}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="taxpayer-resource-card"
              >
                <span className="taxpayer-icon-wrap">
                  <Icon aria-hidden="true" />
                </span>
                <h2>{title}</h2>
                <p>{text}</p>
                <span className="taxpayer-card-link">
                  {linkText} <FaExternalLinkAlt aria-hidden="true" />
                </span>
              </a>
            ))}
          </div>

          <div className="taxpayer-photo-grid">
            {photos.map(({ src, alt }) => (
              <div className="taxpayer-photo-card" key={src}>
                <img src={src} alt={alt} loading="lazy" />
              </div>
            ))}
          </div>

          <div className="taxpayer-guidance">
            <div>
              <FaCalendarAlt aria-hidden="true" />
              <h2>Looking for deadlines or a document checklist?</h2>
              <p>
                Visit our What to Bring &amp; FAQ page for general filing-date
                information and common tax documents to gather before your
                appointment. Confirm any deadline with the IRS, since dates
                may vary by tax year or circumstance.
              </p>
              <Link to="/faq">View What to Bring &amp; FAQ →</Link>
            </div>

            <div>
              <FaShieldAlt aria-hidden="true" />
              <h2>Protect Your Information</h2>
              <p>
                Check that the website address ends in <strong>irs.gov</strong>
                before entering personal information. Do not share Social
                Security numbers, tax documents, or account credentials
                through the DPS public contact form or ordinary email.
              </p>
              <a
                href="https://www.irs.gov/privacy-disclosure/report-phishing"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn about IRS phishing protection
                <FaExternalLinkAlt aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="taxpayer-bottom-card">
            <h2>Need help preparing for your appointment?</h2>
            <p>
              Our team can discuss what to bring and which DPS service may
              fit your needs. For account-specific issues, use the official
              IRS tools above.
            </p>
            <div className="taxpayer-bottom-actions">
              <Link to="/booking">Book Appointment</Link>
              <Link to="/contact">Contact DPS</Link>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default TaxpayerResourcesPage;
