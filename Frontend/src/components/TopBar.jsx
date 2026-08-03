import {
  FaWhatsapp,
  FaGoogle,
  FaMapMarkerAlt
} from "react-icons/fa";

function TopBar() {
  return (
    <div className="top-bar">
      <div className="container top-bar-content">
        <p>
          Call <a href="tel:9733272340">(973) 327-2340</a> &nbsp;| &nbsp;
          <a href="mailto:info@dpstaxpro.com">info@DPStaxpro.com</a> &nbsp;| &nbsp;
          <a href="mailto:dpstax1@gmail.com">DPStax1@gmail.com</a>
        </p>


        <div className="top-right">
          <div className="lang-row">
            <span className="lang-pill">
              <img
                src="/americanflag1.jpg"
                alt="English"
                className="lang-mini-flag"
              />
              EN
            </span>
            <span className="lang-pill">
              <img
                src="/Haitiflag.jpg"
                alt="Kreyòl"
                className="lang-mini-flag"
              />
              KRY
            </span>
            <span className="lang-pill">
              <img
                src="/FranceFlag.jpg"
                alt="French"
                className="lang-mini-flag"
              />
              FR
            </span>
            <span className="lang-pill">
              <img
                src="/SpainFlag.jpg"
                alt="Spanish"
                className="lang-mini-flag"
              />
              ES
            </span>
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
