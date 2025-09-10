import axios from "axios";

// Create axios instance for manager pages (no authorization header)
const axiosManager = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// remove all auth headers for manager
axiosManager.interceptors.request.use(
  (config) => {
    if (config.headers) {
      delete config.headers["Authorization"];
      delete config.headers.authorization;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosManager.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default axiosManager;
