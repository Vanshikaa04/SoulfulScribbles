import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_PROD_API_URL || "http://localhost:5000/api",
  withCredentials: true,
});
console.log(import.meta.env.VITE_PROD_API_URL);

export default api;