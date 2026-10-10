import { Link } from "react-router-dom";
import {
  FaBriefcase,
  FaCalendarCheck,
  FaCheckCircle,
  FaEnvelope,
  FaFileAlt,
  FaFileInvoiceDollar,
  FaFolderOpen,
  FaShieldAlt,
  FaUserCheck,
} from "react-icons/fa";
import Layout from "../components/Layout";

const taxTypes = [
  "Individual tax returns",
  "Joint and family tax filing",
  "Self-employed and independent contractor returns",
  "Small-business tax preparation",
  "Business filing consultations",
  "Organizing common income documents and records",
];

const photos = [
  { src: "/tax-prep-hands.jpg", alt: "Clients discussing tax preparation" },
  { src: "/tax-prep-people.jpg", alt: "Professional tax preparation support" },
  { src: "/tax-prep1.jpg", alt: "Tax preparation consultation" },
];

function TaxPrep() {
  return (
    <Layout>
      <main className="section taxprep-page-section">
        <div className="container taxprep-page">
          <div className="taxprep-hero-card">
            <p className="eyebrow">DPS Services</p>
            <h1>Tax Preparation</h1>
            <p>
              Tax season can bring questions about income, documents, and
              deadlines. DPS Professional Tax Services helps individuals,
              families, self-employed professionals, and businesses prepare
              their returns with clear communication and personal attention.
            </p>

            <div className="taxprep-hero-badges">
              <span className="taxprep-badge">
                <FaUserCheck aria-hidden="true" /> Personal Support
              </span>
              <span className="taxprep-badge">
                <FaBriefcase aria-hidden="true" /> Business Filing Help
              </span>
              <span className="taxprep-badge">
                <FaShieldAlt aria-hidden="true" /> Clear Next Steps
              </span>
            </div>
          </div>

          <div className="taxprep-image-row">
            {photos.map(({ src, alt }) => (
              <div className="taxprep-image-card" key={src}>
                <img src={src} alt={alt} loading="lazy" />
              </div>
            ))}
          </div>

          <div className="taxprep-info-grid">
            <article className="taxprep-info-card">
              <div className="taxprep-block-title">
                <FaFolderOpen aria-hidden="true" />
                <h2>What We Help With</h2>
              </div>
              <p>
                We help you identify the records relevant to your return,
                review the information you bring, and talk through the filing
                process. If your situation involves multiple income sources
                or business activity, we can discuss what additional details
                may be needed.
              </p>
              <p>
                Our goal is to make the process more organized and easier to
                understand, so you know what to expect at each step.
              </p>
            </article>

            <article className="taxprep-info-card">
              <div className="taxprep-block-title">
                <FaFileInvoiceDollar aria-hidden="true" />
                <h2>Types of Tax Preparation</h2>
              </div>
              <ul className="taxprep-list">
                {taxTypes.map((type) => (
                  <li key={type}>
                    <FaCheckCircle aria-hidden="true" />
                    <span>{type}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="taxprep-info-card">
              <div className="taxprep-block-title">
                <FaBriefcase aria-hidden="true" />
                <h2>Business Tax Support</h2>
              </div>
              <p>
                For business owners and independent contractors, preparation
                starts with organized income and expense records. We can help
                you understand which business information to bring and discuss
                the filing services relevant to your situation.
              </p>
              <Link to="/business-services" className="taxprep-text-link">
                Explore Business Services →
              </Link>
            </article>

            <article className="taxprep-info-card">
              <div className="taxprep-block-title">
                <FaUserCheck aria-hidden="true" />
                <h2>What to Expect at DPS</h2>
              </div>
              <p>
                We focus on listening to your questions, explaining the
                documents needed, and providing a respectful, professional
                experience. Before your visit, review our document checklist
                so you can arrive prepared.
              </p>
              <Link to="/faq" className="taxprep-text-link">
                <FaFileAlt aria-hidden="true" />
                What to Bring &amp; FAQ
              </Link>
            </article>
          </div>

          <div className="taxprep-cta">
            <div>
              <h2>Ready to Get Started?</h2>
              <p>
                Review pricing, reserve an appointment, or contact our team
                with a general question.
              </p>
            </div>
            <div className="taxprep-cta-actions">
              <Link to="/pricing">View Pricing</Link>
              <Link to="/booking">
                <FaCalendarCheck aria-hidden="true" /> Book Appointment
              </Link>
              <Link to="/contact">
                <FaEnvelope aria-hidden="true" /> Contact Us
              </Link>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default TaxPrep;
