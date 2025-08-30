import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectCartTotalQuantity,
  selectCartTotalValue,
} from '../../../features/cart/cartSelectors';
import { useNavigate } from 'react-router-dom';

const CartStatusSection = () => {
  const cartCount = useSelector(selectCartTotalQuantity);
  const cartValue = useSelector(selectCartTotalValue);
  const Navigate = useNavigate();
  // This component will not render anything if the cart is empty.
  if (cartCount === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 text-white p-2 shadow-lg rounded-t-2xl">
      <div className="max-w-md mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-semibold">
            {cartCount} {cartCount === 1 ? 'item' : 'items'} added
          </span>
          <span className="text-xl font-bold">₹{cartValue.toFixed(2)}</span>
        </div>
        <button
          onClick={() => {
            Navigate('/cart');
          }}
          className="px-6 py-2 bg-yellow-400 text-gray-800 font-semibold rounded-full hover:bg-yellow-500 transition-colors cursor-pointer"
        >
          View Cart
        </button>
      </div>
    </div>
  );
};

export default CartStatusSection;
