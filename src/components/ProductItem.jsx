import { Link } from "react-router-dom";

export const ProductItem = ({ product }) => {
  return (
    <div className="product-item">
      <Link to={`/products/${product.id}`}>
        <h2>{product.nombre}</h2>
      </Link>
      <p>Precio: ${product.precioFarmacia}</p>
    </div>
  );
};
