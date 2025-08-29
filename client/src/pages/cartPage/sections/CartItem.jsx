import React from 'react';
import Icon from '../../../components/ui/Icon';

const CartItem = ({ item, updateQuantity, removeItem }) => {
  // Use the nested 'product' object to access item details
  const product = item.product;

  // Calculate the original price based on the product's price and promotional discount
  const originalPrice =
    product.price + (product.promotionalDiscount?.value || 0);

  return (
    <div className="flex items-center space-x-4 border-b border-gray-100 py-3 last:border-b-0 last:pb-0">
      {/* Thumbnail */}
      <div className="flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden shadow-sm">
        <img
          // Access the image from the 'product' object
          src={
            product.images && product.images.length > 0
              ? product.images[0]
              : 'https://placehold.co/80x80/e5f0ff/5280cc?text=No+Image'
          }
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info & Quantity Controls */}
      <div className="flex-grow min-w-0 flex justify-between items-center">
        <div className="flex flex-col flex-grow">
          <h3 className="text-base font-semibold text-gray-900 truncate">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 truncate mt-0.5">
            Restaurant: {product.restaurant.name}
          </p>
          {item.customizations.length > 0 && (
            <p className="text-xs text-gray-400 truncate">
              {item.customizations.join(', ')}
            </p>
          )}

          {/* Price and Total */}
          <div className="flex items-center mt-2 space-x-4">
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-700">
                ₹{product.price.toFixed(2)}
              </span>
              {/* Check if a promotional discount exists */}
              {product.promotionalDiscount?.value > 0 && (
                <span className="ml-1 text-xs text-gray-400 line-through">
                  ₹{originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            <div className="flex items-center">
              <span className="text-sm font-normal text-gray-600">Total:</span>
              <span className="flex items-center ml-1 text-sm font-semibold text-gray-800">
                <Icon name="indian-rupee" className="w-4 h-4 mr-1" />
                <p>
                  {(item.quantity * product.price).toFixed(2)}{' '}
                  <span> | Quantity {item.quantity}</span>
                </p>
              </span>
            </div>
          </div>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center space-x-1 flex-shrink-0">
          <button
            // Pass the full item object to the updateQuantity function
            onClick={() => updateQuantity(item, item.quantity - 1)}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
            disabled={item.quantity <= 1}
          >
            <Icon name="minus" size={14} className="text-gray-600" />
          </button>
          <span className="text-sm font-semibold text-gray-800 w-5 text-center">
            {item.quantity}
          </span>
          <button
            // Pass the full item object to the updateQuantity function
            onClick={() => updateQuantity(item, item.quantity + 1)}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-yellow-400 hover:bg-yellow-500 transition-colors"
          >
            <Icon name="plus" size={14} className="text-white" />
          </button>
        </div>
      </div>

      {/* Remove */}
      <button
        // Pass the full item object to the removeItem function
        onClick={() => removeItem(item)}
        className="ml-2 text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
      >
        <Icon name="trash" size={18} />
      </button>
    </div>
  );
};

export default CartItem;
