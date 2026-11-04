import { Link } from "react-router-dom";
import {
    FaCalendarCheck,
    FaCloudUploadAlt,
    FaFileInvoiceDollar,
    FaHome,
    FaMapMarkerAlt,
    FaPhoneAlt,
} from "react-icons/fa";
import "./dps-ticker.css";

const TICKER_ITEMS = [
    {
        Icon: FaPhoneAlt,
        text: "Call DPS · (973) 327-2340",
        to: "/contact",
    },
    {
        Icon: FaMapMarkerAlt,
        text: "1811 Springfield Ave, Maplewood, NJ 07040",
        to: "/contact",
    },
    {
        Icon: FaCalendarCheck,
        text: "Book your appointment online",
        to: "/booking",
    },
    {
        Icon: FaFileInvoiceDollar,
        text: "Pricing varies by city & state",
        to: "/pricing",
    },
    {
        Icon: FaHome,
        text: "Buying, selling & rentals — DPS Realty",
        to: "/real-estate-booking",
    },
    {
        Icon: FaCloudUploadAlt,
        text: "Client portal — upload & track your documents",
        to: "/client-login",
    },
];

export default function DpsTicker() {
    return (
        <div className="dps-ticker" aria-label="DPS highlights ticker">
            <div className="dps-ticker__track">
                {[0, 1].map((dup) => (
                    <div
                        key={dup}
                        className="dps-ticker__group"
                        aria-hidden={dup === 1}
                    >
                        {TICKER_ITEMS.map(({ Icon, text, to }) => (
                            <Link
                                key={text}
                                to={to}
                                className="dps-ticker__item"
                            >
                                <Icon aria-hidden="true" />
                                <span>{text}</span>
                            </Link>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
