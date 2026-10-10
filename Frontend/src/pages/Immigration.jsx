import { Link } from "react-router-dom";
import {
  FaCalendarCheck,
  FaCheckCircle,
  FaClipboardList,
  FaFileAlt,
  FaFolderOpen,
  FaHandsHelping,
  FaLanguage,
  FaPhoneAlt,
} from "react-icons/fa";
import Layout from "../components/Layout";

const photos = [
  { src: "/transla2.jpg", alt: "Documents and paperwork" },
  { src: "/client-spanish3.jpg", alt: "Client receiving support" },
  { src: "/contact-us-people.jpg", alt: "Professional client assistance" },
];

const supportItems = [
  "Organizing forms and supporting documents",
  "Reviewing paperwork for completeness",
  "Preparing forms using information you provide",
  "Language support when available",
  "Explaining the document preparation process",
];

function Immigration() {
  return (
    <Layout>
      <main className="section immigration-page-section">
        <div className="container immigration-page">
          <div className="immigration-hero-card">
            <p className="eyebrow">DPS Services</p>
            <h1>Form Preparation Support</h1>
            <p>
              Important paperwork can feel overwhelming. DPS Professional Tax
              Services helps clients organize documents and prepare forms
              using the information they provide. Our focus is on clear
              communication, careful organization, and a respectful experience.
            </p>
            <div className="immigration-hero-badges">
              <span className="immigration-badge">
                <FaFileAlt aria-hidden="true" /> Paperwork Support
              </span>
              <span className="immigration-badge">
                <FaLanguage aria-hidden="true" /> Language Assistance
              </span>
              <span className="immigration-badge">
                <FaHandsHelping aria-hidden="true" /> Personal Attention
              </span>
            </div>
          </div>

          <div className="immigration-image-row">
            {photos.map(({ src, alt }) => (
              <div className="immigration-image-card" key={src}>
                <img src={src} alt={alt} loading="lazy" />
              </div>
            ))}
          </div>

          <div className="immigration-info-grid">
            <article className="immigration-info-card">
              <div className="immigration-block-title">
                <FaFolderOpen aria-hidden="true" />
                <h2>What We Help With</h2>
              </div>
              <p>
                We can help organize the forms and supporting documents you
                bring, identify missing information, and prepare paperwork
                based on the details you provide.
              </p>
              <p>
                Contact our office before visiting to confirm whether we
                support the specific form you need and what to bring.
              </p>
            </article>

            <article className="immigration-info-card">
              <div className="immigration-block-title">
                <FaClipboardList aria-hidden="true" />
                <h2>Types of Support</h2>
              </div>
              <ul className="immigration-list">
                {supportItems.map((item) => (
                  <li key={item}>
                    <FaCheckCircle aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="immigration-info-card">
              <div className="immigration-block-title">
                <FaFileAlt aria-hidden="true" />
                <h2>Before Your Visit</h2>
              </div>
              <p>
                Bring the form instructions, your identification, and any
                supporting documents requested by the organization receiving
                the paperwork. Call first if you are unsure which documents
                are needed.
              </p>
              <p>
                Please use a secure method for sensitive documents rather
                than sending them through our public contact form.
              </p>
            </article>

            <article className="immigration-info-card">
              <div className="immigration-block-title">
                <FaHandsHelping aria-hidden="true" />
                <h2>Our Approach</h2>
              </div>
              <p>
                We aim to provide patient, organized support so clients can
                better understand the preparation steps. Form preparation
                support is not legal advice or legal representation.
              </p>
              <p>
                For legal questions or advice about immigration eligibility,
                contact a licensed attorney or an accredited representative.
              </p>
            </article>
          </div>

          <div className="immigration-cta">
            <div>
              <h2>Need Help Getting Started?</h2>
              <p>
                Confirm availability, ask about pricing, or book time with
                our team.
              </p>
            </div>
            <div className="immigration-cta-actions">
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

export default Immigration;
