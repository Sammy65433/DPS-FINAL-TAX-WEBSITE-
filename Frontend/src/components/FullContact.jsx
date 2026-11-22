import { Link } from "react-router-dom";
import {
  FaCalendarCheck,
  FaClock,
  FaEnvelope,
  FaFax,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaSun,
  FaMoon,
  FaStar,
  FaCloud,
  FaBriefcase,
  FaCalendarAlt,
  FaGlobe,
} from "react-icons/fa";
import Contact from "./Contact";

const photos = [
  {
    src: "/purpose-1.jpg",
    alt: "Professional support and collaboration",
  },
  {
    src: "/purpose-3.jpg",
    alt: "People working together",
  },
  {
    src: "/tax-prep-hands.jpg",
    alt: "Tax preparation paperwork and assistance",
  },
];

function FullContact() {
  return (
    <>
      <section className="section full-contact-page" id="contact-details">
        <div className="container">
          <div className="full-contact-heading">
            <p className="eyebrow">Contact DPS</p>
            <h1>We’re Here to Help</h1>
            <p>
              Have a Question About Tax Preparation, Documents, Business
              Services, or an Appointment? We’re ready to help you find the
              Right Place to Start.
            </p>
          </div>

          <div className="full-contact-intro">
            <p>
              Every Client comes to us with a different situation. Our Team
              listens, Answers General Questions, and helps you understand
              what to bring or how to Schedule a Visit.
            </p>
            <p>
              For your privacy, Please Do Not Send Social Security Numbers,
              Tax Documents, or Other Sensitive Information by Ordinary Email.
            </p>
          </div>

          <div className="full-contact-brand-box">
            <img
              src="/DPS-LOGO1.png"
              alt="DPS Professional Tax Services logo"
              className="full-contact-logo"
            />
            <strong>
              DPS Professional Tax Services
              <span>&amp; Realty Management</span>
            </strong>
          </div>

          <div className="full-contact-cta-row">
            <a href="tel:+19733272340" className="full-contact-cta-btn">
              <FaPhoneAlt aria-hidden="true" />
              Call (973) 327-2340
            </a>
            <a
              href="mailto:dpstax1@gmail.com"
              className="full-contact-cta-btn"
            >
              <FaEnvelope aria-hidden="true" />
              Email Us
            </a>
            <Link to="/booking" className="full-contact-cta-btn">
              <FaCalendarCheck aria-hidden="true" />
              Book Appointment
            </Link>
          </div>

          <div className="full-contact-grid">
            <div className="full-contact-details">
              <h2><FaMapMarkerAlt className="full-contact-icon" aria-hidden="true" /> Office Information</h2>
              <p>
                <FaMapMarkerAlt
                  className="full-contact-icon"
                  aria-hidden="true"
                />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=1811+Springfield+Ave%2C+Maplewood%2C+NJ+07040"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  1811 Springfield Ave, Maplewood, NJ 07040
                </a>
              </p>
              <p>
                <FaPhoneAlt className="full-contact-icon" aria-hidden="true" />
                <a href="tel:+19733272340">(973) 327-2340</a>
              </p>
              <p>
                <FaFax className="full-contact-icon" aria-hidden="true" />
                <span>Fax: (973) 821-3684</span>
              </p>
              <p>
                <FaEnvelope className="full-contact-icon" aria-hidden="true" />
                <a href="mailto:dpstax1@gmail.com">DpsTax1@gmail.com</a>
              </p>
            </div>

            <div className="full-contact-hours" id="hours">
              <h2><FaSun className="full-contact-icon" aria-hidden="true" /> Tax Season Hours</h2>
              <p>
                <FaClock className="full-contact-icon" aria-hidden="true" />
                <span>Monday - Friday: 9:00 AM - 5:00 PM</span>
                <span className="full-contact-sep"> · </span>
                <span className="full-contact-note full-contact-note--gold">Extended Evening Hours</span>
              </p>
              <p>
                <FaCalendarAlt className="full-contact-icon" aria-hidden="true" />
                <span>Saturday: 9:00 AM - 6:00 PM</span>
                <span className="full-contact-sep"> · </span>
                <span className="full-contact-note full-contact-note--gold">Weekend Appointments Available</span>
              </p>
              <p>
                <FaSun className="full-contact-icon" aria-hidden="true" />
                <span>Sunday: By Appointment Only</span>
                <span className="full-contact-sep"> · </span>
                <span className="full-contact-note full-contact-note--gold">Contact The Office for Availability</span>
              </p>
            </div>

            <div className="full-contact-hours">
              <h2><FaBriefcase className="full-contact-icon" aria-hidden="true" /> Off-Season Hours</h2>
              <p>
                <FaBriefcase className="full-contact-icon" aria-hidden="true" />
                <span>Monday - Friday: 10:00 AM - 6:00 PM</span>
                <span className="full-contact-sep"> · </span>
                <span className="full-contact-note full-contact-note--teal">Standard Business Hours</span>
              </p>
              <p>
                <FaMoon className="full-contact-icon" aria-hidden="true" />
                <span>Saturday: By Appointment</span>
                <span className="full-contact-sep"> · </span>
                <span className="full-contact-note full-contact-note--teal">Walk-ins Welcome</span>
              </p>
              <p>
                <FaCloud className="full-contact-icon" aria-hidden="true" />
                <span>Sunday: By Appointment Only</span>
                <span className="full-contact-sep"> · </span>
                <span className="full-contact-note full-contact-note--teal">Call for Availability</span>
              </p>
            </div>
          </div>

          <p className="full-contact-hours-note">
            Hours May Change. Please Call Before Visiting.
          </p>

          <div className="full-contact-photo-grid">
            {photos.map(({ src, alt }) => (
              <div className="full-contact-photo" key={src}>
                <img src={src} alt={alt} loading="lazy" />
              </div>
            ))}
          </div>

          <div className="full-contact-note">
            <strong>Thank you for choosing DPS.</strong> We appreciate the
            Opportunity to Serve our Maplewood Community and Look Forward to
            Helping you take the Next Step.
          </div>
        </div>
      </section>

      <Contact />
    </>
  );
}

export default FullContact;
