import { Link } from "react-router-dom";
import {
  FaCalendarCheck,
  FaCheckCircle,
  FaClipboardList,
  FaEnvelope,
  FaHandsHelping,
  FaPhoneAlt,
} from "react-icons/fa";
import Layout from "../components/Layout";

const photos = [
  { src: "/trusted-com1.jpg", alt: "Professional client support" },
  { src: "/contact-us-people.jpg", alt: "People discussing service needs" },
  { src: "/pro2.jpg", alt: "Business and document support" },
];

const waysWeHelp = [
  "Discuss which DPS service may fit your needs",
  "Help you prepare questions before an appointment",
  "Explain what information to bring for an initial conversation",
  "Connect you with the appropriate team member when available",
];

function InsuranceServices() {
  return (
    <Layout>
      <main className="section insurance-page-section">
        <div className="container insurance-page">
          <div className="insurance-hero-card">
            <p className="eyebrow">DPS Services</p>
            <h1>Other Services</h1>
            <p>
              Not sure where your request fits? Contact DPS Professional Tax
              Services to ask about additional support available at our
              Maplewood office. We’ll help you identify the right next step
              or let you know if a requested service is available.
            </p>
          </div>

          <div className="insurance-image-row">
            {photos.map(({ src, alt }) => (
              <div className="insurance-image-card" key={src}>
                <img src={src} alt={alt} loading="lazy" />
              </div>
            ))}
          </div>

          <div className="insurance-info-grid">
            <article className="insurance-info-card">
              <div className="insurance-block-title">
                <FaHandsHelping aria-hidden="true" />
                <h2>How We Can Help</h2>
              </div>
              <p>
                Tell us what you’re trying to accomplish. Our team can discuss
                available DPS services and help you determine whom to contact
                or which appointment to schedule.
              </p>
              <p>
                Service availability may vary. Please confirm the details
                with our office before visiting.
              </p>
            </article>

            <article className="insurance-info-card">
              <div className="insurance-block-title">
                <FaClipboardList aria-hidden="true" />
                <h2>Before You Reach Out</h2>
              </div>
              <ul className="insurance-list">
                {waysWeHelp.map((item) => (
                  <li key={item}>
                    <FaCheckCircle aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>

          <div className="insurance-cta">
            <div>
              <h2>Let’s Find the Right Next Step</h2>
              <p>
                Send a general question, book a visit, or call to confirm
                which services are currently available.
              </p>
            </div>
            <div className="insurance-cta-actions">
              <Link to="/contact">
                <FaEnvelope aria-hidden="true" /> Contact Us
              </Link>
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

export default InsuranceServices;
