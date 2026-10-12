import { Link } from "react-router-dom";
import {
  UserRound,
  Mail,
  Phone,
  MapPin,
  Package,
  ShoppingBag,
  Pencil,
  LogOut,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "../styles/user-profile.css";

function UserProfile() {
  // Datos de ejemplo; después se conectarán con el usuario real.
  const user = {
    name: "Juan Pérez",
    email: "juan.perez@email.com",
    phone: "1234-5678",
    address: "Ciudad de Guatemala, Guatemala",
    memberSince: "Octubre de 2026",
  };

  const orders = [
    {
      id: "PED-001",
      date: "05/10/2026",
      total: 598.00,
      status: "Entregado",
    },
    {
      id: "PED-002",
      date: "07/10/2026",
      total: 799.00,
      status: "En proceso",
    },
  ];

  return (
    <>
      <Navbar />

      <main className="profile-page">
        <div className="profile-container">

          <header className="profile-heading">
            <div>
              <h1>Mi perfil</h1>
              <p>Administra tu información personal y tus pedidos.</p>
            </div>
          </header>

          <section className="profile-user-card">
            <div className="profile-avatar">
              <UserRound size={38} />
            </div>

            <div className="profile-user-main">
              <h2>{user.name}</h2>
              <p>{user.email}</p>
              <span>Cliente desde {user.memberSince}</span>
            </div>

            <button
              className="profile-edit-button"
              onClick={() =>
                alert("La edición del perfil se implementará después.")
              }
            >
              <Pencil size={17} />
              Editar perfil
            </button>
          </section>

          <div className="profile-layout">

            <section className="profile-panel">
              <div className="profile-panel-heading">
                <h3>Información personal</h3>
                <UserRound size={21} />
              </div>

              <div className="profile-detail">
                <div className="profile-detail-icon">
                  <UserRound size={19} />
                </div>
                <div>
                  <span>Nombre completo</span>
                  <strong>{user.name}</strong>
                </div>
              </div>

              <div className="profile-detail">
                <div className="profile-detail-icon">
                  <Mail size={19} />
                </div>
                <div>
                  <span>Correo electrónico</span>
                  <strong>{user.email}</strong>
                </div>
              </div>

              <div className="profile-detail">
                <div className="profile-detail-icon">
                  <Phone size={19} />
                </div>
                <div>
                  <span>Teléfono</span>
                  <strong>{user.phone}</strong>
                </div>
              </div>

              <div className="profile-detail">
                <div className="profile-detail-icon">
                  <MapPin size={19} />
                </div>
                <div>
                  <span>Dirección</span>
                  <strong>{user.address}</strong>
                </div>
              </div>
            </section>

            <section className="profile-panel">
              <div className="profile-panel-heading">
                <h3>Mis pedidos</h3>
                <Package size={21} />
              </div>

              <div className="profile-order-summary">
                <div className="profile-order-summary-icon">
                  <ShoppingBag size={24} />
                </div>
                <div>
                  <strong>{orders.length} pedidos</strong>
                  <span>Historial de compras</span>
                </div>
              </div>

              <div className="profile-orders">
                {orders.map((order) => (
                  <article className="profile-order" key={order.id}>
                    <div className="profile-order-top">
                      <strong>{order.id}</strong>
                      <span
                        className={`profile-order-status ${
                          order.status === "Entregado"
                            ? "delivered"
                            : "processing"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>

                    <div className="profile-order-bottom">
                      <span>{order.date}</span>
                      <strong>Q{order.total.toFixed(2)}</strong>
                    </div>
                  </article>
                ))}
              </div>

              <Link to="/productos" className="profile-shop-button">
                Seguir comprando
              </Link>
            </section>

          </div>

          <button
            className="profile-logout-button"
            onClick={() =>
              alert("El cierre de sesión estará disponible cuando implementemos la autenticación.")
            }
          >
            <LogOut size={18} />
            Cerrar sesión
          </button>

        </div>
      </main>

      <Footer />
    </>
  );
}

export default UserProfile;