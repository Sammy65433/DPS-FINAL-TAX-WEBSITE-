import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaBriefcase,
  FaCopy,
  FaEnvelope,
  FaFileInvoiceDollar,
  FaHandsHelping,
  FaHome,
  FaLanguage,
  FaPassport,
  FaStamp,
} from "react-icons/fa";

const services = [
  {
    title: "Tax Preparation",
    description: "Tax filing support for individuals, families, and businesses.",
    image: "/tax-prep2.jpg",
    alt: "Tax preparation documents",
    icon: FaFileInvoiceDollar,
    to: "/tax-preparation",
  },
  {
    title: "Notary Public",
    description: "Notarization for important personal and business documents.",
    image: "/notaary4.jpg",
    alt: "Notary public service",
    icon: FaStamp,
    to: "/notary",
  },
  {
    title: "Translation",
    description: "Multilingual document support for important paperwork.",
    image: "/transla1.jpg",
    alt: "Translation service",
    icon: FaLanguage,
    to: "/translation",
  },
  {
    title: "Form Preparation Support",
    description: "Help organizing forms using information you provide.",
    image: "/transla2.jpg",
    alt: "Document preparation support",
    icon: FaPassport,
    to: "/immigration",
  },
  {
    title: "Copy & Fax",
    description: "Convenient in-office copying and faxing.",
    image: "/copy2.jpg",
    alt: "Copy and fax services",
    icon: FaCopy,
    to: "/copy-fax",
  },
  {
    title: "Other Services",
    description: "Ask DPS about additional services available at our office.",
    image: "/trusted-com1.jpg",
    alt: "Client speaking with a professional",
    icon: FaHandsHelping,
    to: "/other-services",
  },
  {
    title: "Business Services",
    description: "Practical support for small-business records and service needs.",
    image: "/pro2.jpg",
    alt: "Business services",
    icon: FaBriefcase,
    to: "/business-services",
  },
  {
    title: "Real Estate",
    description: "Connect with our trusted partner for buying, selling, or renting.",
    image: "/real-estate.jpg",
    alt: "Real estate service",
    icon: FaHome,
    to: "/real-estate-booking",
  },
];

function Services() {
  return (
    <section className="section services-section" id="services">
      <div className="container">
        <div className="services-heading">
          <p className="eyebrow">What we do</p>
          <h2>Services</h2>
          <p className="section-text">
            Practical support for individuals, families, and small businesses.
          </p>
        </div>

        <div className="services-grid">
          {services.map(({ title, description, image, alt, icon: Icon, to }) => (
            <Link to={to} className="service-preview-card" key={title}>
              <img
                src={image}
                alt={alt}
                className="service-card-image"
                loading="lazy"
              />
              <div className="service-preview-content">
                <div className="service-card-title">
                  <Icon aria-hidden="true" />
                  <h3>{title}</h3>
                </div>
                <p>{description}</p>
                <span className="service-card-link">
                  Learn more <FaArrowRight aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="services-contact">
          <div>
            <h2>Contact Us</h2>
            <p>Not sure which service fits your needs? Reach out to our team.</p>
          </div>
          <Link to="/contact" className="services-contact-button">
            <FaEnvelope aria-hidden="true" />
            Contact DPS
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Services;
