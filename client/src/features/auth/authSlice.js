import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';
import { API } from '../../config/api';

export const loginUser = createAsyncThunk(
  'auth/loginUser', // This is the action type prefix
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(API.AUTH.LOGIN, credentials, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      // The value returned here will become the `action.payload` for `loginUser.fulfilled`
      console.log(res);

      return res.data;
    } catch (err) {
      // Axios errors often have a `response` object
      const errorMessage =
        err.response?.data?.message ||
        'Something went wrong. Please try again.';
      // `rejectWithValue` lets you return a custom error payload
      return rejectWithValue(errorMessage);
    }
  }
);

export const checkAuthStatus = createAsyncThunk(
  'auth/checkAuthStatus',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(API.AUTH.REFRESH, {
        withCredentials: true,
      });
      console.log(res.data.data);
      return res.data.data; // Return the user object if authenticated
    } catch (err) {
      if (err.response) {
        const statusCode = err.response.status;
        if (statusCode === 401 || statusCode === 404) {
          // Expected: User not authenticated. No console output.
          return rejectWithValue(null);
        } else {
          // Unexpected server error (e.g., 500).
          return rejectWithValue(
            err.response.data?.message ||
              'An unexpected error occurred during authentication check.'
          );
        }
      } else if (err.request) {
        // Network error (no response from server).
        return rejectWithValue('Network error during authentication check.');
      } else {
        // Something else happened in setting up the request that triggered an Error
        return rejectWithValue(
          'Failed to set up authentication check request.'
        );
      }
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    role: null,
    token: null,
    isLoading: false,
    isAuthChecking: true,
    error: null,
    isAuthenticated: false,
    isInitialized: false,
  },
  reducers: {
    // Synchronous reducers for simple state changes
    logout: state => {
      state.user = null;
      state.role = null;
      state.token = null;
      state.isLoading = false;
      state.error = null;
      state.isAuthenticated = false;
      // With HTTP-only cookies, you typically don't clear localStorage for auth data.
      // If you stored 'role' for display, you might clear it here.
      // localStorage.removeItem("role");
      // You'd typically also hit a backend logout endpoint to invalidate the cookie on the server.
    },
    clearAuthError: state => {
      state.error = null;
    },
    // This reducer is for manually setting auth state, e.g., if you re-hydrate from a secure source
    // It expects a direct payload of { user, role, token }
    setAuthState: (state, action) => {
      const { user, role, token } = action.payload;
      state.user = user || null;
      state.role = role || null;
      state.token = token || null;
      state.isAuthenticated = !!user;
    },
    // Reducer to explicitly mark initialization (used if checkAuthStatus isn't the only init path)
    setAuthInitialized: state => {
      state.isInitialized = true;
    },
  },
  // `extraReducers` handle actions from `createAsyncThunk` or other slices
  extraReducers: builder => {
    builder
      // --- Handlers for loginUser thunk ---
      .addCase(loginUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.user = action.payload.user;
        state.role = action.payload.role;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.isAuthChecking = false;
        state.isInitialized = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.role = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = action.payload;
        state.isAuthChecking = false;
        state.isInitialized = true;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        console.log('action', action);
        state.isAuthChecking = false;
        state.isInitialized = true;
        state.isAuthenticated = true;
        state.token = action.payload.accessToken;
        state.user = action.payload.user;
        state.role = action.payload.user.role || null;
        state.error = null;
      })
      .addCase(checkAuthStatus.rejected, (state, action) => {
        state.isAuthChecking = false;
        state.isInitialized = true;
        state.isAuthenticated = false;
        state.user = null;
        state.role = null;
        state.token = null;
        // `action.payload` here would be null for 401/404, or a message for other errors
        state.error = action.payload;
      });
  },
});

// Export the synchronous actions generated by createSlice
export const { logout, clearAuthError, setAuthState, setAuthInitialized } =
  authSlice.actions;

// Export the reducer function itself
export default authSlice.reducer;
