import { createSelector } from '@reduxjs/toolkit';

// A simple selector to get the items array from the state.
const selectCartItems = state => state.cart.items;

// A memoized selector that calculates the total quantity of all items in the cart.
export const selectCartTotalQuantity = createSelector(
  [selectCartItems],
  items => items.reduce((total, item) => total + item.quantity, 0)
);

// A memoized selector that calculates the total price of all items in the cart.
export const selectCartTotalValue = createSelector([selectCartItems], items =>
  items.reduce((total, item) => total + item.quantity * item.product.price, 0)
);
