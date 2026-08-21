import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaBriefcase,
  FaQuestionCircle,
  FaEnvelope,
  FaCalendarCheck,
  FaCreditCard,
  FaPhoneAlt,
  FaChevronDown,
  FaBullseye,
  FaFileAlt,
} from "react-icons/fa";

function Header() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [learnOpen, setLearnOpen] = useState(false);

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

          <div className="simple-dropdown">
            <button
              type="button"
              className="simple-dropdown-button"
              onClick={() => {
                setServicesOpen((prev) => !prev);
                setLearnOpen(false);
              }}
            >
              <FaBriefcase />
              <span>Services</span>
              <FaChevronDown className={servicesOpen ? "caret-open" : ""} />
            </button>

            {servicesOpen && (
              <div className="simple-dropdown-menu">
                <Link to="/services" onClick={() => setServicesOpen(false)}>
                  All Services
                </Link>
                <Link to="/tax-preparation" onClick={() => setServicesOpen(false)}>
                  Tax Preparation
                </Link>
                <Link to="/notary" onClick={() => setServicesOpen(false)}>
                  Notary Public
                </Link>
                <Link to="/translation" onClick={() => setServicesOpen(false)}>
                  Translation
                </Link>
                <Link to="/immigration" onClick={() => setServicesOpen(false)}>
                  Immigration Services
                </Link>
                <Link to="/copy-fax" onClick={() => setServicesOpen(false)}>
                  Copy & Fax
                </Link>
                <Link to="/insurance-services" onClick={() => setServicesOpen(false)}>
                  Insurance Services
                </Link>
                <Link to="/business-services" onClick={() => setServicesOpen(false)}>
                  Business Services
                </Link>
                <Link to="/real-estate-booking" onClick={() => setServicesOpen(false)}>
                  Real Estate
                </Link>
              </div>
            )}
          </div>

          <div className="simple-dropdown">
            <button
              type="button"
              className="simple-dropdown-button"
              onClick={() => {
                setLearnOpen((prev) => !prev);
                setServicesOpen(false);
              }}
            >
              <FaQuestionCircle />
              <span>Learn</span>
              <FaChevronDown className={learnOpen ? "caret-open" : ""} />
            </button>

            {learnOpen && (
  <div className="simple-dropdown-menu">
    <Link to="/purpose" onClick={() => setLearnOpen(false)}>
      Purpose
    </Link>
    <Link to="/faq" onClick={() => setLearnOpen(false)}>
      FAQ
    </Link>
    <Link to="/taxpayer-resources" onClick={() => setLearnOpen(false)}>
      Taxpayer Resources
    </Link>
    <Link to="/moments" onClick={() => setLearnOpen(false)}>
      Moments
    </Link>
    <Link to="/client-feedback" onClick={() => setLearnOpen(false)}>
      Client Feedback
    </Link>
    <Link to="/contact" onClick={() => setLearnOpen(false)}>
      Contact
    </Link>
  </div>
)}

          </div>

          <Link to="/booking" className="nav-pill nav-pill-primary">
            <FaCalendarCheck />
            <span>Book</span>
          </Link>

          <Link to="/booking#payment" className="nav-pill nav-pill-secondary">
            <FaCreditCard />
            <span>Pay</span>
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
