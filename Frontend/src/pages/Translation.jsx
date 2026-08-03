import Layout from "../components/Layout";
import Languages from "../components/Languages";

function Translation() {
  return (
    <Layout>
      <section className="section">
        <div className="container taxprep-page">
          <div className="taxprep-text">
            <p className="eyebrow">Our Services</p>
            <h1>Translation Services</h1>
            <p className="section-text">
              DPS Professional Tax Services provides translation support to help
              clients understand, complete, and submit important documents with
              confidence. We work with individuals and families who need clear,
              professional language support for personal, business, and
              administrative paperwork.
            </p>
          </div>

          <div className="taxprep-image-row">
            <img
              src="/transla2.jpg"
              alt="Translation support services"
              className="taxprep-page-image"
            />
            <img
              src="/languages304.jpg"
              alt="Multilingual support"
              className="taxprep-page-image"
            />
            <img
              src="/transla1.jpg"
              alt="Language assistance"
              className="taxprep-page-image"
            />
          </div>

          <div className="service-content">
            <h2>What We Help With</h2>
            <p>
              We help clients who need support understanding written materials,
              completing forms, and communicating important information clearly.
              Our translation services are designed to reduce confusion and make
              the process easier for clients handling time-sensitive or
              important documents.
            </p>

            <p>
              Whether someone needs help with personal records, business forms,
              or general document support, we focus on making sure information
              is presented clearly and professionally.
            </p>

            <h2>Types of Translation Support</h2>
            <ul>
              <li>General document translation support</li>
              <li>Help understanding forms and written paperwork</li>
              <li>Language assistance for personal documents</li>
              <li>Translation support for business-related materials</li>
              <li>Clear communication support for multilingual clients</li>
              <li>Help preparing documents before submission</li>
            </ul>

            <h2>We Speak Your Language</h2>
            <p>
              We proudly support clients from a wide range of backgrounds and
              work to make communication easier through multilingual service.
              Our goal is to help every client feel understood, respected, and
              confident when handling important documents and paperwork.
            </p>

            <h2>Why Clients Choose DPS</h2>
            <p>
              Clients choose DPS because we understand how important clear
              communication is when handling official paperwork. We provide
              supportive, respectful, and detail-focused service so clients feel
              more confident moving forward.
            </p>
          </div>
        </div>
      </section>

      <Languages />
    </Layout>
  );
}

export default Translation;
