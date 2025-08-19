import React from 'react';
import Icon from '../../../components/ui/Icon';
import Button from '../../../components/ui/Button';

/**
 * Renders a single item in the shopping cart.
 *
 * @param {object} props - Component props.
 * @param {object} props.item - The cart item object.
 * @param {function(number, number): void} props.updateQuantity - Function to update this item's quantity.
 * @param {function(number): void} props.removeItem - Function to remove this item from the cart.
 * @returns {JSX.Element} The CartItem component.
 */
const CartItem = ({ item, updateQuantity, removeItem }) => {
  return (
    <div className="flex gap-4 p-4 border border-cream rounded-xl hover:border-gray-300 transition-colors">
      <img
        src={item.image}
        alt={item.name}
        className="w-20 h-20 rounded-lg object-cover bg-gray-200 flex-shrink-0"
      />

      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-semibold text-charcoal">{item.name}</h4>
            <p className="text-sm text-medium-gray">{item.restaurant}</p>
            {item.customizations.length > 0 && (
              <p className="text-xs text-medium-gray mt-1">
                {item.customizations.join(', ')}
              </p>
            )}
          </div>

          <Button
            onClick={() => removeItem(item.id)}
            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            type="button" // Important: Ensure this is a button type
          >
            <Icon name="trash-2" className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex items-end justify-between mt-4">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-charcoal">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
            {item.price < item.originalPrice && (
              <span className="text-sm line-through text-medium-gray">
                ${(item.originalPrice * item.quantity).toFixed(2)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="p-2 bg-gray-100 hover:bg-gray-200 text-medium-gray rounded-lg"
              type="button" // Important: Ensure this is a button type
            >
              <Icon name="minus" className="w-4 h-4" />
            </Button>
            <span className="font-medium text-charcoal w-8 text-center">
              {item.quantity}
            </span>
            <Button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="p-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg"
              type="button" // Important: Ensure this is a button type
            >
              <Icon name="plus" className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
