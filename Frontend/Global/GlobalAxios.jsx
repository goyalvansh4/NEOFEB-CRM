import axios from "axios";
import Cookies from "js-cookie";

// Base URL setup for ngrok backend
const apiUrl = "http://35.223.220.77/api/v1";


const GlobalAxios = axios.create({
  baseURL: apiUrl,
  headers: {
    Accept: "application/json", // Ensuring JSON content type
    "Content-Type": "application/json",
  },
});

// Adding a request interceptor to dynamically attach the token
GlobalAxios.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token"); // Dynamically fetch token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request error: ", error);
    return Promise.reject(error);
  }
);

// Adding a response interceptor to handle responses and errors
GlobalAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Debugging error response
      console.error("Response error: ", error.response.data);
    } else {
      console.error("Request failed: ", error.message);
    }
    return Promise.reject(error);
  }
);

export default GlobalAxios;
