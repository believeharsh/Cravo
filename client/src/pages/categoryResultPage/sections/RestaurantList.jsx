import React from 'react';
import RestaurantCard from '../../../components/shared/RestaurantCard';
import { Link } from 'react-router-dom';
import RestaurantCardSkeleton from '../../../components/shared/RestaurantCardSkeleton';

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
              to={`/menu/${restaurant_slug}/${restaurant._id}`}
              key={restaurant._id}
            >
              <RestaurantCard data={restaurant} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default RestaurantList;
