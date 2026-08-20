import { Link } from "react-router-dom";
import {
  FaHome,
  FaBriefcase,
  FaBullseye,
  FaBuilding,
  FaQuestionCircle,
  FaEnvelope,
  FaCalendarCheck,
  FaCreditCard,
  FaFileAlt,
  FaPhoneAlt,
} from "react-icons/fa";

function Header() {
  return (
    <header className="header">
      <div className="container nav">
        <div className="logo-wrap">
          <img
            src="/DPS-LOGO1.png"
            alt="DPS Professional Tax Services logo"
            className="site-logo"
          />
          <div className="logo-text">
            DPS Professional Tax Services
            <span>Maplewood, NJ · IRS e-file Authorized</span>
          </div>
        </div>

        <nav className="links">
          <Link to="/">
            <FaHome />
            <span>Home</span>
          </Link>

          <Link to="/services">
            <FaBriefcase />
            <span>Services</span>
          </Link>

          <Link to="/business-services">
            <FaBuilding />
            <span>Business</span>
          </Link>

          <Link to="/purpose">
            <FaBullseye />
            <span>Purpose</span>
          </Link>

          <Link to="/real-estate-booking">
            <FaBuilding />
            <span>Realty</span>
          </Link>

          <Link to="/faq">
            <FaQuestionCircle />
            <span>FAQ</span>
          </Link>

          <Link to="/contact">
            <FaEnvelope />
            <span>Contact</span>
          </Link>

          <Link to="/booking" className="nav-pill nav-pill-primary">
            <FaCalendarCheck />
            <span>Book</span>
          </Link>

          <Link to="/booking#payment" className="nav-pill nav-pill-secondary">
            <FaCreditCard />
            <span>Pay</span>
          </Link>

          <Link to="/taxpayer-resources" className="nav-pill nav-pill-secondary">
            <FaFileAlt />
            <span>Resources</span>
          </Link>

          <a href="tel:+19733272340" className="nav-pill nav-pill-call">
            <FaPhoneAlt />
            <span>Call</span>
          </a>
        </nav>

      </div>
    </header>
  );
}

export default Header;
