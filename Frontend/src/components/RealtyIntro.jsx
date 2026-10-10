import {
  FaBuilding,
  FaExternalLinkAlt,
  FaHome,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaHandshake,
} from "react-icons/fa";

function RealtyIntro() {
  return (
    <section className="section realty-section" id="realty">
      <div className="container">
        <div className="realty-heading">
          <p className="eyebrow">Real Estate Services</p>
          <h1>Real Estate Support You Can Trust</h1>
          <p className="realty-intro-text">
            DPS Professional Tax Services connects clients with trusted real
            estate support through our independent partner, Ricot Casimir of
            RC Realty Group. Explore your next step in buying, selling,
            renting, or investment property.
          </p>
        </div>

        <div className="realty-banner">
          <div className="realty-text">
            <img
              src="/real-estate.jpg"
              alt="Residential neighborhood"
              className="realty-side-image"
              loading="lazy"
            />
            <div className="realty-mini-badge">
              <FaHome aria-hidden="true" />
              Trusted Partner Support
            </div>
            <h2>Need Real Estate Help?</h2>
            <p>
              Ricot Casimir of RC Realty Group can discuss your goals,
              answer real estate questions, and help you plan your next step.
              Send a request using the form below or visit RC Realty Group.
            </p>
            <a
              href="https://www.rcrealtygroup.net"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-realty"
            >
              <FaExternalLinkAlt aria-hidden="true" />
              Visit RC Realty Group
            </a>
          </div>

          <div className="realty-contact">
            <div className="realty-contact-header">
              <FaBuilding aria-hidden="true" />
              <h2>Partner Contact</h2>
            </div>
            <p>
              <FaHandshake className="realty-inline-icon" aria-hidden="true" />
              <span><strong>Ricot Casimir</strong>, RC Realty Group</span>
            </p>
            <p>
              <FaPhoneAlt className="realty-inline-icon" aria-hidden="true" />
              <a href="tel:+19738859929">(973) 885-9929</a>
            </p>
            <p>
              <FaEnvelope className="realty-inline-icon" aria-hidden="true" />
              <a href="mailto:ricot.casimir@gmail.com">
                Ricot.Casimir@gmail.com
              </a>
            </p>
            <p>
              <FaMapMarkerAlt className="realty-inline-icon" aria-hidden="true" />
              <a
                href="https://www.google.com/maps/search/?api=1&query=1811+Springfield+Ave%2C+Maplewood%2C+NJ+07040"
                target="_blank"
                rel="noopener noreferrer"
              >
                1811 Springfield Ave, Maplewood, NJ 07040
              </a>
            </p>
            <img
              src="/real-estate-keys2.jpg"
              alt="House and real estate documents"
              className="realty-side-image"
              loading="lazy"
            />
          </div>
        </div>

        <div className="realty-disclaimer">
          <strong>Real estate services:</strong> DPS Professional Tax Services
          is not a real estate brokerage. Listings, transactions, advice,
          negotiations, and representation are handled by RC Realty Group
          and its licensed real estate professionals.
        </div>
      </div>
    </section>
  );
}

export default RealtyIntro;
