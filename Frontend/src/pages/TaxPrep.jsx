import Layout from "../components/Layout";
import {
  FaFileInvoiceDollar,
  FaFolderOpen,
  FaUserCheck,
  FaBriefcase,
  FaCheckCircle,
  FaShieldAlt,
} from "react-icons/fa";

function TaxPrep() {
  return (
    <Layout>
      <section className="section taxprep-page-section">
        <div className="container taxprep-page">
          <div className="taxprep-hero-card">
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

              <div className="taxprep-hero-badges">
                <span className="taxprep-badge">
                  <FaUserCheck />
                  Personal Support
                </span>
                <span className="taxprep-badge">
                  <FaBriefcase />
                  Business Filing Help
                </span>
                <span className="taxprep-badge">
                  <FaShieldAlt />
                  Trusted Guidance
                </span>
              </div>
            </div>
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

          <div className="service-content taxprep-content-card">
            <div className="taxprep-section-block">
              <div className="taxprep-block-title">
                <FaFolderOpen />
                <h2>What We Help With</h2>
              </div>

              <p>
                We support clients through every stage of the tax preparation
                process. That includes helping gather the right paperwork,
                reviewing income documents, preparing returns accurately, and
                making sure clients feel informed throughout the process.
              </p>

              <p>
                Whether someone is filing a straightforward return or has a more
                detailed financial situation, we focus on providing organized,
                dependable support. Our goal is to make tax season feel less
                stressful, more manageable, and easier to understand.
              </p>
            </div>

            <div className="taxprep-section-block">
              <div className="taxprep-block-title">
                <FaFileInvoiceDollar />
                <h2>Types of Tax Preparation</h2>
              </div>

              <ul className="taxprep-list">
                <li>
                  <FaCheckCircle />
                  <span>Individual tax returns</span>
                </li>
                <li>
                  <FaCheckCircle />
                  <span>Joint and family tax filing</span>
                </li>
                <li>
                  <FaCheckCircle />
                  <span>Self-employed and independent contractor tax preparation</span>
                </li>
                <li>
                  <FaCheckCircle />
                  <span>Small business tax preparation</span>
                </li>
                <li>
                  <FaCheckCircle />
                  <span>Large business tax preparation</span>
                </li>
                <li>
                  <FaCheckCircle />
                  <span>Basic support with organizing tax documents</span>
                </li>
                <li>
                  <FaCheckCircle />
                  <span>General yearly filing support</span>
                </li>
                <li>
                  <FaCheckCircle />
                  <span>Assistance with common income tax forms and paperwork</span>
                </li>
              </ul>
            </div>

            <div className="taxprep-section-block">
              <div className="taxprep-block-title">
                <FaBriefcase />
                <h2>Business Tax Support</h2>
              </div>

              <p>
                For business owners and self-employed clients, we provide support
                with organizing business-related tax information and preparing
                filings that reflect their work accurately. We understand that
                business taxes can involve more moving pieces, so we help make the
                process clearer and more efficient for entrepreneurs and small
                business operators.
              </p>
            </div>

            <div className="taxprep-section-block">
              <div className="taxprep-block-title">
                <FaUserCheck />
                <h2>Why Clients Choose DPS</h2>
              </div>

              <p>
                Clients choose DPS Professional Tax Services because we combine
                professionalism, personal attention, and a commitment to making
                every client feel supported. We understand that taxes can feel
                overwhelming, so we focus on clear communication, dependable
                service, and a process clients can trust from start to finish.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default TaxPrep;
