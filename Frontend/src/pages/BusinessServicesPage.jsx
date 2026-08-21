import {
  FaEnvelope,
  FaPhone,
  FaBuilding,
  FaFileInvoiceDollar,
  FaClipboardList,
  FaUsersCog,
  FaCheckCircle,
  FaBriefcase,
} from "react-icons/fa";
import Layout from "../components/Layout";

function BusinessServicesPage() {
  const services = [
    {
      icon: <FaBuilding />,
      title: "Business Tax Preparation",
      text: "Reliable tax preparation support for sole proprietors, LLCs, and growing businesses.",
    },
    {
      icon: <FaFileInvoiceDollar />,
      title: "Financial Document Support",
      text: "Help organizing income, expenses, and important business records for filing and planning.",
    },
    {
      icon: <FaClipboardList />,
      title: "Compliance & Filing Guidance",
      text: "Support with staying organized, maintaining records, and preparing required filing information.",
    },
    {
      icon: <FaUsersCog />,
      title: "Business Consultation",
      text: "Professional consultation for small and growing businesses looking for dependable support and guidance.",
    },
  ];

  const audience = [
    "Small business owners",
    "Independent contractors",
    "LLCs and family-run businesses",
    "Businesses needing record and filing support",
    "Owners seeking one-on-one consultation",
  ];

  return (
    <Layout>
      <section className="section business-page-section">
        <div className="container business-page">
          <div className="business-hero-card">
            <div className="business-text">
              <p className="eyebrow">Business Services</p>
              <h1>Support for Small Businesses and Growing Companies</h1>
              <p className="section-text">
                DPS Professional Tax Services supports business owners with
                professional tax preparation, document organization, compliance
                assistance, and general business guidance. We help keep your
                business organized, prepared, and moving forward with confidence.
              </p>

              <div className="business-hero-badges">
                <span className="business-badge">
                  <FaBriefcase />
                  Small Business Support
                </span>
                <span className="business-badge">
                  <FaFileInvoiceDollar />
                  Filing Guidance
                </span>
                <span className="business-badge">
                  <FaUsersCog />
                  One-on-One Consultation
                </span>
              </div>
            </div>
          </div>

          <div className="business-content-card business-audience-card">
            <div className="business-block-title">
              <FaBriefcase />
              <h2>Who This Page Is For</h2>
            </div>

            <ul className="business-list">
              {audience.map((item, index) => (
                <li key={index}>
                  <FaCheckCircle />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="business-services-grid">
            {services.map((service, index) => (
              <div className="business-service-card" key={index}>
                <div className="business-service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </div>
            ))}
          </div>

          <div className="business-content-card business-contact-card">
            <div className="business-block-title">
              <FaBuilding />
              <h2>Need Business Help?</h2>
            </div>

            <p>
              Contact us directly at <strong>info@DPStaxpro.com</strong> to
              discuss your business needs and schedule a consultation.
            </p>

            <div className="business-cta-row">
              <a
                href="mailto:info@DPStaxpro.com?subject=Business%20Services%20Inquiry"
                className="btn business-btn-primary"
              >
                <FaEnvelope />
                <span>Email info@DPStaxpro.com</span>
              </a>

              <a
                href="tel:+19733272340"
                className="btn business-btn-secondary"
              >
                <FaPhone />
                <span>Call (973) 327-2340</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default BusinessServicesPage;
