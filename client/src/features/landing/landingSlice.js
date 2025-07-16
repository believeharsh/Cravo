import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import { checkAuthStatus } from "../auth/authSlice";

// Async Thunk to fetch landing page data
export const fetchLandingPageData = createAsyncThunk(
  "landingPage/fetchLandingPageData", // Action type prefix
  async ({ longitude, latitude, maxDistanceKm }, { rejectWithValue }) => { 
    try {
      // console.log("fetchLandingPageData func is being called now: STARTING API CALL"); // <--- Added
      // console.log("Longitude:", longitude);
      // console.log("Latitude:", latitude);
      // console.log("Max Distance Km:", maxDistanceKm);

      // Make a GET request to your landing page data API endpoint
      const response = await axiosInstance.get(`/api/v1/landingResources/?longitude=${longitude}&latitude=${latitude}&maxDistanceKm=${maxDistanceKm}`);
      console.log("fetchLandingPageData func: API call successful, response:", response); 
      // The data returned from the API will be the payload for `fulfilled`
      return response.data;
    } catch (err) {
      console.error("fetchLandingPageData func: API call failed!", err); 
      // Handle different types of errors gracefully without console noise
      if (err.response) {
        // Server responded with a status code outside of 2xx range
        const errorMessage = err.response.data?.message || `Server error: ${err.response.status}`;
        return rejectWithValue(errorMessage);
      } else if (err.request) {
        // The request was made but no response was received
        return rejectWithValue("Network error: No response from server.");
      } else {
        // Something else happened in setting up the request
        return rejectWithValue(`Error setting up request: ${err.message}`);
      }
    }
  }
);

// New Async Thunk to initialize the entire application
export const initializeApplication = createAsyncThunk(
  "landingPage/initializeApplication",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      console.log("initializeApplication: Starting app initialization...");

      // 1. Perform authentication status check
      console.log("initializeApplication: Dispatching checkAuthStatus...");
      try {
        await dispatch(checkAuthStatus()).unwrap();
        console.log("initializeApplication: Auth status checked. (SUCCESS)");
      } catch (authError) {
        console.warn("initializeApplication: Auth status check FAILED. User is likely unauthenticated.", authError);
        // We continue the initialization even if auth fails.
      }


      // 2. Get user's geolocation and then dispatch the data fetch
      console.log("initializeApplication: Attempting to get geolocation...");
      return new Promise((resolve) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              console.log("initializeApplication: Geolocation obtained.", { latitude, longitude });
              console.log("initializeApplication: Dispatching fetchLandingPageData with geolocation...");
              dispatch(
                fetchLandingPageData({ longitude, latitude, maxDistanceKm: 600 })
              );
              resolve(); 
            },
            (geoError) => {
              console.warn("initializeApplication: Geolocation error:", geoError.message);
              console.log("initializeApplication: Dispatching fetchLandingPageData without geolocation (fallback)...");
              dispatch(fetchLandingPageData({}));
              resolve();
            },
            {
              enableHighAccuracy: true,
              timeout: 10000,
              maximumAge: 0,
            }
          );
        } else {
          console.warn(
            "initializeApplication: Geolocation not supported. Fetching default content."
          );
          console.log("initializeApplication: Dispatching fetchLandingPageData without geolocation (no support)...");
          dispatch(fetchLandingPageData({}));
          resolve(); 
        }
      });

    } catch (error) {
      // that prevent the entire initialization from proceeding.
      console.error("initializeApplication: UNEXPECTED critical error during app initialization!", error);
      return rejectWithValue(error.message || "Failed to initialize application due to unexpected error");
    }
  }
);

const landingPageSlice = createSlice({
  name: "landingPage", // Slice name
  initialState: {
    data: null, // Will hold the fetched landing page content (e.g., banners, categories, etc.)
    isLoading: false, 
    error: null, // Stores any error message if fetching fails
    isAppFullyInitialized: false, // New state for overall app readiness
    appInitError: null, // state for overall app initialization errors
  },
  reducers: {
    // Synchronous reducers (if any are needed for direct state manipulation)
    clearLandingPageError: (state) => {
      state.error = null;
    },
    // You might add a reducer to manually set data if needed for testing/mocking
    setLandingPageData: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle the pending state of the fetchLandingPageData async thunk
      .addCase(fetchLandingPageData.pending, (state) => {
        state.isLoading = true;
        state.error = null
      })
      // Handle the fulfilled (successful) state
      .addCase(fetchLandingPageData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      // Handle the rejected (failed) state
      .addCase(fetchLandingPageData.rejected, (state, action) => {
        state.isLoading = false;
        state.data = null; 
        state.error = action.payload; 
      })
      // --- New cases for initializeApplication thunk ---
      .addCase(initializeApplication.pending, (state) => {
        state.isAppFullyInitialized = false;
        state.appInitError = null;
      })
      .addCase(initializeApplication.fulfilled, (state) => {
        state.isAppFullyInitialized = true;
        state.appInitError = null;
      })
      .addCase(initializeApplication.rejected, (state, action) => {
        state.isAppFullyInitialized = true; 
        state.appInitError = action.payload || "Unknown initialization error";
      });
  },
});

// Export synchronous actions
export const { clearLandingPageError, setLandingPageData } = landingPageSlice.actions;

export default landingPageSlice.reducer;