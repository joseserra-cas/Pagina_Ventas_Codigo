function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Carlos",
      comment: "Excelente producto y muy buena atención.",
    },
    {
      id: 2,
      name: "María",
      comment: "El pedido llegó rápido y todo estaba perfecto.",
    },
    {
      id: 3,
      name: "José",
      comment: "Muy buena experiencia. Volvería a comprar.",
    },
  ];

  return (
    <section id="testimonios">
      <h2>Lo que dicen nuestros clientes</h2>

      {testimonials.map((testimonial) => (
        <article key={testimonial.id}>
          <p>
            "{testimonial.comment}"
          </p>

          <strong>
            {testimonial.name}
          </strong>
        </article>
      ))}
    </section>
  );
}

export default Testimonials;