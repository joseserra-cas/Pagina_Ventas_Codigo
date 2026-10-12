import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  Package,
  ShoppingCart,
  XCircle,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { useStore } from "../context/StoreContext";

import "../styles/product-detail.css";

function ProductDetail() {
  const { id } = useParams();
  const { products } = useStore();
  const { addToCart } = useCart();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <>
        <Navbar />

        <main className="product-detail-page">
          <div className="product-not-found">
            <Package size={45} />

            <h1>Producto no encontrado</h1>

            <p>
              El producto que buscas no existe o ya no está disponible.
            </p>

            <Link to="/productos">
              Volver al catálogo
            </Link>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="product-detail-page">
        <div className="product-detail-container">
          <Link to="/productos" className="product-back-link">
            <ArrowLeft size={18} />
            Volver a productos
          </Link>

          <div className="product-detail-card">
            <div className="product-detail-image">
              <img src={product.image} alt={product.name} />

              <span
                className={`product-detail-badge ${
                  product.available ? "available" : "unavailable"
                }`}
              >
                {product.available ? "Disponible" : "Agotado"}
              </span>
            </div>

            <section className="product-detail-info">
              <span className="product-detail-category">
                {product.category}
              </span>

              <h1>{product.name}</h1>

              <p className="product-detail-price">
                Q{product.price.toFixed(2)}
              </p>

              <p className="product-detail-description">
                {product.description}
              </p>

              <div
                className={`product-detail-availability ${
                  product.available ? "available" : "unavailable"
                }`}
              >
                {product.available ? (
                  <CheckCircle2 size={19} />
                ) : (
                  <XCircle size={19} />
                )}

                <span>
                  {product.available
                    ? `${product.stock} unidades disponibles`
                    : "Actualmente agotado"}
                </span>
              </div>

              <button
                type="button"
                className="product-detail-add"
                disabled={!product.available}
                onClick={() => addToCart(product)}
              >
                <ShoppingCart size={19} />

                {product.available
                  ? "Agregar al carrito"
                  : "Producto agotado"}
              </button>

              <div className="product-detail-note">
                <Package size={19} />

                <span>
                  La disponibilidad es ilustrativa y se configura
                  en el catálogo de esta plantilla.
                </span>
              </div>

              <div className="product-detail-meta">
                <span>Referencia: PROD-{String(product.id).padStart(3, "0")}</span>
                <span>Categoría: {product.category}</span>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default ProductDetail;