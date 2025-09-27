import Icon from '../ui/Icon';
import {
  selectDefaultRestaurantListId,
  selectIsRestaurantInAnyRestaurantList,
} from '../../features/wishList/wishListSelectors';
import { useSelector } from 'react-redux';
import { useFavoriteActions } from '../../hooks/useWishlistActions';

// Skeleton Card Component
const SkeletonCard = ({ width }) => (
  <div className="flex-shrink-0 px-2" style={{ width }}>
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 w-full flex flex-col overflow-hidden animate-pulse">
      {/* Skeleton Image */}
      <div className="h-34 bg-gray-200 flex-shrink-0 relative">
        <div className="absolute bottom-3 left-3 bg-gray-300 rounded-lg w-20 h-6"></div>
        <div className="absolute top-3 right-3 bg-gray-300 rounded-full w-16 h-6"></div>
      </div>

      {/* Skeleton Content */}
      <div className="px-3 pt-1 pb-2 space-y-2">
        {/* Restaurant name skeleton */}
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>

        {/* Rating skeleton */}
        <div className="flex items-center gap-3">
          <div className="h-6 bg-gray-200 rounded w-16"></div>
          <div className="h-4 bg-gray-200 rounded w-20"></div>
        </div>

        {/* Tags skeleton */}
        <div className="flex gap-1.5">
          <div className="h-6 bg-gray-200 rounded-full w-16"></div>
          <div className="h-6 bg-gray-200 rounded-full w-20"></div>
          <div className="h-6 bg-gray-200 rounded-full w-12"></div>
        </div>

        {/* Footer skeleton */}
        <div className="border-t border-gray-100 pt-2 flex justify-between">
          <div className="h-4 bg-gray-200 rounded w-16"></div>
          <div className="h-4 bg-gray-200 rounded w-20"></div>
        </div>
      </div>
    </div>
  </div>
);

const RestaurantCard = ({ data, listId }) => {
  const { lists, handleAddItemToWishlist, handleRemoveItemFromWishlist } =
    useFavoriteActions();

  const isRestaurantInWishlist = useSelector(state =>
    selectIsRestaurantInAnyRestaurantList(state, data._id)
  );

  const defaultRestaurantListId = useSelector(selectDefaultRestaurantListId);

  const handleWishlistClick = () => {
    // Find the list where this item exists
    const listWithRestaurant = lists.find(list =>
      list.restaurants?.some(restaurant => restaurant._id === data._id)
    );

    // Find the default list object to get its name
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

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out group cursor-pointer w-full flex flex-col overflow-hidden border border-gray-100 my-1">
        {/* IMAGE CONTAINER */}
        <div className="relative h-34 flex-shrink-0 overflow-hidden">
          {/* Use the correct data structure from the API response */}
          <img
            src={data.images?.[0] || '/placeholder-restaurant.jpg'}
            different
            // structure
            alt={data.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            onError={e => {
              e.target.src = '/placeholder-restaurant.jpg';
            }}
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

          {/* Min order badge */}
          <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm rounded-lg px-2 py-1 shadow-md">
            <span className="text-gray-800 font-bold text-sm">
              Min ₹{data.min_order_value}
            </span>
          </div>

          {/* Delivery time badge */}
          <div className="absolute top-3 right-3 bg-emerald-500 text-white rounded-full px-2 py-1 text-xs font-medium shadow-md">
            {data.delivery_time_mins}m
          </div>

          {/* Favorite button */}
          <button
            onClick={handleWishlistClick}
            className={`absolute top-3 left-3 bg-white/80 hover:bg-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200
                 ${
                   isRestaurantInWishlist
                     ? 'text-red-500'
                     : 'text-gray-400 hover:text-red-500'
                 }`}
          >
            <Icon name="heart" size={14} className="w-4 h-4 fill-current" />
          </button>
        </div>

        {/* CONTENT SECTION */}
        <div className="px-3 py-2 flex flex-col flex-grow space-y-2">
          {/* Restaurant name with better truncation */}
          <h3 className="text-base font-bold text-gray-800 group-hover:text-yellow-500 transition-colors line-clamp-1 leading-tight">
            {data.name}
          </h3>

          {/* Rating section - enhanced */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100">
              <Icon
                name="star"
                size={12}
                className="text-emerald-600 fill-current"
              />
              <span className="text-emerald-700 font-semibold text-xs">
                {data.rating}
              </span>
            </div>
            <span className="text-gray-500 text-xs">
              {data.numberOfReviews}+ reviews
            </span>
          </div>

          {/* Cuisine tags - improved spacing */}
          <div className="flex flex-wrap gap-1">
            {/* Use optional chaining for safety */}
            {data.cuisine_type?.slice(0, 3).map(cuisine => (
              <span
                key={cuisine}
                className="text-xs text-gray-600 font-medium transition-colors"
              >
                {cuisine}
              </span>
            ))}
          </div>

          {/* Footer - simplified */}
          <div className="mt-auto pt-1 border-t border-gray-100 flex items-center justify-between text-xs">
            <span className="text-gray-600 font-medium">
              {data.delivery_time_mins} mins
            </span>
            <span className="text-emerald-600 font-semibold">
              {data.is_veg ? 'veg' : ''}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default RestaurantCard;
