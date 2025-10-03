import React from 'react';
import Icon from '../ui/Icon';
import {
  selectDefaultRestaurantListId,
  selectIsRestaurantInAnyRestaurantList,
} from '../../features/wishList/wishListSelectors';
import { useSelector } from 'react-redux';
import { useFavoriteActions } from '../../hooks/useWishlistActions';

/**
 * A reusable component to display restaurant information in a compact grid layout.
 *
 * @param {object} props
 * @param {object} props.data - The restaurant data object.
 * @param {object} [props.listId] - Optional ID object if used within a specific wishlist context.
 * @param {string} [props.className=''] - Optional Tailwind class to apply to the outer container for dimension overrides.
 */
const RestaurantCard = ({ data, listId, className = '' }) => {
  const { lists, handleAddItemToWishlist, handleRemoveItemFromWishlist } =
    useFavoriteActions();

  const isRestaurantInWishlist = useSelector(state =>
    selectIsRestaurantInAnyRestaurantList(state, data._id)
  );

  const defaultRestaurantListId = useSelector(selectDefaultRestaurantListId);

  const handleWishlistClick = e => {
    e.stopPropagation();
    e.preventDefault();

    // Finding the list where this item exists
    const listWithRestaurant = lists.find(list =>
      list.restaurants?.some(restaurant => restaurant._id === data._id)
    );

    // Finding the default list object to get its name
    const defaultList = lists.find(
      list => list._id === defaultRestaurantListId
    );

    if (listId) {
      // Scenario 1: On a specific wishlist page (listId is provided).
      const listName =
        lists.find(list => list._id === listId._id)?.name || 'Wishlist';

      handleRemoveItemFromWishlist({
        listId: listId._id,
        itemId: data._id,
        itemType: 'restaurant',
        listName: listName,
        itemName: data.name,
      });
    } else if (isRestaurantInWishlist && listWithRestaurant) {
      // Scenario 2: On other pages where the item is ALREADY in a wishlist.
      handleRemoveItemFromWishlist({
        listId: listWithRestaurant._id,
        itemId: data._id,
        itemType: 'restaurant',
        listName: listWithRestaurant.name,
        itemName: data.name,
      });
    } else {
      // Scenario 3: On other pages where the item is NOT in a wishlist.
      handleAddItemToWishlist({
        listId: defaultRestaurantListId,
        itemId: data._id,
        itemType: 'restaurant',
        itemName: data.name,
        listName: defaultList?.name || 'My Favorites',
      });
    }
  };

  // --- Fixed Grid Layout Classes ---
  const baseContainerClasses =
    'bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 ease-in-out group cursor-pointer overflow-hidden border border-gray-100';

  const cardLayoutClasses = 'w-full flex flex-col';
  const imageContainerClasses = 'relative flex-shrink-0 overflow-hidden h-36'; // Fixed height for grid
  const contentContainerClasses = 'px-4 py-3 flex flex-col flex-grow space-y-2';

  const finalContainerClasses = `${baseContainerClasses} ${cardLayoutClasses} ${className}`;
  const imageUrl =
    data.images?.[0] ||
    'https://placehold.co/400x240/f0f0f0/808080?text=Restaurant';

  return (
    <div className={finalContainerClasses}>
      {/* IMAGE CONTAINER */}
      <div className={imageContainerClasses}>
        <img
          src={imageUrl}
          alt={data.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={e => {
            e.target.src =
              'https://placehold.co/400x240/f0f0f0/808080?text=Restaurant';
          }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

        {/* Min order badge (Grid placement) */}
        <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm rounded-lg px-2 py-1 shadow-md">
          <span className="text-gray-800 font-bold text-sm">
            Min ₹{data.min_order_value}
          </span>
        </div>

        {/* Delivery time badge (Grid placement) */}
        <div className="absolute top-3 right-3 bg-white/90 text-gray-800 rounded-full px-2 py-1 text-xs font-semibold shadow-md">
          {data.delivery_time_mins}m
        </div>

        {/* Favorite button */}
        <button
          onClick={handleWishlistClick}
          className={`absolute top-3 left-3 bg-white/80 hover:bg-white rounded-full p-2 transition-all duration-200 z-10 cursor-pointer 
            ${
              isRestaurantInWishlist
                ? 'text-red-500 opacity-100' // Always visible if favorited
                : 'text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100' // Show on hover
            }`}
        >
          <Icon name="heart" size={16} className="w-4 h-4 fill-current" />
        </button>
      </div>

      {/* CONTENT SECTION */}
      <div className={contentContainerClasses}>
        {/* Restaurant name - Fixed text size */}
        <h3 className="text-lg font-bold text-gray-800 group-hover:text-yellow-500 transition-colors line-clamp-1 leading-tight">
          {data.name}
        </h3>

        {/* Cuisine tags */}
        <div className="flex items-center gap-1 text-xs text-gray-600 font-medium overflow-hidden whitespace-nowrap">
          {data.cuisine_type?.slice(0, 4).map((cuisine, idx) => (
            <span key={cuisine}>
              {cuisine}
              {idx < data.cuisine_type.slice(0, 4).length - 1 && ' •'}
            </span>
          ))}
          {/* Add ellipsis if there are more than 4 items, though the content will be clipped anyway */}
          {data.cuisine_type?.length > 4 && <span>...</span>}
        </div>

        {/* Rating and Reviews */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100">
            <Icon
              name="star"
              size={14}
              className="text-emerald-600 fill-current"
            />
            <span className="text-emerald-700 font-semibold text-sm">
              {data.rating}
            </span>
          </div>
          {data.numberOfReviews && (
            <span className="text-gray-500 text-sm">
              ({data.numberOfReviews}+ reviews)
            </span>
          )}
        </div>

        {/* Footer Info (Delivery Time & Veg Status) */}
        <div className="mt-auto pt-2 border-t border-gray-100 flex items-center justify-between text-sm">
          <span className="text-gray-600 font-medium">
            {data.delivery_time_mins} mins
          </span>
          <span className="text-emerald-600 font-semibold">
            {data.is_veg ? 'Veg' : 'Non-Veg'}
          </span>
        </div>

        {/* Address (Street) */}
        <div className="">
          {data.address?.street && (
            <p className="text-gray-500 text-shadow-xs text-sm truncate">
              {data.address.street}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
