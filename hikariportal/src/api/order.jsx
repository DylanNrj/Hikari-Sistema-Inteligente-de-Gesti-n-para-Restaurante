import axios from 'axios';

const API_URL = 'http://localhost:5095/api/Order';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token'); 
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getOrders = () => axios.get(API_URL, getAuthHeaders());
export const createOrder = (order) => axios.post(API_URL, order, getAuthHeaders());
export const getOrderById = (id) => axios.get(`${API_URL}/${id}`, getAuthHeaders());
export const updateOrder = (id, order) => axios.put(`${API_URL}/${id}`, order, getAuthHeaders());
export const partialUpdateOrder = (id, order) => axios.patch(`${API_URL}/${id}`, order, getAuthHeaders());
export const deleteOrder = (id) => axios.delete(`${API_URL}/${id}`, getAuthHeaders());