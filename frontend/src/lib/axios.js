import axios from 'axios';
import { BASE_URL } from './config';
import { store } from '../redux/store';
import { logout } from '../redux/authSlice';

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
});

// Request interceptor - add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle token expiry
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // If token expired (401) - immediate logout
    if (error.response?.status === 401) {
      console.log('Token expired, logging out...');
      
      // Clear all auth data
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('first_name');
      localStorage.removeItem('last_name');
      localStorage.removeItem('username');
      localStorage.removeItem('persist:root');
      
      // Clear Redux state
      store.dispatch(logout());
      
      // Redirect to home
      window.location.href = '/';
    }

    return Promise.reject(error);
  }
);

export default api;
