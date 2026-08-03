import { Link } from "react-router-dom";

function HowItWorks() {
  return (
    <section className="section" data-aos="fade-up">
      <div className="container">
        <p className="eyebrow">How It Works</p>
        <h2>Simple and Stress-Free</h2>

        <div className="card-grid">
          <div className="card">
            <h3>1. Book</h3>
            <p>Schedule your appointment online or call the office.</p>
            <Link to="/booking" className="btn how-it-works-btn">
              Book Now
            </Link>
          </div>

          <div className="card">
            <h3>2. Confirm</h3>
            <p>
              Receive an email confirmation with your appointment details and
              options to cancel or reschedule if needed.
            </p>
          </div>

          <div className="card">
            <h3>3. Prepare</h3>
            <p>Bring your documents or upload them securely to the portal.</p>
          </div>

          <div className="card">
            <h3>4. File</h3>
            <p>Meet with a preparer and complete your service with confidence.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
