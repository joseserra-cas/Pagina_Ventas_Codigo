import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import "../styles/cart.css";

function Cart() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    totalItems,
    totalPrice,
    isCartOpen,
    closeCart,
  } = useCart();

  if (!isCartOpen) {
    return null;
  }

  return (
    <>
      <div
        className="cart-overlay"
        onClick={closeCart}
      />

      <aside className="cart">

        <div className="cart-header">

          <h2>Mi carrito</h2>

          <div className="cart-header-right">

            <span className="cart-count">
              {totalItems}
            </span>

            <button
              className="cart-close"
              onClick={closeCart}
              aria-label="Cerrar carrito"
            >
              ×
            </button>

          </div>

        </div>

        <div className="cart-products">

          {cart.length === 0 ? (
            <p className="cart-empty">
              Tu carrito está vacío.
            </p>
          ) : (
            cart.map((product) => (
              <div
                className="cart-product"
                key={product.id}
              >

                <div className="cart-product-image">
                  <img
                    src={product.image}
                    alt="Producto"
                  />
                </div>

                <div className="cart-product-info">

                  <strong>
                    Q{product.price.toFixed(2)}
                  </strong>

                  <div className="cart-product-controls">

                    <button
                      onClick={() =>
                        decreaseQuantity(product.id)
                      }
                    >
                      −
                    </button>

                    <span>
                      {product.quantity}
                    </span>

                    <button
                      onClick={() =>
                        increaseQuantity(product.id)
                      }
                    >
                      +
                    </button>

                  </div>

                  <button
                    className="cart-remove"
                    onClick={() =>
                      removeFromCart(product.id)
                    }
                  >
                    Eliminar
                  </button>

                </div>

              </div>
            ))
          )}

        </div>

        <div className="cart-footer">

          <div className="cart-total">
            <span>Total</span>

            <strong>
              Q{totalPrice.toFixed(2)}
            </strong>
          </div>

          <Link
            to="/checkout"
            className={`cart-checkout ${
              cart.length === 0 ? "disabled" : ""
            }`}
            onClick={(e) => {
              if (cart.length === 0) {
                e.preventDefault();
              } else {
                closeCart();
              }
            }}
          >
            Comprar
          </Link>

        </div>

      </aside>
    </>
  );
}

export default Cart;