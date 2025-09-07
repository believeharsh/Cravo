import React from 'react';
import RestaurantCard from './RestaurantCard';
import { Link } from 'react-router-dom';

const RestaurantCardSkeleton = () => (
  <div className="w-70 rounded-2xl overflow-hidden shadow-md bg-white animate-pulse">
    {/* Image Placeholder */}
    <div className="relative w-full h-40 bg-gray-200"></div>

    {/* Info Placeholder */}
    <div className="pt-2 pb-3 px-3">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="flex items-center space-x-2 text-sm text-gray-600 font-medium my-1">
        <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
        <span className="text-gray-400">•</span>
        <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
      </div>
      <div className="h-4 w-2/3 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
    </div>
  </div>
);

// const RestaurantList = ({ restaurants }) => {
//   return (
//     <div className="mt-8">
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
//         {restaurants.map(restaurant => {
//           const restaurant_slug = restaurant.name
//             .toLowerCase()
//             .replace(/\s+/g, '-');
//           return (
//             <Link
//               key={restaurant._id}
//               to={`/menu/${restaurant_slug}/${restaurant._id}`}
//             >
//               <RestaurantCard restaurant={restaurant} />
//             </Link>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

const RestaurantList = ({ restaurants, isLoading }) => {
  if (isLoading) {
    return (
      <div className="mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {[...Array(8)].map((_, i) => (
            <RestaurantCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (restaurants.length === 0) {
    return (
      <p className="text-center text-gray-600 text-lg mt-8">
        No restaurants found.
      </p>
    );
  }

  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {restaurants.map(restaurant => {
          const restaurant_slug = restaurant.name
            .toLowerCase()
            .replace(/\s+/g, '-');
          return (
            <Link
              key={restaurant._id}
              to={`/menu/${restaurant_slug}/${restaurant._id}`}
            >
              <RestaurantCard restaurant={restaurant} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default RestaurantList;

// export default RestaurantList;
