import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';
import { API } from '../../config/api';

// Initial state for the restaurant menu feature
const initialState = {
  menus: {},
};

/**
 * Thunk to fetch the restaurant details and its menu items.
 * It includes a check to skip the API call if data already exists in the store.
 */
export const fetchRestaurantMenu = createAsyncThunk(
  'restaurantMenu/fetch',
  async (restaurantID, thunkAPI) => {
    const { menus } = thunkAPI.getState().restaurantMenu;
    const cachedData = menus[restaurantID];

    // Caching Check: If valid data (products array) exists for this restaurant, skip the API call.
    // This ensures data is fetched only once per app session.
    if (cachedData && cachedData.products && cachedData.products.length > 0) {
      // Using 'rejectWithValue' to stop the thunk chain and signal a cache hit
      return thunkAPI.rejectWithValue({
        isCacheHit: true,
        data: {
          restaurant: cachedData.restaurant,
          products: cachedData.products,
        },
      });
    }

    try {
      const response = await axiosInstance.get(
        API.RESTAURANTS.PRODUCTS(restaurantID)
      );

      if (response.status === 200 && response.data.success) {
        const { products, restaurantDetails: restaurant } = response.data.data;

        return { restaurantID, restaurant, products };
      } else {
        return thunkAPI.rejectWithValue(
          response.data.message || 'Failed to load restaurant data.'
        );
      }
    } catch (error) {
      console.error('API call failed for restaurant menu:', error);
      return thunkAPI.rejectWithValue(
        'Failed to fetch restaurant data. Please check your connection.'
      );
    }
  }
);

const restaurantMenuSlice = createSlice({
  name: 'restaurantMenu',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // 1. Handle PENDING state for a specific restaurant ID
      .addCase(fetchRestaurantMenu.pending, (state, action) => {
        const restaurantID = action.meta.arg;

        // Initialize if not present, but importantly, set loading to 'pending'
        if (!state.menus[restaurantID]) {
          state.menus[restaurantID] = {
            restaurant: null,
            products: [],
          };
        }

        state.menus[restaurantID].loading = 'pending';
        state.menus[restaurantID].error = null;
      })

      // 2. Handle FULFILLED state (API call succeeded)
      .addCase(fetchRestaurantMenu.fulfilled, (state, action) => {
        const { restaurantID, restaurant, products } = action.payload;

        state.menus[restaurantID] = {
          restaurant,
          products,
          loading: 'succeeded',
          error: null,
        };
      })

      // 3. Handle REJECTED state (API call failed OR cache hit)
      .addCase(fetchRestaurantMenu.rejected, (state, action) => {
        const restaurantID = action.meta.arg;

        // If it was a cache hit, explicitly set loading to succeeded
        // to render the cached data.
        if (action.payload && action.payload.isCacheHit) {
          if (state.menus[restaurantID]) {
            state.menus[restaurantID].loading = 'succeeded';
            state.menus[restaurantID].error = null;
          }
          return;
        }

        if (state.menus[restaurantID]) {
          state.menus[restaurantID].loading = 'failed';
          state.menus[restaurantID].error =
            action.payload || 'An unknown error occurred.';
        } else {
          // Handle case where fetch failed on first try (no prior entry)
          state.menus[restaurantID] = {
            restaurant: null,
            products: [],
            loading: 'failed',
            error: action.payload || 'An unknown error occurred.',
          };
        }
      });
  },
});

export default restaurantMenuSlice.reducer;
