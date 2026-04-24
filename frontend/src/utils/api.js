// Axios API instance — central config for all HTTP calls
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE,
  timeout: 30000,
  headers: { "Content-Type": "application/json" },
});

// Request interceptor — attach JWT token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("krishiai_token");
    // Don't send demo tokens to backend — they're not valid JWTs
    if (token && !token.startsWith("demo-token-")) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — handle 401 globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const token = localStorage.getItem("krishiai_token");
      // Only auto-logout for real (non-demo) tokens getting 401
      if (token && !token.startsWith("demo-token-")) {
        localStorage.removeItem("krishiai_token");
        localStorage.removeItem("krishiai_user");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
