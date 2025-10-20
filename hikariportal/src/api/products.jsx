import axios from 'axios';

const API_URL = 'http://localhost:5095/api/Products';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token'); 
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getProducts = () => axios.get(API_URL, getAuthHeaders());
export const createProduct = (product) => axios.post(API_URL, product, getAuthHeaders());
export const getProductById = (id) => axios.get(`${API_URL}/${id}`, getAuthHeaders());
export const updateProduct = (id, product) => axios.put(`${API_URL}/${id}`, product, getAuthHeaders());
export const deleteProduct = (id) => axios.delete(`${API_URL}/${id}`, getAuthHeaders());