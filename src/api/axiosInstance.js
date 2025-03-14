import axios from 'axios';


const api = axios.create({
    baseURL: process.env.URL || 'http://localhost:8080/', // Your backend URL
});

// Automatically set Authorization header if token exists
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
