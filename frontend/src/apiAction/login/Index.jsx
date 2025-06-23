import axios from "axios";
import { BASE_URL } from "../../lib/config";

const BASE_URLS = BASE_URL;

export const signIn = async (email) => {
  const res = await axios.post(`${BASE_URLS}/api/login/`, { email });
  return {
    user: {
      username: res.data.user.username,
      first_name: res.data.user.first_name,
      last_name: res.data.user.last_name,
      email: res.data.user.email,
    },
    token: res.data.access,
    refreshToken: res.data.refresh,
  };
};

export const signUp = async (userData) => {
  const res = await axios.post(`${BASE_URLS}/api/register/`, userData);
  return res.data;
};

export const sendOtp = async (email) => {
  const res = await axios.post(`${BASE_URLS}/api/send-otp/`, { email });
  return res.data;
};

export const verifyOtp = async ({ email, otp }) => {
  const res = await axios.post(`${BASE_URLS}/api/verify-otp/`, { email, otp });
  localStorage.setItem("authToken", res.data.access);
  return res.data; // includes user, access, refresh
};

