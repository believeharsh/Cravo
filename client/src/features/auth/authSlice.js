import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const loginUser = createAsyncThunk(
  "auth/loginUser", // This is the action type prefix
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/api/v1/auth/signin", credentials, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      // The value returned here will become the `action.payload` for `loginUser.fulfilled`
      return res.data;
    } catch (err) {
      // Axios errors often have a `response` object
      const errorMessage =
        err.response?.data?.message ||
        "Something went wrong. Please try again.";
      // `rejectWithValue` lets you return a custom error payload
      return rejectWithValue(errorMessage);
    }
  }
);

export const checkAuthStatus = createAsyncThunk(
  "auth/checkAuthStatus",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/api/v1/auth/verify-auth", {
        withCredentials: true,
      });
      // Assuming your backend returns { status: 'authenticated', user: { ... } }
      return res.data.user; // Return the user object if authenticated
    } catch (err) {
      if (err.response) {
        const statusCode = err.response.status;
        if (statusCode === 401 || statusCode === 404) {
          // Expected: User not authenticated. No console output.
          return rejectWithValue(null);
        } else {
          // Unexpected server error (e.g., 500).
          return rejectWithValue(err.response.data?.message || "An unexpected error occurred during authentication check.");
        }
      } else if (err.request) {
        // Network error (no response from server).
        return rejectWithValue("Network error during authentication check.");
      } else {
        // Something else happened in setting up the request that triggered an Error
        return rejectWithValue("Failed to set up authentication check request.");
      }
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null, // Stores user info after successful login/auth check
    role: null, // Stores user role
    token: null, // If your API returns a token (less common with HTTP-only cookies for session)
    isLoading: false, // For login/logout operations
    isAuthChecking: true, // NEW: True when the initial auth status check is in progress
    error: null, // Stores any authentication-related error messages
    isAuthenticated: false, // True if the user is currently authenticated
    isInitialized: false, // NEW: True once the initial auth status check has completed
  },
  reducers: {
    // Synchronous reducers for simple state changes
    logout: (state) => {
      state.user = null;
      state.role = null;
      state.token = null;
      state.isLoading = false; // Reset loading on logout
      state.error = null; // Clear any errors on logout
      state.isAuthenticated = false;
      // With HTTP-only cookies, you typically don't clear localStorage for auth data.
      // If you stored 'role' for display, you might clear it here.
      // localStorage.removeItem("role");
      // You'd typically also hit a backend logout endpoint to invalidate the cookie on the server.
    },
    clearAuthError: (state) => {
      state.error = null;
    },
    // This reducer is for manually setting auth state, e.g., if you re-hydrate from a secure source
    // It expects a direct payload of { user, role, token }
    setAuthState: (state, action) => {
      const { user, role, token } = action.payload; // Direct destructuring
      state.user = user || null;
      state.role = role || null;
      state.token = token || null;
      state.isAuthenticated = !!user; // Set true if user object exists
      // isInitialized is typically handled by checkAuthStatus, but can be set here if needed
    },
    // Reducer to explicitly mark initialization (used if checkAuthStatus isn't the only init path)
    setAuthInitialized: (state) => {
      state.isInitialized = true;
    },
  },
  // `extraReducers` handle actions from `createAsyncThunk` or other slices
  extraReducers: (builder) => {
    builder
      // --- Handlers for loginUser thunk ---
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Clear any previous errors
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.user = action.payload.user; // Assuming your API returns a `user` object
        state.role = action.payload.role; // Assuming your API returns a `role`
        state.token = action.payload.token; // Assuming your API returns a `token`
        state.isAuthenticated = true;
        // After successful login, the initial check is effectively done
        state.isAuthChecking = false; // Ensure this is false
        state.isInitialized = true; // Mark as initialized
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.role = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = action.payload; // `action.payload` here will be the value passed to `rejectWithValue`
        // After failed login, the initial check is effectively done
        state.isAuthChecking = false; // Ensure this is false
        state.isInitialized = true; // Mark as initialized
      })

      // --- Handlers for checkAuthStatus thunk ---
      .addCase(checkAuthStatus.pending, (state) => {
        state.isAuthChecking = true; // Indicate auth check is in progress
        state.isInitialized = false; // Ensure it's false until check completes
        state.error = null; // Clear any previous errors
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.isAuthChecking = false; // Auth check completed
        state.isInitialized = true; // Auth check completed
        state.isAuthenticated = true; // User is authenticated
        state.user = action.payload; // Payload is the user object from backend
        state.role = action.payload?.role || null; // Extract role from user object
        state.error = null; // Clear any errors
      })
      .addCase(checkAuthStatus.rejected, (state, action) => {
        state.isAuthChecking = false; // Auth check completed
        state.isInitialized = true; // Auth check completed (as unauthenticated)
        state.isAuthenticated = false; // User is not authenticated
        state.user = null; // Clear user data
        state.role = null; // Clear role
        state.token = null; // Clear token
        // `action.payload` here would be null for 401/404, or a message for other errors
        state.error = action.payload;
      });
  },
});

// Export the synchronous actions generated by createSlice
export const { logout, clearAuthError, setAuthState, setAuthInitialized } = authSlice.actions;

// Export the reducer function itself
export default authSlice.reducer;
