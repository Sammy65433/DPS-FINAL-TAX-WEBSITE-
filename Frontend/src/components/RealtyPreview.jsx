import { Link } from "react-router-dom";
import { FaCalendarCheck, FaExternalLinkAlt, FaHome } from "react-icons/fa";

function RealtyPreview() {
  return (
    <section className="section realty-section realty-preview-section" id="realty-preview">
      <div className="container">
        <div className="realty-heading">
          <p className="eyebrow">Real Estate Services</p>
          <h2>Trusted Local Real Estate Support</h2>
          <p className="realty-intro-text">
            Connect with RC Realty Group, our independent real estate partner,
            for buying, selling, renting, or investment property inquiries.
          </p>
        </div>

        <div className="realty-preview-card">
          <img
            src="/real-estate.jpg"
            alt="Residential neighborhood"
            loading="lazy"
          />
          <div>
            <span className="realty-mini-badge">
              <FaHome aria-hidden="true" />
              Partner Support
            </span>
            <h3>Planning Your Next Move?</h3>
            <p>
              Tell us what you’re looking for and we’ll send your appointment
              request to our real estate partner.
            </p>
            <div className="realty-buttons">
              <Link to="/real-estate-booking" className="btn-realty">
                <FaCalendarCheck aria-hidden="true" />
                Request an Appointment
              </Link>
              <a
                href="https://www.rcrealtygroup.net"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-realty btn-realty-secondary"
              >
                <FaExternalLinkAlt aria-hidden="true" />
                Visit RC Realty Group
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RealtyPreview;
