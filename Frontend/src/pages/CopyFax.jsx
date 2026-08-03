import Layout from "../components/Layout";

function CopyFax() {
  return (
    <Layout>
      <section className="section">
        <div className="container taxprep-page">
          <div className="taxprep-text">
            <p className="eyebrow">Our Services</p>
            <h1>Copy & Fax Services</h1>
            <p className="section-text">
              DPS Professional Tax Services offers convenient on-site copy and
              fax services for clients who need fast, reliable support with
              important documents. Whether for personal, business, or
              administrative use, we help make the process quick and simple.
            </p>
          </div>

          <div className="taxprep-image-row">
            <img
              src="/copy2.jpg"
              alt="Copy and fax services"
              className="taxprep-page-image"
            />
            <img
              src="/pro2.jpg"
              alt="Professional document support"
              className="taxprep-page-image"
            />
            <img
              src="/officelocation-1.jpg"
              alt="Office support services"
              className="taxprep-page-image"
            />
          </div>

          <div className="service-content">
            <h2>What We Help With</h2>
            <p>
              We help clients who need copies of important paperwork or who need
              to send documents quickly by fax. Our service is designed to be
              straightforward and dependable, especially for clients handling
              time-sensitive forms or official records.
            </p>

            <p>
              Whether you need a few pages copied, documents prepared for faxing,
              or general assistance with paperwork handling, we provide a simple
              in-office solution.
            </p>

            <h2>Types of Copy & Fax Support</h2>
            <ul>
              <li>Document copying for personal or business use</li>
              <li>Faxing important forms and paperwork</li>
              <li>Support preparing documents for transmission</li>
              <li>Convenient in-office document services</li>
              <li>Help with everyday paperwork needs</li>
              <li>Reliable support for time-sensitive document handling</li>
            </ul>

            <h2>Why Clients Choose DPS</h2>
            <p>
              Clients choose DPS because we offer a convenient and professional
              place to handle important document tasks. We focus on making the
              process easy, organized, and dependable for every client.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default CopyFax;
