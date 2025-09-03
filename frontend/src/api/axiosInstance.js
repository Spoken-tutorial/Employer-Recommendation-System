import axios from "axios";

// Create axios instance
const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// remove all auth headers
axiosInstance.interceptors.request.use(
  (config) => {
    // ensuring no authorization header is sent - TEMP
    if (config.headers) {
      delete config.headers["Authorization"];
      delete config.headers.authorization;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default axiosInstance;
