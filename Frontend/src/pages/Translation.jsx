import Layout from "../components/Layout";
import Languages from "../components/Languages";
import {
  FaLanguage,
  FaFileAlt,
  FaComments,
  FaGlobeAmericas,
  FaCheckCircle,
  FaHandsHelping,
} from "react-icons/fa";

function Translation() {
  return (
    <Layout>
      <section className="section translation-page-section">
        <div className="container translation-page">
          <div className="translation-hero-card">
            <div className="translation-text">
              <p className="eyebrow">Our Services</p>
              <h1>Translation Services</h1>
              <p className="section-text">
                DPS Professional Tax Services provides translation support to help
                clients understand, complete, and submit important documents with
                confidence. We work with individuals and families who need clear,
                professional language support for personal, business, and
                administrative paperwork.
              </p>

              <div className="translation-hero-badges">
                <span className="translation-badge">
                  <FaLanguage />
                  Multilingual Support
                </span>
                <span className="translation-badge">
                  <FaComments />
                  Clear Communication
                </span>
                <span className="translation-badge">
                  <FaGlobeAmericas />
                  Community-Focused Service
                </span>
              </div>
            </div>
          </div>

          <div className="translation-image-row">
            <img
              src="/transla2.jpg"
              alt="Translation support services"
              className="translation-page-image"
            />
            <img
              src="/languages304.jpg"
              alt="Multilingual support"
              className="translation-page-image"
            />
            <img
              src="/transla1.jpg"
              alt="Language assistance"
              className="translation-page-image"
            />
          </div>

          <div className="service-content translation-content-card">
            <div className="translation-section-block">
              <div className="translation-block-title">
                <FaFileAlt />
                <h2>What We Help With</h2>
              </div>

              <p>
                We help clients who need support understanding written materials,
                completing forms, and communicating important information clearly.
                Our translation services are designed to reduce confusion and make
                the process easier for clients handling time-sensitive or
                important documents.
              </p>

              <p>
                Whether someone needs help with personal records, business forms,
                or general document support, we focus on making sure information
                is presented clearly, respectfully, and professionally.
              </p>
            </div>

            <div className="translation-section-block">
              <div className="translation-block-title">
                <FaLanguage />
                <h2>Types of Translation Support</h2>
              </div>

              <ul className="translation-list">
                <li>
                  <FaCheckCircle />
                  <span>General document translation support</span>
                </li>
                <li>
                  <FaCheckCircle />
                  <span>Help understanding forms and written paperwork</span>
                </li>
                <li>
                  <FaCheckCircle />
                  <span>Language assistance for personal documents</span>
                </li>
                <li>
                  <FaCheckCircle />
                  <span>Translation support for business-related materials</span>
                </li>
                <li>
                  <FaCheckCircle />
                  <span>Clear communication support for multilingual clients</span>
                </li>
                <li>
                  <FaCheckCircle />
                  <span>Help preparing documents before submission</span>
                </li>
              </ul>
            </div>

            <div className="translation-section-block">
              <div className="translation-block-title">
                <FaGlobeAmericas />
                <h2>We Speak Your Language</h2>
              </div>

              <p>
                We proudly support clients from a wide range of backgrounds and
                work to make communication easier through multilingual service.
                Our goal is to help every client feel understood, respected, and
                confident when handling important documents and paperwork.
              </p>
            </div>

            <div className="translation-section-block">
              <div className="translation-block-title">
                <FaHandsHelping />
                <h2>Why Clients Choose DPS</h2>
              </div>

              <p>
                Clients choose DPS because we understand how important clear
                communication is when handling official paperwork. We provide
                supportive, respectful, and detail-focused service so clients feel
                more confident moving forward.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Languages />
    </Layout>
  );
}

export default Translation;
