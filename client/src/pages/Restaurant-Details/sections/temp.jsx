import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Icon from '../../../components/ui/Icon';
import {
  selectDefaultProductListId,
  selectDefaultProductListType,
} from '../../../features/wishList/wishListSelectors';
import { useCartActions } from '../../../hooks/useCartActions';
import { useFavoriteActions } from '../../../hooks/useWishlistActions';

const ProductCard = ({ item }) => {
  console.log('items in the productcard', item);
  const [isHovered, setIsHovered] = useState(false);
  const { handleAddToCart, handleDecreaseQuantity, handleIncreaseQuantity } =
    useCartActions();

  const existingItem = useSelector(state =>
    state.cart.items.find(cartItem => cartItem.product._id === item._id)
  );

  const { handleAddItemToWishlist, handleRemoveItemFromWishlist } =
    useFavoriteActions();
  const { lists } = useSelector(state => state.wishlist);
  console.log('user wishlists data', lists);

  const defaultProductListId = useSelector(selectDefaultProductListId);
  const list_type = useSelector(selectDefaultProductListType);

  console.log(defaultProductListId);
  console.log(list_type);

  const addWishListClick = () => {
    const payload = {
      listId: defaultProductListId,
      itemId: item._id,
      itemType: list_type === 'productList' ? 'product' : '',
    };
    handleAddItemToWishlist(payload);
  };

  return (
    <div
      className="relative flex transform flex-col justify-between rounded-3xl bg-white shadow-md transition-shadow duration-300 hover:scale-105 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image and Wishlist Icon */}
      <div className="relative overflow-hidden rounded-t-3xl">
        {item.images && item.images.length > 0 && (
          <img
            src={item.images[0]}
            alt={item.name}
            className="h-42 w-full rounded-t-3xl object-cover"
          />
        )}
        {isHovered && (
          <button
            onClick={addWishListClick}
            className="absolute top-4 right-4 cursor-pointer rounded-full bg-white p-2 text-gray-400 shadow-lg transition-colors duration-200 hover:text-red-500"
          >
            <Icon name="heart" className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Product Details and Actions */}
      <div className="flex flex-grow flex-col justify-between p-4">
        <div>
          {item.isBestseller && (
            <div className="mb-1 flex items-center text-sm font-semibold text-amber-500">
              <Icon name="star" className="mr-1 h-4 w-4 fill-current" />{' '}
              Bestseller
            </div>
          )}
          <h3 className="text-text-main mb-1 line-clamp-1 text-xl font-bold">
            {item.name}
          </h3>
          <p className="text-text-muted mb-2 line-clamp-2 text-sm">
            {item.description}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center">
            <Icon name="indian-rupee" className="text-text-main mr-1 h-4 w-4" />
            <span className="text-text-main text-xl font-extrabold">
              {item.price}
            </span>
          </div>

          {/* Add to Cart / Quantity Control */}
          {existingItem ? (
            <div className="flex items-center space-x-2 rounded-full border border-yellow-200 bg-white px-2 py-1">
              <button
                onClick={() => handleDecreaseQuantity(item, existingItem)}
                className="bg-primary text-text-main hover:bg-primary-hover flex h-6 w-6 items-center justify-center rounded-full font-semibold transition-colors duration-200"
              >
                <span className="flex h-4 w-4 items-center justify-center">
                  -
                </span>
              </button>
              <span className="text-text-main text-sm font-bold">
                {existingItem.quantity}
              </span>
              <button
                onClick={() => handleIncreaseQuantity(item)}
                className="bg-primary text-text-main hover:bg-primary-hover flex h-6 w-6 items-center justify-center rounded-full font-semibold transition-colors duration-200"
              >
                <span className="flex h-4 w-4 items-center justify-center">
                  +
                </span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleAddToCart(item)}
              className="bg-primary text-text-main hover:bg-primary-hover flex items-center rounded-full px-4 py-2 text-sm font-semibold shadow-md transition-colors duration-200"
            >
              <Icon name="shopping-cart" className="mr-2 h-4 w-4" /> Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
