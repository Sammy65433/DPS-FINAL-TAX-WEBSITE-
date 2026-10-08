import { Link } from "react-router-dom";
import {
  FaCalendarCheck,
  FaFileInvoiceDollar,
  FaHandshake,
  FaLanguage,
  FaMapMarkerAlt,
  FaStamp,
} from "react-icons/fa";
import Layout from "../components/Layout";

const services = [
  {
    icon: FaFileInvoiceDollar,
    title: "Tax services",
    text: "Support for individual returns, self-employment and small-business tax needs, and organizing the documents needed to prepare a return.",
    to: "/tax-preparation",
    linkText: "Explore tax services",
  },
  {
    icon: FaStamp,
    title: "Notary public",
    text: "Connect with our team about documents that need notarization and what to bring to your visit.",
    to: "/notary",
    linkText: "Explore notary services",
  },
  {
    icon: FaLanguage,
    title: "Translation services",
    text: "Ask about language support and document translation services available through DPS.",
    to: "/translation",
    linkText: "Explore translation services",
  },
];

function AboutPage() {
  return (
    <Layout>
      <main className="about-page">
        <section className="section about-hero">
          <div className="container">
            <div className="about-hero-card">
              <p className="eyebrow">Get to know DPS</p>
              <h1>DPS Professional Tax Services</h1>
              <p>
                Tax services and practical document support, centered on
                helping you understand what to bring, what to expect, and how
                to take the next step.
              </p>
              <div className="about-actions">
                <Link to="/booking" className="btn">
                  Book an Appointment
                </Link>
                <Link to="/services" className="btn btn-outline">
                  View All Services
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="section about-intro">
          <div className="container">
            <div className="about-intro-card">
              <p className="eyebrow">How we help</p>
              <h2>Support that starts with your situation</h2>
              <p>
                Tax questions are not one-size-fits-all. You may be filing an
                individual return, reporting self-employment income, or
                gathering records for a small business. DPS helps clients
                prepare for those conversations by reviewing the services
                they need and the information they bring.
              </p>
              <p>
                We also offer other everyday services, including notary and
                translation support. Browse the service pages for details,
                then book a time to discuss your needs with the team.
              </p>
            </div>

            <div className="about-service-grid">
              {services.map(({ icon: Icon, title, text, to, linkText }) => (
                <article className="about-service-card" key={title}>
                  <span className="about-icon-wrap">
                    <Icon aria-hidden="true" />
                  </span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <Link to={to} className="about-card-link">
                    {linkText} <span aria-hidden="true">→</span>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section about-approach">
          <div className="container about-approach-grid">
            <div className="about-approach-card">
              <FaHandshake aria-hidden="true" />
              <h2>A conversation, not a guessing game</h2>
              <p>
                Let us know what you are working on. Our team can help you
                identify the relevant DPS service and discuss which records
                or documents to have ready.
              </p>
              <Link to="/contact">Contact our team →</Link>
            </div>
            <div className="about-approach-card">
              <FaCalendarCheck aria-hidden="true" />
              <h2>Plan your visit</h2>
              <p>
                Choose an available appointment, select your preferred
                preparer, and tell us whether you prefer to meet in person,
                over the phone, or virtually.
              </p>
              <Link to="/booking">Book your appointment →</Link>
            </div>
          </div>
        </section>

        <section className="section about-visit">
          <div className="container">
            <div className="about-visit-card">
              <span className="about-icon-wrap">
                <FaMapMarkerAlt aria-hidden="true" />
              </span>
              <div>
                <p className="eyebrow">Find us</p>
                <h2>Visit us in Maplewood</h2>
                <p>1811 Springfield Ave, Maplewood, NJ 07040</p>
                <p>
                  Have a question before booking? Call{" "}
                  <a href="tel:+19733272340">(973) 327-2340</a>.
                </p>
              </div>
              <Link to="/contact" className="btn">
                Contact DPS
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default AboutPage;
