
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Plus,
  Pencil,
  Trash2,
  Store,
  ArrowLeft,
} from "lucide-react";

import { useStore } from "../context/StoreContext";
import "../styles/admin.css";

const money = (value) =>
  new Intl.NumberFormat("es-GT", {
    style: "currency",
    currency: "GTQ",
  }).format(Number(value) || 0);

const emptyProduct = {
  name: "",
  category: "Computación",
  price: "",
  stock: "",
  description: "",
  image: "",
};

function Admin() {
  const {
    products,
    orders,
    addProduct,
    updateProduct,
    deleteProduct,
    updateOrderStatus,
  } = useStore();

  const [section, setSection] = useState("dashboard");
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyProduct);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);

  const totalValue = orders.reduce(
    (sum, order) => sum + (Number(order.total) || 0),
    0
  );

  const outOfStock = products.filter(
    (product) => Number(product.stock) <= 0
  ).length;

  const filteredProducts = products.filter((product) =>
    `${product.name} ${product.category}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const openNewProduct = () => {
    setEditingId(null);
    setForm(emptyProduct);
    setMessage("");
    setShowForm(true);
  };

  const openEditProduct = (product) => {
    setEditingId(product.id);
    setForm({
      name: product.name || "",
      category: product.category || "Computación",
      price: String(product.price ?? ""),
      stock: String(product.stock ?? ""),
      description: product.description || "",
      image: product.image || "",
    });
    setMessage("");
    setShowForm(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleProductSubmit = (event) => {
    event.preventDefault();
    setMessage("");

    const price = Number(form.price);
    const stock = Number(form.stock);

    if (
      !form.name.trim() ||
      !form.description.trim() ||
      !form.image.trim() ||
      !Number.isFinite(price) ||
      price < 0 ||
      !Number.isInteger(stock) ||
      stock < 0
    ) {
      setMessage(
        "Revisa los datos. El precio debe ser válido y las existencias un entero igual o mayor que cero."
      );
      return;
    }

    const product = {
      ...form,
      name: form.name.trim(),
      description: form.description.trim(),
      image: form.image.trim(),
      price,
      stock,
      available: stock > 0,
    };

    if (editingId !== null) {
      updateProduct(editingId, product);
      setMessage("Producto actualizado correctamente.");
    } else {
      addProduct(product);
      setMessage("Producto agregado correctamente.");
    }

    setShowForm(false);
    setEditingId(null);
    setForm(emptyProduct);
  };

  const handleDelete = (product) => {
    const confirmed = window.confirm(
      `¿Seguro que deseas eliminar "${product.name}" del catálogo?`
    );

    if (!confirmed) return;

    deleteProduct(product.id);
    setMessage(`Se eliminó "${product.name}".`);
  };

  const menuItems = [
    { id: "dashboard", label: "Resumen", icon: LayoutDashboard },
    { id: "products", label: "Productos", icon: Package },
    { id: "orders", label: "Pedidos", icon: ShoppingCart },
  ];

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <Link to="/" className="admin-brand">
          <span className="admin-brand-icon">
            <Store size={23} />
          </span>
          <span>
            <strong>Admin Panel</strong>
            <small>Programación SC</small>
          </span>
        </Link>

        <div className="admin-menu-label">MENÚ PRINCIPAL</div>

        <nav className="admin-navigation">
          {menuItems.map(({ id, label, icon: Icon }) => (
            <button
              type="button"
              key={id}
              className={
                section === id ? "admin-nav-item active" : "admin-nav-item"
              }
              onClick={() => {
                setSection(id);
                setShowForm(false);
                setMessage("");
              }}
            >
              <Icon size={19} />
              {label}
            </button>
          ))}
        </nav>

        <Link to="/" className="admin-back-link">
          <ArrowLeft size={18} />
          Volver a la tienda
        </Link>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <div>
            <span className="admin-eyebrow">ADMINISTRACIÓN</span>
            <h1>
              {section === "dashboard" && "Resumen general"}
              {section === "products" && "Gestión de productos"}
              {section === "orders" && "Gestión de pedidos"}
            </h1>
          </div>

          <Link to="/" className="admin-store-link">
            <Store size={17} />
            Ver tienda
          </Link>
        </header>

        {message && (
          <div className="admin-message" role="status">
            {message}
          </div>
        )}

        {section === "dashboard" && (
          <>
            <div className="admin-welcome">
              <div>
                <h2>¡Bienvenido al panel!</h2>
                <p>Administra tu catálogo y revisa los pedidos de tu tienda.</p>
              </div>
              <span><LayoutDashboard size={34} /></span>
            </div>

            <div className="admin-stats-grid">
              <article className="admin-stat-card">
                <span className="admin-stat-icon blue">
                  <Package size={22} />
                </span>
                <p>Total de productos</p>
                <strong>{products.length}</strong>
                <small>Productos en el catálogo</small>
              </article>

              <article className="admin-stat-card">
                <span className="admin-stat-icon green">
                  <ShoppingCart size={22} />
                </span>
                <p>Total de pedidos</p>
                <strong>{orders.length}</strong>
                <small>Pedidos registrados en este navegador</small>
              </article>

              <article className="admin-stat-card">
                <span className="admin-stat-icon orange">
                  <Package size={22} />
                </span>
                <p>Productos agotados</p>
                <strong>{outOfStock}</strong>
                <small>Necesitan reposición</small>
              </article>

              <article className="admin-stat-card">
                <span className="admin-stat-icon purple">
                  <ShoppingCart size={22} />
                </span>
                <p>Valor de pedidos</p>
                <strong>{money(totalValue)}</strong>
                <small>No equivale necesariamente a dinero cobrado</small>
              </article>
            </div>

            <section className="admin-panel-card">
              <div className="admin-panel-heading">
                <div>
                  <h2>Pedidos recientes</h2>
                  <p>Últimas compras registradas</p>
                </div>
                <button
                  type="button"
                  className="admin-secondary-button"
                  onClick={() => setSection("orders")}
                >
                  Ver pedidos
                </button>
              </div>

              {orders.length === 0 ? (
                <div className="admin-empty">
                  <ShoppingCart size={30} />
                  <p>Todavía no hay pedidos registrados.</p>
                </div>
              ) : (
                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Pedido</th>
                        <th>Cliente</th>
                        <th>Total</th>
                        <th>Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.slice(0, 5).map((order) => (
                        <tr key={order.number}>
                          <td>{order.number}</td>
                          <td>{order.customer?.name || "Sin nombre"}</td>
                          <td>{money(order.total)}</td>
                          <td>
                            <span className={`admin-status status-${(order.status || "Pendiente").toLowerCase()}`}>
                              {order.status || "Pendiente"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </>
        )}

        {section === "products" && (
          <section className="admin-panel-card">
            <div className="admin-panel-heading admin-products-heading">
              <div>
                <h2>Catálogo</h2>
                <p>Administra nombres, precios, imágenes y existencias.</p>
              </div>

              <button
                type="button"
                className="admin-primary-button"
                onClick={openNewProduct}
              >
                <Plus size={18} />
                Nuevo producto
              </button>
            </div>

            <input
              className="admin-search"
              type="search"
              placeholder="Buscar por nombre o categoría..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            {showForm && (
              <form className="admin-product-form" onSubmit={handleProductSubmit}>
                <h3>{editingId !== null ? "Editar producto" : "Nuevo producto"}</h3>

                <div className="admin-form-grid">
                  <label>
                    Nombre del producto
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      maxLength={120}
                      required
                    />
                  </label>

                  <label>
                    Categoría
                    <input
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      maxLength={80}
                      required
                    />
                  </label>

                  <label>
                    Precio (Q)
                    <input
                      name="price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={form.price}
                      onChange={handleChange}
                      required
                    />
                  </label>

                  <label>
                    Existencias
                    <input
                      name="stock"
                      type="number"
                      min="0"
                      step="1"
                      value={form.stock}
                      onChange={handleChange}
                      required
                    />
                  </label>

                  <label className="admin-full-field">
                    URL de la imagen
                    <input
                      name="image"
                      type="text"
                      placeholder="/src/assets/images/Products/Product_1.jpg"
                      value={form.image}
                      onChange={handleChange}
                      required
                    />
                  </label>

                  <label className="admin-full-field">
                    Descripción
                    <textarea
                      name="description"
                      rows={3}
                      value={form.description}
                      onChange={handleChange}
                      maxLength={1000}
                      required
                    />
                  </label>
                </div>

                {form.image && (
                  <div className="admin-image-preview">
                    <span>Vista previa</span>
                    <img src={form.image} alt="Vista previa del producto" />
                  </div>
                )}

                <div className="admin-form-actions">
                  <button type="submit" className="admin-primary-button">
                    {editingId !== null ? "Guardar cambios" : "Crear producto"}
                  </button>
                  <button
                    type="button"
                    className="admin-secondary-button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingId(null);
                      setForm(emptyProduct);
                    }}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            )}

            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id}>
                      <td>
                        <div className="admin-product-cell">
                          <img src={product.image} alt="" />
                          <strong>{product.name}</strong>
                        </div>
                      </td>
                      <td>{product.category}</td>
                      <td>{money(product.price)}</td>
                      <td>{product.stock}</td>
                      <td>
                        <span className={`admin-status ${Number(product.stock) > 0 ? "status-entregado" : "status-cancelado"}`}>
                          {Number(product.stock) > 0 ? "Disponible" : "Agotado"}
                        </span>
                      </td>
                      <td>
                        <div className="admin-action-buttons">
                          <button
                            type="button"
                            className="admin-icon-button"
                            title="Editar"
                            aria-label={`Editar ${product.name}`}
                            onClick={() => openEditProduct(product)}
                          >
                            <Pencil size={17} />
                          </button>
                          <button
                            type="button"
                            className="admin-icon-button danger"
                            title="Eliminar"
                            aria-label={`Eliminar ${product.name}`}
                            onClick={() => handleDelete(product)}
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredProducts.length === 0 && (
              <div className="admin-empty">
                <Package size={30} />
                <p>No se encontraron productos.</p>
              </div>
            )}
          </section>
        )}

        {section === "orders" && (
          <section className="admin-panel-card">
            <div className="admin-panel-heading">
              <div>
                <h2>Todos los pedidos</h2>
                <p>Consulta los detalles y actualiza el estado de cada pedido.</p>
              </div>
            </div>

            {orders.length === 0 ? (
              <div className="admin-empty">
                <ShoppingCart size={30} />
                <p>No hay pedidos todavía. Los pedidos confirmados aparecerán aquí.</p>
              </div>
            ) : (
              <div className="admin-orders-list">
                {orders.map((order) => (
                  <article className="admin-order-card" key={order.number}>
                    <div className="admin-order-heading">
                      <div>
                        <span className="admin-order-number">{order.number}</span>
                        <h3>{order.customer?.name || "Cliente"}</h3>
                        <p>{order.customer?.email}</p>
                        <p>{order.customer?.phone}</p>
                        <p>{order.customer?.address}</p>
                      </div>
                      <strong className="admin-order-total">{money(order.total)}</strong>
                    </div>

                    <div className="admin-order-items">
                      {(order.items || []).map((item, index) => (
                        <div key={`${order.number}-${item.id}-${index}`}>
                          <span>{item.name} × {item.quantity}</span>
                          <strong>{money(Number(item.price) * item.quantity)}</strong>
                        </div>
                      ))}
                    </div>

                    <div className="admin-order-footer">
                      <span>
                        Pago: {order.customer?.payment === "cash"
                          ? "Efectivo contra entrega"
                          : "Tarjeta (no integrada)"}
                      </span>

                      <label>
                        Estado
                        <select
                          value={order.status || "Pendiente"}
                          onChange={(event) =>
                            updateOrderStatus(order.number, event.target.value)
                          }
                        >
                          <option value="Pendiente">Pendiente</option>
                          <option value="Procesando">Procesando</option>
                          <option value="Enviado">Enviado</option>
                          <option value="Entregado">Entregado</option>
                          <option value="Cancelado">Cancelado</option>
                        </select>
                      </label>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}

        <footer className="admin-footer">
          Panel administrativo de demostración · Datos guardados en este navegador
        </footer>
      </main>
    </div>
  );
}

export default Admin;