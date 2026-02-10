import React, { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import Icon from '../../../components/ui/Icon';
import { Link } from 'react-router-dom';

const RestaurantCardSkeleton = ({ width }) => (
  <div
    className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col p-4 animate-pulse"
    style={{ width }}
  >
    {/* Image Placeholder */}
    <div className="relative h-34 sm:h-36 bg-gray-200 rounded-lg"></div>

    {/* Details Placeholder */}
    <div className="flex flex-col mt-4">
      {/* Title */}
      <div className="h-6 bg-gray-200 rounded-md w-3/4 mb-2"></div>
      {/* Cuisine */}
      <div className="h-4 bg-gray-200 rounded-md w-2/3"></div>

      <div className="pt-3 mt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs mb-1">
          <div className="h-3 bg-gray-200 rounded-md w-1/3"></div>
          <div className="h-3 bg-gray-200 rounded-md w-1/4"></div>
        </div>
        <div className="flex items-center justify-between text-xs">
          <div className="h-3 bg-gray-200 rounded-md w-1/2"></div>
          <div className="h-3 bg-gray-200 rounded-md w-1/4"></div>
        </div>
      </div>
    </div>
  </div>
);

const RestaurantCard = ({ restaurant }) => {
  const imageUrl =
    restaurant.images?.[0] ||
    'https://placehold.co/400x240/f0f0f0/808080?text=Restaurant';
  return (
    <>
      <div
        className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out
               transform hover:-translate-y-1 cursor-pointer overflow-hidden flex flex-col mb-1"
      >
        {/* Restaurant Image */}
        <div className="relative h-34 sm:36 overflow-hidden">
          <img
            src={imageUrl}
            alt={restaurant.name}
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            onError={e => {
              e.target.src =
                'https://placehold.co/400x240/f0f0f0/808080?text=Restaurant';
            }}
          />
          {restaurant.is_active && (
            <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-semibold px-2  rounded-full shadow-md">
              Open
            </div>
          )}
          <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
            <Icon name={'star'} size={12} fill="#FACC15" />
            <span>{restaurant.rating}</span>
          </div>
        </div>

        {/* Restaurant Details with Fixed Height */}
        <div className="px-3 py-1 flex flex-col" style={{ minHeight: '160px' }}>
          <div>
            <h3 className="font-bold text-text-main text-lg mb-1 truncate">
              {restaurant.name}
            </h3>

            {/* Fixed-height container for cuisine type */}
            <div className="text-xs text-text-secondary overflow-hidden h-9 mb-2">
              <p className="line-clamp-2">
                {restaurant.cuisine_type.join(', ')}
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-border">
            <div className="flex items-center justify-between text-xs text-text-muted mb-1">
              <div className="flex items-center gap-1">
                <Icon name={'map-pin'} size={12} />
                <span className="truncate">
                  {restaurant?.address?.cityDetails?.name || 'N/A'}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Icon name={'clock'} size={12} />
                <span>{restaurant.delivery_time_mins} min</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-text-secondary font-medium">
                Min Order: ₹{restaurant.min_order_value}
              </span>
              <span className="text-text-muted">
                ({restaurant.numberOfReviews} reviews)
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const RestaurantsSection = () => {
  const itemsPerView = { mobile: 1, tablet: 2, desktop: 4 };
  const { data, isLoading, error } = useSelector(state => state.landingPage);
  const restaurantsData = data?.restaurants || [];

  // SSR-safe "items per view"
  const getItemsPerView = () => {
    if (typeof window === 'undefined') return itemsPerView.mobile;
    if (window.innerWidth >= 1024) return itemsPerView.desktop;
    if (window.innerWidth >= 640) return itemsPerView.tablet;
    return itemsPerView.mobile;
  };

  const [itemsToShow, setItemsToShow] = useState(getItemsPerView());
  const [index, setIndex] = useState(0);

  // Update on resize
  useEffect(() => {
    const update = () => setItemsToShow(getItemsPerView());
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Use useMemo to prevent re-computation on every render
  const maxIndex = useMemo(
    () => Math.max(0, restaurantsData.length - itemsToShow),
    [restaurantsData.length, itemsToShow]
  );

  // Keep index in range when viewport shrinks
  useEffect(() => {
    setIndex(i => Math.min(i, maxIndex));
  }, [itemsToShow, maxIndex]);

  const cardWidthPct = 100 / itemsToShow;
  const translatePct = -index * cardWidthPct;

  const renderContent = () => {
    if (isLoading) {
      // Render skeletons
      return [...Array(itemsToShow)].map((_, i) => (
        <div
          key={`skeleton-${i}`}
          className="flex-shrink-0 px-2 sm:px-3"
          style={{ width: `${cardWidthPct}%` }}
        >
          <RestaurantCardSkeleton width="100%" />
        </div>
      ));
    }

    if (error) {
      return (
        <p className="text-red-500 text-center w-full">
          Failed to load restaurants.
        </p>
      );
    }

    if (restaurantsData.length === 0) {
      return (
        <p className="text-text-muted text-center w-full">
          No popular restaurants found.
        </p>
      );
    }

    return restaurantsData.map(restaurant => {
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
    });
  };

  return (
    <section className="py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* header + arrows */}
        <div className="flex items-center justify-between mb-6 mt-15">
          <div>
            <h2 className="text-xl font-bold text-text-main">
              Popular Restaurants
            </h2>
            <p className="text-text-secondary text-sm mt-1">
              Discover top-rated restaurants near you
            </p>
          </div>
          {restaurantsData.length > itemsToShow && !isLoading && (
            <div className="flex gap-2">
              <button
                onClick={() => setIndex(i => Math.max(0, i - 1))}
                disabled={index === 0}
                className={`p-2 rounded-full border transition ${
                  index === 0
                    ? 'border-border text-gray-300 cursor-not-allowed'
                    : 'border-gray-300 text-text-secondary hover:border-border-focus hover:text-yellow-600'
                }`}
              >
                <Icon name={'chevron-left'} size={18} />
              </button>
              <button
                onClick={() => setIndex(i => Math.min(maxIndex, i + 1))}
                disabled={index === maxIndex}
                className={`p-2 rounded-full border transition ${
                  index === maxIndex
                    ? 'border-border text-gray-300 cursor-not-allowed'
                    : 'border-gray-300 text-text-secondary hover:border-border-focus hover:text-yellow-600'
                }`}
              >
                <Icon name={'chevron-right'} size={18} />
              </button>
            </div>
          )}
        </div>

        {/* slider track */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(${translatePct}%)` }}
          >
            {renderContent()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RestaurantsSection;
