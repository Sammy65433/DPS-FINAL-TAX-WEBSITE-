import { Link } from "react-router-dom";
import {
    FaCalendarCheck,
    FaCreditCard,
    FaEnvelope,
    FaFileInvoiceDollar,
    FaPhoneAlt,
    FaStamp,
} from "react-icons/fa";
import Layout from "../components/Layout";

const pricingGroups = [
    {
        title: "Individual Taxes",
        icon: FaFileInvoiceDollar,
        items: [
            {
                name: "Form 1040",
                price: "$150",
                detail: "Includes state return",
                image: "/tax-desktop.jpg",
            },
            {
                name: "Form 1040 with Schedule A",
                price: "$150",
                detail: "Includes state return",
                image: "/pricing-page-taxes-w4.jpg",
            },
            {
                name: "Schedule C",
                price: "$150",
                detail: "Sole proprietor / independent contractor",
                image: "/pricing-page-taxes-smallbuisness.jpg",
            },
            {
                name: "Schedule D",
                price: "$175",
                detail: "Capital gains and losses",
                image: "/pricing-page-taxes-w7.jpg",
            },
            {
                name: "Schedule E",
                price: "$175",
                detail: "Supplemental income and losses",
                image: "/tax-desktop.jpg",
            },
        ],
    },
    {
        title: "Business Taxes",
        icon: FaFileInvoiceDollar,
        items: [
            {
                name: "Single-Member LLC",
                price: "$175",
                detail: "Does not include individual tax returns",
                image: "/corp-busness2.jpg",
            },
            {
                name: "Partnerships & S Corporations",
                price: "$200",
                detail: "Starting price",
                image: "/corp-busness1.jpg",
            },
        ],
    },
    {
        title: "Notary Services",
        icon: FaStamp,
        items: [
            {
                name: "Notary Public",
                price: "$8",
                detail: "Per notarization",
                image: "/notary-2.jpg",
            },
            {
                name: "Mobile Notary Services",
                price: "$30",
                detail: "Per notarization. Mileage and travel fees are additional.",
                image: "/notaary4.jpg",
            },
        ],
    },
];

function PaymentsPage() {
    return (
        <Layout>
            <main className="section pricing-page">
                <div className="container">
                    <div className="pricing-hero-card">
                        <p className="eyebrow">DPS Professional Tax Services</p>
                        <h1>Pricing</h1>
                        <p>
                            Tax preparation fees vary depending on the complexity of the
                            filing. Listed prices are starting rates. Please confirm your
                            total with our office before making a payment.
                        </p>
                    </div>

                    {pricingGroups.map(({ title, icon: Icon, items }) => (
                        <section className="pricing-group" key={title}>
                            <div className="pricing-group-heading">
                                <Icon aria-hidden="true" />
                                <h2>{title}</h2>
                            </div>

                            <div className="pricing-grid">
                                {items.map(({ name, price, detail, image }) => (
                                    <article className="pricing-card" key={name}>
                                        <img
                                            src={image}
                                            alt=""
                                            className="pricing-card-image"
                                            loading="lazy"
                                        />
                                        <div className="pricing-card-content">
                                            <h3>{name}</h3>
                                            <p className="pricing-amount">
                                                Starts at <strong>{price}</strong>
                                            </p>
                                            <p className="pricing-detail">{detail}</p>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </section>
                    ))}

                    <div className="pricing-cta">
                        <div>
                            <h2>Get pricing for your needs</h2>
                            <p>
                                Have multiple forms or a more complex return? Talk with our
                                team about your situation and confirm the price before your
                                appointment.
                            </p>
                        </div>

                        <div className="pricing-actions">
                            <Link to="/booking" className="pricing-button">
                                <FaCalendarCheck aria-hidden="true" />
                                Book Appointment
                            </Link>
                            <Link
                                to="/contact"
                                className="pricing-button pricing-button-outline"
                            >
                                <FaEnvelope aria-hidden="true" />
                                Contact Us
                            </Link>
                        </div>
                    </div>

                    <div className="pricing-payment-card">
                        <div className="pricing-payment-heading">
                            <FaCreditCard aria-hidden="true" />
                            <h2>Payment Options</h2>
                        </div>
                        <p>
                            Only send payment after confirming the amount with our office.
                            Include your last name and tax year in the payment note so we can
                            match your payment.
                        </p>

                        <div className="pricing-payment-list">
                            <p>
                                <strong>Venmo:</strong>{" "}
                                <a
                                    href="https://venmo.com/u/DPSTax"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    @DPSTax
                                </a>
                            </p>
                            <p>
                                <strong>Cash App:</strong> $DPSTAX1811
                            </p>
                            <p>
                                <strong>Zelle:</strong>{" "}
                                <a href="tel:8627661725">862-766-1725</a>
                            </p>
                            <p>
                                <strong>Apple Pay:</strong>{" "}
                                <a href="tel:8627661725">862-766-1725</a>
                            </p>
                        </div>
                    </div>

                    <div className="pricing-contact">
                        <p>Questions about pricing, payments, or receipts?</p>
                        <a href="tel:+19733272340">
                            <FaPhoneAlt aria-hidden="true" />
                            Call (973) 327-2340
                        </a>
                    </div>
                </div>
            </main>
        </Layout>
    );
}

export default PaymentsPage;
