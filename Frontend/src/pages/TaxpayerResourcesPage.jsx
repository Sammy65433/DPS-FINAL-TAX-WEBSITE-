import Layout from "../components/Layout";
import { FaFileInvoiceDollar, FaMoneyCheckAlt, FaFileAlt } from "react-icons/fa";


function TaxpayerResourcesPage() {
    return (
        <Layout>
            <section className="section taxpayer-resources-page">
                <div className="container">
                    <div className="taxpayer-hero">
                        <p className="eyebrow">Taxpayer Resources</p>
                        <h1>Official IRS Resources</h1>
                        <p className="section-text taxpayer-subtext">
                            Access official IRS tools for refund status, payments, and tax
                            records in one place.
                        </p>
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
                                Use the official IRS website to check the status of your refund.
                            </p>
                            <span className="card-link">Open IRS Refund Status →</span>
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
                                Use the official IRS payment page for tax payments and payment
                                options.
                            </p>
                            <span className="card-link">Open IRS Payments →</span>
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
                                Access tax records and transcript tools through the official IRS
                                website.
                            </p>
                            <span className="card-link">Open IRS Transcripts →</span>
                        </a>
                    </div>

                    <div className="taxpayer-note">
                        <strong>Security Reminder:</strong> Always use official IRS websites
                        for refund checks, payments, and tax records. Never share sensitive
                        personal tax information through unsecured forms or email.
                    </div>
                </div>
            </section>
        </Layout>
    );
}

export default TaxpayerResourcesPage;
