function Features() {
  const features = [
    "Productos de calidad",
    "Precios competitivos",
    "Envíos rápidos",
    "Atención personalizada",
  ];

  return (
    <section id="beneficios">
      <h2>¿Por qué elegirnos?</h2>

      <ul>
        {features.map((feature, index) => (
          <li key={index}>
            {feature}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Features;