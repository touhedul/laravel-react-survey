import axios from 'axios';

const axiosClient = axios.create({
   baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
})

axiosClient.interceptors.request.use((config) => {
   const token = localStorage.getItem('token');
   config.headers.Authorization = `Bearer ${token}`
   return config;
})

axiosClient.interceptors.response.use((response) => {
   return response;
}, error => {
   throw error;
});

export default axiosClient;
