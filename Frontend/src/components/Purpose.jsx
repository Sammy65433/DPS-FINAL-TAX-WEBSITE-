import Layout from "../components/Layout";
import { FaBullseye, FaEye, FaHandshake } from "react-icons/fa";

function PurposePage() {
  return (
    <Layout>
      <section className="section purpose-section" id="mission-vision" data-aos="fade-up">
        <div className="container">
          <div className="purpose-heading">
            <p className="eyebrow">Our Purpose</p>
            <h2 className="h2-sub">DPS Mission & Vision</h2>
            <p className="purpose-intro">
              DPS Professional Tax Services exists to provide trusted, respectful,
              and dependable support for individuals, families, and businesses in
              our community.
            </p>
          </div>

          <div className="purpose-story">
            <p className="full-purpose-text">
              We believe professional support should feel clear, respectful, and
              accessible for every client who walks through our doors. Whether
              someone comes to us for tax preparation, document support,
              translation, immigration-related paperwork, insurance guidance, or
              real estate referrals, our purpose is to make the process easier to
              understand and more dependable from beginning to end.
            </p>

            <p className="full-purpose-text">
              Over the years, we have built our reputation by helping individuals,
              families, and small businesses feel informed, prepared, and
              supported. Our goal is not only to provide services, but to create
              an experience where clients feel respected, valued, and confident in
              the help they are receiving.
            </p>
          </div>

          <div className="purpose-grid">
            <div className="purpose-card">
              <div className="purpose-icon">
                <FaBullseye />
              </div>
              <div className="purpose-badge">Mission</div>
              <h3>DPS Mission</h3>
              <p>
                To provide reliable tax preparation and professional support
                services with honesty, care, and respect for every individual,
                family, and business we serve.
              </p>
            </div>

            <div className="purpose-card">
              <div className="purpose-icon">
                <FaEye />
              </div>
              <div className="purpose-badge">Vision</div>
              <h3>DPS Vision</h3>
              <p>
                To be a trusted resource throughout New Jersey and the Tri-State
                area by helping communities access dependable financial, document,
                and business support services.
              </p>
            </div>

            <div className="purpose-card">
              <div className="purpose-icon">
                <FaHandshake />
              </div>
              <div className="purpose-badge">Commitment</div>
              <h3>DPS Commitment</h3>
              <p>
                We are committed to making important services more accessible,
                understandable, and dependable for every client who relies on us
                for guidance and support.
              </p>
            </div>
          </div>

          <div className="purpose-note">
            <strong>Community First:</strong> We are proud to serve Maplewood and
            surrounding communities with trusted service, personal attention, and
            a long-term commitment to client care.
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default PurposePage;
