import { Link } from "react-router-dom";

function FullHowItWorks() {
    return (
        <section className="section full-how-section">
            <div className="container">
                <p className="eyebrow">How It Works</p>
                <h2>Simple and Stress-Free</h2>

                <p className="section-text how-full-text">
                    Our process is designed to make booking and receiving support as
                    simple, organized, and comfortable as possible. From scheduling your
                    appointment to completing your service, we want every client to feel
                    informed, prepared, and confident each step of the way.
                </p>

                <div className="how-step-grid">
                    <div className="card how-step-card" id="book-step">
                        <div className="how-step-number">01</div>
                        <h3>1. Book</h3>
                        <p>
                            Start by booking your appointment online or calling our office
                            directly. You can choose the service you need, select a preferred
                            preparer when available, and choose a date and time that works
                            best for your schedule. We recommend booking in advance,
                            especially during busy periods, so we can provide the best
                            availability and support.
                        </p>
                        <Link to="/booking" className="btn how-it-works-btn">
                            Book Now
                        </Link>
                    </div>

                    <div className="card how-step-card" id="confirm-step">
                        <div className="how-step-number">02</div>
                        <h3>2. Confirm</h3>
                        <p>
                            After submitting your request, you will receive an email with your
                            appointment details. This helps you review the service, date, and
                            time you selected. Depending on the appointment type, you may also
                            receive options to confirm, cancel, or reschedule if something
                            changes before your visit.
                        </p>
                    </div>

                    <div className="card how-step-card" id="prepare-step">
                        <div className="how-step-number">03</div>
                        <h3>3. Prepare</h3>
                        <p>
                            Gather the documents you need for your appointment and review any
                            instructions provided in advance. Tax clients should bring income
                            forms, identification, and any relevant supporting paperwork.
                            Clients who prefer digital submission can also use our secure CCH
                            iFirm portal to upload documents safely before the appointment.
                        </p>
                    </div>

                    <div className="card how-step-card" id="file-step">
                        <div className="how-step-number">04</div>
                        <h3>4. File</h3>
                        <p>
                            Meet with your preparer or service provider and complete your
                            appointment with confidence. We work to make the process clear,
                            professional, and supportive so you leave with a better
                            understanding of your next steps and the service you received.
                        </p>
                    </div>
                </div>

                <div className="how-disclaimer">
                    <strong>Important Note:</strong> Appointment requests submitted
                    through this website are subject to availability and confirmation.
                    Please do not send Social Security numbers, tax IDs, bank account
                    details, or other sensitive tax documents through general contact or
                    appointment forms. For secure document sharing, please use our
                    approved client portal or contact our office directly for assistance.
                </div>
            </div>
        </section>
    );
}

export default FullHowItWorks;
