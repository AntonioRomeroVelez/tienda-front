import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import "./index.css";
import App from "./App.jsx";
import NavbarProductos from "./components/NavbarProductos.jsx";
import ProductDetail from "./components/ProductDetail.jsx";
import ProductEdit from "./components/ProductEdit.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <NavbarProductos />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/productForm" element={<ProductForm />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/products/edit/:id" element={<ProductEdit />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
