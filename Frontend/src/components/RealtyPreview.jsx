import { Link } from "react-router-dom";

function RealtyPreview() {
  return (
    <section className="section alt" id="realty" data-aos="zoom-in">
      <div className="realty-banner">
        <div className="realty-text">
          <img
            src="/real-estate.jpg"
            alt="Real estate services"
            className="realty-side-image"
          />
          <h3>Need Real Estate Help?</h3>
          <p>
            Our partner Ricot Casimir of RC Realty Group handles buying,
            selling, renting, and investment property support.
          </p>

          <div className="realty-buttons">
            <Link to="/real-estate-booking" className="btn-realty">
              Book Real Estate Appointment →
            </Link>
            <a
              href="https://www.rcrealtygroup.net"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-realty btn-realty-secondary"
            >
              Visit RC Realty Group →
            </a>
          </div>
        </div>

        <div className="realty-contact">
          <p>
            <strong>Ricot Casimir</strong> - RC Realty Group
          </p>
          <p>
            Phone: <a href="tel:9738859929">(973) 885-9929</a>
          </p>
          <p>
            Email:{" "}
            <a href="mailto:ricot.casimir@gmail.com">
              Ricot.Casimir@gmail.com
            </a>
          </p>
          <a
            href="https://www.google.com/maps/search/1811+Springfield+Ave+Maplewood+NJ+07040"
            target="_blank"
            rel="noopener noreferrer"
            className="card-link"
          >
            1811 Springfield Ave, Maplewood, NJ 07040
          </a>

          <img
            src="/real-estate-keys2.jpg"
            alt="Real estate services"
            className="realty-side-image"
          />
        </div>
      </div>
    </section>
  );
}

export default RealtyPreview;
