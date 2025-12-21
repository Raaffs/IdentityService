// src/api/axios.ts
import axios from "axios";

// Dynamically set API base URL depending on environment
const apiBaseURL = import.meta.env.VITE_API_BASE_URL || 
                   (window.location.hostname === "localhost" ? 
                    "http://localhost:8080/api" : "http://api:8080/api");

                    console.log("API Basefff URL:", apiBaseURL,"meta;", import.meta.env.VITE_API_BASE_URL);
const api = axios.create({
  baseURL: apiBaseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// JWT auto-attach auth header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
