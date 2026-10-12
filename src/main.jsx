import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "./styles/global.css";
import "./styles/navbar.css";
import "./styles/hero.css";
import "./styles/products.css";
import "./styles/features.css";
import "./styles/testimonials.css";
import "./styles/cta.css";
import "./styles/footer.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);