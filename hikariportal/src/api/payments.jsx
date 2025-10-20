import axios from 'axios';

const API_URL = 'http://localhost:5095/api/Payments';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getPayments = () => axios.get(API_URL, getAuthHeaders());
export const createPayment = (payment) => axios.post(API_URL, payment, getAuthHeaders());
export const getPaymentById = (id) => axios.get(`${API_URL}/${id}`, getAuthHeaders());
export const updatePayment = (id, payment) => axios.put(`${API_URL}/${id}`, payment, getAuthHeaders());
export const deletePayment = (id) => axios.delete(`${API_URL}/${id}`, getAuthHeaders());