import Layout from "../components/Layout";

function InsuranceServices() {
  return (
    <Layout>
      <section className="section">
        <div className="container taxprep-page">
          <div className="taxprep-text">
            <p className="eyebrow">Our Services</p>
            <h1>Insurance Services</h1>
            <p className="section-text">
              DPS Professional Tax Services provides guidance for clients
              exploring insurance options for everyday personal and family
              needs. We help clients better understand available coverage and
              take the next step with confidence.
            </p>
          </div>

          <div className="taxprep-image-row">
            <img
              src="/insurance113.jpg"
              alt="Insurance guidance services"
              className="taxprep-page-image"
            />
            <img
              src="/trusted-com1.jpg"
              alt="Trusted client support"
              className="taxprep-page-image"
            />
            <img
              src="/insurance112.jpg"
              alt="Business and personal planning"
              className="taxprep-page-image"
            />
          </div>

          <div className="service-content">
            <h2>What We Help With</h2>
            <p>
              We help clients navigate general insurance questions and connect
              with coverage options that fit their needs. Whether someone is
              looking for personal coverage or wants to better understand
              available plans, we provide clear and supportive guidance.
            </p>

            <p>
              Insurance decisions can feel overwhelming, so we focus on helping
              clients understand their options in a practical and approachable
              way.
            </p>

            <h2>Types of Insurance Support</h2>
            <ul>
              <li>General guidance for personal insurance needs</li>
              <li>Support exploring life insurance options</li>
              <li>Support exploring auto insurance options</li>
              <li>Support exploring health-related coverage options</li>
              <li>Basic help understanding plan information</li>
              <li>Guidance for individuals, families, and small business owners</li>
            </ul>

            <h2>Why Clients Choose DPS</h2>
            <p>
              Clients choose DPS because we provide patient, professional, and
              trustworthy support. We aim to make insurance conversations easier
              to understand so clients can make informed decisions with greater
              confidence.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default InsuranceServices;
