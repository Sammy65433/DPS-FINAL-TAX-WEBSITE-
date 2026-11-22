import {
  FaWhatsapp,
  FaGoogle,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaCalendarAlt,
  FaSun,
  FaMoon,
  FaGlobe,
  FaBuilding,
  FaBriefcase,
  FaStar,
  FaCalendarCheck,
  FaCloud,
  FaMobileAlt,
  FaAt,
  FaUser,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <img
            src="/DPS-LOGO1.png"
            alt="DPS Professional Tax Services logo"
            className="footer-logo"
          />
          <div className="footer-brand-text">
            <h3>DPS Professional Tax Services</h3>
            <p>Trusted Tax & Support Services in Maplewood, NJ</p>
          </div>
        </div>

        <div className="footer-grid">
          <div className="footer-card">
            <h4><FaPhoneAlt className="footer-icon" aria-hidden="true" /> Contact</h4>
            <p>
              <FaMobileAlt className="footer-icon" aria-hidden="true" />
              <a href="tel:+19733272340">(973) 327-2340</a>
            </p>
            <p>
              <FaEnvelope className="footer-icon" aria-hidden="true" />
              <a href="mailto:info@dpstaxpro.com">Info@DPStaxpro.com</a>
            </p>
            <p>
              <FaAt className="footer-icon" aria-hidden="true" />
              <a href="mailto:dpstax1@gmail.com">DpsTax1@gmail.com</a>
            </p>
            <p>
              <FaMapMarkerAlt className="footer-icon" aria-hidden="true" />
              <a
                href="https://www.google.com/maps?q=1811+Springfield+Ave,+Maplewood,+NJ+07040"
                target="_blank"
                rel="noopener noreferrer"
              >
                1811 Springfield Ave, Maplewood, NJ
              </a>
            </p>
          </div>

          <div className="footer-card">
            <h4><FaSun className="footer-icon" aria-hidden="true" /> Tax Season Hours</h4>
            <p>
              <FaClock className="footer-icon" aria-hidden="true" />
              Monday - Friday: 9:00 AM - 9:00 PM <span className="footer-sep">·</span> <span className="footer-note footer-note-gold">Extended Evening Hours</span>
            </p>
            <p>
              <FaCalendarAlt className="footer-icon" aria-hidden="true" />
              Saturday: 10:00 AM - 7:00 PM <span className="footer-sep">·</span> <span className="footer-note footer-note-gold">Weekend Appointments Available</span>
            </p>
            <p>
              <FaStar className="footer-icon" aria-hidden="true" />
              Sunday: By Appointment Only <span className="footer-sep">·</span> <span className="footer-note footer-note-gold">Contact the Office for Availability</span>
            </p>
          </div>

          <div className="footer-card">
            <h4><FaBriefcase className="footer-icon" aria-hidden="true" /> Off-Season Hours</h4>
            <p>
              <FaCalendarCheck className="footer-icon" aria-hidden="true" />
              Monday - Friday: 10:00 AM - 6:00 PM <span className="footer-sep">·</span> <span className="footer-note footer-note-teal">Standard Business Hours</span>
            </p>
            <p>
              <FaMoon className="footer-icon" aria-hidden="true" />
              Saturday: By Appointment <span className="footer-sep">·</span> <span className="footer-note">Walk-ins Welcome</span>
            </p>
            <p>
              <FaCloud className="footer-icon" aria-hidden="true" />
              Sunday: By Appointment Only <span className="footer-sep">·</span> <span className="footer-note">Contact the Office for Availability</span>
            </p>
          </div>

          <div className="footer-card">
            <h4><FaGlobe className="footer-icon" aria-hidden="true" /> Service Area</h4>
            <p>
              <FaMapMarkerAlt className="footer-icon" aria-hidden="true" />
              Serving Maplewood, NJ and the Tri-State area.
            </p>
            <p>
              <FaBuilding className="footer-icon" aria-hidden="true" />
              Real Estate Services provided by RC Realty Group.
            </p>
            <div className="footer-socials">
              <a
                href="https://wa.me/18627661725"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <FaWhatsapp aria-hidden="true" />
              </a>
              <a
                href="https://www.google.com/search?q=DPS+Professional+Tax+Services+Maplewood+NJ"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Google Search"
              >
                <FaGoogle aria-hidden="true" />
              </a>
              <a
                href="https://www.google.com/maps?q=1811+Springfield+Ave,+Maplewood,+NJ+07040"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Google Maps Location"
              >
                <FaMapMarkerAlt aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} DPS Professional Tax Services.
            All rights reserved. <span className="footer-established">Est. 2007</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;


