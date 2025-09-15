import { useDispatch } from 'react-redux';
import {
  addToCart,
  removeFromCart,
  updateQuantity,
} from '../features/cart/cartSlice';

export const useCartActions = () => {
  const dispatch = useDispatch();

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

  const handleDeleteItemFromCart = item => {
    console.log('the item inside teh removeItemFromcart', item);
    dispatch(
      removeFromCart({
        product: item.product,
        customizations: item.customizations,
      })
    );
  };

  return {
    handleAddToCart,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    handleDeleteItemFromCart,
  };
};
