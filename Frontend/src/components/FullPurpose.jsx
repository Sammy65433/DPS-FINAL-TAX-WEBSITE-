import { Link } from "react-router-dom";
import {
    FaBullseye,
    FaCalendarCheck,
    FaCheckCircle,
    FaEnvelope,
    FaEye,
    FaHandshake,
    FaUsers,
} from "react-icons/fa";

const purposeItems = [
    {
        icon: FaBullseye,
        label: "Mission",
        title: "DPS Mission",
        image: "/vision-2.jpg",
        text:
            "To provide reliable tax preparation and practical professional support with honesty, care, and respect. We want individuals, families, and small businesses to feel informed about the services they receive and comfortable asking questions.",
    },
    {
        icon: FaEye,
        label: "Vision",
        title: "DPS Vision",
        image: "/vision-1.jpg",
        text:
            "To be a trusted resource throughout Maplewood, New Jersey, and the Tri-State area. We aim to build lasting relationships by making important tax, document, and business services easier for our community to navigate.",
    },
    {
        icon: FaHandshake,
        label: "Commitment",
        title: "DPS Commitment",
        image: "/vision-3.jpg",
        text:
            "To treat each client with personal attention, clear communication, and respect. Whether you visit for taxes or another service, our team will help you understand what to bring, what to expect, and the next steps.",
    },
];

function FullPurpose() {
    return (
        <section className="section full-purpose-section" id="mission-vision">
            <div className="container">
                <div className="full-purpose-heading">
                    <img
                        src="/DPS-LOGO1.png"
                        alt="DPS Professional Tax Services logo"
                        className="full-purpose-logo"
                    />
                    <p className="eyebrow">Our Purpose</p>
                    <h1>DPS Mission, Vision &amp; Commitment</h1>
                    <p>
                        At DPS Professional Tax Services, our work is rooted in service,
                        trust, and community. We believe professional support should feel
                        clear, respectful, and accessible to every client.
                    </p>
                    <p>
                        Since 2007, we’ve served people in Maplewood and surrounding
                        communities. From tax preparation to notary, translation, and
                        everyday business services, our goal is to make each step easier
                        to understand and more dependable.
                    </p>
                </div>

                <div className="purpose-grid">
                    {purposeItems.map(({ icon: Icon, label, title, image, text }) => (
                        <article className="purpose-card" key={label}>
                            <img src={image} alt="" className="purpose-card-image" loading="lazy" />
                            <div className="purpose-card-content">
                                <span className="purpose-icon">
                                    <Icon aria-hidden="true" />
                                </span>
                                <span className="purpose-badge">{label}</span>
                                <h2>{title}</h2>
                                <p>{text}</p>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="purpose-detail-block">
                    <div className="purpose-detail-title">
                        <FaUsers aria-hidden="true" />
                        <h2>What Our Purpose Means in Practice</h2>
                    </div>
                    <p>
                        Our purpose shows up in how we communicate, prepare clients for
                        appointments, and explain forms, deadlines, and next steps. Many
                        services involve personal or financially important decisions. We
                        approach those conversations with patience, professionalism, and
                        attention to detail.
                    </p>
                    <p>
                        Strong service also means meeting people where they are. That can
                        include multilingual support, guidance on secure document-sharing
                        options, and time to discuss questions before moving forward. We
                        want clients to leave knowing what comes next.
                    </p>
                </div>
<div className="purpose-photo-grid" aria-label="DPS purpose gallery">
  {[
    { src: "/purpose-3.jpg", alt: "DPS community and service" },
    { src: "/purpose-1.jpg", alt: "DPS team and clients" },
    { src: "/purpose-2.jpg", alt: "Professional support at DPS" },
  ].map(({ src, alt }) => (
    <div className="purpose-photo-card" key={src}>
      <img src={src} alt={alt} loading="lazy" />
    </div>
  ))}
</div>

                <div className="purpose-note">
                    <FaCheckCircle aria-hidden="true" />
                    <p>
                        <strong>Our Promise:</strong> A professional, organized, respectful
                        experience centered on earning your trust.
                    </p>
                </div>

                <div className="purpose-cta">
                    <div>
                        <h2>Let’s Take the Next Step</h2>
                        <p>
                            Connect with DPS to discuss your needs or reserve a time with our team.
                        </p>
                    </div>
                    <div className="purpose-cta-actions">
                        <Link to="/booking">
                            <FaCalendarCheck aria-hidden="true" />
                            Book Now
                        </Link>
                        <Link to="/contact">
                            <FaEnvelope aria-hidden="true" />
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FullPurpose;
