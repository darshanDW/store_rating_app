import axios from "axios";

const API_URL = "http://localhost:3001/api";

export const getToken = () => localStorage.getItem("token");

export const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});