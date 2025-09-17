import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  fetchAllWishlists,
  removeItemFromWishlist,
  addItemToWishlist,
} from '../features/wishList/wishListSlice';

export const useFavoriteActions = () => {
  const dispatch = useDispatch();

  const { lists, loading } = useSelector(state => state.wishlist);
  const handleAddItemToWishlist = ({ listId, itemId, itemType }) => {
    dispatch(addItemToWishlist({ listId, itemId, itemType }));
  };

  const handleRemoveItemFromWishlist = ({ listId, itemId, itemType }) => {
    dispatch(removeItemFromWishlist({ listId, itemId, itemType }));
  };

  // Return the state and action functions for the component to use
  return {
    lists,
    loading,
    handleAddItemToWishlist,
    handleRemoveItemFromWishlist,
  };
};
