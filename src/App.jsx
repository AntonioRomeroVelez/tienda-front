import { useState, useEffect } from "react";
import { getProducts } from "./api/productAPI";
import ProductList from "./components/ProductList";

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
      <ProductList products={products} />
    </div>
  );
}

export default App;
