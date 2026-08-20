import {
  FaWhatsapp,
  FaGoogle,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaUser,
  FaBriefcase,
  FaGlobeAmericas,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import GoogleTranslate from "./GoogleTranslate";

function TopBar() {
  return (
    <div className="top-bar">
      <div className="container top-bar-content">
        <div className="top-bar-left">
          <p className="top-contact-row">
            <span className="top-contact-chip">
              <FaPhoneAlt className="topbar-inline-icon" />
              <a href="tel:9733272340">(973) 327-2340</a>
            </span>

            <span className="top-contact-chip">
              <FaUser className="topbar-inline-icon" />
              <a href="mailto:dpstax1@gmail.com">dpstax1@gmail.com</a>
            </span>

            <span className="top-contact-chip">
              <FaBriefcase className="topbar-inline-icon" />
              <a href="mailto:info@dpstaxpro.com">info@DPStaxpro.com</a>
            </span>

            <Link to="/translation" className="top-contact-chip top-language-chip">
              <span>🇺🇸 🇭🇹 🇫🇷 🇪🇸</span>
              <span>Languages</span>
            </Link>

          </p>
        </div>

        <div className="top-right">
          <div className="translate-wrap">
            <GoogleTranslate />
          </div>

          <div className="social-icons">
            <a
              href="https://wa.me/18627661725"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <FaWhatsapp />
            </a>

            <a
              href="https://www.google.com/search?q=DPS+Professional+Tax+Services+Maplewood+NJ"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Google Search"
            >
              <FaGoogle />
            </a>

            <a
              href="https://www.google.com/maps?q=1811+Springfield+Ave,+Maplewood,+NJ+07040"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Google Maps Location"
            >
              <FaMapMarkerAlt />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
