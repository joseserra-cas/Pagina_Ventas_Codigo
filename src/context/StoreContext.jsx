
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import initialProducts from "../data/products";

const StoreContext = createContext(null);

const PRODUCTS_KEY = "programacion_sc_products";
const ORDERS_KEY = "programacion_sc_orders";

function loadData(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }) {
  const [products, setProducts] = useState(() =>
    loadData(PRODUCTS_KEY, initialProducts)
  );

  const [orders, setOrders] = useState(() =>
    loadData(ORDERS_KEY, [])
  );

  useEffect(() => {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }, [orders]);

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Math.max(0, ...products.map((item) => Number(item.id) || 0)) + 1,
      price: Number(product.price),
      stock: Number(product.stock),
      available: Number(product.stock) > 0,
    };

    setProducts((current) => [...current, newProduct]);
  };

  const updateProduct = (id, changes) => {
    setProducts((current) =>
      current.map((product) =>
        product.id === id
          ? {
              ...product,
              ...changes,
              price: Number(changes.price),
              stock: Number(changes.stock),
              available: Number(changes.stock) > 0,
            }
          : product
      )
    );
  };

  const deleteProduct = (id) => {
    setProducts((current) =>
      current.filter((product) => product.id !== id)
    );
  };

  const addOrder = (order) => {
    setOrders((current) => [
      {
        ...order,
        status: "Pendiente",
        createdAt: new Date().toISOString(),
      },
      ...current,
    ]);
  };

  const updateOrderStatus = (orderNumber, status) => {
    setOrders((current) =>
      current.map((order) =>
        order.number === orderNumber
          ? { ...order, status }
          : order
      )
    );
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        orders,
        addProduct,
        updateProduct,
        deleteProduct,
        addOrder,
        updateOrderStatus,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error("useStore debe utilizarse dentro de StoreProvider");
  }

  return context;
}