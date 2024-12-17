import axios from "axios";
import Cookies from "js-cookie";
// Base URL setup
// const apiUrl = "https://neofeb-crm.onrender.com/api/v1";
const apiUrl = "http://13.233.116.2:3000/api/v1";

const GlobalAxios = axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: `Bearer ${Cookies.get("token")}`, 
    Accept: "application/json",
    "Content-Type": "application/json", // Ensuring JSON content type
  },
});

// Adding a request interceptor to log errors or track requests
GlobalAxios.interceptors.request.use(
  (config) => {
    // You can log or modify request before it is sent
    //console.log("Request made with: ", config);
    return config;
  },
  (error) => {
    // Handle request error
    //console.error("Request error: ", error);
    return Promise.reject(error);
  }
);

// Adding a response interceptor to handle errors
GlobalAxios.interceptors.response.use(
  (response) => {
    // Log successful responses
    //console.log("Response received: ", response);
    return response;
  },
  (error) => {
    // Handle response error
    //console.error("Response error: ", error.response || error.message);
    return Promise.reject(error);
  }
);

export default GlobalAxios;
