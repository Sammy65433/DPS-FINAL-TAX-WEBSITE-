import { Link } from "react-router-dom";

function FAQ() {
  return (
    <section id="faq" className="section">
      <div className="container">
        <p className="eyebrow">FAQ</p>
        <h2>Frequently Asked Questions</h2>
        <p className="section-text">
          A few common questions clients often ask before visiting DPS.
        </p>

        <div className="card-grid">
          <Link to="/faq" className="card faq-preview-card">
            <img
              src="/notary2.jpg"
              alt="Tax documents for appointment"
              className="service-card-image"
            />
            <div className="faq-preview-card-content">
              <div className="faq-badge">Q1</div>
              <h3>What should I bring to my tax appointment?</h3>
              <p>
                Bring your ID, income documents, and any important paperwork
                that may help us prepare your return.
              </p>
            </div>
          </Link>

          <Link to="/faq" className="card faq-preview-card">
            <img
              src="/walk-ins1.jpg"
              alt="Office appointment and walk-in support"
              className="service-card-image"
            />
            <div className="faq-preview-card-content">
              <div className="faq-badge">Q2</div>
              <h3>Do you accept walk-ins?</h3>
              <p>
                Walk-ins may be accepted based on availability, but appointments
                are recommended.
              </p>
            </div>
          </Link>

          <Link to="/faq" className="card faq-preview-card">
            <img
              src="/language1.jpg"
              alt="Multilingual client support"
              className="service-card-image"
            />
            <div className="faq-preview-card-content">
              <div className="faq-badge">Q3</div>
              <h3>Do you offer help in multiple languages?</h3>
              <p>
                Yes. We provide support in English, Kreyòl, French, and Spanish.
              </p>
            </div>
          </Link>
        </div>

        <div className="faq-section-actions">
          <Link to="/faq" className="btn">
            View Full FAQ
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FAQ;
