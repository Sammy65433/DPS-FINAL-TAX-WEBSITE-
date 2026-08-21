import Layout from "../components/Layout";
import {
  FaFileAlt,
  FaFolderOpen,
  FaLanguage,
  FaCheckCircle,
  FaHandsHelping,
  FaClipboardList,
} from "react-icons/fa";

function Immigration() {
  return (
    <Layout>
      <section className="section immigration-page-section">
        <div className="container immigration-page">
          <div className="immigration-hero-card">
            <div className="immigration-text">
              <p className="eyebrow">Our Services</p>
              <h1>Form Preparation Support</h1>
              <p className="section-text">
                DPS Professional Tax Services provides support for clients who
                need help organizing, understanding, and preparing important
                forms and supporting paperwork. We know documents can feel
                overwhelming, so we aim to make the process clearer, more
                organized, and less stressful.
              </p>

              <div className="immigration-hero-badges">
                <span className="immigration-badge">
                  <FaFileAlt />
                  Paperwork Support
                </span>
                <span className="immigration-badge">
                  <FaLanguage />
                  Language Assistance
                </span>
                <span className="immigration-badge">
                  <FaHandsHelping />
                  Respectful Guidance
                </span>
              </div>
            </div>
          </div>

          <div className="immigration-image-row">
            <img
              src="/transla2.jpg"
              alt="Paperwork support services"
              className="immigration-page-image"
            />
            <img
              src="/client-spanish3.jpg"
              alt="Client support services"
              className="immigration-page-image"
            />
            <img
              src="/contact-us-people.jpg"
              alt="Professional client assistance"
              className="immigration-page-image"
            />
          </div>

          <div className="service-content immigration-content-card">
            <div className="immigration-section-block">
              <div className="immigration-block-title">
                <FaFolderOpen />
                <h2>What We Help With</h2>
              </div>

              <p>
                We assist clients with preparing and organizing important forms
                and supporting paperwork. Our role is to help make sure documents
                are easier to understand, properly arranged, and ready for the
                next step in the process.
              </p>

              <p>
                We understand that paperwork can carry a lot of importance and
                urgency. That is why we focus on clear communication, patience,
                and careful attention to detail when supporting clients.
              </p>
            </div>

            <div className="immigration-section-block">
              <div className="immigration-block-title">
                <FaClipboardList />
                <h2>Types of Form Preparation Support</h2>
              </div>

              <ul className="immigration-list">
                <li>
                  <FaCheckCircle />
                  <span>Help organizing important forms</span>
                </li>
                <li>
                  <FaCheckCircle />
                  <span>Support reviewing required documents</span>
                </li>
                <li>
                  <FaCheckCircle />
                  <span>General assistance preparing paperwork for submission</span>
                </li>
                <li>
                  <FaCheckCircle />
                  <span>Language support when needed</span>
                </li>
                <li>
                  <FaCheckCircle />
                  <span>Help understanding document requirements</span>
                </li>
                <li>
                  <FaCheckCircle />
                  <span>Guidance through document preparation steps</span>
                </li>
              </ul>
            </div>

            <div className="immigration-section-block">
              <div className="immigration-block-title">
                <FaHandsHelping />
                <h2>Why Clients Choose DPS</h2>
              </div>

              <p>
                Clients choose DPS because we provide a professional, respectful,
                and supportive experience. We know these documents matter, and we
                work to help clients feel more confident and prepared throughout
                the process.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Immigration;
