function Gallery() {
  return (
    <section className="section" id="gallery" data-aos="zoom-out">
      <div className="container">
        <p className="eyebrow">Moments at DPS</p>
        <h2>DPS in the Community</h2>
        <p className="section-text">
          A few moments that reflect our commitment to service, community, and
          the people we proudly work with and support.
        </p>

        <div className="gallery-grid">
          <img src="/office-pics/IMG_3152.jpeg" alt="DPS team photo" />
          <img src="/office-pics/IMG_3135.jpeg" alt="DPS company team" />
          <img src="/office-pics/IMG_3123.jpeg" alt="DPS staff group photo" />
          <img src="/office-pics/IMG_3122.jpeg" alt="DPS team outside" />
        </div>
      </div>
    </section>
  );
}

export default Gallery;
