import React, { useState, useEffect } from 'react';
import Icon from '../../../components/ui/Icon';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// Skeleton Card Component
const SkeletonCard = ({ width }) => (
  <div className="flex-shrink-0 px-2" style={{ width }}>
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 w-full flex flex-col overflow-hidden animate-pulse">
      {/* Skeleton Image */}
      <div className="h-34 bg-gray-200 flex-shrink-0 relative">
        <div className="absolute bottom-3 left-3 bg-gray-300 rounded-lg w-20 h-6"></div>
        <div className="absolute top-3 right-3 bg-gray-300 rounded-full w-16 h-6"></div>
      </div>

      {/* Skeleton Content */}
      <div className="px-3 pt-1 pb-2 space-y-2">
        {/* Restaurant name skeleton */}
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>

        {/* Rating skeleton */}
        <div className="flex items-center gap-3">
          <div className="h-6 bg-gray-200 rounded w-16"></div>
          <div className="h-4 bg-gray-200 rounded w-20"></div>
        </div>

        {/* Tags skeleton */}
        <div className="flex gap-1.5">
          <div className="h-6 bg-gray-200 rounded-full w-16"></div>
          <div className="h-6 bg-gray-200 rounded-full w-20"></div>
          <div className="h-6 bg-gray-200 rounded-full w-12"></div>
        </div>

        {/* Footer skeleton */}
        <div className="border-t border-gray-100 pt-2 flex justify-between">
          <div className="h-4 bg-gray-200 rounded w-16"></div>
          <div className="h-4 bg-gray-200 rounded w-20"></div>
        </div>
      </div>
    </div>
  </div>
);

const RestaurantCard = ({ data }) => (
  <div className="bg-white rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out group cursor-pointer w-full flex flex-col overflow-hidden border border-gray-100 my-1">
    {/* IMAGE CONTAINER */}
    <div className="relative h-34 flex-shrink-0 overflow-hidden">
      <img
        src={data.images[0]}
        alt={data.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
        onError={e => {
          e.target.src = '/placeholder-restaurant.jpg'; // Fallback image
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

      {/* Min order badge - improved visibility */}
      <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm rounded-lg px-1 py-0.5 shadow-md">
        <span className="text-gray-800 font-bold text-xs">
          Min ₹{data.min_order_value}
        </span>
      </div>

      {/* Delivery time badge - improved colors */}
      <div className="absolute top-3 right-3 bg-emerald-500 text-white rounded-full px-2 py-1 text-xs font-medium shadow-md">
        {data.delivery_time_mins}m
      </div>

      {/* Favorite button */}
      <button className="absolute top-3 left-3 bg-white/80 hover:bg-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200">
        <Icon
          name="heart"
          size={14}
          className="text-gray-600 hover:text-red-500"
        />
      </button>
    </div>

    {/* CONTENT SECTION */}
    <div className="px-3 py-2 flex flex-col flex-grow space-y-2">
      {/* Restaurant name with better truncation */}
      <h3 className="text-base font-bold text-gray-800 group-hover:text-yellow-500 transition-colors line-clamp-1 leading-tight">
        {data.name}
      </h3>

      {/* Rating section - enhanced */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100">
          <Icon
            name="star"
            size={12}
            className="text-emerald-600 fill-current"
          />
          <span className="text-emerald-700 font-semibold text-xs">
            {data.rating}
          </span>
        </div>
        <span className="text-gray-500 text-xs">
          {data.numberOfReviews}+ reviews
        </span>
      </div>

      {/* Cuisine tags - improved spacing */}
      <div className="flex items-center gap-1 overflow-hidden">
        <div className="flex gap-1 whitespace-nowrap overflow-hidden text-ellipsis">
          {data.cuisine_type.slice(0, 3).map((cuisine, index) => (
            <span
              key={cuisine}
              className="text-xs text-gray-600 font-medium transition-colors"
            >
              {cuisine}
              {index < data.cuisine_type.slice(0, 3).length - 1 ? ',' : ''}
            </span>
          ))}
        </div>
        {data.cuisine_type.length > 3 && (
          <span className="text-xs text-gray-600 font-medium flex-shrink-0">
            ...
          </span>
        )}
      </div>

      {/* Footer - simplified */}
      <div className="mt-auto pt-1 border-t border-gray-100 flex items-center justify-between text-xs">
        <span className="text-gray-600 font-medium">
          {data.delivery_time_mins} mins
        </span>
        <span className="text-emerald-600 font-semibold">
          {data.is_veg ? 'veg' : ''}
        </span>
      </div>
    </div>
  </div>
);

const TopRestaurants = () => {
  const { data, loading, error } = useSelector(state => state.landingPage);
  const { city } = useSelector(state => state.location);
  const restaurants = data?.restaurants || [];

  console.log(restaurants);
  const itemsPerView = { mobile: 1.2, tablet: 2.5, desktop: 5 };

  const getItemsPerView = () => {
    if (typeof window === 'undefined') return itemsPerView.desktop;
    if (window.innerWidth >= 1024) return itemsPerView.desktop;
    if (window.innerWidth >= 768) return itemsPerView.tablet;
    return itemsPerView.mobile;
  };

  const [itemsToShow, setItemsToShow] = useState(itemsPerView.desktop);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const update = () => setItemsToShow(getItemsPerView());
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    if (restaurants.length > 0) {
      setCurrentIndex(i =>
        Math.min(i, Math.max(0, restaurants.length - itemsToShow))
      );
    }
  }, [itemsToShow, restaurants.length]);

  const maxIndex = Math.max(0, restaurants.length - itemsToShow);
  const cardWidthPct = 100 / itemsToShow;
  const translateXPct = -currentIndex * cardWidthPct;

  // Enhanced Loading State
  if (loading || restaurants.length === 0) {
    return (
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Header skeleton */}
          <div className="mb-8">
            <div className="h-10 bg-gray-200 rounded w-96 mb-2 animate-pulse"></div>
            <div className="h-5 bg-gray-200 rounded w-80 animate-pulse"></div>
          </div>

          {/* Cards skeleton */}
          <div className="flex space-x-0">
            {Array.from({ length: Math.floor(itemsToShow) }).map((_, i) => (
              <SkeletonCard key={i} width={`${cardWidthPct}%`} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error State
  if (error) {
    return (
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8">
            <Icon
              name="alert-circle"
              size={48}
              className="text-red-500 mx-auto mb-4"
            />
            <h3 className="text-lg font-semibold text-red-800 mb-2">
              Unable to load restaurants
            </h3>
            <p className="text-red-600 mb-4">
              Something went wrong while fetching the data.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Enhanced Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-800 mb-1">
              Top Restaurants Chain In {city}
            </h2>
            <p className="text-gray-600 text-sm lg:text-base">
              Discover {restaurants.length} popular restaurants loved by our
              customers
            </p>
          </div>

          {/* Enhanced Navigation */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentIndex(i => Math.max(0, i - 1))}
              disabled={currentIndex === 0}
              className={`p-2 rounded-full border transition-all cursor-pointer  ${
                currentIndex === 0
                  ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                  : 'border-gray-300 text-gray-600 hover:border-yellow-400 hover:text-yellow-600'
              }`}
              aria-label="Previous restaurants"
            >
              <Icon name="chevron-left" size={18} />
            </button>
            <button
              onClick={() => setCurrentIndex(i => Math.min(maxIndex, i + 1))}
              disabled={currentIndex >= maxIndex}
              className={`p-2 rounded-full border transition-all  cursor-pointer ${
                currentIndex >= maxIndex
                  ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                  : 'border-gray-300 text-gray-600 hover:border-yellow-400 hover:text-yellow-600'
              }`}
              aria-label="Next restaurants"
            >
              <Icon name="chevron-right" size={18} />
            </button>
          </div>
        </div>

        {/* Enhanced Slider */}
        <div className="overflow-hidden rounded-lg">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(${translateXPct}%)` }}
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
                  <RestaurantCard data={restaurant} />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Enhanced Progress Indicator */}
        <div className="flex flex-col items-center mt-6 space-y-3">
          {/* Dot indicators */}
          <div className="flex space-x-1">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentIndex
                    ? 'bg-yellow-500 w-6'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopRestaurants;
