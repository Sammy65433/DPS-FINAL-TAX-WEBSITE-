import {
  FaAward,
  FaBriefcase,
  FaUsers,
  FaMapMarkedAlt,
  FaLanguage,
  FaFileInvoiceDollar,
} from "react-icons/fa";

function Stats() {
  return (
    <section className="stat-strip">
      <div className="container stat-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <FaAward />
          </div>
          <div className="stat-num">19+</div>
          <div className="stat-label">Years in Business</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FaBriefcase />
          </div>
          <div className="stat-num">6+</div>
          <div className="stat-label">Services Offered</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FaUsers />
          </div>
          <div className="stat-num">2000+</div>
          <div className="stat-label">Clients Served</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FaMapMarkedAlt />
          </div>
          <div className="stat-num">20+</div>
          <div className="stat-label">Counties Served</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FaLanguage />
          </div>
          <div className="stat-num">4+</div>
          <div className="stat-label">Languages Supported</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FaFileInvoiceDollar />
          </div>
          <div className="stat-num">IRS</div>
          <div className="stat-label">e-file Authorized</div>
        </div>
      </div>
    </section>
  );
}

export default Stats;
