import { useState, useEffect } from "react";
import { getProducts } from "./api/productAPI";
import ProductList from "./components/ProductList";

function App() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  // Filtrar productos por el término de búsqueda
  const filteredProducts = products.filter((product) =>
    product.nombre?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <input
        type="text"
        placeholder="Buscar productos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: "10px",
          marginBottom: "20px",
          width: "100%",
          fontSize: "16px",
        }}
      />

      {searchTerm === "" ? (
        <ProductList products={products} />
      ) : (
        <ProductList products={filteredProducts} />
      )}
    </div>
  );
}

export default App;
