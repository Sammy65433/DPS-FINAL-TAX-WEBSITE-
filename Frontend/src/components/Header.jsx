import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const location = useLocation();

  function closeMenu() {
    setMenuOpen(false);
    setAboutOpen(false);
    setServicesOpen(false);
    setResourcesOpen(false);
  }

  function handleHomeClick() {
    closeMenu();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function toggleDropdown(name) {
    setAboutOpen(name === "about" ? !aboutOpen : false);
    setServicesOpen(name === "services" ? !servicesOpen : false);
    setResourcesOpen(name === "resources" ? !resourcesOpen : false);
  }

  return (
    <header className="header">
      <div className="container header-inner">
        <div className="header-brand-row">
          <Link to="/" className="logo-wrap" onClick={handleHomeClick}>
            <img
              src="/DPS-LOGO1.png"
              alt="DPS Professional Tax Services logo"
              className="site-logo"
            />
            <span className="logo-text">
              DPS Professional Tax Services
              <span className="logo-subtitle">
                Maplewood, NJ · <em>Est. 2007</em>
              </span>
            </span>
          </Link>

          <button
            type="button"
            className="mobile-menu-button"
            aria-expanded={menuOpen}
            aria-controls="site-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <FaTimes aria-hidden="true" />
            ) : (
              <FaBars aria-hidden="true" />
            )}
            <span>Menu</span>
          </button>
        </div>

        <nav
          id="site-navigation"
          className={`header-nav${menuOpen ? " header-nav-open" : ""}`}
          aria-label="Main navigation"
        >
          <Link
            to="/"
            className={location.pathname === "/" ? "active" : ""}
            onClick={handleHomeClick}
          >
            Home
          </Link>

          <div className="simple-dropdown">
            <button
              type="button"
              className="simple-dropdown-button"
              aria-expanded={aboutOpen}
              onClick={() => toggleDropdown("about")}
            >
              About
              <FaChevronDown
                aria-hidden="true"
                className={aboutOpen ? "caret-open" : ""}
              />
            </button>
            {aboutOpen && (
              <div className="simple-dropdown-menu">
                <Link to="/about" onClick={closeMenu}>About Us</Link>
                <Link to="/purpose" onClick={closeMenu}>Our Purpose</Link>
                <Link to="/moments" onClick={closeMenu}>Moments</Link>
              </div>
            )}
          </div>

          <div className="simple-dropdown">
            <button
              type="button"
              className="simple-dropdown-button"
              aria-expanded={servicesOpen}
              onClick={() => toggleDropdown("services")}
            >
              Services
              <FaChevronDown
                aria-hidden="true"
                className={servicesOpen ? "caret-open" : ""}
              />
            </button>
            {servicesOpen && (
              <div className="simple-dropdown-menu">
                <Link to="/services" onClick={closeMenu}>All Services</Link>
                <Link to="/tax-preparation" onClick={closeMenu}>Tax Preparation</Link>
                <Link to="/notary" onClick={closeMenu}>Notary Public</Link>
                <Link to="/translation" onClick={closeMenu}>Translation</Link>
                <Link to="/immigration" onClick={closeMenu}>
                  Form Preparation Support
                </Link>
                <Link to="/copy-fax" onClick={closeMenu}>Copy &amp; Fax</Link>
                <Link to="/other-services" onClick={closeMenu}>
                  Other Services
                </Link>
                <Link to="/business-services" onClick={closeMenu}>
                  Business Services
                </Link>
                <Link to="/real-estate-booking" onClick={closeMenu}>
                  Real Estate
                </Link>
              </div>
            )}
          </div>

          <Link
            to="/pricing"
            className={location.pathname === "/pricing" ? "active" : ""}
            onClick={closeMenu}
          >
            Pricing
          </Link>

          <div className="simple-dropdown">
            <button
              type="button"
              className="simple-dropdown-button"
              aria-expanded={resourcesOpen}
              onClick={() => toggleDropdown("resources")}
            >
              Resources
              <FaChevronDown
                aria-hidden="true"
                className={resourcesOpen ? "caret-open" : ""}
              />
            </button>
            {resourcesOpen && (
              <div className="simple-dropdown-menu">
                <Link to="/faq" onClick={closeMenu}>
                  What to Bring &amp; FAQ
                </Link>
                <Link to="/taxpayer-resources" onClick={closeMenu}>
                  Taxpayer Resources
                </Link>
                <Link to="/client-feedback" onClick={closeMenu}>
                  Client Feedback
                </Link>
              </div>
            )}
          </div>

          <Link to="/booking" onClick={closeMenu}>
            Book Appointment
          </Link>
          <Link to="/contact" onClick={closeMenu}>
            Contact Us
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
