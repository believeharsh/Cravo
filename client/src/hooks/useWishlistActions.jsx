import { useSelector, useDispatch } from 'react-redux';
import {
  removeItemFromWishlist,
  addItemToWishlist,
  createNewProductList,
} from '../features/wishList/wishListSlice';
import CustomToast from '../components/CustomToast';
import toast from 'react-hot-toast';
import { openWishlistModal } from '../features/ui/uiSlice';

export const useFavoriteActions = () => {
  const dispatch = useDispatch();

  const { lists, loading } = useSelector(state => state.wishlist);

  const handleAddItemToWishlist = async ({
    listId,
    itemId,
    itemType,
    itemName,
    listName,
  }) => {
    try {
      const resultAction = await dispatch(
        addItemToWishlist({ listId, itemId, itemType, itemName, listName })
      ).unwrap();

      // If we reach this line, the thunk was successful.
      // so i can safely show the success toast.
      toast.custom(
        t => (
          <CustomToast
            message={`${itemName} added to the ${listName}`}
            actionText="Change List"
            onActionClick={() => {
              // Logic to open the wishlist modal
              // dispatch(openWishlistModal());
              toast.dismiss(t.id);
            }}
            t={t}
          />
        ),
        { duration: 6000 }
      );
    } catch (error) {
      toast.error('Failed to add item to wishlist. Please try again.');
    }
  };

  const handleRemoveItemFromWishlist = async ({
    listId,
    itemId,
    itemType,
    itemName,
    listName,
  }) => {
    try {
      const response = await dispatch(
        removeItemFromWishlist({ listId, itemId, itemType, itemName })
      ).unwrap();

      toast.custom(
        t => (
          <CustomToast
            message={`${itemName} removed from ${listName}`}
            actionText="Change List"
            onActionClick={() => {
              // Logic to open the wishlist modal
              dispatch(openWishlistModal());
              toast.dismiss(t.id);
            }}
            t={t}
          />
        ),
        { duration: 6000 }
      );
    } catch (error) {}
  };

  const handleCreateNewProductList = async ({ listName }) => {
    dispatch(createNewProductList({ listName }));
  };

  return {
    lists,
    loading,
    handleAddItemToWishlist,
    handleRemoveItemFromWishlist,
    handleCreateNewProductList,
  };
};
