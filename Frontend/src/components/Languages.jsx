function Languages() {
  return (
    <section className="section language-section" data-aos="fade-up">
      <div className="container">
        <h2>We Speak Your Language</h2>

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
            <img src="/americanflag1.jpg" alt="English flag" className="flag-icon" />
            <div>
              <strong>English</strong>
              Professional tax and support services you can trust.
            </div>
          </div>

          <div className="lang-box">
            <img src="/Haitiflag.jpg" alt="Haitian Creole flag" className="flag-icon" />
            <div>
              <strong>Kreyòl</strong>
              Sèvis taks pwofesyonèl ak sipò ou ka fè konfyans.
            </div>
          </div>

          <div className="lang-box">
            <img src="/FranceFlag.jpg" alt="French flag" className="flag-icon" />
            <div>
              <strong>Français</strong>
              Des services fiscaux professionnels et de confiance.
            </div>
          </div>

          <div className="lang-box">
            <img src="/SpainFlag.jpg" alt="Spanish flag" className="flag-icon" />
            <div>
              <strong>Español</strong>
              Servicios profesionales de impuestos en los que puede confiar.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Languages;
