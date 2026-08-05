import { Link } from "react-router-dom";

function HowItWorks() {
  return (
    <section className="section how-it-works-preview" data-aos="fade-up">
      <div className="container">
        <p className="eyebrow">How It Works</p>
        <h2>Simple and Stress-Free</h2>
        <p className="section-text how-full-text">
          Our process is designed to make booking and receiving support simple,
          organized, and comfortable from the start.
        </p>

        <div className="how-step-grid">
          <Link
            to="/how-it-works#book-step"
            className="card how-step-card how-preview-card"
          >
            <div className="how-step-number">01</div>
            <h3>1. Book</h3>
            <p>Schedule your appointment online or call the office directly.</p>
            <span className="btn how-it-works-btn">Book Now</span>
          </Link>

          <Link
            to="/how-it-works#confirm-step"
            className="card how-step-card how-preview-card"
          >
            <div className="how-step-number">02</div>
            <h3>2. Confirm</h3>
            <p>
              Receive an email confirmation with your appointment details and
              next-step options.
            </p>
          </Link>

          <Link
            to="/how-it-works#prepare-step"
            className="card how-step-card how-preview-card"
          >
            <div className="how-step-number">03</div>
            <h3>3. Prepare</h3>
            <p>Bring your documents or upload them securely to the portal.</p>
          </Link>

          <Link
            to="/how-it-works#file-step"
            className="card how-step-card how-preview-card"
          >
            <div className="how-step-number">04</div>
            <h3>4. File</h3>
            <p>Meet with a preparer and complete your service with confidence.</p>
          </Link>
        </div>

        <div className="how-page-actions">
          <Link to="/how-it-works" className="btn">
            View Full Process
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
