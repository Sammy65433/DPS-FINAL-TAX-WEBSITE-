import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero" data-aos="fade-up">
      <div className="container hero-content">
        <p className="tag">19+ Years Serving Maplewood, NJ</p>
        <h1>DPS Professional Tax and Business Services You Can Trust</h1>
        <p className="lead">
          For over 19 years, DPS has provided trusted tax preparation, document
          support, immigration assistance, insurance services, and essential
          business services to individuals, families, and small businesses
          throughout New Jersey and the Tri-State area.
        </p>

        <div className="hero-buttons">
          <Link to="/booking" className="btn">
            Book Appointment
          </Link>
          <a href="tel:9733272340" className="btn btn-ghost">
            Call the Office
          </a>
        </div>

        <p className="irs-note">IRS e-file Authorized Agent</p>
      </div>
    </section>
  );
}

export default Hero;
