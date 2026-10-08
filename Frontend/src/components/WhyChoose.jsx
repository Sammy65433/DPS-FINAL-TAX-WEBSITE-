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
          <p className="eyebrow">Why Choose DPS?</p>
          <h2 className="h2-sub">Experience, Access, and Personal Support</h2>
          <p className="section-text">
            Learn about our approach, explore our services, and find the
            support that fits your needs.
          </p>
        </div>

        <div className="why-choose-button-wrap">
          <Link to="/moments" className="btn why-choose-btn">
            See Our Moments
          </Link>
        </div>

        <div className="card-grid why-choose-grid">
          <Link to="/about" className="card why-choose-card">
            <img
              src="/pro2.jpg"
              alt="Documents being reviewed"
              className="service-card-image"
            />
            <div className="why-choose-card-content">
              <div className="why-choose-badge">
                <FaAward />
                <span>Experience</span>
              </div>
              <h3>Get to Know DPS</h3>
              <p>Learn about our team and how we support clients.</p>
              <span className="card-link">
                About DPS <FaArrowRight />
              </span>
            </div>
          </Link>

          <article className="card why-choose-card">
            <img
              src="/officelocation-1.jpg"
              alt="DPS office location"
              className="service-card-image"
            />
            <div className="why-choose-card-content">
              <div className="why-choose-badge">
                <FaMapMarkerAlt />
                <span>Location</span>
              </div>
              <h3>Visit Our Maplewood Office</h3>
              <p>Find directions and contact details before your visit.</p>
              <a
                href="https://www.google.com/maps/search/1811+Springfield+Ave+Maplewood+NJ+07040"
                target="_blank"
                rel="noopener noreferrer"
                className="card-link"
              >
                Get Directions <FaArrowRight />
              </a>
            </div>
          </article>

          <Link to="/client-feedback" className="card why-choose-card">
            <img
              src="/trusted-com1.jpg"
              alt="People discussing documents"
              className="service-card-image"
            />
            <div className="why-choose-card-content">
              <div className="why-choose-badge">
                <FaUsers />
                <span>Community</span>
              </div>
              <h3>Hear From Our Clients</h3>
              <p>Read feedback shared by people who have worked with DPS.</p>
              <span className="card-link">
                Client Feedback <FaArrowRight />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default WhyChoose;
