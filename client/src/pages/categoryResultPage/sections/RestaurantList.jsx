import React from 'react';
import RestaurantCard from './RestaurantCard';
import { Link } from 'react-router-dom';

const RestaurantList = ({ restaurants }) => {
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
