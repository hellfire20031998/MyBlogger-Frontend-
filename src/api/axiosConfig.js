import axios from 'axios';

const API = axios.create({
    baseURL: process.env.URL || 'http://localhost:8080/',
});

// Add token to headers for every request if it exists
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default API;
