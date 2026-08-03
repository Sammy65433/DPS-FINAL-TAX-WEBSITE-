import Layout from "../components/Layout";

function TaxPrep() {
  return (
    <Layout>
      <section className="section">
        <div className="container taxprep-page">
          <div className="taxprep-text">
            <p className="eyebrow">DPS Services</p>
            <h1>Tax Preparation</h1>
            <p className="section-text">
              DPS Professional Tax Services provides reliable and professional
              tax preparation support for individuals, families, self-employed
              professionals, and small businesses. We help clients understand
              their filing requirements, organize their documents, and complete
              the tax filing process with confidence and peace of mind.
            </p>
          </div>

          <div className="taxprep-image-row">
            <img
              src="/tax-prep-hands.jpg"
              alt="Clients receiving tax preparation support"
              className="taxprep-page-image"
            />
            <img
              src="/tax-prep-people.jpg"
              alt="Professional tax preparation support"
              className="taxprep-page-image"
            />
            <img
              src="/tax-prep1.jpg"
              alt="Tax preparation consultation"
              className="taxprep-page-image"
            />
          </div>

          <div className="service-content">
            <h2>What We Help With</h2>
            <p>
              We support clients through every stage of the tax preparation
              process. That includes helping gather the right paperwork,
              reviewing income documents, preparing returns accurately, and
              making sure clients feel informed throughout the process. Whether
              someone is filing a straightforward return or has a more detailed
              financial situation, we focus on providing organized, dependable
              support.
            </p>

            <p>
              We also work with clients who may need extra guidance
              understanding forms, deadlines, filing responsibilities, or the
              documents needed to complete their return. Our goal is to make tax
              season feel less stressful and more manageable.
            </p>

            <h2>Types of Tax Preparation</h2>
            <ul>
              <li>Individual tax returns</li>
              <li>Joint and family tax filing</li>
              <li>Self-employed and independent contractor tax preparation</li>
              <li>Small business tax preparation</li>
              <li>Large business tax preparation</li>
              <li>Basic support with organizing tax documents</li>
              <li>General yearly filing support</li>
              <li>Assistance with common income tax forms and paperwork</li>
            </ul>

            <h2>Business Tax Support</h2>
            <p>
              For business owners and self-employed clients, we provide support
              with organizing business-related tax information and preparing
              filings that reflect their work accurately. We understand that
              business taxes can involve more moving pieces, so we help make the
              process clearer and more efficient for entrepreneurs and small
              business operators.
            </p>

            <h2>Why Clients Choose DPS</h2>
            <p>
              Clients choose DPS Professional Tax Services because we combine
              professionalism, personal attention, and a commitment to making
              every client feel supported. We understand that taxes can be
              overwhelming, so we take the time to provide clear communication,
              dependable service, and a process clients can trust.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default TaxPrep;
