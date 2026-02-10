import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Thunk for location suggestions based on user input (Geocoding)
export const fetchLocationSuggestions = createAsyncThunk(
  'locationSearch/fetchSuggestions',
  async (query, { rejectWithValue }) => {
    // Minimum query length for efficient API usage
    if (query.length < 3) return [];

    // OpenStreetMap Nominatim API for searching addresses
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      query
    )}&format=json&addressdetails=1&limit=5&accept-language=en`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch suggestions from OpenStreetMap');
      }
      const data = await response.json();

      // Map and format the suggestion data
      return data.map(item => {
        const address = item.address;

        // Prioritize city/town/village, then append the location type or a general identifier.
        const cityPart =
          address?.city || address?.town || address?.village || '';

        // Using specific place/road/suburb if available, or fall back to display name
        const placePart =
          address?.suburb ||
          address?.road ||
          address?.leisure ||
          item.display_name.split(',')[0];

        // Construct the formatted display name: "City, Specific Place"
        let formattedName = item.display_name; // Default fallback

        if (cityPart && placePart) {
          // Example: "Bhopal, TT Nagar"
          formattedName = `${cityPart}, ${placePart}`;
        } else if (cityPart) {
          formattedName = cityPart;
        }

        return {
          // Use the newly constructed name
          name: formattedName,
          lat: parseFloat(item.lat),
          lng: parseFloat(item.lon),
          simpleCityName: cityPart || item.display_name.split(',')[0],
        };
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for current location button (Reverse Geocoding after GPS is granted)
export const fetchCurrentLocation = createAsyncThunk(
  'locationSearch/fetchCurrentLocation',
  async (_, { rejectWithValue }) => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        return reject('Geolocation not supported.');
      }

      // 1. Get raw coordinates from the browser
      navigator.geolocation.getCurrentPosition(
        async position => {
          const { latitude, longitude } = position.coords;

          // 2. Use Reverse Geocoding API to get a readable address
          const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

          try {
            const response = await fetch(url);
            if (!response.ok) {
              throw new Error('Failed to fetch address from OpenStreetMap');
            }
            const data = await response.json();

            const simpleCityName =
              data.address?.city ||
              data.address?.town ||
              data.address?.village ||
              data.display_name.split(',')[0];

            // Resolve with the full, selected location object
            resolve({
              name: data.display_name,
              lat: latitude,
              lng: longitude,
              simpleCityName,
            });
          } catch (error) {
            reject('Reverse geocoding failed.');
          }
        },
        error => {
          // Reject on GPS error (e.g., user denied permission)
          reject(`Geolocation error: ${error.message}`);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    });
  }
);

const searchContextSlice = createSlice({
  name: 'searchContext',
  initialState: {
    suggestions: [],
    loading: false,
    error: null,
    selectedLocation: null,
    restaurantName: '', // For explicit restaurant name search
    categoryName: '', // For general food/category search (Pizza, Chinese, etc.)
  },
  reducers: {
    // 1. Location Selection (Replaces setSelectedLocation)
    setConfirmedLocation(state, action) {
      state.selectedLocation = action.payload;
      state.suggestions = []; // Clear suggestions after selection
      state.error = null;
    },
    // 2. Clear Suggestions
    clearSuggestions(state) {
      state.suggestions = [];
    },
    // 3. Set Food/Category Search Term
    setCategoryName(state, action) {
      state.categoryName = action.payload;
    },
    // 4. Set Restaurant Name
    setRestaurantName(state, action) {
      state.restaurantName = action.payload;
    },
    // 5. Clear All Search Parameters (e.g., when navigating home)
    clearSearchContext(state) {
      state.selectedLocation = null;
      state.restaurantName = '';
      state.categoryName = '';
      state.suggestions = [];
    },
  },
  extraReducers: builder => {
    builder
      // --- Handling fetchLocationSuggestions (Typing/Geocoding) ---
      .addCase(fetchLocationSuggestions.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLocationSuggestions.fulfilled, (state, action) => {
        state.loading = false;
        state.suggestions = action.payload;
      })
      .addCase(fetchLocationSuggestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch suggestions.';
        state.suggestions = [];
      })

      // --- Handling fetchCurrentLocation (GPS/Reverse Geocoding) ---
      .addCase(fetchCurrentLocation.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentLocation.fulfilled, (state, action) => {
        state.loading = false;
        // Set the selected location from the successful reverse geocode result
        locationSearchSlice.caseReducers.setSelectedLocation(state, action);
      })
      .addCase(fetchCurrentLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.suggestions = [];
      });
  },
});

export const {
  setConfirmedLocation,
  clearSuggestions,
  setCategoryName,
  setRestaurantName,
  clearSearchContext,
} = searchContextSlice.actions;

export default searchContextSlice.reducer;
