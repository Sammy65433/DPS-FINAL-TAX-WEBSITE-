import Layout from "../components/Layout";
import {
    FaFileInvoiceDollar,
    FaMoneyCheckAlt,
    FaFileAlt,
    FaShieldAlt,
    FaExternalLinkAlt,
} from "react-icons/fa";

function TaxpayerResourcesPage() {
    return (
        <Layout>
            <section className="section taxpayer-resources-page">
                <div className="container">
                    <div className="taxpayer-hero-card">
                        <div className="taxpayer-hero">
                            <p className="eyebrow">Taxpayer Resources</p>
                            <h1>Official IRS Resources</h1>
                            <p className="section-text taxpayer-subtext">
                                Access official IRS tools for refund status, payments, and tax
                                records in one convenient place.
                            </p>
                        </div>
                    </div>

                    <div className="taxpayer-resource-grid">
                        <a
                            href="https://www.irs.gov/refunds"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="card taxpayer-resource-card"
                        >
                            <div className="taxpayer-icon-wrap">
                                <FaFileInvoiceDollar />
                            </div>
                            <h3>Check IRS Refund Status</h3>
                            <p>
                                Use the official IRS website to check the status of your tax
                                refund quickly and securely.
                            </p>
                            <span className="card-link">
                                Open IRS Refund Status <FaExternalLinkAlt />
                            </span>
                        </a>

                        <a
                            href="https://www.irs.gov/payments"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="card taxpayer-resource-card"
                        >
                            <div className="taxpayer-icon-wrap">
                                <FaMoneyCheckAlt />
                            </div>
                            <h3>Make an IRS Payment</h3>
                            <p>
                                Use the official IRS payment page to review payment methods and
                                submit a tax payment safely.
                            </p>
                            <span className="card-link">
                                Open IRS Payments <FaExternalLinkAlt />
                            </span>
                        </a>

                        <a
                            href="https://www.irs.gov/individuals/get-transcript"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="card taxpayer-resource-card"
                        >
                            <div className="taxpayer-icon-wrap">
                                <FaFileAlt />
                            </div>
                            <h3>Get Tax Records / Transcripts</h3>
                            <p>
                                Access official IRS tools for tax records, return transcripts,
                                and account information.
                            </p>
                            <span className="card-link">
                                Open IRS Transcripts <FaExternalLinkAlt />
                            </span>
                        </a>
                    </div>

                    <div className="taxpayer-note">
                        <div className="taxpayer-note-title">
                            <FaShieldAlt />
                            <strong>Security Reminder</strong>
                        </div>
                        <p>
                            Always use official IRS websites for refund checks, payments, and
                            tax records. Never share sensitive personal tax information through
                            unsecured forms or email.
                        </p>
                    </div>
                </div>
            </section>
        </Layout>
    );
}

export default TaxpayerResourcesPage;
