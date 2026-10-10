import { Link } from "react-router-dom";
import {
  FaBriefcase,
  FaCalendarCheck,
  FaCheckCircle,
  FaClock,
  FaCopy,
  FaFax,
  FaFileAlt,
  FaPhoneAlt,
} from "react-icons/fa";
import Layout from "../components/Layout";

const photos = [
  { src: "/copy2.jpg", alt: "Copy and fax services" },
  { src: "/pro2.jpg", alt: "Professional document support" },
  { src: "/officelocation-1.jpg", alt: "DPS office" },
];

const services = [
  "Document copying for personal or business use",
  "Faxing forms and paperwork",
  "Help preparing pages for fax transmission",
  "In-office document support",
];

function CopyFax() {
  return (
    <Layout>
      <main className="section copyfax-page-section">
        <div className="container copyfax-page">
          <div className="copyfax-hero-card">
            <p className="eyebrow">DPS Services</p>
            <h1>Copy &amp; Fax Services</h1>
            <p>
              Need to copy or fax important paperwork? DPS Professional Tax
              Services offers convenient in-office document services for
              personal and business needs. Call ahead to confirm availability,
              pricing, and any requirements for your documents.
            </p>

            <div className="copyfax-hero-badges">
              <span className="copyfax-badge">
                <FaCopy aria-hidden="true" /> Copy Services
              </span>
              <span className="copyfax-badge">
                <FaFax aria-hidden="true" /> Fax Support
              </span>
              <span className="copyfax-badge">
                <FaClock aria-hidden="true" /> In-Office Help
              </span>
            </div>
          </div>

          <div className="copyfax-image-row">
            {photos.map(({ src, alt }) => (
              <div className="copyfax-image-card" key={src}>
                <img src={src} alt={alt} loading="lazy" />
              </div>
            ))}
          </div>

          <div className="copyfax-info-grid">
            <article className="copyfax-info-card">
              <div className="copyfax-block-title">
                <FaFileAlt aria-hidden="true" />
                <h2>What We Help With</h2>
              </div>
              <p>
                We help clients make copies of documents and send paperwork
                by fax. Whether you have a few pages or a time-sensitive
                form, our team can help you prepare the materials for
                in-office handling.
              </p>
              <p>
                Bring the documents and, for faxing, the correct recipient
                fax number. Confirm receipt with the recipient when needed.
              </p>
            </article>

            <article className="copyfax-info-card">
              <div className="copyfax-block-title">
                <FaFax aria-hidden="true" />
                <h2>Copy &amp; Fax Support</h2>
              </div>
              <ul className="copyfax-list">
                {services.map((service) => (
                  <li key={service}>
                    <FaCheckCircle aria-hidden="true" />
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="copyfax-info-card">
              <div className="copyfax-block-title">
                <FaCopy aria-hidden="true" />
                <h2>Before You Visit</h2>
              </div>
              <p>
                Check that your pages are complete and legible. If you need a
                fax sent, bring the recipient’s full fax number and any cover
                sheet or instructions they require.
              </p>
              <p>
                Please do not send sensitive documents through the public
                contact form. Bring them to the office or use an approved
                secure document-sharing option.
              </p>
            </article>

            <article className="copyfax-info-card">
              <div className="copyfax-block-title">
                <FaBriefcase aria-hidden="true" />
                <h2>Why Clients Choose DPS</h2>
              </div>
              <p>
                Clients can handle copying, faxing, and other practical
                document needs at one local office. We aim to keep the
                process clear and organized, with help available when you
                have questions about the service.
              </p>
            </article>
          </div>

          <div className="copyfax-cta">
            <div>
              <h2>Need Document Support?</h2>
              <p>
                Review pricing, reserve time, or call us to confirm that the
                service you need is available.
              </p>
            </div>
            <div className="copyfax-cta-actions">
              <Link to="/pricing">View Pricing</Link>
              <Link to="/booking">
                <FaCalendarCheck aria-hidden="true" /> Book Appointment
              </Link>
              <a href="tel:+19733272340">
                <FaPhoneAlt aria-hidden="true" /> Call the Office
              </a>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default CopyFax;
