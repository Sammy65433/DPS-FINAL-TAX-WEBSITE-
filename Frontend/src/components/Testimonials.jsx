function Testimonials() {
  return (
    <section id="testimonials" className="section alt" data-aos="fade-up">
      <div className="container">
        <p className="eyebrow">Client Feedback</p>
        <h2>What Clients Say about DPS</h2>
        <div className="card-grid">
          <div className="card">
            <img src="/client-american.jpg" alt="Happy client" className="service-card-image" />
            <p>
              "Professional, helpful, and very reliable. They made my tax filing process easy and stress-free."
            </p>
            <h3 style={{ marginTop: "1rem" }}>Local Client</h3>
          </div>

          <div className="card" data-aos="zoom-in">
            <img src="/client-blk1.jpg" alt="Client receiving support" className="service-card-image" />
            <p>
              "Mwen te jwenn yon sèvis trè pwofesyonèl. Yo te pran tan pou ede m konprann dokiman mwen yo epi yo te trete m ak anpil respè."
            </p>
            <h3 style={{ marginTop: "1rem" }}>Kreyòl-Speaking Client</h3>
          </div>

          <div className="card" data-aos="zoom-in">
            <img src="/client5.jpg" alt="Professional client feedback" className="service-card-image" />
            <p>
              "Service très professionnel et chaleureux. On a pris le temps de tout m’expliquer clairement, ce qui m’a tout de suite mis en confiance."
            </p>
            <h3 style={{ marginTop: "1rem" }}>French-Speaking Client</h3>
          </div>

          <div className="card" data-aos="zoom-in">
            <img src="/client4.jpg" alt="Satisfied client testimonial" className="service-card-image" />
            <p>
              "Recibí un servicio excelente. Me ayudaron con mis impuestos y respondieron todas mis preguntas con paciencia y claridad."
            </p>
            <h3 style={{ marginTop: "1rem" }}>Spanish-Speaking Client</h3>
          </div>

          <div className="card" data-aos="zoom-in">
            <img src="/client-all.jpg" alt="Returning client" className="service-card-image" />
            <p>
              "I appreciated how patient and organized the team was. They made the whole process feel simple and trustworthy."
            </p>
            <h3 style={{ marginTop: "1rem" }}>Returning Client</h3>
          </div>

          <div className="card" data-aos="zoom-in">
            <img src="/client-blk3.jpg" alt="Client testimonial" className="service-card-image" />
            <p>
              "The staff was patient, respectful, and very clear. I felt comfortable asking questions the entire time."
            </p>
            <h3 style={{ marginTop: "1rem" }}>First-Time Client</h3>
          </div>

          <div className="card" data-aos="zoom-in">
            <img src="/client-blk2.jpg" alt="Satisfied customer" className="service-card-image" />
            <p>
              "Yo te ede m byen vit epi yo te trè pwofesyonèl. Mwen ta rekòmande sèvis sa yo ak tout moun."
            </p>
            <h3 style={{ marginTop: "1rem" }}>Returning Kreyòl Client</h3>
          </div>

          <div className="card" data-aos="zoom-in">
            <img src="/client-spanish3.jpg" alt="Professional support client" className="service-card-image" />
            <p>
              "Muy organizados y amables. El proceso fue sencillo y me sentí bien atendido desde el primer momento."
            </p>
            <h3 style={{ marginTop: "1rem" }}>Spanish-Speaking Client</h3>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
