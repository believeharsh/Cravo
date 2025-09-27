import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUserLocation = createAsyncThunk(
  'location/fetchUserLocation',
  async (_, { rejectWithValue }) => {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        });
      });

      return {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    } catch (error) {
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
    city: '',
    latitude: null,
    longitude: null,
    country: '',
    countryCode: '',
    region: '',
    regionName: '',
    zip: '',
    isLoading: false,
    error: null,
  },
  reducers: {
    setUserLocation: (state, action) => {
      console.log('setUserLocation is firing now');
      state.city = action.payload.city;
      state.latitude = action.payload.lat;
      state.longitude = action.payload.lon;
      state.country = action.payload.country;
      state.countryCode = action.payload.countryCode;
      state.region = action.payload.region;
      state.regionName = action.payload.regionName;
      state.zip = action.payload.zip;
      state.source = action.payload.source || 'manual';
      state.error = null;
      console.log(location);
    },
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
        state.error = action.payload;
      });
  },
});

export const { setUserLocation } = locationSlice.actions;

export default locationSlice.reducer;
