import { useDispatch } from 'react-redux';
import {
  fetchUserCart,
  addItemToCart,
  removeItemFromCart,
  updateQuantity,
  clearCart,
} from '../features/cart/cartSlice';

import { openDeleteModal, closeDeleteModal } from '../features/ui/uiSlice';
import { useToastStack } from './useStackToasts';
import CustomToast from '../components/CustomToast';

export const useCartActions = () => {
  const dispatch = useDispatch();
  const { showStackedToast } = useToastStack();

  const handleGetUserCart = () => {
    dispatch(fetchUserCart());
  };

  const handleAddToCart = itemId => {
    dispatch(
      addItemToCart({
        productId: itemId,
        quantity: 1,
        customizations: [],
      })
    );
  };

  const handleUpdateQuantity = ({ itemId, quantity }) => {
    dispatch(updateQuantity({ itemId, quantity }));
  };

  const handleDeleteItemFromCart = async ({ itemId, itemName }) => {
    try {
      await dispatch(removeItemFromCart({ itemId: itemId })).unwrap();
      dispatch(closeDeleteModal());
      showStackedToast(
        CustomToast,
        {
          message: `${itemName} has been removed from your cart`,
          actionText: '',
          onActionClick: () => {},
        },
        { duration: 3000 }
      );
    } catch (error) {}
  };

  const handleOpenDeleteModal = (itemName, itemId) => {
    dispatch(
      openDeleteModal({
        itemName: itemName,
        itemId: itemId,
      })
    );
  };

  const handleCloseDeleteModal = () => {
    dispatch(closeDeleteModal());
  };

  const handleClearUserCart = () => {
    dispatch(clearCart());
  };

  return {
    handleGetUserCart,
    handleAddToCart,
    handleDeleteItemFromCart,
    handleUpdateQuantity,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleClearUserCart,
  };
};
