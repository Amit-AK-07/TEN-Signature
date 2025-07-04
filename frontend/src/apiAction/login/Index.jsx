import axios from "axios";
import { BASE_URL } from "../../lib/config";

const BASE_URLS = BASE_URL;
console.log("BASE_URLS", BASE_URLS);
export const signIn = async (phone) => {
  const res = await axios.post(`${BASE_URLS}/auth/login`, { phone });
  console.log("res", res);
  return res.data;
};

export const signUp = async (userData) => {
  const res = await axios.post(`${BASE_URLS}/auth/register`, userData);
  console.log("res", res);
  return res.data;
};
