import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';
import { API } from '../../config/api';

// Initial state for the wishlist feature
const initialState = {
  lists: [], // An array to hold all of the user's wishlists (products & restaurants)
  loading: 'idle', // 'idle' | 'pending' | 'succeeded' | 'failed'
  error: null,
};

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
      console.log('the combinedLists', combinedLists);
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
          { productId: itemId }
        );
      } else if (itemType === 'restaurant') {
        response = await axiosInstance.post(
          API.WISHLIST.ADD_ITEM_TO_RESTAURANT_LIST(listId),
          { productId: itemId }
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
          { data: { productId: itemId } }
        );
      }
      return response.data; // The API returns the updated list
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Thunk for creating the new wishlist
export const createNewProductList = createAsyncThunk(
  'wishList/newProductList',
  async ({ listName }, thunkAPI) => {
    try {
      let response;
      response = await axiosInstance.post(
        API.WISHLIST.CREATE_NEW_PRODUCT_LIST,
        { name: listName }
      );
      console.log('response of the createNewProductList', response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Helper Function to Normalize API Responses
const normalizeAndCombineLists = (productLists, restaurantLists) => {
  const combinedLists = {};

  // Process all product lists and standardize to 'items' key
  productLists.forEach(list => {
    combinedLists[list._id] = {
      ...list,
      items: list.products || [], // Use 'items' as the standard key
      // The original 'products' key is now implicitly discarded
    };
  });

  // Process all restaurant lists and standardize to 'items' key
  restaurantLists.forEach(list => {
    // This part should not try to 'merge' lists with the same ID, as product and restaurant lists
    // have different IDs. It should just create a new entry.
    combinedLists[list._id] = {
      ...list,
      items: list.restaurants || [], // Use 'items' as the standard key
    };
  });

  return Object.values(combinedLists);
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // Handle fetching all lists
      .addCase(fetchAllWishlists.pending, state => {
        state.loading = 'pending';
      })
      .addCase(fetchAllWishlists.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.lists = action.payload; // Correctly sets the normalized lists
      })
      .addCase(fetchAllWishlists.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload;
      })

      // Handle adding and removing items
      .addCase(addItemToWishlist.fulfilled, (state, action) => {
        const updatedList = action.payload.data;
        state.lists = state.lists.map(list =>
          list._id === updatedList._id
            ? {
                ...updatedList,
                // Check the list type from the API response and map it to the 'items' key
                items:
                  updatedList.list_type === 'productList'
                    ? updatedList.products
                    : updatedList.restaurants,
              }
            : list
        );
      })
      .addCase(removeItemFromWishlist.fulfilled, (state, action) => {
        const updatedList = action.payload.data;
        state.lists = state.lists.map(list =>
          list._id === updatedList._id
            ? {
                ...updatedList,
                // Check the list type from the API response and map it to the 'items' key
                items:
                  updatedList.list_type === 'productList'
                    ? updatedList.products
                    : updatedList.restaurants,
              }
            : list
        );
      })

      // Handle creating new Product and Restaurants List
      .addCase(createNewProductList.fulfilled, (state, action) => {
        // Extract the new list object from the payload.
        const newList = action.payload.data;

        // Create a new array by copying the existing lists and adding the new one.
        state.lists.push(newList);
      });
  },
});

export default wishlistSlice.reducer;
