import { Link } from "react-router-dom";
import {
  FaAward,
  FaMapMarkerAlt,
  FaUsers,
  FaArrowRight,
} from "react-icons/fa";

function WhyChoose() {
  return (
    <section className="section why-choose-section" data-aos="fade-up">
      <div className="container">
        <div className="why-choose-heading">
          <p className="eyebrow">
            Why Choose DPS Professional Tax & Professional Support Services?
          </p>
          <h2 className="h2-sub">19+ Years of Trusted Service</h2>
          <p className="section-text">
            With over 19 years of experience, we have served more than 2,000
            clients throughout New Jersey and the Tri-State area with trusted tax
            preparation and professional support services.
          </p>
        </div>

        <div className="why-choose-button-wrap">
          <Link to="/moments" className="btn why-choose-btn">
            See Our Moments
          </Link>
        </div>

        <div className="card-grid why-choose-grid">
          <div className="card why-choose-card">
            <img
              src="/pro2.jpg"
              alt="Professional experience"
              className="service-card-image"
            />
            <div className="why-choose-card-content">
              <div className="why-choose-badge">
                <FaAward />
                <span>Experience</span>
              </div>
              <h3>19+ Years of Experience</h3>
              <p>
                Long-standing knowledge of tax law and what local families and
                businesses actually need.
              </p>
            </div>
          </div>

          <div className="card why-choose-card">
            <img
              src="/officelocation-1.jpg"
              alt="DPS office location in Maplewood"
              className="service-card-image"
            />
            <div className="why-choose-card-content">
              <div className="why-choose-badge">
                <FaMapMarkerAlt />
                <span>Location</span>
              </div>
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
                <FaArrowRight />
              </a>
            </div>
          </div>

          <div className="card why-choose-card">
            <img
              src="/trusted-com1.jpg"
              alt="Trusted community support"
              className="service-card-image"
            />
            <div className="why-choose-card-content">
              <div className="why-choose-badge">
                <FaUsers />
                <span>Community</span>
              </div>
              <h3>Trusted in Maplewood</h3>
              <p>
                A familiar name for residents who keep coming back year after year.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChoose;
