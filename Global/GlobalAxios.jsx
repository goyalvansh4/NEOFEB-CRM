import axios from "axios";

// Base URL setup
const apiUrl = "http://192.168.43.152:8000/api/v1/admin";

const GlobalAxios = axios.create({
  baseURL: apiUrl,
  headers: {
    Accept: "application/json",
  },
});

export default GlobalAxios;