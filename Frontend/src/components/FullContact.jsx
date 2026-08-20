import {
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaFax,
    FaEnvelope,
    FaClock,
    FaAward,
    FaCalendarCheck,
} from "react-icons/fa";

function FullContact() {
    return (
        <section className="section contact-section full-contact-section" id="contact">
            <div className="container">
                <div className="contact-heading">
                    <p className="eyebrow">Contact</p>
                    <h2>We’re Here to Help</h2>
                </div>

                <p className="section-text full-contact-text">
                    Thank you for visiting DPS Professional Tax Services. We sincerely
                    appreciate the opportunity to serve you and support your next steps.
                    Whether you are reaching out for tax preparation, document services,
                    translation support, immigration-related paperwork, insurance guidance,
                    or real estate referrals, our team is committed to providing a
                    professional, welcoming, and dependable experience.
                </p>

                <p className="section-text full-contact-text">
                    We understand that every client comes to us with unique needs and
                    important questions. Our goal is to make each interaction clear,
                    respectful, and reassuring. If you need assistance before booking, have
                    questions about a service, or would simply like guidance on how to
                    prepare, we encourage you to contact our office directly.
                </p>

                <div className="contact-info" data-aos="zoom-in">
                    <img
                        src="/DPS-LOGO1.png"
                        alt="DPS Professional Tax Services logo"
                        className="contact-logo"
                    />

                    <div className="contact-brand-card">
                        <strong>
                            DPS Professional Tax Services
                            <span>& Realty Management</span>
                        </strong>
                    </div>

                    <div className="contact-cta-row">
                        <a href="tel:9733272340" className="contact-cta-btn contact-cta-primary">
                            <FaPhoneAlt />
                            <span>Call (973) 327-2340</span>
                        </a>

                        <a href="mailto:dpstax1@gmail.com" className="contact-cta-btn contact-cta-secondary">
                            <FaEnvelope />
                            <span>Email Us</span>
                        </a>

                        <a href="/booking" className="contact-cta-btn contact-cta-light">
                            <FaCalendarCheck />
                            <span>Book Appointment</span>
                        </a>
                    </div>

                    <div className="full-contact-grid">
                        <div className="contact-details" data-aos="fade-right">
                            <h3>Office Information</h3>

                            <p>
                                <FaMapMarkerAlt className="contact-icon" />
                                <a
                                    href="https://www.google.com/maps/search/1811+Springfield+Ave+Maplewood+NJ+07040"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    1811 Springfield Ave, Maplewood, NJ 07040
                                </a>
                            </p>

                            <p>
                                <FaPhoneAlt className="contact-icon" />
                                <strong>Phone:</strong>
                                <a href="tel:9733272340">(973) 327-2340</a>
                            </p>

                            <p>
                                <FaFax className="contact-icon" />
                                <strong>Fax:</strong>
                                <span>(973) 821-3684</span>
                            </p>

                            <p>
                                <FaEnvelope className="contact-icon" />
                                <strong>Email:</strong>
                                <a href="mailto:dpstax1@gmail.com">DpsTax1@gmail.com</a>
                            </p>
                        </div>

                        <div className="office-hours" id="hours" data-aos="fade-left">
                            <h3>Tax Season Office Hours</h3>

                            <p>
                                <FaClock className="contact-icon" />
                                Monday - Friday: 9:00 AM - 5:00 PM
                            </p>
                            <p>Saturday: 9:00 AM - 6:00 PM</p>
                            <p>Sunday: By Appointment Only</p>
                        </div>
                    </div>

                    <p className="irs-contact-note">
                        <FaAward className="irs-icon" />
                        IRS e-file Authorized Agent
                    </p>
                </div>

                <div className="map-embed" data-aos="fade-left">
                    <iframe
                        src="https://www.google.com/maps?q=1811+Springfield+Ave+Maplewood+NJ+07040&output=embed"
                        width="100%"
                        height="280"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="DPS Professional Tax Services Location"
                    ></iframe>
                </div>

                <div className="full-contact-note">
                    <strong>Thank you for choosing DPS.</strong> We value every client and
                    every opportunity to serve our community with care, professionalism,
                    and respect. We look forward to helping you with your next step.
                </div>
            </div>
        </section>
    );
}

export default FullContact;
