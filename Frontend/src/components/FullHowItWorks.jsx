import { Link } from "react-router-dom";
import {
    FaCalendarCheck,
    FaEnvelopeOpenText,
    FaFolderOpen,
    FaCheckCircle,
    FaShieldAlt,
} from "react-icons/fa";

function FullHowItWorks() {
    return (
        <section className="section full-how-section">
            <div className="container">
                <div className="full-how-heading">
                    <p className="eyebrow">How It Works</p>
                    <h2>Simple and Stress-Free</h2>
                    <p className="section-text how-full-text">
                        We want the process to feel clear, organized, and easy from the very
                        beginning. From booking your appointment to finishing your service,
                        our goal is to help you feel informed, prepared, and supported every
                        step of the way.
                    </p>
                </div>

                <div className="how-step-grid">
                    <div className="card how-step-card" id="book-step">
                        <div className="how-step-top">
                            <div className="how-step-number">01</div>
                            <div className="how-step-icon">
                                <FaCalendarCheck />
                            </div>
                        </div>
                        <h3>Book Your Appointment</h3>
                        <p>
                            Start by booking online or calling our office directly. You can
                            choose the service you need, select a preferred preparer when
                            available, and pick a date and time that works best for your
                            schedule.
                        </p>
                        <p>
                            We recommend booking ahead, especially during busy periods, so we
                            can offer the best availability and give you the support you need.
                        </p>
                        <Link to="/booking" className="btn how-it-works-btn">
                            Book Now
                        </Link>
                    </div>

                    <div className="card how-step-card" id="confirm-step">
                        <div className="how-step-top">
                            <div className="how-step-number">02</div>
                            <div className="how-step-icon">
                                <FaEnvelopeOpenText />
                            </div>
                        </div>
                        <h3>Review and Confirm</h3>
                        <p>
                            After submitting your request, you will receive an email with your
                            appointment details. This gives you a chance to review the service,
                            date, and time you selected.
                        </p>
                        <p>
                            Depending on the appointment type, you may also receive options to
                            confirm, cancel, or reschedule if your plans change before your
                            visit.
                        </p>
                    </div>

                    <div className="card how-step-card" id="prepare-step">
                        <div className="how-step-top">
                            <div className="how-step-number">03</div>
                            <div className="how-step-icon">
                                <FaFolderOpen />
                            </div>
                        </div>
                        <h3>Get Your Documents Ready</h3>
                        <p>
                            Gather the documents you need and review any instructions provided
                            before your appointment. Tax clients should bring income forms,
                            identification, and any supporting paperwork related to their
                            return.
                        </p>
                        <p>
                            If you prefer digital submission, you can also use our secure CCH
                            iFirm portal to upload documents safely before your appointment.
                        </p>
                    </div>

                    <div className="card how-step-card" id="file-step">
                        <div className="how-step-top">
                            <div className="how-step-number">04</div>
                            <div className="how-step-icon">
                                <FaCheckCircle />
                            </div>
                        </div>
                        <h3>Meet With Us and Complete Your Service</h3>
                        <p>
                            Meet with your preparer or service provider and complete your
                            appointment with confidence. We work to keep the process clear,
                            professional, and supportive so you leave with a better
                            understanding of your service and next steps.
                        </p>
                    </div>
                </div>

                <div className="how-disclaimer">
                    <div className="how-disclaimer-title">
                        <FaShieldAlt />
                        <strong>Important Note</strong>
                    </div>
                    <p>
                        Appointment requests submitted through this website are subject to
                        availability and confirmation.
                    </p>
                    <p>
                        Please do not send Social Security numbers, tax IDs, bank account
                        details, or other sensitive tax documents through general contact or
                        appointment forms. For secure document sharing, please use our
                        approved client portal or contact our office directly for help.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default FullHowItWorks;
