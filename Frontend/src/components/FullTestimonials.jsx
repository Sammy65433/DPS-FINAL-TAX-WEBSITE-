import { Link } from "react-router-dom";
import {
  FaCalendarCheck,
  FaComments,
  FaEnvelope,
  FaGlobeAmericas,
  FaStar,
  FaUserCheck,
} from "react-icons/fa";

const reviews = [
  {
    image: "/client-american.jpg",
    icon: FaStar,
    language: "Review",
    title: "Local Client",
    quote:
      "Professional, helpful, and very reliable. They made my tax filing process easy and stress-free.",
  },
  {
    image: "/client-blk1.jpg",
    icon: FaGlobeAmericas,
    language: "Kreyòl",
    title: "Kreyòl-Speaking Client",
    quote:
      "Mwen te jwenn yon sèvis trè pwofesyonèl. Yo te pran tan pou ede m konprann dokiman mwen yo epi yo te trete m ak anpil respè.",
  },
  {
    image: "/client5.jpg",
    icon: FaComments,
    language: "French",
    title: "French-Speaking Client",
    quote:
      "Service très professionnel et chaleureux. On a pris le temps de tout m’expliquer clairement, ce qui m’a tout de suite mis en confiance.",
  },
  {
    image: "/client4.jpg",
    icon: FaGlobeAmericas,
    language: "Spanish",
    title: "Spanish-Speaking Client",
    quote:
      "Recibí un servicio excelente. Me ayudaron con mis impuestos y respondieron todas mis preguntas con paciencia y claridad.",
  },
  {
    image: "/client-all.jpg",
    icon: FaUserCheck,
    language: "Review",
    title: "Returning Client",
    quote:
      "I appreciated how patient and organized the team was. They made the whole process feel simple and trustworthy.",
  },
  {
    image: "/client-blk3.jpg",
    icon: FaStar,
    language: "Review",
    title: "First-Time Client",
    quote:
      "The staff was patient, respectful, and very clear. I felt comfortable asking questions the entire time.",
  },
  {
    image: "/client-blk2.jpg",
    icon: FaGlobeAmericas,
    language: "Kreyòl",
    title: "Returning Kreyòl Client",
    quote:
      "Yo te ede m byen vit epi yo te trè pwofesyonèl. Mwen ta rekòmande sèvis sa yo ak tout moun.",
  },
  {
    image: "/client-spanish3.jpg",
    icon: FaGlobeAmericas,
    language: "Spanish",
    title: "Spanish-Speaking Client",
    quote:
      "Muy organizados y amables. El proceso fue sencillo y me sentí bien atendido desde el primer momento.",
  },
];

function FullTestimonials() {
  return (
    <section className="section full-testimonials-section">
      <div className="container">
        <div className="full-testimonials-heading">
          <p className="eyebrow">Client Feedback</p>
          <h1>What Clients Say About DPS</h1>
          <p>
            We’re grateful for the trust clients place in DPS Professional Tax
            Services. Their feedback speaks to the care, communication, and
            personal attention we aim to provide.
          </p>
        </div>

        <div className="full-testimonials-grid">
          {reviews.map(({ image, icon: Icon, language, title, quote }) => (
            <article className="full-testimonial-card" key={`${title}-${quote}`}>
              <img
                src={image}
                alt=""
                className="full-testimonial-image"
                loading="lazy"
              />
              <div className="full-testimonial-content">
                <span className="full-testimonial-badge">
                  <Icon aria-hidden="true" />
                  {language}
                </span>
                <h2>{title}</h2>
                <p>“{quote}”</p>
              </div>
            </article>
          ))}
        </div>

        <div className="full-testimonials-cta">
          <div>
            <h2>Experience DPS for Yourself</h2>
            <p>
              Contact our team with a general question or book an appointment
              to discuss the service you need.
            </p>
          </div>
          <div className="full-testimonials-actions">
            <Link to="/contact">
              <FaEnvelope aria-hidden="true" />
              Contact Us
            </Link>
            <Link to="/booking">
              <FaCalendarCheck aria-hidden="true" />
              Book Appointment
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FullTestimonials;
