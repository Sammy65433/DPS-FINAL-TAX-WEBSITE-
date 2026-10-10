import { Link } from "react-router-dom";
import {
  FaBriefcase,
  FaCalendarCheck,
  FaCheckCircle,
  FaClipboardCheck,
  FaEnvelope,
  FaFileSignature,
  FaStamp,
  FaUserCheck,
} from "react-icons/fa";
import Layout from "../components/Layout";

const photos = [
  { src: "/notaary4.jpg", alt: "Notary services at DPS" },
  { src: "/notary2.jpg", alt: "Documents prepared for signing" },
  { src: "/walk-ins1.jpg", alt: "In-office client support" },
];

const notaryServices = [
  "Personal document notarization",
  "Business document notarization",
  "Signature witnessing, when applicable",
  "In-office notary appointments",
  "Preparing for a notary visit",
];

function Notary() {
  return (
    <Layout>
      <main className="section notary-page-section">
        <div className="container notary-page">
          <div className="notary-hero-card">
            <p className="eyebrow">DPS Services</p>
            <h1>Notary Services</h1>
            <p>
              Important documents deserve careful attention. DPS Professional
              Tax Services offers notary services for clients who need their
              signatures notarized in a professional, welcoming setting.
              Contact us to confirm availability and the requirements for
              your document before visiting.
            </p>

            <div className="notary-hero-badges">
              <span className="notary-badge">
                <FaStamp aria-hidden="true" /> Notary Support
              </span>
              <span className="notary-badge">
                <FaFileSignature aria-hidden="true" /> Important Documents
              </span>
              <span className="notary-badge">
                <FaUserCheck aria-hidden="true" /> Personal Service
              </span>
            </div>
          </div>

          <div className="notary-image-row">
            {photos.map(({ src, alt }) => (
              <div className="notary-image-card" key={src}>
                <img src={src} alt={alt} loading="lazy" />
              </div>
            ))}
          </div>

          <div className="notary-info-grid">
            <article className="notary-info-card">
              <div className="notary-block-title">
                <FaClipboardCheck aria-hidden="true" />
                <h2>What We Help With</h2>
              </div>
              <p>
                We assist with documents that require a notarial act, such as
                verifying the identity of a signer and completing the
                appropriate notarial certificate. Requirements depend on the
                document and the type of notarization requested.
              </p>
              <p>
                If you’re unsure what your document needs, ask the organization
                requesting it which notarial act is required before your visit.
              </p>
            </article>

            <article className="notary-info-card">
              <div className="notary-block-title">
                <FaStamp aria-hidden="true" />
                <h2>Notary Services</h2>
              </div>
              <ul className="notary-list">
                {notaryServices.map((service) => (
                  <li key={service}>
                    <FaCheckCircle aria-hidden="true" />
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="notary-info-card">
              <div className="notary-block-title">
                <FaFileSignature aria-hidden="true" />
                <h2>Before Your Visit</h2>
              </div>
              <p>
                Bring the document to be notarized and a current, acceptable
                photo ID. Everyone whose signature must be notarized should
                be present. Wait to sign until the notary advises you, and
                bring any required witnesses if the document calls for them.
              </p>
              <p>
                Please call ahead if you have questions about witnesses,
                identification, or mobile service availability.
              </p>
            </article>

            <article className="notary-info-card">
              <div className="notary-block-title">
                <FaBriefcase aria-hidden="true" />
                <h2>Why Clients Choose DPS</h2>
              </div>
              <p>
                We aim to make your visit straightforward, respectful, and
                efficient. Our team can explain the notary appointment process
                and help you prepare for your visit.
              </p>
              <p>
                A notary verifies required facts for a notarial act; they
                cannot provide legal advice or decide which notarization
                your document requires.
              </p>
            </article>
          </div>

          <div className="notary-cta">
            <div>
              <h2>Ready to Visit?</h2>
              <p>
                Check pricing, book an appointment, or contact DPS with a
                question about availability.
              </p>
            </div>
            <div className="notary-cta-actions">
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

export default Notary;
