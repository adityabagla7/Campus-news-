
import axios from "axios";

const backendURL = "http://localhost:5000/api/";

export const makeRequest = axios.create({
  baseURL: backendURL,
  withCredentials: true,
});

// Add a response interceptor to handle errors
makeRequest.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);