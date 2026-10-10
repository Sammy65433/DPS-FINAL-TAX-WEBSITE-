import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaAward,
  FaBookOpen,
  FaBriefcase,
  FaCalendarCheck,
  FaPhoneAlt,
  FaArrowCircleRight,
} from "react-icons/fa";
const heroPhotos = [
  { src: "/trusted-com1.jpg", alt: "Client support" },
  { src: "/tax-prep2.jpg", alt: "Tax preparation" },
  { src: "/tax-hero8.jpg", alt: "Business services" },
  { src: "/officelocation-1.jpg", alt: "DPS office" },
  { src: "/insurance2.jpg", alt: "Professional service" },
  { src: "/purpose-1.jpg", alt: "Client support" },
  { src: "/purpose-2.jpg", alt: "Tax service information" },
  { src: "/client-all.jpg", alt: "DPS clients and community" },
  ...Array.from({ length: 6 }, (_, index) => ({
    src: `/taxhero-client${index + 1}.jpg`,
    alt: `DPS client photo ${index + 1}`,
  })),
];




function Hero() {
  const [activePhoto, setActivePhoto] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActivePhoto((current) => (current + 1) % heroPhotos.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="hero" data-aos="fade-up">
      <div className="container hero-layout">
        <div className="hero-content">
          <Link to="/about" className="tag">
            19+ Years Serving Maplewood, NJ
          </Link>
          <h1>DPS Professional Tax Services and Realty Management</h1>
          <p className="lead">
            For over 19 years, DPS has provided tax preparation and essential
            business services to individuals, families, and small businesses
            throughout New Jersey and the Tri-State area.
          </p>
          <Link
            to="/taxpayer-resources"
            className="irs-note"
            aria-label="View taxpayer resources and links to the official IRS website"
          >
            <FaAward aria-hidden="true" />
            <span>IRS e-file Authorized</span>
          </Link>
        </div>

        <div className="hero-side">
          <div className="hero-slideshow" aria-label="DPS services photo gallery">
            {heroPhotos.map((photo, index) => (
              <img
                key={photo.src}
                src={photo.src}
                alt={index === activePhoto ? photo.alt : ""}
                aria-hidden={index !== activePhoto}
                className={`hero-slide-image${
                  index === activePhoto ? " is-active" : ""
                }`}
                loading={index === 0 ? "eager" : "lazy"}
              />
            ))}
          </div>

          <nav className="hero-quick-links" aria-label="Quick links">
            <Link to="/services" className="hero-quick-link">
              <FaBriefcase aria-hidden="true" />
              <span>Services</span>
              <FaArrowCircleRight className="hero-quick-arrow" aria-hidden="true" />
            </Link>
            <Link
              to="/faq"
              className="hero-quick-link hero-quick-link-green"
            >
              <FaBookOpen aria-hidden="true" />
              <span>Resources</span>
              <FaArrowCircleRight className="hero-quick-arrow" aria-hidden="true" />
            </Link>
            <Link to="/booking" className="hero-quick-link">
              <FaCalendarCheck aria-hidden="true" />
              <span>Book Appointment</span>
              <FaArrowCircleRight className="hero-quick-arrow" aria-hidden="true" />
            </Link>
            <a
              href="tel:+19733272340"
              className="hero-quick-link hero-quick-link-call"
            >
              <FaPhoneAlt aria-hidden="true" />
              <span>Call the Office</span>
              <FaArrowCircleRight className="hero-quick-arrow" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </section>
  );
}

export default Hero;
