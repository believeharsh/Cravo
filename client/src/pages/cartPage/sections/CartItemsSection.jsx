import React from 'react';
import CartItem from './CartItem';

const CartItemsSection = ({ cartItems }) => {
  console.log('cart Items inside teh cartItmes', cartItems);
  return (
    <div className="bg-white rounded-2xl shadow-md p-2">
      <h2 className="text-lg font-bold text-gray-800 mb-2">Items</h2>
      <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
        {cartItems.map(item => (
          <CartItem key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CartItemsSection;
