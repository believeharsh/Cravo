import { createSelector } from '@reduxjs/toolkit';

// A simple selector to get the entire cart state from the Redux store.
export const selectCartState = state => state.cart;

// A memoized selector that gets the items array from the cart state.
export const selectCartItems = createSelector(
  [selectCartState],
  cart => cart.items
);

// A memoized selector that gets the total quantity directly from the state,
// as the backend now provides this value.
export const selectCartTotalQuantity = createSelector(
  [selectCartState],
  cart => cart.totalQuantity
);

// A memoized selector that gets the total price directly from the state.
export const selectCartTotalValue = createSelector(
  [selectCartState],
  cart => cart.totalPrice
);
