import axios from 'axios';


const backendUrl = import.meta.env.VITE_PROD_API_URL 
const api = axios.create({
  baseURL: backendUrl,
  withCredentials: true,
});

// console.log("API base URL:", backendUrl);

export default api;