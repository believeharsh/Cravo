import React from 'react';
import Icon from '../../../components/ui/Icon';
import { useCartActions } from '../../../hooks/useCartActions';

const CartItem = ({ item }) => {
  const product = item.product;

  const { handleUpdateQuantity, handleOpenDeleteModal } = useCartActions();

  // Calculate the original price based on the product's price and promotional discount
  const originalPrice = product.promotionalDiscount?.value
    ? product.price + product.promotionalDiscount.value
    : product.price;

  // Function to handle increasing the quantity
  const handleIncrement = () => {
    const newQuantity = item.quantity + 1;
    handleUpdateQuantity({ itemId: item._id, quantity: newQuantity });
  };

  // Function to handle decreasing the quantity
  const handleDecrement = () => {
    if (item.quantity > 1) {
      const newQuantity = item.quantity - 1;
      handleUpdateQuantity({ itemId: item._id, quantity: newQuantity });
    }
  };

  return (
    <div className="flex items-center space-x-4 border-b border-gray-100 py-2 px-1 last:border-b-0 last:pb-0">
      {/* Thumbnail */}
      <div className="flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden shadow-sm">
        <img
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
          {product.restaurant?.name && (
            <p className="text-sm text-gray-500 truncate mt-0.5">
              Restaurant: {product.restaurant.name}
            </p>
          )}

          {Array.isArray(item.customizations) &&
            item.customizations.length > 0 && (
              <p className="text-xs text-gray-400 truncate">
                {item.customizations.join(', ')}
              </p>
            )}

          {/* Price and Total */}
          <div className="flex items-center mt-1 space-x-4">
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
                <Icon name="indian-rupee" className="w-3 h-3" />
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
            onClick={handleDecrement}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition-colors cursor-pointer"
            disabled={item.quantity <= 1}
          >
            <Icon name="minus" size={14} className="text-gray-600" />
          </button>
          <span className="text-sm font-semibold text-gray-800 w-5 text-center">
            {item.quantity}
          </span>
          <button
            onClick={handleIncrement}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-yellow-400 hover:bg-yellow-500 transition-colors cursor-pointer"
          >
            <Icon name="plus" size={14} className="text-white" />
          </button>
        </div>
      </div>

      {/* Remove */}
      <button
        onClick={() => handleOpenDeleteModal(product.name, item._id)}
        className="ml-1 text-gray-400 hover:text-red-500 transition-colors flex-shrink-0 cursor-pointer"
      >
        <Icon name="trash" size={18} />
      </button>
    </div>
  );
};

export default CartItem;
