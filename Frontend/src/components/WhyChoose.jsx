import { Link } from "react-router-dom";

function WhyChoose() {
  return (
    <section className="section alt" data-aos="fade-up">
      <div className="container">
        <p className="eyebrow">
          Why Choose Dps Professional Tax & Professional Support Services?
        </p>

        <h2 className="h2-sub">19+ Years of Trusted Service</h2>

        <p className="section-text">
          With over 19 years of experience, We have served more than 2,000
          clients throughout New Jersey and the Tri-State area with trusted Tax
          Preparation and Professional Support Services.
        </p>

        <div className="why-choose-button-wrap">
          <Link to="/moments" className="btn">
            See Our Moments
          </Link>
        </div>

        <div className="card-grid">
          <div className="card">
            <img
              src="/pro2.jpg"
              alt="Professional experience"
              className="service-card-image"
            />
            <h3>19+ Years of Experience</h3>
            <p>
              Long-standing knowledge of tax law and what local families and
              businesses actually need.
            </p>
          </div>

          <div className="card">
            <img
              src="/officelocation-1.jpg"
              alt="DPS office location in Maplewood"
              className="service-card-image"
            />
            <h3>One Convenient Location</h3>
            <p>
              Visit us for tax, document, and support services at our Maplewood
              office.
            </p>
            <a
              href="https://www.google.com/maps/search/1811+Springfield+Ave+Maplewood+NJ+07040"
              target="_blank"
              rel="noopener noreferrer"
              className="card-link"
            >
              1811 Springfield Ave, Maplewood, NJ 07040
            </a>
          </div>

          <div className="card">
            <img
              src="/trusted-com1.jpg"
              alt="Trusted community support"
              className="service-card-image"
            />
            <h3>Trusted in Maplewood</h3>
            <p>
              A familiar name for residents who keep coming back year after
              year.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChoose;
