import React from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="card-header">
        <h3 className="product-name">{product.nombre}</h3>
        <span className="product-brand">{product.marca}</span>
      </div>

      <div className="card-body">
        <div className="product-info">
          <p>
            <strong>Presentación:</strong> {product.presentacion}
          </p>
          <p>
            <strong>Genérico:</strong> {product.nombreGenerico || "N/A"}
          </p>
          <p>
            <strong>Laboratorio:</strong> {product.laboratorio}
          </p>
        </div>

        <div className="product-pricing">
          <div className="price-row">
            <span>Precio Farmacia:</span>
            <span className="price">${product.precioFarmacia.toFixed(2)}</span>
          </div>
          <div className="price-row highlight">
            <span>PVP:</span>
            <span className="price">${product.pvp.toFixed(2)}</span>
          </div>
          {product.descuento > 0 && (
            <div className="discount-badge">{product.descuento}% OFF</div>
          )}
        </div>
      </div>

      <div className="card-footer">
        <span className={`iva-tag ${product.iva ? "with-iva" : "without-iva"}`}>
          {product.iva ? "CON IVA" : "SIN IVA"}
        </span>

        <div className="action-buttons">
          <Link to={`/products/${product.id}`} className="btn view-btn">
            Ver Producto
          </Link>
          <Link to={`/products/edit/${product.id}`} className="btn edit-btn">
            Editar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
