// import axios from 'axios';
// const baseURL = import.meta.env.VITE_API_URL;
// import { API } from '../config/api';
// import store from '../app/store';
// import { logout, setAuthState } from '../features/auth/authSlice';

// const axiosInstance = axios.create({
//   baseURL: baseURL,
//   withCredentials: true,
// });

// let isRefreshing = false;
// let failedRequestsQueue = [];

// const setAuthHeader = token => {
//   if (token) {
//     axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//   } else {
//     delete axiosInstance.defaults.headers.common['Authorization'];
//   }
// };

// // Interceptor to attach the token from Redux state on every request
// axiosInstance.interceptors.request.use(
//   config => {
//     const { token } = store.getState().auth; // Get token from Redux state
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );

// // A helper function to process the queue of failed requests
// const processQueue = (error, token = null) => {
//   failedRequestsQueue.forEach(prom => {
//     if (error) {
//       prom.reject(error);
//     } else {
//       prom.resolve(token);
//     }
//   });
//   failedRequestsQueue = [];
// };

// axiosInstance.interceptors.response.use(
//   response => response,
//   async error => {
//     const originalRequest = error.config;
//     // Check if the error is a 401 and it's not a retry
//     // ❌ Skip refresh for login/register requests
//     if (
//       originalRequest.url.includes('/auth/login') ||
//       originalRequest.url.includes('/auth/register')
//     ) {
//       return Promise.reject(error);
//     }
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       // If a refresh is in progress, queue this request and return a promise
//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           failedRequestsQueue.push({ resolve, reject });
//         })
//           .then(token => {
//             originalRequest.headers['Authorization'] = `Bearer ${token}`;
//             return axiosInstance(originalRequest);
//           })
//           .catch(err => {
//             return Promise.reject(err);
//           });
//       }

//       // Start the refresh process
//       originalRequest._retry = true;
//       isRefreshing = true;

//       try {
//         const res = await axiosInstance.post(API.AUTH.REFRESH);
//         console.log('axios auth/refresh', 'and res is this', res);
//         const newAccessToken = res.data.data.accessToken;
//         const role = res.data.data.role;
//         const user = res.data.data.user;
//         setAuthHeader(newAccessToken);

//         // Update Redux state with the new token
//         dispatch(
//           setAuthState({ role: role, user: user, token: newAccessToken })
//         );

//         // Update headers of all queued requests and the current one
//         originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

//         // Process the queue with the new token
//         processQueue(null, newAccessToken);

//         isRefreshing = false;

//         // Retry the original failed request
//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         // Refresh failed, clear the queue and log out
//         processQueue(refreshError);
//         store.dispatch(logout());
//         isRefreshing = false;
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;

// axiosInstance.js (Modified)
import axios from 'axios';
const baseURL = import.meta.env.VITE_API_URL;
import { API } from '../config/api';
// REMOVE: import store from '../app/store';
// REMOVE: import { logout, setAuthState } from '../features/auth/authSlice';

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

// ----------------------------------------------------------------------
// NEW: Export a setup function to receive the store's dispatch and getState functions
// ----------------------------------------------------------------------
export const setupInterceptors = ({
  dispatch,
  getState,
  logoutAction,
  setAuthStateAction,
}) => {
  // 1. Request Interceptor: Attach token using getState()
  axiosInstance.interceptors.request.use(
    config => {
      // Use the passed getState() function from the store
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

      // ... (Skip refresh logic for login/register) ...
      if (
        originalRequest.url.includes('/auth/login') ||
        originalRequest.url.includes('/auth/register')
      ) {
        return Promise.reject(error);
      }

      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          // Queue requests... (your existing queue logic is fine)
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

          // Use the passed dispatch() function and setAuthStateAction
          dispatch(
            setAuthStateAction({ role: role, user: user, token: accessToken })
          );

          originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
          processQueue(null, accessToken);
          isRefreshing = false;

          return axiosInstance(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError);
          // Use the passed dispatch() function and logoutAction
          dispatch(logoutAction());
          isRefreshing = false;
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
};
// ----------------------------------------------------------------------

export default axiosInstance;
