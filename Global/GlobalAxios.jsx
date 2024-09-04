import axios from "axios";

// Base URL setup
const apiUrl = "http://127.0.0.1:8000/api/v1/admin";

const GlobalAxios = axios.create({
  baseURL: apiUrl,
  headers: {
    Accept: "application/json",
  },
});

export default GlobalAxios;