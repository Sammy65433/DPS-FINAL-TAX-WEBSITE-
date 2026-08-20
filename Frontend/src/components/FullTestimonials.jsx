import {
    FaStar,
    FaUserCheck,
    FaGlobeAmericas,
    FaComments,
} from "react-icons/fa";

function FullTestimonials() {
    return (
        <section className="section full-testimonials-section">
            <div className="container">
                <div className="full-testimonials-heading">
                    <p className="eyebrow">Client Feedback</p>
                    <h2>What Clients Say About DPS</h2>
                    <p className="section-text testimonials-full-text">
                        We are grateful for the trust our clients place in DPS Professional
                        Tax Services. These reviews reflect the professionalism, care, and
                        support we aim to provide in every interaction.
                    </p>
                </div>

                <div className="card-grid testimonials-grid">
                    <div className="card testimonial-preview-card">
                        <img
                            src="/client-american.jpg"
                            alt="Happy client"
                            className="service-card-image"
                        />
                        <div className="testimonial-preview-content">
                            <div className="testimonial-badge">
                                <FaStar />
                                <span>Review</span>
                            </div>
                            <h3>Local Client</h3>
                            <p>
                                "Professional, helpful, and very reliable. They made my tax filing
                                process easy and stress-free."
                            </p>
                        </div>
                    </div>

                    <div className="card testimonial-preview-card">
                        <img
                            src="/client-blk1.jpg"
                            alt="Client receiving support"
                            className="service-card-image"
                        />
                        <div className="testimonial-preview-content">
                            <div className="testimonial-badge">
                                <FaGlobeAmericas />
                                <span>Kreyòl</span>
                            </div>
                            <h3>Kreyòl-Speaking Client</h3>
                            <p>
                                "Mwen te jwenn yon sèvis trè pwofesyonèl. Yo te pran tan pou ede
                                m konprann dokiman mwen yo epi yo te trete m ak anpil respè."
                            </p>
                        </div>
                    </div>

                    <div className="card testimonial-preview-card">
                        <img
                            src="/client5.jpg"
                            alt="Professional client feedback"
                            className="service-card-image"
                        />
                        <div className="testimonial-preview-content">
                            <div className="testimonial-badge">
                                <FaComments />
                                <span>French</span>
                            </div>
                            <h3>French-Speaking Client</h3>
                            <p>
                                "Service très professionnel et chaleureux. On a pris le temps de
                                tout m’expliquer clairement, ce qui m’a tout de suite mis en
                                confiance."
                            </p>
                        </div>
                    </div>

                    <div className="card testimonial-preview-card">
                        <img
                            src="/client4.jpg"
                            alt="Satisfied client testimonial"
                            className="service-card-image"
                        />
                        <div className="testimonial-preview-content">
                            <div className="testimonial-badge">
                                <FaGlobeAmericas />
                                <span>Spanish</span>
                            </div>
                            <h3>Spanish-Speaking Client</h3>
                            <p>
                                "Recibí un servicio excelente. Me ayudaron con mis impuestos y
                                respondieron todas mis preguntas con paciencia y claridad."
                            </p>
                        </div>
                    </div>

                    <div className="card testimonial-preview-card">
                        <img
                            src="/client-all.jpg"
                            alt="Returning client"
                            className="service-card-image"
                        />
                        <div className="testimonial-preview-content">
                            <div className="testimonial-badge">
                                <FaUserCheck />
                                <span>Review</span>
                            </div>
                            <h3>Returning Client</h3>
                            <p>
                                "I appreciated how patient and organized the team was. They made
                                the whole process feel simple and trustworthy."
                            </p>
                        </div>
                    </div>

                    <div className="card testimonial-preview-card">
                        <img
                            src="/client-blk3.jpg"
                            alt="Client testimonial"
                            className="service-card-image"
                        />
                        <div className="testimonial-preview-content">
                            <div className="testimonial-badge">
                                <FaStar />
                                <span>Review</span>
                            </div>
                            <h3>First-Time Client</h3>
                            <p>
                                "The staff was patient, respectful, and very clear. I felt
                                comfortable asking questions the entire time."
                            </p>
                        </div>
                    </div>

                    <div className="card testimonial-preview-card">
                        <img
                            src="/client-blk2.jpg"
                            alt="Satisfied customer"
                            className="service-card-image"
                        />
                        <div className="testimonial-preview-content">
                            <div className="testimonial-badge">
                                <FaGlobeAmericas />
                                <span>Kreyòl</span>
                            </div>
                            <h3>Returning Kreyòl Client</h3>
                            <p>
                                "Yo te ede m byen vit epi yo te trè pwofesyonèl. Mwen ta
                                rekòmande sèvis sa yo ak tout moun."
                            </p>
                        </div>
                    </div>

                    <div className="card testimonial-preview-card">
                        <img
                            src="/client-spanish3.jpg"
                            alt="Professional support client"
                            className="service-card-image"
                        />
                        <div className="testimonial-preview-content">
                            <div className="testimonial-badge">
                                <FaGlobeAmericas />
                                <span>Spanish</span>
                            </div>
                            <h3>Spanish-Speaking Client</h3>
                            <p>
                                "Muy organizados y amables. El proceso fue sencillo y me sentí
                                bien atendido desde el primer momento."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FullTestimonials;
