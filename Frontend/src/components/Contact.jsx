import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaFax,
  FaEnvelope,
  FaClock,
  FaAward,
} from "react-icons/fa";

function Contact() {
  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <div className="contact-heading">
          <p className="eyebrow">Contact Us</p>
          <h2>We’re Here to Help</h2>
        </div>

        <div className="contact-info" data-aos="zoom-in">
          <img
            src="/DPS-LOGO1.png"
            alt="DPS Professional Tax Services logo"
            className="contact-logo"
          />

          <div className="contact-brand-card">
            <strong>
              DPS Professional Tax Services
              <span>& Realty Management</span>
            </strong>
          </div>

          <div className="full-contact-grid">
            <div className="contact-details" data-aos="fade-right">
              <h3>Office Information</h3>

              <p>
                <FaMapMarkerAlt className="contact-icon" />
                <a
                  href="https://www.google.com/maps/search/1811+Springfield+Ave+Maplewood+NJ+07040"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  1811 Springfield Ave, Maplewood, NJ 07040
                </a>
              </p>

              <p>
                <FaPhoneAlt className="contact-icon" />
                Phone: <a href="tel:9733272340">(973) 327-2340</a>
              </p>

              <p>
                <FaFax className="contact-icon" />
                Fax: (973) 821-3684
              </p>

              <p>
                <FaEnvelope className="contact-icon" />
                Email: <a href="mailto:dpstax1@gmail.com">DpsTax1@gmail.com</a>
              </p>
            </div>

            <div className="office-hours" id="hours" data-aos="fade-left">
              <h3>Office Hours</h3>

              <p>
                <FaClock className="contact-icon" />
                <strong>Tax Season Office Hours</strong>
              </p>
              <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
              <p>Saturday: 9:00 AM - 6:00 PM</p>
              <p>Sunday: By Appointment Only</p>
            </div>
          </div>

          <p className="irs-contact-note">
            <FaAward className="irs-icon" />
            IRS e-file Authorized Agent
          </p>
        </div>

        <div className="map-embed" data-aos="fade-left">
          <iframe
            src="https://www.google.com/maps?q=1811+Springfield+Ave+Maplewood+NJ+07040&output=embed"
            width="100%"
            height="250"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="DPS Professional Tax Services Location"
          ></iframe>
        </div>
      </div>
    </section>
  );
}

export default Contact;
