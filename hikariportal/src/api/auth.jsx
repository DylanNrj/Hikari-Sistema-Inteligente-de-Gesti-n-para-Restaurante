import axios from 'axios';

const API_URL = 'http://localhost:5095/api/Auth';

export const register = (credentials) => axios.post(`${API_URL}/register`, credentials);
export const login = (credentials) => axios.post(`${API_URL}/login`, credentials);