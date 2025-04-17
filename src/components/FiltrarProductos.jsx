import React, { useState } from "react";

function FiltrarProductos() {
  const [texto, setTexto] = useState("");
  const buscar = (e) => {
    const valoringresado = e.target.value;
    console.log(e.target.value);
    setTexto(valoringresado);
  };
  return (
    <div>
      <input onChange={buscar} value={texto} />
    </div>
  );
}

export default FiltrarProductos;
