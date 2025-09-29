// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// export const fetchUserLocation = createAsyncThunk(
//   'location/fetchUserLocation',
//   async (_, { rejectWithValue }) => {
//     try {
//       const position = await new Promise((resolve, reject) => {
//         navigator.geolocation.getCurrentPosition(resolve, reject, {
//           enableHighAccuracy: true,
//           timeout: 5000,
//           maximumAge: 0,
//         });
//       });

//       return {
//         lat: position.coords.latitude,
//         lng: position.coords.longitude,
//       };
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// /**
//  * @description The location slice handles all location-related state.
//  * It is responsible for storing the latitude, longitude, and the status
//  * of the fetch operation.
//  */

// const locationSlice = createSlice({
//   name: 'location',
//   initialState: {
//     city: '',
//     latitude: null,
//     longitude: null,
//     country: '',
//     countryCode: '',
//     region: '',
//     regionName: '',
//     zip: '',
//     isLoading: false,
//     error: null,
//   },
//   reducers: {
//     setUserLocation: (state, action) => {
//       console.log('setUserLocation is firing now');
//       state.city = action.payload.city;
//       state.latitude = action.payload.lat;
//       state.longitude = action.payload.lon;
//       state.country = action.payload.country;
//       state.countryCode = action.payload.countryCode;
//       state.region = action.payload.region;
//       state.regionName = action.payload.regionName;
//       state.zip = action.payload.zip;
//       state.source = action.payload.source || 'manual';
//       state.error = null;
//       console.log(location);
//     },
//   },
//   extraReducers: builder => {
//     builder
//       // Handles the pending state of the fetchUserLocation thunk
//       .addCase(fetchUserLocation.pending, state => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       // Handles the fulfilled state of the fetchUserLocation thunk
//       .addCase(fetchUserLocation.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.latitude = action.payload.lat;
//         state.longitude = action.payload.lng;
//         state.error = null;
//       })
//       // Handles the rejected state of the fetchUserLocation thunk
//       .addCase(fetchUserLocation.rejected, (state, action) => {
//         state.isLoading = false;
//         state.latitude = null;
//         state.longitude = null;
//         state.error = action.payload;
//       });
//   },
// });

// export const { setUserLocation } = locationSlice.actions;

// export default locationSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// ====================================================================
// NEW: Thunk to fetch comprehensive location data based on IP or coordinates
// ====================================================================
export const fetchIpLocationDetails = createAsyncThunk(
  'location/fetchIpLocationDetails',
  async (
    // The argument can be coordinates {lat, lng} or null to use IP
    coordinates = null,
    { rejectWithValue }
  ) => {
    // You would typically use a service like ip-api.com, abstractly represented here
    let url = 'https://ip-api.com/json/';

    // If coordinates are provided, use a reverse geocoding API instead
    if (coordinates && coordinates.lat && coordinates.lng) {
      // NOTE: ip-api.com doesn't offer reverse geocoding.
      // If you need it, you must use OpenStreetMap's Nominatim URL here:
      // url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coordinates.lat}&lon=${coordinates.lng}`;
      // For simplicity, we'll keep the IP URL, assuming this is mainly for IP fallback.
      // If you use Nominatim, the response structure (city, region, etc.) will be different.
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch location details from API');
      }
      const data = await response.json();

      // Assuming the external API returns data matching your required structure
      if (data.status === 'fail') {
        throw new Error(data.message || 'Location data fetch failed.');
      }

      return {
        city: data.city || 'Unknown City',
        lat: data.lat || null, // Assuming lat/lon are named `lat` and `lon` in the response
        lon: data.lon || null,
        country: data.country || '',
        countryCode: data.countryCode || '',
        region: data.region || '',
        regionName: data.regionName || '',
        zip: data.zip || '',
        source: 'ip-api',
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ====================================================================
// Existing Thunk: Fetches raw coordinates from the browser
// (No changes needed, but will be used in tandem with the new thunk)
// ====================================================================
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

// ====================================================================
// locationSlice Definition
// ====================================================================
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
    source: 'default', // New state to track if location is from IP, GPS, or manual
    isLoading: false,
    error: null,
  },
  reducers: {
    // Reducer remains the same, but is now used by the new thunk
    setUserLocation: (state, action) => {
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
      state.isLoading = false; // Important to reset loading state here
    },
  },
  extraReducers: builder => {
    builder
      // --- Handling fetchIpLocationDetails ---
      .addCase(fetchIpLocationDetails.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIpLocationDetails.fulfilled, (state, action) => {
        // When details are fetched, directly populate the entire state
        locationSlice.caseReducers.setUserLocation(state, action);
      })
      .addCase(fetchIpLocationDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to determine location by IP.';
      })

      // --- Handling fetchUserLocation (Browser Geolocation) ---
      .addCase(fetchUserLocation.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserLocation.fulfilled, (state, action) => {
        state.isLoading = false;
        // This only gets lat/lng. You should decide if you want to
        // immediately fire a reverse geocoding API call here.
        state.latitude = action.payload.lat;
        state.longitude = action.payload.lng;
        state.source = 'geolocation';
        state.error = null;

        // OPTIONAL: If you want to get the city name for the new GPS coords:
        // DISPATCH A REVERSE GEOCODING THUNK HERE (outside the slice)
      })
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
