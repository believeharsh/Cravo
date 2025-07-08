import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

// Async Thunk to fetch landing page data
export const fetchLandingPageData = createAsyncThunk(
  "landingPage/fetchLandingPageData", // Action type prefix
  async ({ longitude, latitude, maxDistanceKm }, { rejectWithValue }) => { // Destructure the arguments here
    try {
      console.log("fetchLandingPageData func is being called now :");
      console.log("Longitude:", longitude); // Now this will correctly log the longitude
      console.log("Latitude:", latitude);
      console.log("Max Distance Km:", maxDistanceKm);

      // Make a GET request to your landing page data API endpoint
      const response = await axiosInstance.get(`/api/v1/landingResources/?longitude=${longitude}&latitude=${latitude}&maxDistanceKm=${maxDistanceKm}`);
      console.log(response);
      // The data returned from the API will be the payload for `fulfilled`
      return response.data;
    } catch (err) {
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

const landingPageSlice = createSlice({
  name: "landingPage", // Slice name
  initialState: {
    data: null, // Will hold the fetched landing page content (e.g., banners, categories, etc.)
    isLoading: false, // True when data is being fetched
    error: null, // Stores any error message if fetching fails
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
        state.error = null; // Clear any previous errors
      })
      // Handle the fulfilled (successful) state
      .addCase(fetchLandingPageData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload; // Store the fetched data
        state.error = null;
      })
      // Handle the rejected (failed) state
      .addCase(fetchLandingPageData.rejected, (state, action) => {
        state.isLoading = false;
        state.data = null; // Clear data on failure
        state.error = action.payload; // Store the error message
      });
  },
});

// Export synchronous actions
export const { clearLandingPageError, setLandingPageData } = landingPageSlice.actions;

// Export the reducer
export default landingPageSlice.reducer;