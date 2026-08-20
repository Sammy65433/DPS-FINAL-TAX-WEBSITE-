import Layout from "../components/Layout";
import {
  FaCopy,
  FaFax,
  FaFileAlt,
  FaCheckCircle,
  FaClock,
  FaBriefcase,
} from "react-icons/fa";

function CopyFax() {
  return (
    <Layout>
      <section className="section copyfax-page-section">
        <div className="container copyfax-page">
          <div className="copyfax-hero-card">
            <div className="copyfax-text">
              <p className="eyebrow">Our Services</p>
              <h1>Copy & Fax Services</h1>
              <p className="section-text">
                DPS Professional Tax Services offers convenient on-site copy and
                fax services for clients who need fast, reliable support with
                important documents. Whether for personal, business, or
                administrative use, we help make the process quick and simple.
              </p>

              <div className="copyfax-hero-badges">
                <span className="copyfax-badge">
                  <FaCopy />
                  Quick Copy Services
                </span>
                <span className="copyfax-badge">
                  <FaFax />
                  Reliable Fax Support
                </span>
                <span className="copyfax-badge">
                  <FaClock />
                  Fast In-Office Help
                </span>
              </div>
            </div>
          </div>

          <div className="copyfax-image-row">
            <img
              src="/copy2.jpg"
              alt="Copy and fax services"
              className="copyfax-page-image"
            />
            <img
              src="/pro2.jpg"
              alt="Professional document support"
              className="copyfax-page-image"
            />
            <img
              src="/officelocation-1.jpg"
              alt="Office support services"
              className="copyfax-page-image"
            />
          </div>

          <div className="service-content copyfax-content-card">
            <div className="copyfax-section-block">
              <div className="copyfax-block-title">
                <FaFileAlt />
                <h2>What We Help With</h2>
              </div>

              <p>
                We help clients who need copies of important paperwork or who
                need to send documents quickly by fax. Our service is designed to
                be straightforward and dependable, especially for clients handling
                time-sensitive forms or official records.
              </p>

              <p>
                Whether you need a few pages copied, documents prepared for
                faxing, or general assistance with paperwork handling, we provide
                a simple in-office solution that saves time and keeps the process
                organized.
              </p>
            </div>

            <div className="copyfax-section-block">
              <div className="copyfax-block-title">
                <FaFax />
                <h2>Types of Copy & Fax Support</h2>
              </div>

              <ul className="copyfax-list">
                <li>
                  <FaCheckCircle />
                  <span>Document copying for personal or business use</span>
                </li>
                <li>
                  <FaCheckCircle />
                  <span>Faxing important forms and paperwork</span>
                </li>
                <li>
                  <FaCheckCircle />
                  <span>Support preparing documents for transmission</span>
                </li>
                <li>
                  <FaCheckCircle />
                  <span>Convenient in-office document services</span>
                </li>
                <li>
                  <FaCheckCircle />
                  <span>Help with everyday paperwork needs</span>
                </li>
                <li>
                  <FaCheckCircle />
                  <span>Reliable support for time-sensitive document handling</span>
                </li>
              </ul>
            </div>

            <div className="copyfax-section-block">
              <div className="copyfax-block-title">
                <FaBriefcase />
                <h2>Why Clients Choose DPS</h2>
              </div>

              <p>
                Clients choose DPS because we offer a convenient and professional
                place to handle important document tasks. We focus on making the
                process easy, organized, and dependable for every client who
                needs support.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default CopyFax;
