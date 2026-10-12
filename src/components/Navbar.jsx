import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar() {
  const {
    totalItems,
    toggleCart,
  } = useCart();

  return (
    <nav>

      <h1>Mi tienda</h1>

      <ul>

        <li>
          <Link to="/">
            Inicio
          </Link>
        </li>

        <li>
          <Link to="/productos">
            Productos
          </Link>
        </li>

        <li>
          <Link to="/contacto">Contacto</Link>
        </li>

        <li>
          <Link to="/InicioSesion">
            Iniciar Sesión
          </Link>
        </li>

        <li>
          <Link to="/admin">
            Administracion
          </Link>
        </li>

        <li>
          <Link to="/perfil">Mi perfil</Link>
        </li>

        <li>
          <button
            className="navbar-cart-button"
            onClick={toggleCart}
            aria-label="Abrir carrito"
          >
            🛒

            {totalItems > 0 && (
              <span className="navbar-cart-count">
                {totalItems}
              </span>
            )}
          </button>
        </li>

      </ul>

    </nav>
  );
}

export default Navbar;