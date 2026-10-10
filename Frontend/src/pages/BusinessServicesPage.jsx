import { Link } from "react-router-dom";
import {
  FaBuilding,
  FaCalendarCheck,
  FaCheckCircle,
  FaClipboardList,
  FaEnvelope,
  FaFileInvoiceDollar,
  FaUsersCog,
} from "react-icons/fa";
import Layout from "../components/Layout";

const services = [
  {
    icon: FaBuilding,
    image: "/pricing-page-taxes-smallbuisness.jpg",
    title: "Business Tax Preparation",
    text: "Tax preparation support for sole proprietors, LLCs, and growing businesses. We help you identify the records needed to discuss your filing needs.",
  },
  {
    icon: FaFileInvoiceDollar,
    image: "/pro2.jpg",
    title: "Financial Document Support",
    text: "Help organizing income, expenses, and other business records so your information is easier to review and prepare for filing.",
  },
  {
    icon: FaClipboardList,
    image: "/tax-desktop.jpg",
    title: "Compliance & Filing Guidance",
    text: "Support with preparing filing information and understanding which documents to bring for a conversation about your business needs.",
  },
  {
    icon: FaUsersCog,
    image: "/pricing-page-taxes-w7.jpg",
    title: "Business Consultation",
    text: "One-on-one time to discuss your small business’s tax preparation and practical document-support needs.",
  },
];

const audience = [
  "Small business owners",
  "Independent contractors",
  "LLCs and family-run businesses",
  "Businesses needing record and filing support",
  "Owners seeking one-on-one consultation",
];

function BusinessServicesPage() {
  return (
    <Layout>
      <main className="section business-page-section">
        <div className="container business-page">
          <div className="business-hero-card">
            <p className="eyebrow">Business Services</p>
            <h1>Support for Small Businesses</h1>
            <p>
              Running a business comes with a lot of moving parts. DPS
              Professional Tax Services helps owners prepare for tax
              conversations, organize important records, and understand the
              next steps for the services they need.
            </p>
          </div>

          <div className="business-content-card business-audience-card">
            <div className="business-block-title">
              <FaBuilding aria-hidden="true" />
              <h2>Who This Page Is For</h2>
            </div>
            <ul className="business-list">
              {audience.map((item) => (
                <li key={item}>
                  <FaCheckCircle aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="business-services-grid">
            {services.map(({ icon: Icon, image, title, text }) => (
              <article className="business-service-card" key={title}>
                <img src={image} alt="" loading="lazy" />
                <div className="business-service-content">
                  <span className="business-service-icon">
                    <Icon aria-hidden="true" />
                  </span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="business-content-card business-contact-card">
            <div>
              <div className="business-block-title">
                <FaEnvelope aria-hidden="true" />
                <h2>Let’s Talk About Your Business</h2>
              </div>
              <p>
                Tell us what you’re working on, and our team can help you
                identify a practical next step.
              </p>
            </div>

            <div className="business-cta-row">
              <Link to="/contact" className="business-cta-link">
                <FaEnvelope aria-hidden="true" />
                Contact Us
              </Link>
              <Link to="/booking" className="business-cta-link">
                <FaCalendarCheck aria-hidden="true" />
                Book Appointment
              </Link>
              <Link
                to="/pricing"
                className="business-cta-link business-cta-link-pricing"
              >
                <FaFileInvoiceDollar aria-hidden="true" />
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default BusinessServicesPage;
