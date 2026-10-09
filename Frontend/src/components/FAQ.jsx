import { Link } from "react-router-dom";
import { FaFileAlt, FaCalendarCheck, FaLanguage } from "react-icons/fa";

const questions = [
  {
    icon: FaFileAlt,
    image: "/notary2.jpg",
    alt: "Documents for an appointment",
    title: "What should I bring?",
    answer: "Bring a photo ID, relevant income records, and any tax documents you've received.",
  },
  {
    icon: FaCalendarCheck,
    image: "/walk-ins1.jpg",
    alt: "Office appointment support",
    title: "Do you accept walk-ins?",
    answer: "Walk-ins may be available, but an appointment is the best way to reserve time.",
  },
  {
    icon: FaLanguage,
    image: "/language1.jpg",
    alt: "Multilingual client support",
    title: "What languages do you support?",
    answer: "Ask about support in English, Kreyòl, French, and Spanish.",
  },
];

function FAQ() {
  return (
    <section id="faq" className="section faq-preview-section">
      <div className="container">
        <div className="faq-heading">
          <p className="eyebrow">Plan your visit</p>
          <h2>What to Bring &amp; FAQ</h2>
          <p className="section-text">
            A few answers to help you feel prepared before visiting DPS.
          </p>
        </div>

        <div className="faq-preview-grid">
          {questions.map(({ icon: Icon, image, alt, title, answer }) => (
            <Link to="/faq" className="faq-preview-card" key={title}>
              <img src={image} alt={alt} className="service-card-image" loading="lazy" />
              <div className="faq-preview-card-content">
                <span className="faq-badge">
                  <Icon aria-hidden="true" />
                </span>
                <h3>{title}</h3>
                <p>{answer}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="faq-section-actions">
          <Link to="/faq" className="btn">See What to Bring &amp; FAQ</Link>
        </div>
      </div>
    </section>
  );
}

export default FAQ;
