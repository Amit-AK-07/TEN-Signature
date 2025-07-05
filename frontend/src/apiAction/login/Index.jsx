import axios from "axios";
import api from "../../lib/axios";
import { BASE_URL } from "../../lib/config";

const BASE_URLS = BASE_URL;
console.log("BASE_URLS", BASE_URLS);

// Register user (only creates account, no tokens)
export const signUp = async (userData) => {
  const res = await axios.post(`${BASE_URLS}/register/`, userData);
  console.log("signUp res", res);
  return res.data;
};

// Send OTP to email for login
export const sendOTP = async (email) => {
  const res = await axios.post(`${BASE_URLS}/send-otp/`, { email });
  console.log("sendOTP res", res);
  return res.data;
};

// Verify OTP and get tokens
export const verifyOTP = async (otpData) => {
  const res = await axios.post(`${BASE_URLS}/verify-otp/`, otpData);
  console.log("verifyOTP res", res);
  return res.data;
};

// Logout user
export const logout = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  const accessToken = localStorage.getItem('authToken');

  if (!refreshToken || !accessToken) {
    throw new Error('No tokens found');
  }

  const res = await axios.post(
    `${BASE_URLS}/logout/`,
    { refresh: refreshToken },
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    }
  );
  
  console.log("logout res", res);
  
  // Clear tokens from localStorage
  localStorage.removeItem('authToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');

  return res.data;
};

// Complete logout with Redux and redirect
export const performLogout = async (dispatch) => {
  try {
    // Call the API logout endpoint
    await logout();
  } catch (error) {
    console.error('Logout API error:', error);
    // Continue with local logout even if API fails
  } finally {
    // Clear Redux state
    const { logout: logoutRedux } = await import('../../redux/authSlice');
    dispatch(logoutRedux());
    
    // Clear all localStorage auth data
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('first_name');
    localStorage.removeItem('last_name');
    localStorage.removeItem('username');
    localStorage.removeItem('persist:root');
    
    // Redirect to home page
    window.location.href = '/';
  }
};

// Check authentication status
export const checkAuthStatus = async () => {
  const accessToken = localStorage.getItem('authToken');

  if (!accessToken) {
    throw new Error('No access token found');
  }

  const res = await api.get(`/auth-status/`);
  console.log("checkAuthStatus res", res);
  return res.data;
};