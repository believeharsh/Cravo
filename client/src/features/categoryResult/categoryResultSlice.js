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

      return {
        ...response.data.data,
        categorySlug,
        page,
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
      .addCase(fetchCategoryRestaurants.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;

        // Reset data ONLY if fetching the first page (page 1)
        if (action.meta.arg.page === 1) {
          // No need to reset state.restaurants here, as it will be replaced in fulfilled.
          // Resetting total count and pages is fine.
          state.totalResults = 0;
          state.currentPage = 0;
          state.totalPages = 0;
        }
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
        state.currentCategorySlug = categorySlug;
        state.totalResults = totalResults;
        state.totalPages = totalPages;

        if (currentPage === 1) {
          state.restaurants = restaurants;
          state.currentPage = currentPage; // Update current page to 1
        } else {
          state.restaurants.push(...restaurants);
          state.currentPage = currentPage; // Update current page to the loaded page
        }
      })
      .addCase(fetchCategoryRestaurants.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'An unknown error occurred.';
        // Do NOT update totalResults here, keep the previous count if the error was on Load More
      });
  },
});

export const { clearCategoryResults } = categoryResultSlice.actions;

export default categoryResultSlice.reducer;
