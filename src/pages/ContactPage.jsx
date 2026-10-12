import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "../styles/contact-page.css";

function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    alert(
      "El formulario funciona visualmente. Más adelante conectaremos el envío de mensajes."
    );

    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <>
      <Navbar />

      <main className="contact-page">
        <section className="contact-hero">
          <div className="contact-hero-content">
            <span className="contact-label">
              <MessageCircle size={16} />
              Estamos para ayudarte
            </span>

            <h1>Contáctanos</h1>

            <p>
              ¿Tienes alguna pregunta sobre nuestros productos?
              Escríbenos y con gusto te ayudaremos.
            </p>
          </div>
        </section>

        <div className="contact-container">
          <section className="contact-info">
            <div className="contact-section-heading">
              <h2>Información de contacto</h2>
              <p>
                Puedes comunicarte con nosotros por cualquiera
                de los siguientes medios.
              </p>
            </div>

            <div className="contact-info-card">
              <div className="contact-info-icon">
                <Mail size={23} />
              </div>

              <div>
                <h3>Correo electrónico</h3>
                <p>contacto@mitienda.com</p>
                <span>Envíanos tus consultas</span>
              </div>
            </div>

            <div className="contact-info-card">
              <div className="contact-info-icon">
                <Phone size={23} />
              </div>

              <div>
                <h3>Teléfono</h3>
                <p>+502 0000-0000</p>
                <span>Atención al cliente</span>
              </div>
            </div>

            <div className="contact-info-card">
              <div className="contact-info-icon">
                <MapPin size={23} />
              </div>

              <div>
                <h3>Ubicación</h3>
                <p>Ciudad de Guatemala, Guatemala</p>
                <span>Atención en Guatemala</span>
              </div>
            </div>

            <div className="contact-info-card">
              <div className="contact-info-icon">
                <Clock size={23} />
              </div>

              <div>
                <h3>Horario de atención</h3>
                <p>Lunes a viernes</p>
                <span>8:00 a. m. – 5:00 p. m.</span>
              </div>
            </div>
          </section>

          <section className="contact-form-card">
            <h2>Envíanos un mensaje</h2>

            <p className="contact-form-description">
              Completa el formulario y cuéntanos cómo podemos ayudarte.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="contact-form-row">
                <div className="contact-field">
                  <label htmlFor="contact-name">
                    Nombre completo
                  </label>

                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    placeholder="Tu nombre"
                    value={form.name}
                    onChange={handleChange}
                    autoComplete="name"
                    required
                  />
                </div>

                <div className="contact-field">
                  <label htmlFor="contact-email">
                    Correo electrónico
                  </label>

                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <div className="contact-field">
                <label htmlFor="contact-subject">
                  Asunto
                </label>

                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  placeholder="¿Sobre qué deseas consultar?"
                  value={form.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="contact-field">
                <label htmlFor="contact-message">
                  Mensaje
                </label>

                <textarea
                  id="contact-message"
                  name="message"
                  placeholder="Escribe tu mensaje aquí..."
                  value={form.message}
                  onChange={handleChange}
                  rows={6}
                  required
                />
              </div>

              <button type="submit" className="contact-submit">
                <Send size={18} />
                Enviar mensaje
              </button>

              <p className="contact-form-note">
                Por ahora, este formulario es una demostración
                y todavía no envía mensajes.
              </p>
            </form>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default ContactPage;