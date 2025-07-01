import axios from "axios";
const baseURL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true, // Ensures cookies are sent
});

let isRefreshing = false;
let failedRequestsQueue = [];


export default axiosInstance;