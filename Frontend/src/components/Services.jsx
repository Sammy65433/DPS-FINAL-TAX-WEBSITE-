import { Link } from "react-router-dom";
import {
  FaFileInvoiceDollar,
  FaStamp,
  FaLanguage,
  FaPassport,
  FaCopy,
  FaShieldAlt,
  FaHome,
  FaArrowRight,
} from "react-icons/fa";

function Services() {
  return (
    <section className="section services-section" id="services" data-aos="fade-down">
      <div className="container">
        <div className="services-heading">
          <p className="eyebrow">What we do</p>
          <h2>Services</h2>
          <p className="section-text">
            Reliable, professional support for individuals, families, and small
            businesses.
          </p>
        </div>

        <div className="card-grid services-grid">
          <Link to="/tax-preparation" className="card service-preview-card">
            <img
              src="/tax-prep2.jpg"
              alt="Tax preparation service"
              className="service-card-image"
            />
            <div className="service-preview-content">
              <div className="service-badge">
                <FaFileInvoiceDollar />
                <span>Tax</span>
              </div>
              <h3>Tax Preparation</h3>
              <p>
                Reliable tax filing support for individuals, families, and
                businesses.
              </p>
            </div>
          </Link>

          <Link to="/notary" className="card service-preview-card">
            <img
              src="/notaary4.jpg"
              alt="Notary public service"
              className="service-card-image"
            />
            <div className="service-preview-content">
              <div className="service-badge">
                <FaStamp />
                <span>Notary</span>
              </div>
              <h3>Notary Public</h3>
              <p>
                Fast, professional notarization for important personal and
                business documents.
              </p>
            </div>
          </Link>

          <Link to="/translation" className="card service-preview-card">
            <img
              src="/transla1.jpg"
              alt="Translation service"
              className="service-card-image"
            />
            <div className="service-preview-content">
              <div className="service-badge">
                <FaLanguage />
                <span>Language</span>
              </div>
              <h3>Translation</h3>
              <p>
                Clear multilingual document support to help clients complete and
                understand important paperwork.
              </p>
            </div>
          </Link>

          <Link to="/immigration" className="card service-preview-card">
            <img
              src="/transla2.jpg"
              alt="Immigration services"
              className="service-card-image"
            />
            <div className="service-preview-content">
              <div className="service-badge">
                <FaPassport />
                <span>Support</span>
              </div>
              <h3>Immigration Services</h3>
              <p>
                Help organizing and preparing immigration-related forms and
                supporting documents.
              </p>
            </div>
          </Link>

          <Link to="/copy-fax" className="card service-preview-card">
            <img
              src="/copy2.jpg"
              alt="Copy and fax services"
              className="service-card-image"
            />
            <div className="service-preview-content">
              <div className="service-badge">
                <FaCopy />
                <span>Office</span>
              </div>
              <h3>Copy & Fax</h3>
              <p>
                Convenient in-office document copying and faxing when you need it
                most.
              </p>
            </div>
          </Link>

          <Link to="/insurance-services" className="card service-preview-card">
            <img
              src="/insurance2.jpg"
              alt="Insurance services"
              className="service-card-image"
            />
            <div className="service-preview-content">
              <div className="service-badge">
                <FaShieldAlt />
                <span>Coverage</span>
              </div>
              <h3>Insurance Services</h3>
              <p>
                Helpful guidance for life, auto, health, and other everyday
                insurance needs.
              </p>
            </div>
          </Link>

          <Link to="/real-estate-booking" className="card service-preview-card">
            <img
              src="/real-estate.jpg"
              alt="Real estate service"
              className="service-card-image"
            />
            <div className="service-preview-content">
              <div className="service-badge">
                <FaHome />
                <span>Real Estate</span>
              </div>
              <h3>Real Estate</h3>
              <p>
                Buying, selling, renting, or investing with support from our
                trusted partner.
              </p>
              <span className="card-link">
                Need Help? <FaArrowRight />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Services;
