import React from 'react';
import CartItem from './CartItem';

/**
 * Renders the section displaying all items in the shopping cart.
 *
 * @param {object} props - Component props.
 * @param {Array<object>} props.cartItems - An array of cart item objects.
 * @param {function(number, number): void} props.updateQuantity - Function to update an item's quantity.
 * @param {function(number): void} props.removeItem - Function to remove an item from the cart.
 * @returns {JSX.Element} The CartItemsSection component.
 */

const CartItemsSection = ({ cartItems, updateQuantity, removeItem }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-cream p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-charcoal">Order Items</h3>
        <span className="text-medium-gray">{cartItems.length} items</span>
      </div>

      <div className="space-y-4">
        {cartItems.map(item => (
          <CartItem
            key={item.id}
            item={item}
            updateQuantity={updateQuantity}
            removeItem={removeItem}
          />
        ))}
      </div>
    </div>
  );
};

export default CartItemsSection;
