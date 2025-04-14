import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios"; // o usa fetch
import "./ProductoDetail.css";

const ProductDetail = () => {
  const { id } = useParams(); // Obtiene el ID de la URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/products/${id}`
        );
        setProduct(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]); // Se ejecuta cuando cambia el ID

  if (loading) return <div>Cargando producto...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Producto no encontrado</div>;

  return (
    <div className="product-detail-container">
      <div className="product-header">
        <h1 className="product-title">{product.nombre}</h1>
        <div className="product-subtitle">
          <span className="laboratorio">{product.laboratorio}</span>
          <span className="separator">•</span>
          <span className="marca">{product.marca}</span>
        </div>
      </div>

      <div className="product-content">
        <div className="product-info-section">
          <div className="info-card">
            <h2 className="section-title">Descripción</h2>
            <div className="info-row">
              <span className="info-label">Nombre genérico:</span>
              <span className="info-value">{product.nombreGenerico}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Presentación:</span>
              <span className="info-value">{product.presentacion}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Bonificación:</span>
              <span className="info-value highlight">
                {product.bonificacion}
              </span>
            </div>
          </div>
        </div>

        <div className="product-pricing-section">
          <div className="price-card">
            <h2 className="section-title">Precios</h2>
            <div className="price-row">
              <span className="price-label">Precio farmacia:</span>
              <span className="price-value">
                ${product.precioFarmacia.toFixed(2)}
              </span>
            </div>
            <div className="price-row">
              <span className="price-label">PVP:</span>
              <span className="price-value main-price">
                ${product.pvp.toFixed(2)}
              </span>
            </div>
            <div className="price-row">
              <span className="price-label">Descuento:</span>
              <span className="price-value discount">{product.descuento}%</span>
            </div>
            <div className="price-row">
              <span className="price-label">IVA:</span>
              <span
                className={`price-value ${
                  product.iva ? "iva-included" : "iva-excluded"
                }`}
              >
                {product.iva ? "Incluido" : "No incluido"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <Link to={"/"} className="btn btn-danger">
        Regresar
      </Link>
    </div>
  );
};

export default ProductDetail;
