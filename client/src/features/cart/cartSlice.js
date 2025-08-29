import { createSlice } from '@reduxjs/toolkit';

// A utility function to check for deep equality of two arrays of objects.
// This is used to compare customizations.
const areCustomizationsEqual = (arr1, arr2) => {
  if (!arr1 || !arr2) return !arr1 && !arr2;
  if (arr1.length !== arr2.length) return false;

  const sortedArr1 = [...arr1].sort((a, b) =>
    a.optionName.localeCompare(b.optionName)
  );
  const sortedArr2 = [...arr2].sort((a, b) =>
    a.optionName.localeCompare(b.optionName)
  );

  return sortedArr1.every((item, index) => {
    const otherItem = sortedArr2[index];
    return (
      item.optionName === otherItem.optionName &&
      JSON.stringify(item.selectedItems) ===
        JSON.stringify(otherItem.selectedItems)
    );
  });
};

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Reducer to add a product to the cart or update its quantity.
    // The payload now includes an optional `customizations` array.
    addToCart: (state, action) => {
      const { product, quantity = 1, customizations = [] } = action.payload;
      const existingItem = state.items.find(
        item =>
          item.product._id === product._id &&
          areCustomizationsEqual(item.customizations, customizations)
      );

      if (existingItem) {
        // If the same product with the exact same customizations exists,
        // just increase its quantity.
        existingItem.quantity += quantity;
      } else {
        // If it's a new line item (either new product or new customizations), add it.
        state.items.push({
          product,
          quantity,
          customizations,
          // We can't use the Mongoose ObjectId here, so we will use
          // a unique temporary ID for the frontend UI.
          _id: Math.random().toString(36).substr(2, 9),
        });
      }
    },

    // Reducer to remove a specific item from the cart.
    // The payload now needs the product ID and customizations to uniquely identify the item.
    removeFromCart: (state, action) => {
      const { product, customizations = [] } = action.payload;
      state.items = state.items.filter(
        item =>
          !(
            item.product._id === product._id &&
            areCustomizationsEqual(item.customizations, customizations)
          )
      );
    },

    // Reducer to update the quantity of a specific item.
    // The payload needs the product ID and customizations to uniquely identify the item.
    updateQuantity: (state, action) => {
      const { product, quantity, customizations = [] } = action.payload;
      const itemToUpdate = state.items.find(
        item =>
          item.product._id === product._id &&
          areCustomizationsEqual(item.customizations, customizations)
      );
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
        if (itemToUpdate.quantity <= 0) {
          state.items = state.items.filter(
            item =>
              !(
                item.product._id === product._id &&
                areCustomizationsEqual(item.customizations, customizations)
              )
          );
        }
      }
    },

    // Reducer to clear the entire cart.
    clearCart: state => {
      state.items = [];
    },
  },
});

// Export the actions so your components can use them to interact with the cart.
export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

// Export the reducer to be included in your Redux store.
export default cartSlice.reducer;
