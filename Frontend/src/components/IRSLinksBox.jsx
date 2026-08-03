function IRSLinksBox() {
    return (
        <section className="card irs-links-card" id="irs-links">
            <h3>Official IRS Resources</h3>
            <p>
                Access official IRS resources for refund status, payments, and tax records.
            </p>


            <ul className="irs-links-list">
                <li>
                    <a
                        href="https://www.irs.gov/refunds"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="irs-link"
                    >
                        Check IRS Refund Status
                    </a>
                </li>
                <li>
                    <a
                        href="https://www.irs.gov/payments"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="irs-link"
                    >
                        Make an IRS Payment
                    </a>
                </li>
                <li>
                    <a
                        href="https://www.irs.gov/individuals/get-transcript"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="irs-link"
                    >
                        Get Tax Records / Transcripts
                    </a>
                </li>
            </ul>
        </section>
    );
}

export default IRSLinksBox;
