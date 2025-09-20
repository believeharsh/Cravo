import { useDispatch } from 'react-redux';
import {
  fetchUserCart,
  addItemToCart,
  removeItemFromCart,
  updateQuantity,
} from '../features/cart/cartSlice';

export const useCartActions = () => {
  const dispatch = useDispatch();

  const handleGetUserCart = async () => {
    const response = await dispatch(fetchUserCart()).unwrap();
    console.log(response);
  };

  const handleAddToCart = item => {
    dispatch(
      addToCart({
        product: item,
        quantity: 1,
        customizations: [],
      })
    );
  };

  const handleIncreaseQuantity = item => {
    dispatch(
      addToCart({
        product: item,
        quantity: 1,
        customizations: [],
      })
    );
  };

  const handleDecreaseQuantity = (item, existingItem) => {
    console.log('existingItem in the handleDecreaseQuantity ', existingItem);
    dispatch(
      updateQuantity({
        product: item,
        quantity: existingItem.quantity - 1,
        customizations: [],
      })
    );
  };

  const handleUpdateQuantity = ({ itemId, quantity }) => {
    dispatch(updateQuantity({ itemId, quantity }));
  };

  const handleDeleteItemFromCart = ({ itemId }) => {
    // console.log('the item inside teh removeItemFromcart', item);
    dispatch(
      removeItemFromCart({
        itemId: itemId,
      })
    );
  };

  return {
    handleGetUserCart,
    handleAddToCart,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    handleDeleteItemFromCart,
    handleUpdateQuantity,
  };
};
