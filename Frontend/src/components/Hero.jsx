import { Link } from "react-router-dom";
import {
  FaBriefcase,
  FaBookOpen,
  FaCalendarCheck,
  FaPhoneAlt,
  FaAward,
  FaArrowCircleRight,
} from "react-icons/fa";

function Hero() {
  return (
    <section className="hero" data-aos="fade-up">
      <div className="container hero-layout">
        <div className="hero-content">
          <Link to="/about" className="tag">
            19+ Years Serving Maplewood, NJ
          </Link>

          <h1>DPS Professional Tax Services and Realty Management</h1>

          <p className="lead">
            For over 19 years, DPS has provided tax preparation and essential
            business services to individuals, families, and small businesses
            throughout New Jersey and the Tri-State area.
          </p>


          <Link
            to="/taxpayer-resources"
            className="irs-note"
            aria-label="View taxpayer resources and links to the official IRS website"
          >
            <FaAward aria-hidden="true" />
            <span>IRS e-file Authorized</span>
          </Link>
        </div>

        <nav className="hero-quick-links" aria-label="Quick links">
          <Link to="/services" className="hero-quick-link">
            <FaBriefcase aria-hidden="true" />
            <span>Services</span>
            <FaArrowCircleRight className="hero-quick-arrow" aria-hidden="true" />
          </Link>

          <Link
            to="/taxpayer-resources"
            className="hero-quick-link hero-quick-link-green"
          >
            <FaBookOpen aria-hidden="true" />
            <span>Resources</span>
            <FaArrowCircleRight className="hero-quick-arrow" aria-hidden="true" />
          </Link>

          <Link to="/booking" className="hero-quick-link">
            <FaCalendarCheck aria-hidden="true" />
            <span>Book Appointment</span>
            <FaArrowCircleRight className="hero-quick-arrow" aria-hidden="true" />
          </Link>
          <a href="tel:+19733272340" className="hero-quick-link hero-quick-link-call">
  <FaPhoneAlt aria-hidden="true" />
  <span>Call the Office</span>
  <FaArrowCircleRight className="hero-quick-arrow" aria-hidden="true" />
</a>

        </nav>
      </div>
    </section>
  );
}

export default Hero;
