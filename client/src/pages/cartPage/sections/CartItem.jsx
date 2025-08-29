import React from 'react';
import Icon from '../../../components/ui/Icon';

const CartItem = ({ item, updateQuantity, removeItem }) => {
  return (
    <div className="flex items-center space-x-2 border-b border-gray-100 py-1 last:border-b-0 last:pb-0">
      {/* Thumbnail */}
      <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden shadow-sm">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex-grow min-w-0">
        <h3 className="text-sm font-semibold text-gray-900 truncate">
          {item.name}
        </h3>
        <p className="text-xs text-gray-500 truncate">{item.restaurant}</p>
        {item.customizations.length > 0 && (
          <p className="text-xs text-gray-400 truncate">
            {item.customizations.join(', ')}
          </p>
        )}
        <div className="flex items-center mt-0.5">
          <span className="text-sm font-semibold text-gray-700">
            ₹{item.price.toFixed(2)}
          </span>
          {item.originalPrice > item.price && (
            <span className="ml-1 text-xs text-gray-400 line-through">
              ₹{item.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center space-x-1">
        <button
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
          disabled={item.quantity <= 1}
        >
          <Icon name="minus" size={14} className="text-gray-600" />
        </button>
        <span className="text-sm font-semibold text-gray-800 w-5 text-center">
          {item.quantity}
        </span>
        <button
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="w-7 h-7 flex items-center justify-center rounded-full bg-yellow-400 hover:bg-yellow-500 transition-colors"
        >
          <Icon name="plus" size={14} className="text-white" />
        </button>
      </div>

      {/* Remove */}
      <button
        onClick={() => removeItem(item.id)}
        className="ml-1 text-gray-400 hover:text-red-500 transition-colors"
      >
        <Icon name="trash" size={18} />
      </button>
    </div>
  );
};

export default CartItem;
