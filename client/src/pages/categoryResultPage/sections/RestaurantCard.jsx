import React from 'react';
import Icon from '../../../components/ui/Icon';

const RestaurantCard = ({ restaurant }) => {
  console.log('restaurants cards data', restaurant);
  const { name, rating, cuisine_type, images, address, min_order_value } =
    restaurant;

  const imageUrl =
    images && images.length > 0 ? images[0] : 'https://via.placeholder.com/400';
  const deliveryTime = '20-25 mins';

  return (
    <div className="w-60 rounded-xl overflow-hidden shadow hover:shadow-md transition-shadow duration-300 cursor-pointer">
      {/* Image Section */}
      <div className="relative">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-40 object-cover rounded-xl"
        />

        {/* ITEMS AT ₹49 Banner */}
        <div className="absolute bottom-0 left-0 right-0 bg-black opacity-50 px-3 py-1 rounded-b-xl">
          <div className=" text-white text-sm font-bold">
            ITEMS AT ₹{min_order_value}{' '}
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="pt-2 pb-3 px-2">
        <h3 className="text-xl font-bold text-gray-900 truncate ">{name}</h3>

        <div className="flex items-center space-x-2 text-sm text-gray-600 font-medium">
          <div className="flex items-center space-x-1 text-green-600">
            <Icon name="star" size={14} className="text-green-500" />
            <span>{rating}</span>
          </div>
          <span className="text-gray-400">•</span>
          <span>{deliveryTime}</span>
        </div>

        <p className="text-gray-500 text-md truncate font-semibold">
          {cuisine_type.join(', ')}
        </p>

        <p className="text-gray-500 text-md truncate font-semibold">
          {address.street}
        </p>
      </div>
    </div>
  );
};

export default RestaurantCard;
