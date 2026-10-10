import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaCalendarCheck,
  FaCameraRetro,
  FaHeart,
  FaTimes,
  FaUsers,
} from "react-icons/fa";

const photos = [
  {
    src: "/office-pics/IMG_3152.jpeg",
    alt: "DPS team together at a community gathering",
  },
  {
    src: "/office-pics/IMG_3135.jpeg",
    alt: "DPS team members together",
  },
  {
    src: "/office-pics/IMG_3123.jpeg",
    alt: "DPS staff and community members",
  },
  {
    src: "/office-pics/IMG_3122.jpeg",
    alt: "DPS team together outdoors",
  },
];

function Gallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    if (!selectedPhoto) return undefined;

    function onKeyDown(event) {
      if (event.key === "Escape") setSelectedPhoto(null);
    }

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedPhoto]);

  return (
    <section className="section gallery-section" id="gallery">
      <div className="container gallery-page">
        <div className="gallery-hero-card">
          <div className="gallery-heading">
            <p className="eyebrow">Moments at DPS</p>
            <h2>DPS in the Community</h2>
            <p className="gallery-section-text">
              Our work is about more than forms and appointments. Over the
              years, we’ve built relationships with the people and families
              who trust us with important moments in their lives.
            </p>
            <p className="gallery-section-text">
              These photos celebrate the connections behind our work: the
              team, the conversations, and the community that has supported
              DPS Professional Tax Services since 2007. We’re grateful to
              serve Maplewood and the surrounding area.
            </p>
          </div>

          <div className="gallery-highlight-row">
            <span className="gallery-highlight-card">
              <FaCameraRetro aria-hidden="true" /> Real Moments
            </span>
            <span className="gallery-highlight-card">
              <FaUsers aria-hidden="true" /> Community Connection
            </span>
            <span className="gallery-highlight-card">
              <FaHeart aria-hidden="true" /> Trusted Service
            </span>
          </div>
        </div>

        <div className="gallery-grid">
          {photos.map((photo) => (
            <button
              key={photo.src}
              type="button"
              className="gallery-item"
              onClick={() => setSelectedPhoto(photo)}
              aria-label={`Expand photo: ${photo.alt}`}
            >
              <img src={photo.src} alt={photo.alt} loading="lazy" />
            </button>
          ))}
        </div>

        <div className="gallery-cta">
          <div>
            <h2>We’re Here for You</h2>
            <p>
              Have a question or ready to visit? Connect with our team or
              reserve a time that works for you.
            </p>
          </div>
          <div className="gallery-cta-actions">
            <Link to="/contact">Contact Us</Link>
            <Link to="/booking">
              <FaCalendarCheck aria-hidden="true" />
              Book Appointment
            </Link>
          </div>
        </div>
      </div>

      {selectedPhoto && (
        <div
          className="gallery-lightbox"
          role="presentation"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="gallery-lightbox-content"
            role="dialog"
            aria-modal="true"
            aria-label="Expanded DPS gallery photo"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="gallery-lightbox-close"
              onClick={() => setSelectedPhoto(null)}
              aria-label="Close expanded photo"
              autoFocus
            >
              <FaTimes aria-hidden="true" />
            </button>
            <img src={selectedPhoto.src} alt={selectedPhoto.alt} />
          </div>
        </div>
      )}
    </section>
  );
}

export default Gallery;
