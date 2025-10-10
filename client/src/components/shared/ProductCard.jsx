import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Icon from '../ui/Icon';
import { useCartActions } from '../../hooks/useCartActions';
import { useFavoriteActions } from '../../hooks/useWishlistActions';
import {
  selectDefaultProductListId,
  selectIsProductInAnyProductList,
} from '../../features/wishList/wishListSelectors';
import { useAuthForm } from '../../hooks/useAuthForm';

const ProductCard = ({ item, listId }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { isAuthenticated } = useSelector(state => state.auth);

  const { handleOpenAuthRequireModal } = useAuthForm();

  const { handleAddToCart, handleUpdateQuantity } = useCartActions();
  const { lists, handleAddItemToWishlist, handleRemoveItemFromWishlist } =
    useFavoriteActions();

  const isProductInWishlist = useSelector(state =>
    selectIsProductInAnyProductList(state, item._id)
  );

  const existingCartItem = useSelector(state =>
    state.cart.items.find(cartItem => cartItem.product._id === item._id)
  );

  const defaultProductListId = useSelector(selectDefaultProductListId);

  const handleWishlistClick = () => {
    // Finding the list where this item exists
    const listWithItem = lists.find(list =>
      list.items?.some(productItem => productItem._id === item._id)
    );

    // Finding the default list object to get its name
    const defaultList = lists.find(list => list._id === defaultProductListId);

    if (listId) {
      // Scenario 1: On a specific wishlist page (listId is provided).
      const listName =
        lists.find(list => list._id === listId)?.name || 'Wishlist';

      handleRemoveItemFromWishlist({
        listId: listId,
        itemId: item._id,
        itemType: 'product',
        listName: listName,
        itemName: item.name,
      });
    } else if (isProductInWishlist && listWithItem) {
      // Scenario 2: On other pages where the item is ALREADY in a wishlist.
      handleRemoveItemFromWishlist({
        listId: listWithItem._id,
        itemId: item._id,
        itemType: 'product',
        listName: listWithItem.name,
        itemName: item.name,
      });
    } else {
      // Scenario 3: On other pages where the item is NOT in a wishlist.
      handleAddItemToWishlist({
        listId: defaultProductListId,
        itemId: item._id,
        itemType: 'product',
        itemName: item.name,
        listName: defaultList?.name || 'My Favorites',
      });
    }
  };

  const handleIncrement = () => {
    const newQuantity = existingCartItem.quantity + 1;
    handleUpdateQuantity({
      itemId: existingCartItem._id,
      quantity: newQuantity,
    });
  };

  // Function to handle decreasing the quantity
  const handleDecrement = () => {
    if (existingCartItem.quantity > 1) {
      const newQuantity = existingCartItem.quantity - 1;
      handleUpdateQuantity({
        itemId: existingCartItem._id,
        quantity: newQuantity,
      });
    }
  };

  return (
    <div
      className="relative bg-white rounded-2xl shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-[1.02] flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section */}
      <div className="relative overflow-hidden rounded-t-2xl">
        {item.images && item.images.length > 0 && (
          <img
            src={item.images[0]}
            alt={item.name}
            className="w-full h-28 object-cover rounded-t-2xl"
          />
        )}

        {/* Wishlist */}
        <button
          onClick={
            isAuthenticated ? handleWishlistClick : handleOpenAuthRequireModal
          }
          className={`absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md transition-colors duration-200 cursor-pointer ${
            isProductInWishlist
              ? 'text-red-500'
              : 'text-gray-400 hover:text-red-500'
          }`}
        >
          <Icon name="heart" className="w-4 h-4 fill-current" />
        </button>
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col flex-grow">
        {/* Top Section */}
        <div className="mb-2">
          {item.isBestseller && (
            <span className="inline-flex items-center text-xs font-semibold text-amber-500 mb-1">
              <Icon name="star" className="w-3.5 h-3.5 mr-1 fill-current" />{' '}
              Bestseller
            </span>
          )}
          <h3 className="text-base font-bold text-gray-900 line-clamp-1">
            {item.name}
          </h3>
          <p className="text-xs text-gray-500 line-clamp-2">
            {item.description}
          </p>
        </div>

        {/* Bottom Section (Price + Actions) */}
        <div className="mt-auto flex justify-between items-center pt-2 border-t border-gray-100">
          {/* Price */}
          <div className="flex items-center">
            <Icon name="indian-rupee" className="text-gray-800 w-4 h-4 mr-1" />
            <span className="text-base font-extrabold text-gray-800">
              {item.price}
            </span>
          </div>

          {/* Add to Cart / Quantity */}
          {existingCartItem ? (
            <div className="flex items-center space-x-1.5 bg-white border border-yellow-200 rounded-full py-0.5 px-2">
              <button
                onClick={handleDecrement}
                className="flex items-center justify-center w-6 h-6 rounded-full bg-yellow-400 text-gray-800 font-semibold hover:bg-yellow-500 transition-colors duration-200 cursor-pointer"
              >
                -
              </button>
              <span className="text-sm font-bold text-gray-800">
                {existingCartItem.quantity}
              </span>
              <button
                onClick={handleIncrement}
                className="flex items-center justify-center w-6 h-6 rounded-full bg-yellow-400 text-gray-800 font-semibold hover:bg-yellow-500 transition-colors duration-200 cursor-pointer"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleAddToCart(item._id)}
              className="flex items-center px-3 py-1.5 bg-yellow-400 text-gray-800 font-semibold rounded-full hover:bg-yellow-500 transition-colors duration-200 shadow-md text-sm cursor-pointer"
            >
              <Icon name="shopping-cart" className="w-4 h-4 mr-1" /> Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
