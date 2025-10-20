import axios from 'axios';

const API_URL = 'http://localhost:5095/api/Table';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token'); 
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getTables = () => axios.get(API_URL, getAuthHeaders());
export const createTable = (table) => axios.post(API_URL, table, getAuthHeaders());
export const getTableById = (id) => axios.get(`${API_URL}/${id}`, getAuthHeaders());
export const updateTable = (id, table) => axios.put(`${API_URL}/${id}`, table, getAuthHeaders());
export const partialUpdateTable = (id, table) => axios.patch(`${API_URL}/${id}`, table, getAuthHeaders());
export const deleteTable = (id) => axios.delete(`${API_URL}/${id}`, getAuthHeaders());