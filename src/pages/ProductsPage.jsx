import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, SlidersHorizontal, Eye, ShoppingCart } from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { useStore } from "../context/StoreContext";

import "../styles/products-page.css";

function ProductsPage() {
  const { addToCart } = useCart();
  const { products } = useStore();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todas");
  const [availability, setAvailability] = useState("Todos");
  const [sort, setSort] = useState("featured");
  const [page, setPage] = useState(1);

  const productsPerPage = 6;

  const categories = [
    "Todas",
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const term = search.trim().toLowerCase();

      const matchesSearch =
        product.name.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term);

      const matchesCategory =
        category === "Todas" || product.category === category;

      const matchesAvailability =
        availability === "Todos" ||
        (availability === "Disponibles" && product.available) ||
        (availability === "Agotados" && !product.available);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesAvailability
      );
    });

    if (sort === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [search, category, availability, sort]);

  const totalPages = Math.ceil(
    filteredProducts.length / productsPerPage
  );

  const currentPage = Math.min(page, Math.max(totalPages, 1));

  const startIndex = (currentPage - 1) * productsPerPage;

  const visibleProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  const updateFilter = (setter, value) => {
    setter(value);
    setPage(1);
  };

  const clearFilters = () => {
    setSearch("");
    setCategory("Todas");
    setAvailability("Todos");
    setSort("featured");
    setPage(1);
  };

  return (
    <>
      <Navbar />

      <main className="catalog-page">
        <header className="catalog-hero">
          <span className="catalog-eyebrow">
            TECNOLOGÍA PARA TU DÍA A DÍA
          </span>

          <h1>Nuestros productos</h1>

          <p>
            Descubre accesorios y tecnología para trabajar,
            estudiar y disfrutar.
          </p>
        </header>

        <section className="catalog-container">
          <div className="catalog-toolbar">
            <div className="catalog-search">
              <Search size={20} />

              <input
                type="search"
                placeholder="Buscar productos..."
                value={search}
                onChange={(event) =>
                  updateFilter(setSearch, event.target.value)
                }
                aria-label="Buscar productos"
              />
            </div>

            <div className="catalog-sort">
              <SlidersHorizontal size={18} />

              <select
                value={sort}
                onChange={(event) =>
                  updateFilter(setSort, event.target.value)
                }
                aria-label="Ordenar productos"
              >
                <option value="featured">Destacados</option>
                <option value="price-asc">Precio: menor a mayor</option>
                <option value="price-desc">Precio: mayor a menor</option>
                <option value="name">Nombre: A-Z</option>
              </select>
            </div>
          </div>

          <div className="catalog-layout">
            <aside className="catalog-filters">
              <div className="catalog-filter-heading">
                <h2>Filtros</h2>

                <button type="button" onClick={clearFilters}>
                  Limpiar
                </button>
              </div>

              <div className="catalog-filter-group">
                <h3>Categorías</h3>

                {categories.map((item) => (
                  <label className="catalog-filter-option" key={item}>
                    <input
                      type="radio"
                      name="category"
                      checked={category === item}
                      onChange={() =>
                        updateFilter(setCategory, item)
                      }
                    />

                    <span>{item}</span>
                  </label>
                ))}
              </div>

              <div className="catalog-filter-group">
                <h3>Disponibilidad</h3>

                {["Todos", "Disponibles", "Agotados"].map((item) => (
                  <label className="catalog-filter-option" key={item}>
                    <input
                      type="radio"
                      name="availability"
                      checked={availability === item}
                      onChange={() =>
                        updateFilter(setAvailability, item)
                      }
                    />

                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </aside>

            <div className="catalog-results">
              <div className="catalog-results-heading">
                <p>
                  {filteredProducts.length}{" "}
                  {filteredProducts.length === 1
                    ? "producto encontrado"
                    : "productos encontrados"}
                </p>
              </div>

              {visibleProducts.length === 0 ? (
                <div className="catalog-empty">
                  <Search size={36} />

                  <h2>No encontramos productos</h2>

                  <p>
                    Prueba otra búsqueda o cambia los filtros.
                  </p>

                  <button type="button" onClick={clearFilters}>
                    Ver todos los productos
                  </button>
                </div>
              ) : (
                <div className="catalog-grid">
                  {visibleProducts.map((product) => (
                    <article className="catalog-product" key={product.id}>
                      <Link
                        to={`/productos/${product.id}`}
                        className="catalog-product-image"
                        aria-label={`Ver ${product.name}`}
                      >
                        <img src={product.image} alt={product.name} />

                        <span
                          className={`catalog-stock ${
                            product.available ? "in-stock" : "out-stock"
                          }`}
                        >
                          {product.available
                            ? "Disponible"
                            : "Agotado"}
                        </span>
                      </Link>

                      <div className="catalog-product-info">
                        <span className="catalog-product-category">
                          {product.category}
                        </span>

                        <h3>
                          <Link to={`/productos/${product.id}`}>
                            {product.name}
                          </Link>
                        </h3>

                        <p className="catalog-product-description">
                          {product.description}
                        </p>

                        <div className="catalog-product-bottom">
                          <strong>
                            Q{product.price.toFixed(2)}
                          </strong>

                          <span className="catalog-stock-count">
                            {product.available
                              ? `${product.stock} disponibles`
                              : "Sin existencias"}
                          </span>
                        </div>

                        <div className="catalog-product-actions">
                          <Link
                            to={`/productos/${product.id}`}
                            className="catalog-details-button"
                          >
                            <Eye size={17} />
                            Detalles
                          </Link>

                          <button
                            type="button"
                            className="catalog-add-button"
                            disabled={!product.available}
                            onClick={() => addToCart(product)}
                            aria-label={`Agregar ${product.name} al carrito`}
                          >
                            <ShoppingCart size={18} />
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {totalPages > 1 && (
                <nav className="catalog-pagination" aria-label="Páginas">
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() => setPage(currentPage - 1)}
                  >
                    Anterior
                  </button>

                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                  ).map((pageNumber) => (
                    <button
                      type="button"
                      key={pageNumber}
                      className={
                        currentPage === pageNumber ? "active" : ""
                      }
                      aria-current={
                        currentPage === pageNumber ? "page" : undefined
                      }
                      onClick={() => setPage(pageNumber)}
                    >
                      {pageNumber}
                    </button>
                  ))}

                  <button
                    type="button"
                    disabled={currentPage === totalPages}
                    onClick={() => setPage(currentPage + 1)}
                  >
                    Siguiente
                  </button>
                </nav>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default ProductsPage;