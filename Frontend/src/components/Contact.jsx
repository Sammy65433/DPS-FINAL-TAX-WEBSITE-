function Contact() {
  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <h2>Contact Us</h2>

        <div className="contact-info" data-aos="zoom-in">
          <img
            src="/DPS-LOGO1.png"
            alt="DPS Professional Tax Services logo"
            className="contact-logo"
          />

          <p>
            <strong>
              DPS Professional Tax Services
              <br />
              &amp;
              <br />
              Realty Management
            </strong>
          </p>

          <div className="contact-details" data-aos="fade-right">
            <p>
              <a
                href="https://www.google.com/maps/search/1811+Springfield+Ave+Maplewood+NJ+07040"
                target="_blank"
                rel="noopener noreferrer"
              >
                1811 Springfield Ave, Maplewood, NJ 07040
              </a>
            </p>
            <p>
              Phone: <a href="tel:9733272340">(973) 327-2340</a>
            </p>
            <p>Fax: (973) 821-3684</p>
            <p>
              Email: <a href="mailto:dpstax1@gmail.com">DpsTax1@gmail.com</a>
            </p>
          </div>

          <div className="office-hours" id="hours" data-aos="fade-left">
            <p><strong>Tax Season Office Hours</strong></p>
            <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
            <p>Saturday: 9:00 AM - 6:00 PM</p>
            <p>Sunday: By Appointment Only</p>
          </div>

          <p className="irs-contact-note">IRS e-file Authorized Agent</p>
        </div>
      </div>

      <div className="map-embed" data-aos="fade-left">
        <iframe
          src="https://www.google.com/maps?q=1811+Springfield+Ave+Maplewood+NJ+07040&output=embed"
          width="100%"
          height="250"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="DPS Professional Tax Services Location"
        ></iframe>
      </div>
    </section>
  );
}

export default Contact;
