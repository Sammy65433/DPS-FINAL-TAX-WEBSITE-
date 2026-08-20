import { Link } from "react-router-dom";
import {
  FaHome,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaExternalLinkAlt,
} from "react-icons/fa";

function RealtyPreview() {
  return (
    <section className="section realty-section" id="realty" data-aos="zoom-in">
      <div className="container">
        <div className="realty-heading">
          <p className="eyebrow">Real Estate Services</p>
          <h2 className="h2-sub">Trusted Local Real Estate Support</h2>
          <p className="section-text realty-intro-text">
            Connect with our trusted real estate partner for support with buying,
            selling, renting, and investment property needs.
          </p>
        </div>

        <div className="realty-banner">
          <div className="realty-text">
            <img
              src="/real-estate.jpg"
              alt="Real estate services"
              className="realty-side-image"
            />
            <div className="realty-mini-badge">
              <FaHome />
              <span>Professional Real Estate Support</span>
            </div>
            <h3>Need Real Estate Help?</h3>
            <p>
              Our partner Ricot Casimir of RC Realty Group handles buying,
              selling, renting, and investment property support.
            </p>

            <div className="realty-buttons">
              <Link to="/real-estate-booking" className="btn-realty">
                Book Real Estate Appointment
              </Link>
              <a
                href="https://www.rcrealtygroup.net"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-realty btn-realty-secondary"
              >
                <FaExternalLinkAlt />
                <span>Visit RC Realty Group</span>
              </a>
            </div>
          </div>

          <div className="realty-contact">
            <div className="realty-contact-header">
              <FaHome />
              <h4>Partner Contact</h4>
            </div>

            <p>
              <strong>Ricot Casimir - RC Realty Group</strong>
            </p>
            <p>
              <FaPhoneAlt className="realty-inline-icon" />
              Phone: <a href="tel:9738859929">(973) 885-9929</a>
            </p>
            <p>
              <FaEnvelope className="realty-inline-icon" />
              Email:
              <a href="mailto:ricot.casimir@gmail.com">Ricot.Casimir@gmail.com</a>
            </p>
            <p>
              <FaMapMarkerAlt className="realty-inline-icon" />
              <a
                href="https://www.google.com/maps/search/1811+Springfield+Ave+Maplewood+NJ+07040"
                target="_blank"
                rel="noopener noreferrer"
                className="card-link"
              >
                1811 Springfield Ave, Maplewood, NJ 07040
              </a>
            </p>

            <img
              src="/real-estate-keys2.jpg"
              alt="Real estate services"
              className="realty-side-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default RealtyPreview;
