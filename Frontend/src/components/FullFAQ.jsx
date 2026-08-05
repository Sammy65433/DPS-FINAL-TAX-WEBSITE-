function FullFAQ() {
    return (
        <section id="faq" className="section full-faq-section">
            <div className="container">
                <p className="eyebrow">FAQ</p>
                <h2>Frequently Asked Questions</h2>
                <p className="section-text gallery-section-text">
                    Below are a few of the most common questions clients ask about tax
                    appointments, walk-ins, and language support. Our goal is to make
                    every visit feel clear, prepared, and comfortable from the start.
                </p>

                <div className="full-faq-list">
                    <article className="full-faq-item">
                        <div className="full-faq-media">
                            <img
                                src="/notary2.jpg"
                                alt="Tax documents for appointment"
                                className="service-card-image"
                            />
                        </div>
                        <div className="full-faq-content">
                            <div className="faq-badge">Q1</div>
                            <h3>What should I bring to my tax appointment?</h3>
                            <p>
                                Please bring a valid photo ID, your Social Security cards or tax
                                identification information, income documents such as W-2s,
                                1099s, or other earnings records, and any paperwork related to
                                deductions, credits, or dependents. If you are filing jointly,
                                both spouses should bring identification and any shared
                                documents. If you have prior-year returns, business records, or
                                IRS letters, those can also be helpful to bring so we can better
                                understand your tax situation.
                            </p>
                        </div>
                    </article>

                    <article className="full-faq-item">
                        <div className="full-faq-media">
                            <img
                                src="/walk-ins1.jpg"
                                alt="Office appointment and walk-in support"
                                className="service-card-image"
                            />
                        </div>
                        <div className="full-faq-content">
                            <div className="faq-badge">Q2</div>
                            <h3>Do you accept walk-ins?</h3>
                            <p>
                                Walk-ins may be accepted depending on office traffic, staff
                                availability, and the time of year, especially during tax
                                season. However, appointments are strongly recommended because
                                they help us give each client the time and attention they need.
                                Booking ahead can reduce wait times and helps ensure that the
                                right preparer or support service is available for your visit.
                            </p>
                        </div>
                    </article>

                    <article className="full-faq-item">
                        <div className="full-faq-media">
                            <img
                                src="/language1.jpg"
                                alt="Multilingual client support"
                                className="service-card-image"
                            />
                        </div>
                        <div className="full-faq-content">
                            <div className="faq-badge">Q3</div>
                            <h3>Do you offer help in multiple languages?</h3>
                            <p>
                                Yes. We proudly provide support in English, Kreyòl, French, and
                                Spanish. Our goal is to make sure clients feel comfortable
                                asking questions, understanding documents, and receiving clear
                                guidance throughout the process. We know that language access
                                matters, especially when handling taxes, forms, and important
                                paperwork, so we work to create a welcoming and supportive
                                experience for every client we serve.
                            </p>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    );
}

export default FullFAQ;
