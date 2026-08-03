import Layout from "../components/Layout";

function Notary() {
  return (
    <Layout>
      <section className="section">
        <div className="container taxprep-page">
          <div className="taxprep-text">
            <p className="eyebrow">Our Services</p>
            <h1>Notary Services</h1>
            <p className="section-text">
              DPS Professional Tax Services offers professional notary support
              for clients who need important documents witnessed, signed, and
              notarized properly. We help make the process simple, reliable, and
              convenient.
            </p>
          </div>

          <div className="taxprep-image-row">
            <img
              src="/notaary4.jpg"
              alt="Notary services"
              className="taxprep-page-image"
            />
            <img
              src="/notary2.jpg"
              alt="Document signing"
              className="taxprep-page-image"
            />
            <img
              src="/walk-ins1.jpg"
              alt="Client service support"
              className="taxprep-page-image"
            />
          </div>

          <div className="service-content">
            <h2>What We Help With</h2>
            <p>
              We assist clients who need documents notarized for personal,
              legal, business, or financial purposes. Our goal is to provide a
              smooth and professional experience while helping clients complete
              the required steps correctly.
            </p>

            <p>
              We understand that notarized documents are often time-sensitive,
              so we focus on making the process efficient while maintaining
              accuracy and professionalism.
            </p>

            <h2>Types of Notary Support</h2>
            <ul>
              <li>Personal document notarization</li>
              <li>Business-related document notarization</li>
              <li>Forms requiring signatures and witness verification</li>
              <li>General support for official paperwork</li>
              <li>Convenient in-office service for clients</li>
              <li>Guidance on preparing documents before notarization</li>
            </ul>

            <h2>Why Clients Choose DPS</h2>
            <p>
              Clients choose DPS for notary services because we provide
              dependable, professional support in a welcoming environment. We
              help clients feel prepared and confident when handling important
              paperwork.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Notary;
