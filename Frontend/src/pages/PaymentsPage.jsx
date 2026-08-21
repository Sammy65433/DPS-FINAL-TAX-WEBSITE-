import Layout from "../components/Layout";
import { FaCreditCard, FaMoneyCheckAlt, FaPhoneAlt } from "react-icons/fa";

function PaymentsPage() {
    return (
        <Layout>
            <section className="section payments-page">
                <div className="container">
                    <div className="payments-hero-card">
                        <p className="eyebrow">Payments</p>
                        <h1>Payment Options</h1>
                        <p className="section-text payments-subtext">
                            Please include your last name and tax year in the payment note so we
                            can match your payment correctly.
                        </p>
                    </div>

                    <div className="payments-card">
                        <div className="payments-card-header">
                            <div className="payments-icon-wrap">
                                <FaCreditCard />
                            </div>
                            <div>
                                <h3>Accepted Payment Methods</h3>
                                <p>Choose the option that works best for you.</p>
                            </div>
                        </div>

                        <div className="payments-list">
                            <p>
                                <strong>Venmo:</strong>
                                <a
                                    href="https://venmo.com/u/DPSTax"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    @DPSTax
                                </a>
                            </p>

                            <p>
                                <strong>Cash App:</strong>
                                <span>$DPSTAX1811</span>
                            </p>

                            <p>
                                <strong>Zelle:</strong>
                                <a href="tel:8627661725">862-766-1725</a>
                            </p>

                            <p>
                                <strong>Apple Pay:</strong>
                                <a href="tel:8627661725">862-766-1725</a>
                            </p>

                            <p>
                                <strong>Phone:</strong>
                                <a href="tel:9733272340">(973) 327-2340</a>
                            </p>
                        </div>
                    </div>

                    <div className="payments-note">
                        <FaMoneyCheckAlt />
                        <span>
                            For questions about payments, receipts, or payment confirmation,
                            please call our office directly.
                        </span>
                    </div>

                    <div className="payments-call-row">
                        <a href="tel:9733272340" className="btn">
                            <FaPhoneAlt />
                            <span>Call (973) 327-2340</span>
                        </a>
                    </div>
                </div>
            </section>
        </Layout>
    );
}

export default PaymentsPage;
