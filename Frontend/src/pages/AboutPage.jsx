import { Link } from "react-router-dom";
import {
  FaCalendarCheck,
  FaClock,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";
import Layout from "../components/Layout";

const hours = [
  { days: "Monday - Friday", time: "9:00 AM - 9:00 PM" },
  { days: "Saturday", time: "10:00 AM - 7:00 PM" },
  { days: "Sunday", time: "By appointment only" },
];

function AboutPage() {
  return (
    <Layout>
      <main className="about-page">
        <section className="section about-main">
          <div className="container about-container">
            <div className="about-heading">
              <p className="eyebrow">Get to know DPS</p>
              <h1>About Us</h1>
              <p className="about-lead">
                Tax preparation and practical business services for individuals,
                families, and small businesses in Maplewood and the Tri-State area.
              </p>
            </div>

            <div className="about-story-grid">
              <div className="about-story">
                <h2>Local support, centered on your needs</h2>
                <p>
                  Since 2007, DPS Professional Tax Services has helped clients
                  navigate tax preparation and everyday service needs. We believe
                  a good appointment starts with a clear conversation about your
                  situation, the documents you have, and the next steps.
                </p>
                <p>
                  Alongside tax services, DPS offers support for notary,
                  translation, and other practical business needs. Whether you’re
                  preparing to file or looking for a specific service, our team
                  can help you find the right place to start.
                </p>

                <div className="about-actions">
                  <Link to="/booking" className="about-button about-button-primary">
                    <FaCalendarCheck aria-hidden="true" />
                    Book an Appointment
                  </Link>
                  <Link to="/services" className="about-button about-button-outline">
                    View Services
                  </Link>
                </div>
              </div>

              <div className="about-photo-card">
                {/* Add your photo to Frontend/public/about-photo.jpg */}
                <img
                  src="/office-pics/IMG_3122_copy.jpeg"
                  alt="DPS Professional Tax Services office"
                  className="about-photo"
                  loading="lazy"
                />


                <p>Serving Maplewood, NJ since 2007</p>
              </div>
            </div>

            <div className="about-details-grid">
              <section className="about-detail-card" aria-labelledby="about-hours-title">
                <div className="about-card-heading">
                  <FaClock aria-hidden="true" />
                  <h2 id="about-hours-title">Business Hours</h2>
                </div>

                <dl className="about-hours-list">
                  {hours.map(({ days, time }) => (
                    <div className="about-hours-row" key={days}>
                      <dt>{days}</dt>
                      <dd>{time}</dd>
                    </div>
                  ))}
                </dl>
                <p className="about-hours-note">
                  Hours may change outside tax season. Please call before visiting.
                </p>
              </section>

              <section className="about-detail-card" aria-labelledby="about-visit-title">
                <div className="about-card-heading">
                  <FaMapMarkerAlt aria-hidden="true" />
                  <h2 id="about-visit-title">Visit Our Office</h2>
                </div>
                <p>1811 Springfield Ave, Maplewood, NJ 07040</p>
                <p>
                  Have a question before your visit? Call{" "}
                  <a href="tel:+19733272340">(973) 327-2340</a>.
                </p>
                <a
                  className="about-directions"
                  href="https://www.google.com/maps?q=1811+Springfield+Ave,+Maplewood,+NJ+07040"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get directions →
                </a>
              </section>
            </div>
          </div>
        </section>

        <section className="section about-contact-cta">
          <div className="container about-contact-inner">
            <div>
              <p className="eyebrow">Contact DPS</p>
              <h2>Ready to talk about what you need?</h2>
              <p>
                Reach out with a general question or visit our Contact page to
                send the team a message.
              </p>
            </div>
            <Link to="/contact" className="about-button about-button-light">
              <FaEnvelope aria-hidden="true" />
              Contact Us
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default AboutPage;
