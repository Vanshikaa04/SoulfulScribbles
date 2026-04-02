import axios from 'axios';

const api = axios.create({
  baseURL: 'https://soulful-scribbles-backend.vercel.app/api',
  withCredentials: true,
});

export default api;