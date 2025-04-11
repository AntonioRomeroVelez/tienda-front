import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../api/productAPI"; // Ajusta la ruta según donde tengas tu archivo API
import "./CreateProduct.css";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    marca: "",
    presentacion: "",
    nombreGenerico: "",
    precioFarmacia: "",
    pvp: "",
    iva: true,
    bonificacion: "",
    laboratorio: "",
    descuento: 0,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es requerido";
    if (!formData.marca.trim()) newErrors.marca = "La marca es requerida";
    if (!formData.presentacion.trim())
      newErrors.presentacion = "La presentación es requerida";
    if (isNaN(formData.precioFarmacia) || formData.precioFarmacia <= 0)
      newErrors.precioFarmacia = "Precio inválido";
    if (isNaN(formData.pvp) || formData.pvp <= 0)
      newErrors.pvp = "PVP inválido";
    if (
      isNaN(formData.descuento) ||
      formData.descuento < 0 ||
      formData.descuento > 100
    )
      newErrors.descuento = "Descuento debe ser entre 0 y 100";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Prepara los datos con los tipos correctos
      const productToCreate = {
        ...formData,
        precioFarmacia: parseFloat(formData.precioFarmacia),
        pvp: parseFloat(formData.pvp),
        descuento: parseInt(formData.descuento),
        iva: Boolean(formData.iva), // Asegurar que es booleano
      };

      // Usa tu función createProduct
      const response = await createProduct(productToCreate);

      // Verifica si la respuesta es exitosa (depende de cómo esté configurada tu API)
      if (response) {
        // O response.success, response.status === 200, etc. según tu API
        // Redirigir después de crear exitosamente
        navigate("/");
      } else {
        throw new Error("Error al crear el producto");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(error.message || "Ocurrió un error al crear el producto");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-product-container">
      <h2>Crear Nuevo Producto</h2>

      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label>Nombre Comercial*</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className={errors.nombre ? "error" : ""}
          />
          {errors.nombre && (
            <span className="error-message">{errors.nombre}</span>
          )}
        </div>

        <div className="form-group">
          <label>Marca*</label>
          <input
            type="text"
            name="marca"
            value={formData.marca}
            onChange={handleChange}
            className={errors.marca ? "error" : ""}
          />
          {errors.marca && (
            <span className="error-message">{errors.marca}</span>
          )}
        </div>

        <div className="form-group">
          <label>Presentación*</label>
          <input
            type="text"
            name="presentacion"
            value={formData.presentacion}
            onChange={handleChange}
            className={errors.presentacion ? "error" : ""}
          />
          {errors.presentacion && (
            <span className="error-message">{errors.presentacion}</span>
          )}
        </div>

        <div className="form-group">
          <label>Nombre Genérico</label>
          <input
            type="text"
            name="nombreGenerico"
            value={formData.nombreGenerico}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Precio Farmacia*</label>
            <input
              type="number"
              name="precioFarmacia"
              value={formData.precioFarmacia}
              onChange={handleChange}
              step="0.01"
              min="0"
              className={errors.precioFarmacia ? "error" : ""}
            />
            {errors.precioFarmacia && (
              <span className="error-message">{errors.precioFarmacia}</span>
            )}
          </div>

          <div className="form-group">
            <label>PVP*</label>
            <input
              type="number"
              name="pvp"
              value={formData.pvp}
              onChange={handleChange}
              step="0.01"
              min="0"
              className={errors.pvp ? "error" : ""}
            />
            {errors.pvp && <span className="error-message">{errors.pvp}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="iva"
                checked={formData.iva}
                onChange={handleChange}
              />
              Incluye IVA
            </label>
          </div>

          <div className="form-group">
            <label>Descuento (%)</label>
            <input
              type="number"
              name="descuento"
              value={formData.descuento}
              onChange={handleChange}
              min="0"
              max="100"
              className={errors.descuento ? "error" : ""}
            />
            {errors.descuento && (
              <span className="error-message">{errors.descuento}</span>
            )}
          </div>
        </div>

        <div className="form-group">
          <label>Bonificación</label>
          <input
            type="text"
            name="bonificacion"
            value={formData.bonificacion}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Laboratorio</label>
          <input
            type="text"
            name="laboratorio"
            value={formData.laboratorio}
            onChange={handleChange}
          />
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="cancel-btn"
          >
            Cancelar
          </button>
          <button type="submit" disabled={isSubmitting} className="submit-btn">
            {isSubmitting ? "Guardando..." : "Guardar Producto"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
