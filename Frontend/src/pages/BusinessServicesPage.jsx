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
            text: "Tax preparation support for sole proprietors, LLCs, and growing businesses.",
        },
        {
            icon: <FaFileInvoiceDollar />,
            title: "Financial Document Support",
            text: "Help organizing income, expenses, and required business records for filing and planning.",
        },
        {
            icon: <FaClipboardList />,
            title: "Compliance & Filing Guidance",
            text: "Assistance with maintaining records, submitting required information, and staying organized.",
        },
        {
            icon: <FaUsersCog />,
            title: "Business Consultation",
            text: "Consultation for small and growing businesses looking for dependable support and guidance.",
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
            <section className="business-page">
                <div className="container">
                    <div className="business-hero">
                        <div className="business-hero-text">
                            <p className="eyebrow">Business Services</p>
                            <h2 className="h2-sub">
                                Support for Small Businesses and Growing Companies
                            </h2>
                            <p className="section-text">
                                DPS Professional Tax Services supports business owners with
                                professional tax preparation, document organization, compliance
                                assistance, and general business service guidance. Whether you are
                                starting small or managing a growing operation, we help keep your
                                business organized and prepared.
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

                        <div className="business-hero-card">
                            <div className="business-card-heading">
                                <FaBriefcase />
                                <h4>Who This Page Is For</h4>
                            </div>

                            <ul>
                                {audience.map((item, index) => (
                                    <li key={index}>
                                        <FaCheckCircle className="business-list-icon" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="business-services-grid">
                        {services.map((service, index) => (
                            <div className="business-service-card" key={index}>
                                <div className="business-service-icon">{service.icon}</div>
                                <h5>{service.title}</h5>
                                <p>{service.text}</p>
                            </div>
                        ))}
                    </div>

                    <div className="business-bottom-card">
                        <div>
                            <h4>Need Business Help?</h4>
                            <p>
                                Contact us directly at <strong>info@DPStaxpro.com</strong> to discuss
                                your business needs and schedule a consultation.
                            </p>
                        </div>

                        <div className="business-cta-row">
                            <a
                                href="mailto:info@DPStaxpro.com?subject=Business%20Services%20Consultation"
                                className="btn business-btn-primary"
                            >
                                <FaEnvelope />
                                <span>Email Us</span>
                            </a>

                            <a href="tel:+19733272340" className="btn business-btn-secondary">
                                <FaPhone />
                                <span>Call Now</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}

export default BusinessServicesPage;
