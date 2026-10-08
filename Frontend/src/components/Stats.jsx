import { Link } from "react-router-dom";
import {
  FaAward,
  FaBriefcase,
  FaUsers,
  FaMapMarkedAlt,
  FaLanguage,
  FaFileInvoiceDollar,
} from "react-icons/fa";

const stats = [
  {
    icon: FaAward,
    number: "19+",
    label: "Years in Business",
    to: "/about",
  },
  {
    icon: FaBriefcase,
    number: "6+",
    label: "Services Offered",
    to: "/services",
  },
  {
    icon: FaUsers,
    number: "2000+",
    label: "Clients Served",
    to: "/client-feedback",
  },
  {
    icon: FaMapMarkedAlt,
    number: "Nationwide",
    label: "Serving Clients Across the U.S.",
    to: "/tax-preparation",
  },
  {
    icon: FaLanguage,
    number: "4+",
    label: "Languages Supported",
    to: "/translation",
  },
  {
    icon: FaFileInvoiceDollar,
    number: "IRS",
    label: "e-file Authorized",
    to: "/taxpayer-resources",
  },
];

function Stats() {
  return (
    <section className="stat-strip" aria-label="DPS at a glance">
      <div className="container stat-grid">
        {stats.map(({ icon: Icon, number, label, to }) => (
          <Link
            key={label}
            to={to}
            className="stat-card"
            aria-label={`${number} ${label}. View related information.`}
          >
            <div className="stat-icon">
              <Icon aria-hidden="true" />
            </div>
            <div className="stat-num">{number}</div>
            <div className="stat-label">{label}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Stats;
