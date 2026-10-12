
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { CartProvider } from "./context/CartContext";
import { StoreProvider } from "./context/StoreContext";

import Cart from "./components/Cart";
import Hero from "./components/Hero";
import Products from "./components/Products";
import Features from "./components/Features";
import Testimonials from "./components/Testimonials";
import CTA from "./components/CTA";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Checkout from "./pages/Checkout";
import UsersPage from "./pages/UsersPage";
import UserProfile from "./pages/UserProfile";
import ContactPage from "./pages/ContactPage";
import ProductDetail from "./pages/ProductDetail";
import ProductsPage from "./pages/ProductsPage";
import Admin from "./pages/Admin";

function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Products />
        <Features />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <StoreProvider>
        <CartProvider>
          <Cart />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<ProductsPage />} />
            <Route path="/productos/:id" element={<ProductDetail />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/InicioSesion" element={<UsersPage />} />
            <Route path="/perfil" element={<UserProfile />} />
            <Route path="/contacto" element={<ContactPage />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </CartProvider>
      </StoreProvider>
    </BrowserRouter>
  );
}

export default App;