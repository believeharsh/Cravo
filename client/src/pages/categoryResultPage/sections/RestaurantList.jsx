import React from 'react';
import RestaurantCard from './RestaurantCard'; // Assuming it's in the same folder

const RestaurantList = ({ restaurants }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {restaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
};

export default RestaurantList;