import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

/**
 * @description An asynchronous thunk to fetch the user's current location.
 * It uses the browser's Geolocation API and returns a payload with
 * latitude and longitude on success, or an error message on failure.
 *
 * The thunk is set up to handle three lifecycle actions:
 * - pending: When the request starts.
 * - fulfilled: When the request succeeds.
 * - rejected: When the request fails (e.g., user denies permission).
 */

export const fetchUserLocation = createAsyncThunk(
  'location/fetchUserLocation',
  async (_, { rejectWithValue }) => {
    try {
      // Use a Promise wrapper for the callback-based Geolocation API
      const position = await new Promise((resolve, reject) => {
        // Options for high accuracy, a timeout, and no cached data
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        });
      });

      // On success, return an object containing the coordinates
      return {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    } catch (error) {
      // On error (e.g., permission denied), use rejectWithValue to return a specific payload
      return rejectWithValue(error.message);
    }
  }
);

/**
 * @description The location slice handles all location-related state.
 * It is responsible for storing the latitude, longitude, and the status
 * of the fetch operation.
 */

const locationSlice = createSlice({
  name: 'location',
  initialState: {
    latitude: null,
    longitude: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    // Reducers for synchronous actions can go here if needed
  },
  extraReducers: builder => {
    builder
      // Handles the pending state of the fetchUserLocation thunk
      .addCase(fetchUserLocation.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      // Handles the fulfilled state of the fetchUserLocation thunk
      .addCase(fetchUserLocation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.latitude = action.payload.lat;
        state.longitude = action.payload.lng;
        state.error = null;
      })
      // Handles the rejected state of the fetchUserLocation thunk
      .addCase(fetchUserLocation.rejected, (state, action) => {
        state.isLoading = false;
        state.latitude = null;
        state.longitude = null;
        state.error = action.payload; // The error message from rejectWithValue
      });
  },
});

// Export the reducer so it can be combined with other reducers in the store
export default locationSlice.reducer;
