import ProductCard from "./ProductCard";
import "../App.css";

export default function ProductList({ products }) {
  return (
    <div className="products-grid">
      {products.length === 0 ? (
        <p>No hay productos disponibles</p>
      ) : (
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      )}
    </div>
  );
}

{
  /* <table>
  <thead>
    <tr>
      <th>id</th>
      <th>nombre</th>
      <th>marca</th>
      <th>presentacion</th>
      <th>nombreGenerico</th>
      <th>precioFarmacia</th>
      <th>pvp</th>
      <th>iva</th>
      <th>laboratorio</th>
    </tr>
  </thead>
  <tbody>
    {products.map((product) => (
      <tr key={product.id}>
        <td>{product.id}</td>
        <td>{product.nombre}</td>
        <td>{product.marca}</td>
        <td>{product.presentacion}</td>
        <td>{product.nombreGenerico}</td>
        <td>{product.precioFarmacia}</td>
        <td>{product.pvp}</td>
        <td>{product.iva}</td>
        <td>{product.laboratorio}</td>
      </tr>
    ))}
  </tbody>
</table>; */
}
