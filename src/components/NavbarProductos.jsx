import React from "react";
import { Link } from "react-router-dom";

function NavbarProductos() {
  return (
    <nav>
      <Link to="/">Inicio</Link>
      <Link to="/productForm">Crear Producto</Link>
    </nav>
  );
}

export default NavbarProductos;
