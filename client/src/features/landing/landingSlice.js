import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';
import { checkAuthStatus } from '../auth/authSlice';
import { API } from '../../config/api';
import axios from 'axios';
import { setUserLocation } from '../location/locationSlice';

console.log(setUserLocation);

// New Async Thunk to handle all API calls concurrently
export const initializeApplication = createAsyncThunk(
  'landingPage/initializeApplication',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      // Dispatch the auth check first, but don't wait for it.
      // It's a critical background task.
      dispatch(checkAuthStatus());

      // Use Promise.all to make these API calls concurrently for speed.
      // This is the core change for optimization.
      const [citiesRes, categoriesRes, ipLocationRes] = await Promise.all([
        axiosInstance.get(API.CITIES.GET_ALL_CITIES),
        axiosInstance.get(API.CATEGORIES.GET_ALL_CATEGORIES),
        axios.get('http://ip-api.com/json', { withCredentials: false }),
      ]);

      const cities = citiesRes.data.data.cities;
      const categories = categoriesRes.data.data.categories;
      console.log('api location res', ipLocationRes);
      const { lat, lon, city, country, countryCode, region, regionName, zip } =
        ipLocationRes.data;

      dispatch(
        setUserLocation({
          lat: lat,
          lon: lon,
          city: city,
          country: country,
          countryCode: countryCode,
          region: region,
          regionName: regionName,
          zip: zip,
        })
      );
      // Make the final, dependent call for restaurants using the fetched location
      const restaurantsRes = await axiosInstance.get(
        `${API.RESTAURANTS.RESTAURANTS_LIST}/?longitude=${lon}&latitude=${lat}&sort=rating&limit=15`
      );

      const restaurants = restaurantsRes.data.data.restaurants;

      // Return the combined payload for the fulfilled action
      return {
        cities,
        categories,
        restaurants,
      };
    } catch (err) {
      // Rejects the entire thunk if any of the concurrent calls fail.
      const errorMessage = err.response?.data?.message || err.message;
      console.error(
        'initializeApplication: UNEXPECTED critical error during app initialization!',
        err
      );
      return rejectWithValue(errorMessage);
    }
  }
);

// We no longer need this separate thunk. Its logic is now inside initializeApplication.
// export const fetchLandingPageData = createAsyncThunk(...);

const landingPageSlice = createSlice({
  name: 'landingPage',
  initialState: {
    data: {
      cities: [],
      categories: [],
      restaurants: [],
    },
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(initializeApplication.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(initializeApplication.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(initializeApplication.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to fetch landing page data.';
        // Clear previous data on failure
        state.data = { cities: [], categories: [], restaurants: [] };
      });
  },
});

export default landingPageSlice.reducer;
