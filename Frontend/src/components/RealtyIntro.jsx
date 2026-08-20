import {
    FaHome,
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt,
    FaKey,
    FaChartLine,
    FaHandshake,
    FaBuilding,
    FaExternalLinkAlt,
} from "react-icons/fa";

function RealtyIntro() {
    return (
        <section className="section realty-section" id="realty" data-aos="zoom-in">
            <div className="container">
                <div className="realty-heading">
                    <p className="eyebrow">Real Estate Services</p>
                    <h1>Real Estate Support You Can Trust</h1>
                    <p className="section-text realty-intro-text">
                        DPS Professional Tax Services proudly connects clients with trusted real
                        estate support through our partner, Ricot Casimir of RC Realty Group.
                        Whether you are buying your first home, preparing to sell, searching
                        for a rental, or exploring investment opportunities, we are here to
                        help guide you in the right direction.
                    </p>
                </div>

                <div className="realty-banner">
                    <div className="realty-text">
                        <img
                            src="/real-estate.jpg"
                            alt="Real estate services"
                            className="realty-side-image"
                        />
                        <div className="realty-mini-badge">
                            <FaHome />
                            <span>Trusted Partner Support</span>
                        </div>
                        <h3>Need Real Estate Help?</h3>
                        <p>
                            Our partner Ricot Casimir of RC Realty Group handles buying,
                            selling, renting, and investment property support with a focus on
                            professionalism, communication, and client care.
                        </p>
                        <a
                            href="https://www.rcrealtygroup.net"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-realty"
                        >
                            <FaExternalLinkAlt />
                            <span>Visit RC Realty Group</span>
                        </a>
                    </div>

                    <div className="realty-contact">
                        <div className="realty-contact-header">
                            <FaBuilding />
                            <h4>Partner Contact</h4>
                        </div>

                        <p>
                            <strong>Ricot Casimir</strong> - RC Realty Group
                        </p>
                        <p>
                            <FaPhoneAlt className="realty-inline-icon" />
                            Phone: <a href="tel:9738859929">(973) 885-9929</a>
                        </p>
                        <p>
                            <FaEnvelope className="realty-inline-icon" />
                            Email:
                            <a href="mailto:ricot.casimir@gmail.com">Ricot.Casimir@gmail.com</a>
                        </p>
                        <p>
                            <FaMapMarkerAlt className="realty-inline-icon" />
                            <a
                                href="https://www.google.com/maps/search/1811+Springfield+Ave+Maplewood+NJ+07040"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="card-link"
                            >
                                1811 Springfield Ave, Maplewood, NJ 07040
                            </a>
                        </p>

                        <img
                            src="/real-estate-keys2.jpg"
                            alt="Real estate services"
                            className="realty-side-image"
                        />
                    </div>
                </div>

                <div className="realty-content-card">
                    <div className="realty-section-block">
                        <div className="realty-block-title">
                            <FaHandshake />
                            <h2>What We Help With</h2>
                        </div>
                        <p>
                            We support clients who are looking for help with key real estate
                            needs, whether that means purchasing a home, listing a property,
                            finding a rental, or exploring investment opportunities. Our goal is
                            to connect clients with a trusted real estate professional who can
                            provide guidance, answer questions, and help make the process feel
                            more manageable.
                        </p>
                    </div>

                    <div className="realty-section-block">
                        <div className="realty-block-title">
                            <FaKey />
                            <h2>Types of Real Estate Support</h2>
                        </div>
                        <ul className="realty-support-list">
                            <li>Buying a home</li>
                            <li>Selling a home</li>
                            <li>Rental support</li>
                            <li>Investment property guidance</li>
                            <li>General real estate consultations</li>
                            <li>Local support from a trusted real estate partner</li>
                        </ul>
                    </div>

                    <div className="realty-section-block">
                        <div className="realty-block-title">
                            <FaChartLine />
                            <h2>Why Clients Choose Our Realty Partner</h2>
                        </div>
                        <p>
                            Clients appreciate working with someone who understands the importance
                            of communication, trust, and follow-through. Through RC Realty Group,
                            clients can receive personal attention and practical support while
                            navigating one of the most important financial decisions they may make.
                        </p>
                    </div>

                    <div className="realty-disclaimer">
                        <strong>Disclaimer:</strong> DPS Professional Tax Services is not a
                        real estate brokerage. Real estate services are provided through our
                        independent partner, RC Realty Group. Any real estate transactions,
                        advice, listings, negotiations, or representation are handled solely
                        by the licensed real estate professional and their brokerage.
                    </div>
                </div>
            </div>
        </section>
    );
}

export default RealtyIntro;
