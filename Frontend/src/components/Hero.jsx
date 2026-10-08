import { Link } from "react-router-dom";
import { FaCalendarCheck, FaPhoneAlt, FaAward } from "react-icons/fa";

function Hero() {
  return (
    <section className="hero" data-aos="fade-up">
      <div className="container hero-content">
        <Link to="/about" className="tag">
          19+ Years Serving Maplewood, NJ
        </Link>

        <h1>DPS Professional Tax Services and Realty Management</h1>

        <p className="lead">
          For over 19 years, DPS has provided tax preparation and essential
          business services to individuals, families, and small businesses
          throughout New Jersey and the Tri-State area.
        </p>

        <div className="hero-buttons">
          <Link to="/booking" className="btn hero-btn-primary">
            <FaCalendarCheck />
            <span>Book Appointment</span>
          </Link>

          <a href="tel:+19733272340" className="btn hero-btn-secondary">
            <FaPhoneAlt />
            <span>Call the Office</span>
          </a>
        </div>

        <Link
          to="/taxpayer-resources"
          className="irs-note"
          aria-label="View taxpayer resources and links to the official IRS website"
        >
          <FaAward aria-hidden="true" />
          <span>IRS e-file Authorized</span>
        </Link>
      </div>
    </section>
  );
}

export default Hero;
