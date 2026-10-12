import { useState } from "react";
import { Link } from "react-router-dom";
import {
  UserRound,
  Mail,
  LockKeyhole,
  UserPlus,
  LogIn,
  Eye,
  EyeOff,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "../styles/users-page.css";

function UsersPage() {
  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);

  const isRegister = activeTab === "register";

  const handleSubmit = (event) => {
    event.preventDefault();

    alert(
      isRegister
        ? "La interfaz de registro está lista. La creación de cuentas se implementará después."
        : "La interfaz de inicio de sesión está lista. La autenticación se implementará después."
    );
  };

  return (
    <>
      <Navbar />

      <main className="users-page">
        <div className="users-container">

          <div className="users-intro">
            <div className="users-icon">
              <UserRound size={32} />
            </div>

            <h1>Bienvenido a Mi tienda</h1>

            <p>
              Accede a tu cuenta o crea una para disfrutar
              de una mejor experiencia de compra.
            </p>
          </div>

          <div className="users-card">

            <div className="users-tabs">
              <button
                type="button"
                className={!isRegister ? "active" : ""}
                onClick={() => {
                  setActiveTab("login");
                  setShowPassword(false);
                }}
              >
                <LogIn size={18} />
                Iniciar sesión
              </button>

              <button
                type="button"
                className={isRegister ? "active" : ""}
                onClick={() => {
                  setActiveTab("register");
                  setShowPassword(false);
                }}
              >
                <UserPlus size={18} />
                Crear cuenta
              </button>
            </div>

            <div className="users-form-content">
              <h2>
                {isRegister ? "Crear una cuenta" : "Iniciar sesión"}
              </h2>

              <p className="users-form-description">
                {isRegister
                  ? "Completa tus datos para comenzar."
                  : "Ingresa tus datos para continuar."}
              </p>

              <form onSubmit={handleSubmit}>

                {isRegister && (
                  <div className="users-field">
                    <label htmlFor="fullName">
                      Nombre completo
                    </label>

                    <div className="users-input-wrapper">
                      <UserRound size={19} />

                      <input
                        id="fullName"
                        type="text"
                        placeholder="Tu nombre completo"
                        autoComplete="name"
                        required
                      />
                    </div>
                  </div>
                )}

                <div className="users-field">
                  <label htmlFor="email">
                    Correo electrónico
                  </label>

                  <div className="users-input-wrapper">
                    <Mail size={19} />

                    <input
                      id="email"
                      type="email"
                      placeholder="correo@ejemplo.com"
                      autoComplete="email"
                      required
                    />
                  </div>
                </div>

                <div className="users-field">
                  <label htmlFor="password">
                    Contraseña
                  </label>

                  <div className="users-input-wrapper">
                    <LockKeyhole size={19} />

                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Ingresa tu contraseña"
                      autoComplete={
                        isRegister ? "new-password" : "current-password"
                      }
                      minLength={isRegister ? 8 : undefined}
                      required
                    />

                    <button
                      type="button"
                      className="users-password-toggle"
                      onClick={() =>
                        setShowPassword((visible) => !visible)
                      }
                      aria-label={
                        showPassword
                          ? "Ocultar contraseña"
                          : "Mostrar contraseña"
                      }
                    >
                      {showPassword
                        ? <EyeOff size={19} />
                        : <Eye size={19} />}
                    </button>
                  </div>

                  {isRegister && (
                    <small>
                      La contraseña debe tener al menos 8 caracteres.
                    </small>
                  )}
                </div>

                {!isRegister && (
                  <div className="users-form-options">
                    <label className="users-remember">
                      <input type="checkbox" />
                      Recordarme
                    </label>

                    <button
                      type="button"
                      className="users-forgot"
                      onClick={() =>
                        alert("La recuperación de contraseña se implementará después.")
                      }
                    >
                      ¿Olvidaste tu contraseña?
                    </button>
                  </div>
                )}

                {isRegister && (
                  <label className="users-terms">
                    <input type="checkbox" required />
                    <span>
                      Acepto los términos y condiciones.
                    </span>
                  </label>
                )}

                <button
                  type="submit"
                  className="users-submit"
                >
                  {isRegister ? "Crear cuenta" : "Iniciar sesión"}
                </button>

              </form>

              <div className="users-switch">
                {isRegister
                  ? "¿Ya tienes una cuenta?"
                  : "¿Todavía no tienes una cuenta?"}

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab(isRegister ? "login" : "register");
                    setShowPassword(false);
                  }}
                >
                  {isRegister ? "Inicia sesión" : "Regístrate"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default UsersPage;