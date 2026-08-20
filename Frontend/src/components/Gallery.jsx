import { FaCameraRetro, FaUsers, FaHeart } from "react-icons/fa";

function Gallery() {
  return (
    <section className="section gallery-section" id="gallery" data-aos="zoom-out">
      <div className="container">
        <div className="gallery-heading">
          <p className="eyebrow">Moments at DPS</p>
          <h2>DPS in the Community</h2>
          <p className="section-text gallery-section-text">
            These moments reflect more than just photos. They represent the
            trust, relationships, and community connection that DPS Professional
            Tax Services has built over the years.
          </p>
          <p className="section-text gallery-section-text">
            From serving individuals and families during tax season to supporting
            clients with important documents, appointments, and everyday needs,
            our work has always been rooted in service, care, and consistency.
          </p>
        </div>

        <div className="gallery-highlight-row">
          <div className="gallery-highlight-card">
            <FaCameraRetro />
            <span>Real Moments</span>
          </div>
          <div className="gallery-highlight-card">
            <FaUsers />
            <span>Community Connection</span>
          </div>
          <div className="gallery-highlight-card">
            <FaHeart />
            <span>Trusted Service</span>
          </div>
        </div>

        <div className="gallery-grid">
          <div className="gallery-item gallery-item-large">
            <img src="/office-pics/IMG_3152.jpeg" alt="DPS team photo" />
          </div>

          <div className="gallery-item">
            <img src="/office-pics/IMG_3135.jpeg" alt="DPS company team" />
          </div>

          <div className="gallery-item">
            <img src="/office-pics/IMG_3123.jpeg" alt="DPS staff group photo" />
          </div>

          <div className="gallery-item gallery-item-wide">
            <img src="/office-pics/IMG_3122.jpeg" alt="DPS team outside" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Gallery;
