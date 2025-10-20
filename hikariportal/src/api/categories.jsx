import axios from 'axios';

const API_URL = 'http://localhost:5095/api/Categories';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token'); 
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getCategories = () => axios.get(API_URL, getAuthHeaders());
export const createCategory = (category) => axios.post(API_URL, category, getAuthHeaders());
export const getCategoryById = (id) => axios.get(`${API_URL}/${id}`, getAuthHeaders());
export const updateCategory = (id, category) => axios.put(`${API_URL}/${id}`, category, getAuthHeaders());
export const deleteCategory = (id) => axios.delete(`${API_URL}/${id}`, getAuthHeaders());