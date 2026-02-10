import React from 'react';
import Icon from '../../../components/ui/Icon';

const RestaurantHeader = ({ restaurant }) => {
  return (
    <div
      className="relative mb-6 rounded-3xl overflow-hidden shadow-lg h-64 bg-cover bg-center"
      style={{ backgroundImage: `url(${restaurant.images?.[0]})` }}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative z-10 p-6 flex flex-col justify-end h-full">
        <h1 className="text-4xl font-bold text-white mb-2">
          {restaurant.name}
        </h1>
        <p className="text-white text-lg font-medium">
          {restaurant.cuisine_type?.join(', ')}
        </p>
        <div className="flex items-center text-white mt-2">
          <span className="flex items-center text-sm font-semibold bg-green-500 px-2 py-1 rounded-full mr-2">
            <Icon name="star" className="w-4 h-4 mr-1 fill-current" />{' '}
            {restaurant.rating}
          </span>
          <span className="flex items-center text-sm bg-primary px-2 py-1 rounded-full mr-2 text-text-main">
            <Icon name="timer" className="w-4 h-4 mr-1" />{' '}
            {restaurant.delivery_time_mins} mins
          </span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantHeader;
