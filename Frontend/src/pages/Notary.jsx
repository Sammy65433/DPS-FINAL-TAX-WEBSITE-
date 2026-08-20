import Layout from "../components/Layout";
import {
  FaStamp,
  FaFileSignature,
  FaUserCheck,
  FaBriefcase,
  FaCheckCircle,
  FaClipboardCheck,
} from "react-icons/fa";

function Notary() {
  return (
    <Layout>
      <section className="section notary-page-section">
        <div className="container notary-page">
          <div className="notary-hero-card">
            <div className="notary-text">
              <p className="eyebrow">Our Services</p>
              <h1>Notary Services</h1>
              <p className="section-text">
                DPS Professional Tax Services offers professional notary support
                for clients who need important documents witnessed, signed, and
                notarized properly. We help make the process simple, reliable,
                and convenient.
              </p>

              <div className="notary-hero-badges">
                <span className="notary-badge">
                  <FaStamp />
                  Trusted Notary Support
                </span>
                <span className="notary-badge">
                  <FaFileSignature />
                  Important Documents
                </span>
                <span className="notary-badge">
                  <FaUserCheck />
                  Professional Service
                </span>
              </div>
            </div>
          </div>

          <div className="notary-image-row">
            <img
              src="/notaary4.jpg"
              alt="Notary services"
              className="notary-page-image"
            />
            <img
              src="/notary2.jpg"
              alt="Document signing"
              className="notary-page-image"
            />
            <img
              src="/walk-ins1.jpg"
              alt="Client service support"
              className="notary-page-image"
            />
          </div>

          <div className="service-content notary-content-card">
            <div className="notary-section-block">
              <div className="notary-block-title">
                <FaClipboardCheck />
                <h2>What We Help With</h2>
              </div>

              <p>
                We assist clients who need documents notarized for personal,
                legal, business, or financial purposes. Our goal is to provide a
                smooth and professional experience while helping clients complete
                the required steps correctly.
              </p>

              <p>
                We understand that notarized documents are often time-sensitive,
                so we focus on making the process efficient while maintaining
                accuracy, professionalism, and clear communication throughout the
                visit.
              </p>
            </div>

            <div className="notary-section-block">
              <div className="notary-block-title">
                <FaStamp />
                <h2>Types of Notary Support</h2>
              </div>

              <ul className="notary-list">
                <li>
                  <FaCheckCircle />
                  <span>Personal document notarization</span>
                </li>
                <li>
                  <FaCheckCircle />
                  <span>Business-related document notarization</span>
                </li>
                <li>
                  <FaCheckCircle />
                  <span>Forms requiring signatures and witness verification</span>
                </li>
                <li>
                  <FaCheckCircle />
                  <span>General support for official paperwork</span>
                </li>
                <li>
                  <FaCheckCircle />
                  <span>Convenient in-office service for clients</span>
                </li>
                <li>
                  <FaCheckCircle />
                  <span>Guidance on preparing documents before notarization</span>
                </li>
              </ul>
            </div>

            <div className="notary-section-block">
              <div className="notary-block-title">
                <FaBriefcase />
                <h2>Why Clients Choose DPS</h2>
              </div>

              <p>
                Clients choose DPS for notary services because we provide
                dependable, professional support in a welcoming environment. We
                help clients feel prepared, informed, and confident when handling
                important paperwork.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Notary;
