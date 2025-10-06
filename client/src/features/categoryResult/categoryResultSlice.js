import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';
import { API } from '../../config/api';

export const fetchCategoryRestaurants = createAsyncThunk(
  'categoryResult/fetchRestaurants',
  async (
    { categorySlug, cityName, latitude, longitude, page = 1, limit = 50 },
    { rejectWithValue }
  ) => {
    try {
      const apiUrl = `${API.RESTAURANTS.RESTAURANTS_LIST}?categoryName=${categorySlug}&longitude=${longitude}&latitude=${latitude}&limit=${limit}&page=${page}`;
      const response = await axiosInstance.get(apiUrl);

      // 💡 Optimization: Ensure currentPage is a number here and use it consistently.
      const fetchedCurrentPage = Number(response.data.data.currentPage) || page;

      return {
        ...response.data.data,
        categorySlug,
        currentPage: fetchedCurrentPage, // Use the converted number
      };
    } catch (error) {
      console.error('API call failed:', error);
      const message =
        error.response?.data?.message ||
        'Failed to fetch restaurants for this category.';
      return rejectWithValue(message);
    }
  }
);

const initialState = {
  currentCategorySlug: null,
  restaurants: [],
  isLoading: false,
  error: null,
  totalResults: 0,
  currentPage: 0,
  totalPages: 0,
};

const categoryResultSlice = createSlice({
  name: 'categoryResult',
  initialState,
  reducers: {
    clearCategoryResults: state => {
      state.restaurants = [];
      state.totalResults = 0;
      state.currentPage = 0;
      state.totalPages = 0;
      state.currentCategorySlug = null;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCategoryRestaurants.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCategoryRestaurants.fulfilled, (state, action) => {
        const {
          restaurants,
          totalResults,
          currentPage,
          totalPages,
          categorySlug,
        } = action.payload;

        state.isLoading = false;
        state.error = null;
        state.totalResults = totalResults;
        state.totalPages = totalPages;

        // 1. OVERWRITE Logic (Page 1): Handles initial load & category switch
        if (currentPage === 1) {
          state.restaurants = restaurants;
          state.currentPage = currentPage;
          state.currentCategorySlug = categorySlug;

          // 2. APPEND Logic (Page > 1): Handles "Load More"
        } else {
          // Defensive Check (Optional but recommended for race conditions):
          // Only append if we are fetching the *next* sequential page.
          if (currentPage === state.currentPage + 1) {
            state.restaurants.push(...restaurants);
            state.currentPage = currentPage;
            state.currentCategorySlug = categorySlug;
          }
          // If currentPage is not sequential, we ignore the payload (e.g., a delayed old request finished late).
        }
      })
      .addCase(fetchCategoryRestaurants.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'An unknown error occurred.';
      });
  },
});

export const { clearCategoryResults } = categoryResultSlice.actions;

export default categoryResultSlice.reducer;
