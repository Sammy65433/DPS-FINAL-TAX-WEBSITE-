import { FaGlobeAmericas, FaComments, FaUsers, FaCheckCircle } from "react-icons/fa";

function Languages() {
  return (
    <section className="section language-section" data-aos="fade-up">
      <div className="container language-page">
        <div className="language-hero-card">
          <div className="language-heading">
            <p className="eyebrow">We Speak Your Language</p>
            <h2>Multilingual Support You Can Trust</h2>
            <p className="section-text language-section-text">
              Clear communication matters, especially when handling taxes, forms,
              appointments, and important paperwork. DPS is proud to support
              clients in multiple languages so every visit feels more comfortable,
              understandable, and welcoming.
            </p>
          </div>

          <div className="language-highlight-row">
            <div className="language-highlight-card">
              <FaGlobeAmericas />
              <span>Multilingual Service</span>
            </div>
            <div className="language-highlight-card">
              <FaComments />
              <span>Clear Communication</span>
            </div>
            <div className="language-highlight-card">
              <FaUsers />
              <span>Community-Focused Support</span>
            </div>
          </div>
        </div>

        <div className="language-images">
          <img
            src="/WeSpeakAllFlags.jpg"
            alt="Professional multilingual support"
          />
          <img
            src="/pexels-paresh-patil-888104-15694429.jpg"
            alt="Helping clients with document support"
          />
        </div>

        <div className="lang-strip">
          <div className="lang-box">
            <img
              src="/americanflag1.jpg"
              alt="English flag"
              className="flag-icon"
            />
            <div className="lang-box-content">
              <strong>English</strong>
              <p>Professional tax and support services you can trust.</p>
            </div>
          </div>

          <div className="lang-box">
            <img
              src="/Haitiflag.jpg"
              alt="Haitian Creole flag"
              className="flag-icon"
            />
            <div className="lang-box-content">
              <strong>Kreyòl</strong>
              <p>Sèvis taks pwofesyonèl ak sipò ou ka fè konfyans.</p>
            </div>
          </div>

          <div className="lang-box">
            <img
              src="/FranceFlag.jpg"
              alt="French flag"
              className="flag-icon"
            />
            <div className="lang-box-content">
              <strong>Français</strong>
              <p>Des services fiscaux professionnels et de confiance.</p>
            </div>
          </div>

          <div className="lang-box">
            <img
              src="/SpainFlag.jpg"
              alt="Spanish flag"
              className="flag-icon"
            />
            <div className="lang-box-content">
              <strong>Español</strong>
              <p>Servicios profesionales de impuestos en los que puede confiar.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Languages;
