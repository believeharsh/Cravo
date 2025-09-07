import React from 'react';
import Icon from '../../../components/ui/Icon';

// const RestaurantCard = ({ restaurant }) => {
//   const { name, rating, cuisine_type, images, address, min_order_value } =
//     restaurant;

//   const imageUrl =
//     images && images.length > 0
//       ? images[0]
//       : 'https://placehold.co/400x240/f0f0f0/808080?text=Restaurant';
//   const deliveryTime = '20-25 mins';

//   return (
//     <div className="w-70 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer bg-white">
//       {/* Image Section with Background and Banner */}
//       <div
//         className="relative w-full h-40 bg-cover bg-center"
//         style={{
//           backgroundImage: `url(${imageUrl})`,
//         }}
//       >
//         {/* Min Order Value Banner */}
//         <div className="absolute bottom-0 left-0 right-0 px-3 pb-2">
//           <div className="inline-block bg-black/60 px-3 py-1 rounded-md">
//             <span className="text-white text-sm font-bold tracking-wide italic">
//               ITEMS AT ₹{min_order_value}
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Info Section */}
//       <div className="pt-2 pb-3 px-3">
//         <h3 className="text-xl font-bold text-gray-900 truncate">{name}</h3>

//         <div className="flex items-center space-x-2 text-sm text-gray-600 font-medium my-1">
//           <div className="flex items-center space-x-1 text-green-600">
//             <Icon name="star" size={14} className="text-green-500" />
//             <span>{rating}</span>
//           </div>
//           <span className="text-gray-400">•</span>
//           <span>{deliveryTime}</span>
//         </div>

//         <p className="text-gray-500 text-md truncate font-semibold">
//           {cuisine_type.join(', ')}
//         </p>

//         <p className="text-gray-500 text-md truncate font-semibold">
//           {address.street}
//         </p>
//       </div>
//     </div>
//   );
// };

const RestaurantCard = ({ restaurant }) => {
  const {
    name,
    rating,
    cuisine_type,
    images,
    address,
    min_order_value,
    is_active,
  } = restaurant;

  const imageUrl =
    images && images.length > 0
      ? images[0]
      : 'https://placehold.co/400x240/f0f0f0/808080?text=Restaurant';
  const deliveryTime = '20-25 mins';

  return (
    <div className="w-70 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer bg-white">
      {/* Image Section with Background and Banner */}
      <div
        className="relative w-full h-40 bg-cover bg-center"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      >
        {is_active && (
          <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-semibold px-2 rounded-full shadow-md">
            Open
          </div>
        )}
        <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
          <Icon name={'star'} size={12} fill="#FACC15" />
          <span>{rating}</span>
        </div>
        {/* Min Order Value Banner */}
        <div className="absolute bottom-0 left-0 right-0 px-3 pb-2">
          <div className="inline-block bg-black/60 px-3 py-1 rounded-md">
            <span className="text-white text-sm font-bold tracking-wide italic">
              ITEMS AT ₹{min_order_value}
            </span>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="pt-2 pb-3 px-3">
        <h3 className="text-xl font-bold text-gray-900 truncate">{name}</h3>
        <div className="flex items-center space-x-2 text-sm text-gray-600 font-medium my-1">
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
