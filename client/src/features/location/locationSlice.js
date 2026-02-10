import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Thunk to fetch comprehensive location data based on IP or coordinates
export const fetchIpLocationDetails = createAsyncThunk(
  'location/fetchIpLocationDetails',
  async (
    // The argument can be coordinates {lat, lng} or null to use IP
    coordinates = null,
    { rejectWithValue }
  ) => {
    // using a service ip-api.com, abstractly represented here
    let url = 'https://ip-api.com/json/';

    // If coordinates are provided, use a reverse geocoding API instead
    if (coordinates && coordinates.lat && coordinates.lng) {
      // NOTE: ip-api.com doesn't offer reverse geocoding.
      // we must use OpenStreetMap's Nominatim URL here:
      // url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coordinates.lat}&lon=${coordinates.lng}`;
      // For simplicity, we'll keep the IP URL, assuming this is mainly for IP fallback.
      // If we use Nominatim, the response structure (city, region, etc.) will be different.
    }

    try {
      const response = await axios.get(url);
      if (!response.ok) {
        throw new Error('Failed to fetch location details from API');
      }
      const data = await response.json();
      if (data.status === 'fail') {
        throw new Error(data.message || 'Location data fetch failed.');
      }

      return {
        city: data.city || 'Unknown City',
        lat: data.lat || null,
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

// Thunk to fetch the user location using navigator geolocation
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
    source: 'default',
    isLoading: false,
    error: null,
  },
  reducers: {
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
      state.isLoading = false;
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
        state.latitude = action.payload.lat;
        state.longitude = action.payload.lng;
        state.source = 'geolocation';
        state.error = null;

        // If we want to get the city name for the new GPS coords:
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
