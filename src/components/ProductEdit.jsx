import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateProduct } from "../api/productAPI"; // Importa tus funciones API

const EditProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    nombre: "",
    marca: "",
    presentacion: "",
    nombreGenerico: "",
    precioFarmacia: 0,
    pvp: 0,
    iva: false,
    bonificacion: "",
    laboratorio: "",
    descuento: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar los datos del producto al montar el componente
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await updateProduct(id);
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProduct(id, product);
      navigate(`/products/${id}`, {
        state: { message: "Producto actualizado con éxito" },
      });
    } catch (err) {
      setError(
        err.response?.data?.message || "Error al actualizar el producto"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading && !product.nombre) return <div>Cargando...</div>;

  return (
    <div className="edit-product-container">
      <h2>Editar Producto</h2>
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={product.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Marca:</label>
          <input
            type="text"
            name="marca"
            value={product.marca}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Presentación:</label>
          <input
            type="text"
            name="presentacion"
            value={product.presentacion}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Bonificación:</label>
          <input
            type="text"
            name="bonificacion"
            value={product.bonificacion}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Descuento:</label>
          <input
            type="text"
            name="descuento"
            value={product.descuento}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Precio Farmacia:</label>
            <input
              type="number"
              name="precioFarmacia"
              value={product.precioFarmacia}
              onChange={handleChange}
              step="0.01"
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label>PVP:</label>
            <input
              type="number"
              name="pvp"
              value={product.pvp}
              onChange={handleChange}
              step="0.01"
              min="0"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="iva"
              checked={product.iva}
              onChange={handleChange}
            />
            Incluye IVA
          </label>
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate(-1)}>
            Cancelar
          </button>
          <button type="submit" disabled={loading}>
            {loading ? "Guardando..." : "Guardar Cambios"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProductForm;
