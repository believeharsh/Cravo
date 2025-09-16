import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Icon from '../../../components/ui/Icon';
import { useCartActions } from '../../../hooks/useCartActions';

const ProductCard = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { handleAddToCart, handleDecreaseQuantity, handleIncreaseQuantity } =
    useCartActions();

  const existingItem = useSelector(state =>
    state.cart.items.find(cartItem => cartItem.product._id === item._id)
  );

  const handleAddClick = () => {
    // const payload = {
    //   itemId : item._id,
    //   itemType :
    // }
  };

  return (
    <div
      className="relative bg-white rounded-3xl shadow-md flex flex-col justify-between hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image and Wishlist Icon */}
      <div className="relative overflow-hidden rounded-t-3xl">
        {item.images && item.images.length > 0 && (
          <img
            src={item.images[0]}
            alt={item.name}
            className="w-full h-42 object-cover rounded-t-3xl"
          />
        )}
        {isHovered && (
          <button
            onClick={handleAddToWishlist}
            className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg text-gray-400 hover:text-red-500 transition-colors duration-200 cursor-pointer"
          >
            <Icon name="heart" className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Product Details and Actions */}
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          {item.isBestseller && (
            <div className="flex items-center text-sm font-semibold text-amber-500 mb-1">
              <Icon name="star" className="w-4 h-4 mr-1 fill-current" />{' '}
              Bestseller
            </div>
          )}
          <h3 className="text-xl font-bold text-gray-900 mb-1 line-clamp-1">
            {item.name}
          </h3>
          <p className="text-sm text-gray-500 mb-2 line-clamp-2">
            {item.description}
          </p>
        </div>

        <div className="mt-auto flex justify-between items-center">
          <div className="flex items-center">
            <Icon name="indian-rupee" className="text-gray-800 w-4 h-4 mr-1" />
            <span className="text-xl font-extrabold text-gray-800">
              {item.price}
            </span>
          </div>

          {/* Add to Cart / Quantity Control */}
          {existingItem ? (
            <div className="flex items-center space-x-2 bg-white border border-yellow-200 rounded-full py-1 px-2">
              <button
                onClick={() => handleDecreaseQuantity(item, existingItem)}
                className="flex items-center justify-center w-6 h-6 rounded-full bg-yellow-400 text-gray-800 font-semibold hover:bg-yellow-500 transition-colors duration-200"
              >
                <span className="w-4 h-4 flex items-center justify-center">
                  -
                </span>
              </button>
              <span className="text-sm font-bold text-gray-800">
                {existingItem.quantity}
              </span>
              <button
                onClick={() => handleIncreaseQuantity(item)}
                className="flex items-center justify-center w-6 h-6 rounded-full bg-yellow-400 text-gray-800 font-semibold hover:bg-yellow-500 transition-colors duration-200"
              >
                <span className="w-4 h-4 flex items-center justify-center">
                  +
                </span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleAddToCart(item)}
              className="flex items-center px-4 py-2 bg-yellow-400 text-gray-800 font-semibold rounded-full hover:bg-yellow-500 transition-colors duration-200 shadow-md text-sm"
            >
              <Icon name="shopping-cart" className="w-4 h-4 mr-2" /> Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
