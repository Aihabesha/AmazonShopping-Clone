import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://127.0.0.1:5001/clone-dab8c/us-central1/api",
  baseURL: "https://amazonapi-n5o7.onrender.com",
});

export { axiosInstance };
