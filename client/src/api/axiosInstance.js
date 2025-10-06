import axios from 'axios';
const baseURL = import.meta.env.VITE_API_URL;
import { API } from '../config/api';

const axiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

let isRefreshing = false;
let failedRequestsQueue = [];

// Helper to set the Authorization header
const setAuthHeader = token => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

// A helper function to process the queue of failed requests
const processQueue = (error, token = null) => {
  failedRequestsQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedRequestsQueue = [];
};

// Exporting  a setup function to receive the store's dispatch and getState functions

export const setupInterceptors = ({
  dispatch,
  getState,
  logoutAction,
  setAuthStateAction,
}) => {
  // 1. Request Interceptor: Attaching token using getState()
  axiosInstance.interceptors.request.use(
    config => {
      const { token } = getState().auth;
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  // 2. Response Interceptor: Handle 401 using dispatch()
  axiosInstance.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;

      // Skipping refresh logic for login/register)
      if (
        originalRequest.url.includes('/auth/login') ||
        originalRequest.url.includes('/auth/register')
      ) {
        return Promise.reject(error);
      }

      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          // Queue requests...
          return new Promise((resolve, reject) => {
            failedRequestsQueue.push({ resolve, reject });
          })
            .then(token => {
              originalRequest.headers['Authorization'] = `Bearer ${token}`;
              return axiosInstance(originalRequest);
            })
            .catch(err => {
              return Promise.reject(err);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const res = await axiosInstance.post(API.AUTH.REFRESH);
          const { accessToken, role, user } = res.data.data;
          setAuthHeader(accessToken);

          // Using the passed dispatch() function and setAuthStateAction
          dispatch(
            setAuthStateAction({ role: role, user: user, token: accessToken })
          );

          originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
          processQueue(null, accessToken);
          isRefreshing = false;

          return axiosInstance(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError);
          // Using the passed dispatch() function and logoutAction
          dispatch(logoutAction());
          isRefreshing = false;
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
};

export default axiosInstance;
