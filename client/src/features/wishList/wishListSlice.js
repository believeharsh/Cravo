import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';
import { API } from '../../config/api';

// Initial state for the wishlist feature
const initialState = {
  lists: [], // An array to hold all of the user's wishlists (products & restaurants)
  loading: 'idle', // 'idle' | 'pending' | 'succeeded' | 'failed'
  error: null,
};

// -----------------------------------------------------------
// Async Thunks for API Calls
// -----------------------------------------------------------

// A thunk to fetch all wishlists (products and restaurants) at once
export const fetchAllWishlists = createAsyncThunk(
  'wishlist/fetchAll',
  async (_, thunkAPI) => {
    try {
      const [productsResponse, restaurantsResponse] = await Promise.all([
        // Assuming you have separate API functions for fetching each list type
        axiosInstance.get(API.WISHLIST.GET_ALL_PRODUCTS_LIST),
        axiosInstance.get(API.WISHLIST.GET_ALL_RESTAURANTS_LIST),
      ]);

      console.log('productResponse', productsResponse);
      console.log('restaurantResponse', restaurantsResponse);

      // Use a utility function to combine the responses into a single, clean format
      const combinedLists = normalizeAndCombineLists(
        productsResponse.data.data,
        restaurantsResponse.data.data
      );
      return combinedLists;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// A thunk to add a new item (product or restaurant) to a specific list
export const addItemToWishlist = createAsyncThunk(
  'wishlist/addItem',
  async ({ listId, itemId, itemType }, thunkAPI) => {
    try {
      let response;
      if (itemType === 'product') {
        response = await axiosInstance.post(
          API.WISHLIST.ADD_ITEM_TO_PRODUCT_LIST(listId),
          { itemId }
        );
      } else if (itemType === 'restaurant') {
        response = await axiosInstance.post(
          API.WISHLIST.ADD_ITEM_TO_RESTAURANT_LIST(listId),
          { itemId }
        );
      }
      return response.data; // The API returns the updated list
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// A thunk to remove an item (product or restaurant) from a specific list
export const removeItemFromWishlist = createAsyncThunk(
  'wishlist/removeItem',
  async ({ listId, itemId, itemType }, thunkAPI) => {
    try {
      let response;
      if (itemType === 'product') {
        response = await axiosInstance.delete(
          API.WISHLIST.REMOVE_ITEM_FROM_PRODUCT_LIST(listId),
          { data: { productId: itemId } }
        );
      } else if (itemType === 'restaurant') {
        response = await axiosInstance.delete(
          API.WISHLIST.REMOVE_ITEM_FROM_RESTAURANT_LIST(listId),
          { data: { itemId } }
        );
      }
      return response.data; // The API returns the updated list
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// -----------------------------------------------------------
// Helper Function to Normalize API Responses
// -----------------------------------------------------------

const normalizeAndCombineLists = (productLists, restaurantLists) => {
  const combinedLists = {};

  // Process all product lists and store them in the map
  productLists.forEach(list => {
    combinedLists[list._id] = {
      ...list, // Spread the entire list object to keep list_type and other properties
      items: list.products, // Use the correct property name from the API response
    };
    // Delete the original 'products' property to avoid redundancy
    delete combinedLists[list._id].products;
  });

  // Process all restaurant lists and merge them with existing entries or create new ones
  restaurantLists.forEach(list => {
    if (combinedLists[list._id]) {
      // This part seems unlikely to be used with your current backend structure
      // as product and restaurant lists have different list_types and IDs.
      // But it's good to keep it for robustness.
      combinedLists[list._id].items.push(...list.restaurants);
    } else {
      combinedLists[list._id] = {
        ...list, // Spread the entire list object
        items: list.restaurants,
      };
      // Delete the original 'restaurants' property
      delete combinedLists[list._id].restaurants;
    }
  });

  // Convert the object back to an array for the Redux state
  return Object.values(combinedLists);
};

// -----------------------------------------------------------
// The Redux Slice
// -----------------------------------------------------------

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    // Synchronous reducers for local state updates (e.g., clearing the state)
  },
  extraReducers: builder => {
    builder
      // Handle fetching all lists
      .addCase(fetchAllWishlists.pending, state => {
        state.loading = 'pending';
      })
      .addCase(fetchAllWishlists.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.lists = action.payload; // The normalized lists are correctly set
      })
      .addCase(fetchAllWishlists.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload;
      })

      // Handle adding an item to a list
      .addCase(addItemToWishlist.fulfilled, (state, action) => {
        const updatedList = action.payload.data; // Assuming the API returns an object with a 'data' key
        // Find and replace the updated list in the state
        state.lists = state.lists.map(list =>
          list._id === updatedList._id
            ? {
                ...updatedList,
                items: updatedList.products || updatedList.restaurants,
              }
            : list
        );
      })

      // Handle removing an item from a list
      .addCase(removeItemFromWishlist.fulfilled, (state, action) => {
        const updatedList = action.payload.data;
        // Find and replace the updated list in the state
        state.lists = state.lists.map(list =>
          list._id === updatedList._id
            ? {
                ...updatedList,
                items: updatedList.products || updatedList.restaurants,
              }
            : list
        );
      });
  },
});

export default wishlistSlice.reducer;
