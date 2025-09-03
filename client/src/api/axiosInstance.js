import axios from 'axios';
const baseURL = import.meta.env.VITE_API_URL;
import { API } from '../config/api';
import store from '../app/store';
import { logout, setAuthState } from '../features/auth/authSlice';
const axiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

let isRefreshing = false;
let failedRequestsQueue = [];

axiosInstance.interceptors.response.use(
  response => response, // pass through if success
  async error => {
    const originalRequest = error.config;

    // If 401 and request not already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axiosInstance.post(API.AUTH.REFRESH);
        console.log('axios is making an auth/refresh call to the server');
        const newAccessToken = res.data.accessToken;

        // Update Redux/memory with new token
        store.dispatch(setAuthState({ token: newAccessToken }));

        // Update header and retry original request
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Refresh also failed → logout user
        store.dispatch(logout());
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
