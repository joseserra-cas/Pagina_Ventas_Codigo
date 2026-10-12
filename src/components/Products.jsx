import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";

import { useStore } from "../context/StoreContext";
import { useCart } from "../context/CartContext";

import "../styles/products.css";

function Products() {
  const { products } = useStore();
  const { addToCart } = useCart();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  const viewportRef = useRef(null);
  const trackRef = useRef(null);

  const maxIndex = Math.max(0, products.length - visibleCount);

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth <= 600) {
        setVisibleCount(1);
      } else if (window.innerWidth <= 900) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    updateVisibleCount();

    window.addEventListener("resize", updateVisibleCount);

    return () => {
      window.removeEventListener("resize", updateVisibleCount);
    };
  }, []);

  useEffect(() => {
    setCurrentIndex((current) => Math.min(current, maxIndex));
  }, [maxIndex]);

  const nextSlide = () => {
    setCurrentIndex((current) =>
      current >= maxIndex ? 0 : current + 1
    );
  };

  const previousSlide = () => {
    setCurrentIndex((current) =>
      current <= 0 ? maxIndex : current - 1
    );
  };

  useEffect(() => {
    if (products.length <= visibleCount) return;

    const interval = setInterval(() => {
      setCurrentIndex((current) =>
        current >= maxIndex ? 0 : current + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [maxIndex, visibleCount]);

  useEffect(() => {
    if (!viewportRef.current || !trackRef.current) return;

    const firstCard = trackRef.current.querySelector(".product-card");

    if (!firstCard) return;

    const cardWidth = firstCard.getBoundingClientRect().width;
    const trackStyles = window.getComputedStyle(trackRef.current);
    const gap = parseFloat(trackStyles.columnGap || trackStyles.gap) || 0;

    trackRef.current.style.transform =
      `translateX(-${currentIndex * (cardWidth + gap)}px)`;
  }, [currentIndex, visibleCount]);

  const indicators = Array.from(
    { length: maxIndex + 1 },
    (_, index) => index
  );

  if (products.length === 0) return null;

  return (
    <section className="products-section" id="productos">
      <div className="products-heading">
        <span>TECNOLOGÍA PARA TI</span>
        <h2>Nuestros productos</h2>
        <p>Descubre nuestros accesorios y productos tecnológicos.</p>
      </div>

      <div className="products-carousel">
        {maxIndex > 0 && (
          <button
            type="button"
            className="products-carousel-button previous"
            onClick={previousSlide}
            aria-label="Productos anteriores"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        <div className="products-viewport" ref={viewportRef}>
          <div className="products-track" ref={trackRef}>
            {products.map((product) => (
              <article className="product-card" key={product.id}>
                <Link
                  to={`/productos/${product.id}`}
                  className="product-image-container"
                  aria-label={`Ver ${product.name}`}
                >
                  <img src={product.image} alt={product.name} />

                  <span
                    className={`product-stock-badge ${
                      product.available ? "in-stock" : "out-stock"
                    }`}
                  >
                    {product.available ? "Disponible" : "Agotado"}
                  </span>
                </Link>

                <div className="product-information">
                  <span className="product-category">
                    {product.category}
                  </span>

                  <h3>
                    <Link to={`/productos/${product.id}`}>
                      {product.name}
                    </Link>
                  </h3>

                  <strong className="product-price">
                    Q{product.price.toFixed(2)}
                  </strong>

                  <p>{product.description}</p>

                  <button
                    type="button"
                    className="product-buy-button"
                    disabled={!product.available}
                    onClick={() => addToCart(product)}
                  >
                    <ShoppingCart size={17} />

                    {product.available ? "Agregar al carrito" : "Agotado"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        {maxIndex > 0 && (
          <button
            type="button"
            className="products-carousel-button next"
            onClick={nextSlide}
            aria-label="Siguientes productos"
          >
            <ChevronRight size={24} />
          </button>
        )}
      </div>

      <div className="products-indicators">
        {indicators.map((index) => (
          <button
            type="button"
            key={index}
            className={
              index === currentIndex
                ? "product-indicator active"
                : "product-indicator"
            }
            onClick={() => setCurrentIndex(index)}
            aria-label={`Ir a la posición ${index + 1}`}
            aria-current={index === currentIndex ? "true" : undefined}
          />
        ))}
      </div>

      <div className="products-see-all">
        <Link to="/productos">Ver todos los productos</Link>
      </div>
    </section>
  );
}

export default Products;