import Layout from "../components/Layout";

function Immigration() {
  return (
    <Layout>
      <section className="section">
        <div className="container taxprep-page">
          <div className="taxprep-text">
            <p className="eyebrow">Our Services</p>
            <h1>Immigration Services</h1>
            <p className="section-text">
              DPS Professional Tax Services provides support for clients who need
              help organizing, understanding, and preparing immigration-related
              paperwork. We know these documents can feel overwhelming, so we aim
              to make the process clearer, more organized, and less stressful.
            </p>
          </div>

          <div className="taxprep-image-row">
            <img
              src="/transla2.jpg"
              alt="Immigration paperwork support"
              className="taxprep-page-image"
            />
            <img
              src="/client-spanish3.jpg"
              alt="Client support services"
              className="taxprep-page-image"
            />
            <img
              src="/contact-us-people.jpg"
              alt="Professional client assistance"
              className="taxprep-page-image"
            />
          </div>

          <div className="service-content">
            <h2>What We Help With</h2>
            <p>
              We assist clients with preparing and organizing immigration-related
              forms and supporting paperwork. Our role is to help make sure
              documents are easier to understand, properly arranged, and ready
              for the next step in the process.
            </p>

            <p>
              We understand that immigration paperwork often carries a lot of
              importance and urgency. That is why we focus on clear
              communication, patience, and careful attention to detail when
              supporting clients.
            </p>

            <h2>Types of Immigration Support</h2>
            <ul>
              <li>Help organizing immigration-related forms</li>
              <li>Support reviewing required documents</li>
              <li>General assistance preparing paperwork for submission</li>
              <li>Language support when needed</li>
              <li>Help understanding document requirements</li>
              <li>Guidance through document preparation steps</li>
            </ul>

            <h2>Why Clients Choose DPS</h2>
            <p>
              Clients choose DPS because we provide a professional, respectful,
              and supportive experience. We know these documents matter, and we
              work to help clients feel more confident and prepared throughout
              the process.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Immigration;
