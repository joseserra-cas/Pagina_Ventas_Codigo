
import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, ShoppingBag, Trash2 } from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { useStore } from "../context/StoreContext";

import "../styles/checkout.css";

const SHIPPING_COST = 25;

const formatPrice = (amount) =>
  new Intl.NumberFormat("es-GT", {
    style: "currency",
    currency: "GTQ",
  }).format(amount);

function Checkout() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    payment: "cash",
  });

  const [formError, setFormError] = useState("");
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const { addOrder } = useStore();

  const subtotal = cart.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );

  const shipping = cart.length > 0 ? SHIPPING_COST : 0;
  const total = subtotal + shipping;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setFormError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormError("");

    if (cart.length === 0) {
      setFormError("Tu carrito está vacío.");
      return;
    }

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.phone.trim() ||
      !form.address.trim()
    ) {
      setFormError("Completa todos los campos obligatorios.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(form.email.trim())) {
      setFormError("Ingresa un correo electrónico válido.");
      return;
    }

    const normalizedPhone = form.phone.replace(/[\s-]/g, "");
    if (!/^(\+502)?\d{8}$/.test(normalizedPhone)) {
      setFormError(
        "Ingresa un teléfono válido de Guatemala: 8 dígitos, con +502 opcional."
      );
      return;
    }

    // Guardamos una copia antes de vaciar el carrito.
    const order = {
      number: `PED-${Date.now().toString().slice(-8)}`,
      date: new Date().toLocaleString("es-GT"),
      customer: {
        ...form,
        name: form.name.trim(),
        email: form.email.trim(),
        phone: normalizedPhone,
        address: form.address.trim(),
      },
      items: cart.map((item) => ({ ...item })),
      subtotal,
      shipping,
      total,
    };

    addOrder(order);
    setConfirmedOrder(order);
    clearCart();
  };

  return (
    <>
      <Navbar />

      <main className="checkout-page">
        <div className="checkout-header">
          <span>FINALIZAR COMPRA</span>
          <h1>
            {confirmedOrder ? "Pedido confirmado" : "Completa tu pedido"}
          </h1>
          <p>
            {confirmedOrder
              ? "Revisa el resumen de tu pedido."
              : "Verifica tus productos e ingresa tus datos de entrega."}
          </p>
        </div>

        
{confirmedOrder ? (
  <section className="order-confirmation">
    <div className="confirmation-banner">
      <div className="confirmation-check">
        <CheckCircle2 size={38} />
      </div>
      <h2>¡Pedido realizado!</h2>
      <p>Gracias por tu compra. Hemos registrado tu pedido.</p>
      <span className="confirmation-status">Pedido registrado</span>
    </div>

    <div className="confirmation-body">
      <div className="confirmation-order-number">
        <div>
          <span>NÚMERO DE PEDIDO</span>
          <strong>{confirmedOrder.number}</strong>
          <small>{confirmedOrder.date}</small>
        </div>
        <ShoppingBag size={30} />
      </div>

      <div className="confirmation-divider" />

      <div className="confirmation-section">
        <h3>Datos de entrega</h3>
        <div className="confirmation-info-grid">
          <div className="confirmation-info-item">
            <span>Nombre completo</span>
            <strong>{confirmedOrder.customer.name}</strong>
          </div>
          <div className="confirmation-info-item">
            <span>Correo electrónico</span>
            <strong>{confirmedOrder.customer.email}</strong>
          </div>
          <div className="confirmation-info-item">
            <span>Teléfono</span>
            <strong>{confirmedOrder.customer.phone}</strong>
          </div>
          <div className="confirmation-info-item">
            <span>Dirección</span>
            <strong>{confirmedOrder.customer.address}</strong>
          </div>
          <div className="confirmation-info-item">
            <span>Método de pago</span>
            <strong>
              {confirmedOrder.customer.payment === "cash"
                ? "Efectivo contra entrega"
                : "Tarjeta (pago no procesado)"}
            </strong>
          </div>
        </div>
      </div>

      <div className="confirmation-divider" />

      <div className="confirmation-section">
        <h3>Resumen de productos</h3>

        <div className="confirmation-items">
          {confirmedOrder.items.map((item) => (
            <div className="confirmation-item" key={item.id}>
              <div className="confirmation-item-image">
                <img src={item.image} alt={item.name} />
              </div>

              <div className="confirmation-item-info">
                <strong>{item.name}</strong>
                <span>Cantidad: {item.quantity}</span>
              </div>

              <strong className="confirmation-item-price">
                {formatPrice(Number(item.price) * item.quantity)}
              </strong>
            </div>
          ))}
        </div>
      </div>

      <div className="confirmation-totals">
        <div>
          <span>Subtotal</span>
          <strong>{formatPrice(confirmedOrder.subtotal)}</strong>
        </div>
        <div>
          <span>Envío</span>
          <strong>{formatPrice(confirmedOrder.shipping)}</strong>
        </div>
        <div className="confirmation-final-total">
          <span>Total del pedido</span>
          <strong>{formatPrice(confirmedOrder.total)}</strong>
        </div>
      </div>

      <div className="confirmation-notice">
        <CheckCircle2 size={19} />
        <p>
          Esta es una confirmación de demostración. No se ha procesado
          ningún pago real ni enviado el pedido a un servidor.
        </p>
      </div>

      <Link to="/productos" className="confirmation-continue-button">
        <ShoppingBag size={18} />
        Seguir comprando
      </Link>
    </div>
  </section>
) : cart.length === 0 ? (
          <section className="checkout-empty">
            <ShoppingBag size={48} />
            <h2>Tu carrito está vacío</h2>
            <p>Agrega algunos productos antes de finalizar tu compra.</p>
            <Link to="/productos" className="checkout-primary-button">
              Ver productos
            </Link>
          </section>
        ) : (
          <div className="checkout-content">
            <section className="checkout-order-card">
              <h2>Tu pedido</h2>

              <div className="checkout-products">
                {cart.map((item) => (
                  <article className="checkout-product" key={item.id}>
                    <img src={item.image} alt={item.name} />

                    <div className="checkout-product-info">
                      <h3>{item.name}</h3>
                      <p>{formatPrice(Number(item.price))} por unidad</p>

                      <div className="checkout-quantity">
                        <button
                          type="button"
                          onClick={() => decreaseQuantity(item.id)}
                          aria-label={`Disminuir cantidad de ${item.name}`}
                        >
                          −
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          type="button"
                          onClick={() => increaseQuantity(item.id)}
                          aria-label={`Aumentar cantidad de ${item.name}`}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="checkout-product-end">
                      <strong>
                        {formatPrice(Number(item.price) * item.quantity)}
                      </strong>

                      <button
                        type="button"
                        className="checkout-remove"
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`Eliminar ${item.name}`}
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              <div className="checkout-totals">
                <div>
                  <span>Subtotal</span>
                  <strong>{formatPrice(subtotal)}</strong>
                </div>
                <div>
                  <span>Envío</span>
                  <strong>{formatPrice(shipping)}</strong>
                </div>
                <div className="checkout-grand-total">
                  <span>Total a pagar</span>
                  <strong>{formatPrice(total)}</strong>
                </div>
              </div>
            </section>

            <section className="checkout-form-card">
              <h2>Datos de entrega</h2>

              <form onSubmit={handleSubmit}>
                <label htmlFor="name">Nombre completo</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={handleChange}
                  minLength={3}
                  maxLength={100}
                  required
                />

                <label htmlFor="email">Correo electrónico</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  maxLength={150}
                  required
                />

                <label htmlFor="phone">Teléfono</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="Ej. 55551234 o +50255551234"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="address">Dirección de entrega</label>
                <textarea
                  id="address"
                  name="address"
                  autoComplete="street-address"
                  value={form.address}
                  onChange={handleChange}
                  minLength={5}
                  maxLength={300}
                  rows={3}
                  required
                />

                <label htmlFor="payment">Método de pago</label>
                <select
                  id="payment"
                  name="payment"
                  value={form.payment}
                  onChange={handleChange}
                  required
                >
                  <option value="cash">Efectivo contra entrega</option>
                  <option value="card">
                    Tarjeta (demostración, no se procesa el pago)
                  </option>
                </select>

                {formError && (
                  <p className="checkout-error" role="alert">
                    {formError}
                  </p>
                )}

                <button
                  type="submit"
                  className="checkout-primary-button"
                  disabled={cart.length === 0}
                >
                  Confirmar pedido · {formatPrice(total)}
                </button>

                <p className="checkout-demo-note">
                  Demostración: este formulario no envía los datos a un
                  servidor ni procesa pagos reales.
                </p>
              </form>
            </section>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}

export default Checkout;