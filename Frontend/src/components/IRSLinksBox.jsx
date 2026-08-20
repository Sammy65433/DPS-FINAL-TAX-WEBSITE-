import {
    FaUniversity,
    FaSearchDollar,
    FaCreditCard,
    FaFileAlt,
    FaExternalLinkAlt,
} from "react-icons/fa";

function IRSLinksBox() {
    return (
        <section className="card irs-links-card" id="irs-links">
            <div className="irs-links-header">
                <div className="irs-links-icon">
                    <FaUniversity />
                </div>

                <div>
                    <h3>Official IRS Resources</h3>
                    <p>
                        Access official IRS resources for refund status, payments, and tax
                        records.
                    </p>
                </div>
            </div>

            <ul className="irs-links-list">
                <li>
                    <a
                        href="https://www.irs.gov/refunds"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="irs-link"
                    >
                        <span className="irs-link-left">
                            <FaSearchDollar />
                            <span>Check IRS Refund Status</span>
                        </span>
                        <FaExternalLinkAlt className="irs-link-arrow" />
                    </a>
                </li>

                <li>
                    <a
                        href="https://www.irs.gov/payments"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="irs-link"
                    >
                        <span className="irs-link-left">
                            <FaCreditCard />
                            <span>Make an IRS Payment</span>
                        </span>
                        <FaExternalLinkAlt className="irs-link-arrow" />
                    </a>
                </li>

                <li>
                    <a
                        href="https://www.irs.gov/individuals/get-transcript"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="irs-link"
                    >
                        <span className="irs-link-left">
                            <FaFileAlt />
                            <span>Get Tax Records / Transcripts</span>
                        </span>
                        <FaExternalLinkAlt className="irs-link-arrow" />
                    </a>
                </li>
            </ul>
        </section>
    );
}

export default IRSLinksBox;
