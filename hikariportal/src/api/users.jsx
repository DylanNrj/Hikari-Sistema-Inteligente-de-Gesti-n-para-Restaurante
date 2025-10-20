import axiosInstance from './axiosConfig';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token'); 
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getUsers = () => axiosInstance.get('/Users', getAuthHeaders());
export const getUserById = (id) => axiosInstance.get(`/Users/${id}`, getAuthHeaders());
export const updateUser = (id, user) => axiosInstance.put(`/Users/${id}`, user, getAuthHeaders());
export const deleteUser = (id) => axiosInstance.delete(`/Users/${id}`, getAuthHeaders());
export const changePassword = (id, passwordData) => axiosInstance.put(`/Users/${id}/change-password`, passwordData, getAuthHeaders());