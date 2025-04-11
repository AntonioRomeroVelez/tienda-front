import axios from 'axios';

// Configuración base de Axios
const api = axios.create({
   baseURL: 'http://localhost:8000/api',
   headers: {
      'Content-Type': 'application/json',
   },
});

// Interceptor para manejar errores globalmente
api.interceptors.response.use(
   (response) => response,
   (error) => {
      console.error('Error en la petición:', error.response?.data || error.message);
      return Promise.reject(error);
   }
);

// Operaciones CRUD
export const getProducts = async () => {
   const res = await api.get('/products');
   return res.data;
};

export const createProduct = async (productData) => {
   const res = await api.post('/products', productData);
   return res.data;
};

export const updateProduct = async (id, productData) => {
   const res = await api.put(`/products/${id}`, productData);
   return res.data;
};

export const deleteProduct = async (id) => {
   const res = await api.delete(`/products/${id}`);
   return res.data;
};