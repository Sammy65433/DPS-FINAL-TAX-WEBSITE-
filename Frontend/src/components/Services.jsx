import { Link } from "react-router-dom";

function Services() {
  return (
    <section className="section" id="services" data-aos="fade-down">
      <div className="container">
        <p className="eyebrow">What we do</p>
        <h2>Services</h2>
        <p className="section-text">
          Reliable, Professional Support for Individuals, Families, and Small
          businesses.
        </p>

        <div className="card-grid">
          <Link to="/tax-preparation" className="card">
            <img
              src="/tax-prep2.jpg"
              alt="Tax preparation service"
              className="service-card-image"
            />
            <h3>Tax Preparation</h3>
            <p>Professional filing support for individuals and businesses.</p>
          </Link>

          <Link to="/notary" className="card">
            <img
              src="/notaary4.jpg"
              alt="Notary public service"
              className="service-card-image"
            />
            <h3>Notary Public</h3>
            <p>Fast, professional notarization when you need it.</p>
          </Link>

          <Link to="/translation" className="card">
            <img
              src="/transla1.jpg"
              alt="Translation service"
              className="service-card-image"
            />
            <h3>Translation</h3>
            <p>
              Multilingual document support to help clients understand,
              complete, and submit important paperwork with confidence.
            </p>
          </Link>

          <Link to="/immigration" className="card">
            <img
              src="/transla2.jpg"
              alt="Immigration services"
              className="service-card-image"
            />
            <h3>Immigration Services</h3>
            <p>Help with immigration-related forms and paperwork.</p>
          </Link>

          <Link to="/copy-fax" className="card">
            <img
              src="/copy2.jpg"
              alt="Copy and fax services"
              className="service-card-image"
            />
            <h3>Copy & Fax</h3>
            <p>Document copying and faxing on-site.</p>
          </Link>

          <Link to="/insurance-services" className="card">
            <img
              src="/insurance2.jpg"
              alt="Insurance services"
              className="service-card-image"
            />
            <h3>Insurance Services</h3>
            <p>
              Guidance for life, auto, health, and other everyday insurance
              needs.
            </p>
          </Link>

          <a href="#realty" className="card">
            <img
              src="/real-estate.jpg"
              alt="Real estate service"
              className="service-card-image"
            />
            <h3>Real Estate</h3>
            <p>
              Buying, selling, renting, or investing, handled by our trusted
              partner.
            </p>
            <span className="card-link">Need Help? →</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Services;
