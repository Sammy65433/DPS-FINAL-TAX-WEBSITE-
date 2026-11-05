import { useEffect, useState } from "react";
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
    { Icon: FaPhoneAlt, text: "Call DPS · (973) 327-2340", to: "/contact" },
    { Icon: FaMapMarkerAlt, text: "1811 Springfield Ave, Maplewood, NJ 07040", to: "/contact" },
    { Icon: FaCalendarCheck, text: "Book your appointment online", to: "/booking" },
    { Icon: FaFileInvoiceDollar, text: "Pricing varies by city & state", to: "/pricing" },
    { Icon: FaHome, text: "Buying, selling & rentals — DPS Realty", to: "/real-estate-booking" },
    { Icon: FaCloudUploadAlt, text: "Client portal — upload & track your documents", to: "/client-login" },
];

// Federal / estimated-tax deadlines (month, day) — ET dates, label shown in the ticker.
const TAX_DEADLINES = [
    { month: 1, day: 15, label: "Jan 15 · Q4 estimated tax" },
    { month: 4, day: 15, label: "Apr 15 · federal filing deadline" },
    { month: 6, day: 15, label: "Jun 15 · Q2 estimated tax" },
    { month: 10, day: 15, label: "Oct 15 · extension deadline" },
];

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function etNow() {
    const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/New_York",
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).formatToParts(new Date());
    const get = (type) => parts.find((p) => p.type === type)?.value;
    const weekdayName = get("weekday");
    const weekdayIndex = WEEKDAYS.indexOf(weekdayName);
    return {
        weekdayIndex: weekdayIndex < 0 ? 0 : weekdayIndex,
        hour: Number(get("hour")),
        minute: Number(get("minute")),
        year: Number(get("year")),
        month: Number(get("month")),
        day: Number(get("day")),
    };
}

function nextDeadline(now) {
    const candidates = TAX_DEADLINES.map(({ month, day, label }) => {
        let year = now.year;
        const thisYear = new Date(year, month - 1, day);
        if (thisYear < new Date(now.year, now.month - 1, now.day)) year += 1;
        const target = new Date(year, month - 1, day);
        const diffDays = Math.ceil(
            (target - new Date(now.year, now.month - 1, now.day)) / 86400000
        );
        return { label, diffDays, month, day };
    }).sort((a, b) => a.diffDays - b.diffDays);
    return candidates[0];
}

function statusText(now) {
    const minutes = now.hour * 60 + now.minute;
    const isSunday = now.weekdayIndex === 0;
    const closes = now.weekdayIndex === 6 ? 18 * 60 : 17 * 60; // Sat 6 PM, Mon–Fri 5 PM

    if (isSunday) return "Closed today · opens Mon 9 AM ET";
    if (minutes < 9 * 60) return `Opens today 9 AM ET`;
    if (minutes < closes) {
        const closeHour = closes / 60;
        const suffix = closeHour >= 12 ? "PM" : "AM";
        const h = closeHour > 12 ? closeHour - 12 : closeHour;
        return `Open now · closes ${h} ${suffix} ET`;
    }
    if (now.weekdayIndex === 6) return "Closed · opens Mon 9 AM ET";
    if (now.weekdayIndex === 5) return "Closed · opens Mon 9 AM ET";
    return "Closed · opens tomorrow 9 AM ET";
}

export default function DpsTicker() {
    const [now, setNow] = useState(() => etNow());

    useEffect(() => {
        const id = window.setInterval(() => setNow(etNow()), 30000);
        return () => window.clearInterval(id);
    }, []);

    const status = statusText(now);
    const deadline = nextDeadline(now);
    const deadlineText = `${deadline.diffDays} days until ${deadline.label}`;

    const liveItems = [
        { Icon: null, text: `🟢 ${status}`, to: "/contact", live: true },
        { Icon: null, text: `⏳ ${deadlineText}`, to: "/pricing", live: true },
    ];

    return (
        <div className="dps-ticker" aria-label="DPS highlights ticker">
            <div className="dps-ticker__track">
                {[0, 1].map((dup) => (
                    <div
                        key={dup}
                        className="dps-ticker__group"
                        aria-hidden={dup === 1}
                    >
                        {liveItems.map(({ text, to }, idx) => (
                            <Link
                                key={`live-${idx}-${dup}`}
                                to={to}
                                className="dps-ticker__item dps-ticker__item--live"
                            >
                                <span>{text}</span>
                            </Link>
                        ))}
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
