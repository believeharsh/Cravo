import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Icon from '../ui/Icon';
import { useCartActions } from '../../hooks/useCartActions';
import { useFavoriteActions } from '../../hooks/useWishlistActions';
import {
  selectDefaultProductListId,
  selectIsProductInAnyProductList,
} from '../../features/wishList/wishListSelectors';

const ProductCard = ({ item, listId }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { handleAddToCart, handleDecreaseQuantity, handleIncreaseQuantity } =
    useCartActions();
  const { lists, handleAddItemToWishlist, handleRemoveItemFromWishlist } =
    useFavoriteActions();

  // Use the selector correctly.
  const isProductInWishlist = useSelector(state =>
    selectIsProductInAnyProductList(state, item._id)
  );

  const existingCartItem = useSelector(state =>
    state.cart.items.find(cartItem => cartItem.product._id === item._id)
  );

  const defaultProductListId = useSelector(selectDefaultProductListId);

  // This function now handles both adding and removing based on the state.
  // const handleWishlistClick = () => {
  //   if (!defaultProductListId) {
  //     console.error('Default product list not found. Cannot add/remove item.');
  //     return;
  //   }

  //   if (isProductInWishlist) {
  //     // Product is in ANY list, so we will remove it from the DEFAULT list
  //     handleRemoveItemFromWishlist({
  //       listId: defaultProductListId,
  //       itemId: item._id,
  //       itemType: 'product',
  //     });
  //   } else {
  //     // Product is not in any list, so we will add it to the DEFAULT list
  //     handleAddItemToWishlist({
  //       listId: defaultProductListId,
  //       itemId: item._id,
  //       itemType: 'product',
  //     });
  //   }
  // };

  const handleWishlistClick = () => {
    // If a listId is provided (meaning we are on the favorites page),
    // we assume the user wants to remove the item.
    if (listId) {
      handleRemoveItemFromWishlist({
        listId: listId,
        itemId: item._id,
        itemType: 'product',
      });
    } else {
      // Otherwise, use the default list logic
      handleAddItemToWishlist({
        listId: defaultProductListId,
        itemId: item._id,
        itemType: 'product',
      });
    }
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
        {/* {isHovered && ( */}
        <button
          onClick={handleWishlistClick}
          className={`absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg transition-colors duration-200 cursor-pointer ${
            isProductInWishlist
              ? 'text-red-500' // Heart is red if product is in the wishlist
              : 'text-gray-400 hover:text-red-500' // Heart is gray if not in the wishlist
          }`}
        >
          <Icon name="heart" className="w-5 h-5 fill-current" />
        </button>
        {/* // )} */}
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
          {existingCartItem ? (
            <div className="flex items-center space-x-2 bg-white border border-yellow-200 rounded-full py-1 px-2">
              <button
                onClick={() => handleDecreaseQuantity(item, existingCartItem)}
                className="flex items-center justify-center w-6 h-6 rounded-full bg-yellow-400 text-gray-800 font-semibold hover:bg-yellow-500 transition-colors duration-200"
              >
                <span className="w-4 h-4 flex items-center justify-center">
                  -
                </span>
              </button>
              <span className="text-sm font-bold text-gray-800">
                {existingCartItem.quantity}
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
