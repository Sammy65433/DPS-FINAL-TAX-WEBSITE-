import { Link } from "react-router-dom";

function Testimonials() {
  return (
    <section id="testimonials" className="section alt" data-aos="fade-up">
      <div className="container">
        <p className="eyebrow">Client Feedback</p>
        <h2>What Clients Say about DPS</h2>
        <p className="section-text">
          A few words from clients who have trusted DPS for tax preparation and
          professional support services.
        </p>

        <div className="card-grid">
          <Link to="/client-feedback" className="card testimonial-preview-card">
            <img
              src="/client-american.jpg"
              alt="Happy client"
              className="service-card-image"
            />
            <div className="testimonial-preview-content">
              <div className="testimonial-badge">Review</div>
              <h3>Local Client</h3>
              <p>
                "Professional, helpful, and very reliable. They made my tax
                filing process easy and stress-free."
              </p>
            </div>
          </Link>

          <Link to="/client-feedback" className="card testimonial-preview-card">
            <img
              src="/client-all.jpg"
              alt="Returning client"
              className="service-card-image"
            />
            <div className="testimonial-preview-content">
              <div className="testimonial-badge">Review</div>
              <h3>Returning Client</h3>
              <p>
                "I appreciated how patient and organized the team was. They made
                the whole process feel simple and trustworthy."
              </p>
            </div>
          </Link>
        </div>

        <div className="faq-section-actions">
          <Link to="/client-feedback" className="btn">
            View Full Client Feedback
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
