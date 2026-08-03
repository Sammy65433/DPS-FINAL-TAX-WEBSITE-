import { FaWhatsapp, FaGoogle } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <img
          src="/DPS-LOGO1.png"
          alt="DPS Professional Tax Services logo"
          className="footer-logo"
        />

        <p>© {new Date().getFullYear()} DPS Professional Tax Services. All rights reserved.</p>
        <p>Serving Maplewood, NJ and the Tri-State area with trusted Tax and Support services.</p>
        <p>Real estate services provided by RC Realty Group.</p>

        <div className="footer-contact-info">
          <p>
            <strong>Phone:</strong>{" "}
            <a href="tel:+19733272340">(973) 327-2340</a>
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <a href="mailto:dpsprofessionaltax@gmail.com">
              dpsprofessionaltax@gmail.com
            </a>
          </p>
          <div className="footer-hours">
            <p><strong>Office Hours</strong></p>
            <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
            <p>Saturday: By Appointment</p>
            <p>Sunday: Closed</p>
          </div>
        </div>

        <div className="social-icons footer-socials">
          <a
            href="https://wa.me/19733272340"
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
        </div>
      </div>
    </footer>
  );
}

export default Footer;
