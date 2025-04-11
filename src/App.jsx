import { useState, useEffect } from "react";
import { getProducts } from "./api/productAPI";
import ProductList from "./components/ProductList";

import NavbarProductos from "./components/NavbarProductos";

function App() {
  const [products, setProducts] = useState([]);

  // Cargar productos al iniciar
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    }
  };

  return (
    <div className="container">
      <NavbarProductos />
      <h1>Lista de Productos</h1>

      <ProductList products={products} />
    </div>
  );
}

export default App;
