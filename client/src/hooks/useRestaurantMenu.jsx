import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurantMenu } from '../features/restaurantMenu/restaurantMenuSlice';

import { useToastStack } from './useStackToasts';

/**
 * A custom hook to manage fetching and accessing the data for a specific restaurant's menu
 * from the Redux store. It handles the initial fetch, loading/error states, and utilizes
 * the caching logic implemented in the Redux thunk.
 * @param {string} restaurantID - The ID of the restaurant to fetch.
 * @returns {{
 * restaurant: Object | null,
 * menuItems: Array,
 * loading: 'idle' | 'pending' | 'succeeded' | 'failed',
 * error: string | null,
 * refetchMenu: Function,
 * isInitialLoading: boolean,
 * isError: boolean
 * }}
 */

export const useRestaurantMenu = restaurantID => {
  const dispatch = useDispatch();
  const { showStackedToast } = useToastStack();

  // 1. Select the relevant state for the given restaurantID from the normalized store
  const restaurantState = useSelector(
    state => state.restaurantMenu.menus[restaurantID] || {}
  );

  // Destructure with default values for cleaner component usage
  const {
    restaurant = null,
    products = [],
    loading = 'idle',
    error = null,
  } = restaurantState;

  // 2. Memoized function to handle the fetch operation
  const handleFetchRestaurantMenu = useCallback(
    (forceRefresh = false) => {
      // Skip if already pending AND not forcing a refresh
      if (loading === 'pending' && !forceRefresh) {
        return;
      }

      dispatch(fetchRestaurantMenu(restaurantID))
        .unwrap() // Unwrap handles the fulfillment and rejection
        .catch(e => {
          // Error case (API failed OR cache hit)
          if (e && !e.isCacheHit) {
            // Only show toast if it was a genuine API failure
            console.error(
              `[Menu Fetch Error] Restaurant ID ${restaurantID}:`,
              e
            );
          }
        });
    },
    // Dependencies needed for useCallback
    [dispatch, restaurantID, loading, error, showStackedToast]
  );

  // 3. Effect to automatically trigger the fetch when the component mounts or ID changes
  useEffect(() => {
    // Check if we already have successfully fetched data for this ID
    const hasCachedData = loading === 'succeeded' && products.length > 0;

    if (restaurantID && !hasCachedData) {
      // Only dispatch the action if we don't already have the data
      handleFetchRestaurantMenu();
    }
    // Dependency array uses the state properties to decide if a refetch is necessary
  }, [restaurantID, handleFetchRestaurantMenu, loading, products.length]);

  // 4. Return the data and derived status
  return {
    restaurant,
    menuItems: products,
    loading,
    error,
    // Expose the function for manual refresh (e.g., used by the error button)
    refetchMenu: () => handleFetchRestaurantMenu(true),

    // isInitialLoading is true if we are waiting for the FIRST successful response.
    // Once successful, it should be false, even if loading becomes 'pending' for a refetch.
    isInitialLoading: loading === 'idle' || loading === 'pending',
    isError: loading === 'failed',
  };
};
