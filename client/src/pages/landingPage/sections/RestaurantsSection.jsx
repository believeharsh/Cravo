import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Icon from '../../../components/ui/Icon';
import { Link } from 'react-router-dom';

const RestaurantCard = ({ restaurant }) => (
  <div
    className="bg-white rounded-xl border border-gray-200 overflow-hidden
      hover:-translate-y-1 hover:shadow-md
      transition-transform duration-200 ease-out cursor-pointer"
  >
    {/* Restaurant Image */}
    <div className="relative h-32 sm:h-36 overflow-hidden">
      <img
        src={restaurant.images[0]}
        alt={restaurant.name}
        className="w-full h-full object-cover"
      />
      {restaurant.is_active && (
        <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
          Open
        </div>
      )}
      <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
        <Icon name={'star'} size={10} fill="currentColor" />
        {restaurant.rating}
      </div>
    </div>

    {/* Restaurant Details */}
    <div className="p-4">
      <h3 className="font-semibold text-gray-800 text-sm mb-1 truncate">
        {restaurant.name}
      </h3>

      <div className="flex items-center gap-1 mb-2">
        <span className="text-xs text-gray-500">
          {restaurant.cuisine_type.join(', ')}
        </span>
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <Icon name={'map-pin'} size={10} />
          <span>{restaurant.address.city}</span>
        </div>
        <div className="flex items-center gap-1">
          <Icon name={'clock'} size={10} />
          <span>{restaurant.delivery_radius_km}km</span>
        </div>
      </div>

      <div className="mt-2 pt-2 border-t border-gray-100">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-600">
            Min Order: ₹{restaurant.min_order_value}
          </span>
          <span className="text-gray-500">
            ({restaurant.numberOfReviews} reviews)
          </span>
        </div>
      </div>
    </div>
  </div>
);

const RestaurantsSection = () => {
  const itemsPerView = { mobile: 1, tablet: 2, desktop: 3 };
  const { data, isLoading, error } = useSelector(state => state.landingPage);
  const [restaurants, setRestaurants] = useState([]);

  console.log('restaurant section is getting rendered');

  useEffect(() => {
    if (data?.data?.featuredRestaurants?.data?.restaurants) {
      setRestaurants(data.data.featuredRestaurants.data.restaurants);
      console.log('usestate restaurants in the resturantsection', restaurants);
    }
  }, [data]);

  /* SSR-safe "items per view" */
  const getItemsPerView = () => {
    if (typeof window === 'undefined') return itemsPerView.mobile;
    if (window.innerWidth >= 1024) return itemsPerView.desktop;
    if (window.innerWidth >= 640) return itemsPerView.tablet;
    return itemsPerView.mobile;
  };

  const [itemsToShow, setItemsToShow] = useState(getItemsPerView());
  const [index, setIndex] = useState(0);

  /* update on resize */
  useEffect(() => {
    const update = () => setItemsToShow(getItemsPerView());
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  /* keep index in range when viewport shrinks */
  const maxIndex = Math.max(0, restaurants.length - itemsToShow);
  useEffect(
    () => setIndex(i => Math.min(i, maxIndex)),
    [itemsToShow, maxIndex]
  );

  const cardWidthPct = 100 / itemsToShow;
  const translatePct = -index * cardWidthPct;

  return (
    <section className="py-5 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* header + arrows */}
        <div className="flex items-center justify-between mb-6 mt-15">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Popular Restaurants
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              Discover top-rated restaurants near you
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIndex(i => Math.max(0, i - 1))}
              disabled={index === 0}
              className={`p-2 rounded-full border transition ${
                index === 0
                  ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                  : 'border-gray-300 text-gray-600 hover:border-yellow-400 hover:text-yellow-600'
              }`}
            >
              <Icon name={'chevron-left'} size={18} />
            </button>
            <button
              onClick={() => setIndex(i => Math.min(maxIndex, i + 1))}
              disabled={index === maxIndex}
              className={`p-2 rounded-full border transition ${
                index === maxIndex
                  ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                  : 'border-gray-300 text-gray-600 hover:border-yellow-400 hover:text-yellow-600'
              }`}
            >
              <Icon name={'chevron-right'} size={18} />
            </button>
          </div>
        </div>

        {/* slider track */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(${translatePct}%)` }}
          >
            {restaurants.map(restaurant => {
              const restaurant_slug = restaurant.name
                .toLowerCase()
                .replace(/\s+/g, '-');
              return (
                <Link
                  key={restaurant._id}
                  to={`/menu/${restaurant_slug}/${restaurant._id}`}
                  className="flex-shrink-0 px-2 sm:px-3"
                  style={{ width: `${cardWidthPct}%` }}
                >
                  <RestaurantCard restaurant={restaurant} />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RestaurantsSection;
