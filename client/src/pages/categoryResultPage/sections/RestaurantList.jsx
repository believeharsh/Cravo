// import React from 'react';
// import RestaurantCard from './RestaurantCard';

// const RestaurantList = ({ restaurants }) => {
//   return (
//     <div className="flex justify-center items-center mx-auto flex-wrap gap-3.5">
//       {restaurants.map(restaurant => (
//         <RestaurantCard key={restaurant._id} restaurant={restaurant} />
//       ))}
//     </div>
//   );
// };

// export default RestaurantList;
import { Link } from 'react-router-dom';
import RestaurantCard from './RestaurantCard';

const RestaurantList = ({ restaurants }) => {
  return (
    <div className="flex justify-center items-center mx-auto flex-wrap gap-3.5">
      {restaurants.map(restaurant => (
        <Link
          key={restaurant._id}
          to={`/menu/${restaurant._id}`}
          className="no-underline text-inherit"
        >
          <RestaurantCard restaurant={restaurant} />
        </Link>
      ))}
    </div>
  );
};

export default RestaurantList;
