function FAQ() {
  return (
    <section id="faq" className="section">
      <div className="container">
        <p className="eyebrow">FAQ</p>
        <h2>Frequently Asked Questions</h2>
        <div className="card-grid">
          <div className="card">
            <img
              src="/notary2.jpg"
              alt="Tax documents for appointment"
              className="service-card-image"
            />
            <h3>What should I bring to my tax appointment?</h3>
            <p>
              Please bring your ID, tax documents, income forms, and any important supporting paperwork.
            </p>
          </div>

          <div className="card">
            <img
              src="/walk-ins1.jpg"
              alt="Office appointment and walk-in support"
              className="service-card-image"
            />
            <h3>Do you accept walk-ins?</h3>
            <p>
              Walk-ins may be accepted based on availability, but appointments are recommended.
            </p>
          </div>

          <div className="card">
            <img
              src="/language1.jpg"
              alt="Multilingual client support"
              className="service-card-image"
            />
            <h3>Do you offer help in multiple languages?</h3>
            <p>
              Yes. We provide support in English, Kreyòl, French, and Spanish.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQ;
