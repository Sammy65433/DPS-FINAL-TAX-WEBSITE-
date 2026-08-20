import Layout from "../components/Layout";
import {
  FaShieldAlt,
  FaHeart,
  FaCar,
  FaUserMd,
  FaCheckCircle,
  FaHandsHelping,
} from "react-icons/fa";

function InsuranceServices() {
  return (
    <Layout>
      <section className="section insurance-page-section">
        <div className="container insurance-page">
          <div className="insurance-hero-card">
            <div className="insurance-text">
              <p className="eyebrow">Our Services</p>
              <h1>Insurance Services</h1>
              <p className="section-text">
                DPS Professional Tax Services provides guidance for clients
                exploring insurance options for everyday personal and family
                needs. We help clients better understand available coverage and
                take the next step with confidence.
              </p>

              <div className="insurance-hero-badges">
                <span className="insurance-badge">
                  <FaShieldAlt />
                  Coverage Guidance
                </span>
                <span className="insurance-badge">
                  <FaHandsHelping />
                  Supportive Service
                </span>
                <span className="insurance-badge">
                  <FaHeart />
                  Family-Focused Help
                </span>
              </div>
            </div>
          </div>

          <div className="insurance-image-row">
            <img
              src="/insurance113.jpg"
              alt="Insurance guidance services"
              className="insurance-page-image"
            />
            <img
              src="/trusted-com1.jpg"
              alt="Trusted client support"
              className="insurance-page-image"
            />
            <img
              src="/insurance112.jpg"
              alt="Business and personal planning"
              className="insurance-page-image"
            />
          </div>

          <div className="service-content insurance-content-card">
            <div className="insurance-section-block">
              <div className="insurance-block-title">
                <FaShieldAlt />
                <h2>What We Help With</h2>
              </div>

              <p>
                We help clients navigate general insurance questions and connect
                with coverage options that fit their needs. Whether someone is
                looking for personal coverage or wants to better understand
                available plans, we provide clear and supportive guidance.
              </p>

              <p>
                Insurance decisions can feel overwhelming, so we focus on helping
                clients understand their options in a practical, approachable,
                and professional way.
              </p>
            </div>

            <div className="insurance-section-block">
              <div className="insurance-block-title">
                <FaHeart />
                <h2>Types of Insurance Support</h2>
              </div>

              <ul className="insurance-list">
                <li>
                  <FaCheckCircle />
                  <span>General guidance for personal insurance needs</span>
                </li>
                <li>
                  <FaCheckCircle />
                  <span>Support exploring life insurance options</span>
                </li>
                <li>
                  <FaCheckCircle />
                  <span>
                    <FaCar className="insurance-inline-icon" />
                    Auto insurance guidance
                  </span>
                </li>
                <li>
                  <FaCheckCircle />
                  <span>
                    <FaUserMd className="insurance-inline-icon" />
                    Health-related coverage guidance
                  </span>
                </li>
                <li>
                  <FaCheckCircle />
                  <span>Basic help understanding plan information</span>
                </li>
                <li>
                  <FaCheckCircle />
                  <span>
                    Guidance for individuals, families, and small business owners
                  </span>
                </li>
              </ul>
            </div>

            <div className="insurance-section-block">
              <div className="insurance-block-title">
                <FaHandsHelping />
                <h2>Why Clients Choose DPS</h2>
              </div>

              <p>
                Clients choose DPS because we provide patient, professional, and
                trustworthy support. We aim to make insurance conversations
                easier to understand so clients can make informed decisions with
                greater confidence.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default InsuranceServices;
