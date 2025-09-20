import { useSelector, useDispatch } from 'react-redux';
import {
  removeItemFromWishlist,
  addItemToWishlist,
  createNewProductList,
  TransferProductFromList,
} from '../features/wishList/wishListSlice';
import CustomToast from '../components/CustomToast';
import toast from 'react-hot-toast';
import { closeWishlistModal, openWishlistModal } from '../features/ui/uiSlice';
import { useToastStack } from './useStackToasts';

export const useFavoriteActions = () => {
  const dispatch = useDispatch();
  const { lists, loading } = useSelector(state => state.wishlist);
  const { showStackedToast } = useToastStack();

  const handleAddItemToWishlist = async ({
    listId,
    itemId,
    itemType,
    itemName,
    listName,
  }) => {
    try {
      await dispatch(
        addItemToWishlist({ listId, itemId, itemType, itemName, listName })
      ).unwrap();

      showStackedToast(
        CustomToast,
        {
          message: `${itemName} added to the ${listName}`,
          actionText: 'Change List',
          onActionClick: () => {
            dispatch(
              openWishlistModal({
                productId: itemId,
                sourceListId: listId,
              })
            );
          },
        },
        { duration: 3000 }
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
      await dispatch(
        removeItemFromWishlist({ listId, itemId, itemType, itemName })
      ).unwrap();

      showStackedToast(
        CustomToast,
        {
          message: `${itemName} removed from ${listName}`,
          actionText: '',
          onActionClick: () => {
            dispatch(openWishlistModal());
          },
        },
        { duration: 6000 }
      );
    } catch (error) {
      // You can also use the stacked toast for errors if needed
    }
  };

  const handleCreateNewProductList = async ({ listName }) => {
    dispatch(createNewProductList({ listName }));
  };

  const handleTransferProductFromList = async ({
    productId,
    sourceListId,
    destinationListId,
  }) => {
    try {
      await dispatch(
        TransferProductFromList({ productId, sourceListId, destinationListId })
      ).unwrap();
      dispatch(closeWishlistModal());
      showStackedToast(
        CustomToast,
        {
          message: `Item has moved`,
          actionText: '',
          onActionClick: () => {},
        },
        { duration: 3000 }
      );
    } catch (error) {}
  };

  return {
    lists,
    loading,
    handleAddItemToWishlist,
    handleRemoveItemFromWishlist,
    handleCreateNewProductList,
    handleTransferProductFromList,
  };
};
