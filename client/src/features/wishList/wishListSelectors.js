import { createSelector } from '@reduxjs/toolkit';

// A basic selector to get the entire wishlist state
const selectWishlistState = state => state.wishlist;

/**
 * Selector to find the default product list from the state.
 * @returns {object | undefined} The default product list object, or undefined if not found.
 */
export const selectDefaultProductList = createSelector(
  [selectWishlistState],
  wishlistState =>
    wishlistState.lists.find(
      list => list.isDefault && list.list_type === 'productList'
    )
);

/**
 * Selector to get the ID of the default product list.
 * @returns {string | null} The list ID, or null if not found.
 */
export const selectDefaultProductListId = createSelector(
  [selectDefaultProductList],
  defaultProductList => (defaultProductList ? defaultProductList._id : null)
);

export const selectDefaultProductListType = createSelector(
  [selectDefaultProductList],
  defaultProductList =>
    defaultProductList ? defaultProductList.list_type : null
);

export const selectIsProductInAnyProductList = createSelector(
  [selectWishlistState, (state, productId) => productId],
  (wishlistState, productId) => {
    const targetProductId = String(productId);

    const isProductPresent = wishlistState.lists.some(
      list =>
        list.list_type === 'productList' &&
        list.items?.some(item => String(item._id) === targetProductId)
    );

    return isProductPresent;
  }
);

/**
 * Selector to find the default restaurant list from the state.
 * @returns {object | undefined} The default restaurant list object, or undefined if not found.
 */
export const selectDefaultRestaurantList = createSelector(
  [selectWishlistState],
  wishlistState =>
    wishlistState.lists.find(
      list => list.isDefault && list.list_type === 'restaurantList'
    )
);

/**
 * Selector to get the ID of the default restaurant list.
 * @returns {string | null} The list ID, or null if not found.
 */
export const selectDefaultRestaurantListId = createSelector(
  [selectDefaultRestaurantList],
  defaultRestaurantList =>
    defaultRestaurantList ? defaultRestaurantList._id : null
);

export const selectIsRestaurantInAnyRestaurantList = createSelector(
  [selectWishlistState, (state, restaurantId) => restaurantId],

  (wishlistState, restaurantId) => {
    const targetRestaurantId = String(restaurantId);
    console.log(restaurantId);
    const isRestaurantPresent = wishlistState.lists.some(
      list =>
        list.list_type === 'restaurantList' &&
        list.restaurants?.some(item => String(item._id) === targetRestaurantId)
    );

    return isRestaurantPresent;
  }
);

/**
 * Selector to get the type of the default restaurant list.
 * @returns {string | null} The list type, or null if not found.
 */
export const selectDefaultRestaurantListType = createSelector(
  [selectDefaultRestaurantList],
  defaultRestaurantList =>
    defaultRestaurantList ? defaultRestaurantList.list_type : null
);
