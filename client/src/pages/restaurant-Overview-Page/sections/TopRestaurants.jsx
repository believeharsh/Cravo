import React, { useState, useEffect } from 'react';
import Icon from '../../../components/ui/Icon';
import { useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import RestaurantCard from '../../../components/shared/RestaurantCard';
import axiosInstance from '../../../api/axiosInstance';
import { API } from '../../../config/api';

// Skeleton Card Component (kept as is for loading state)
const SkeletonCard = ({ width }) => (
  <div className="flex-shrink-0 px-2" style={{ width }}>
    {' '}
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 w-full flex flex-col overflow-hidden animate-pulse">
      {/* Skeleton Image */}     {' '}
      <div className="h-34 bg-gray-200 flex-shrink-0 relative">
        {' '}
        <div className="absolute bottom-3 left-3 bg-gray-300 rounded-lg w-20 h-6"></div>{' '}
        <div className="absolute top-3 right-3 bg-gray-300 rounded-full w-16 h-6"></div>{' '}
      </div>
      {/* Skeleton Content */}     {' '}
      <div className="px-3 pt-1 pb-2 space-y-2">
        {/* Restaurant name skeleton */}       {' '}
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>       {' '}
        {/* Rating skeleton */}       {' '}
        <div className="flex items-center gap-3">
          <div className="h-6 bg-gray-200 rounded w-16"></div>
          <div className="h-4 bg-gray-200 rounded w-20"></div>       {' '}
        </div>
        {/* Tags skeleton */}       {' '}
        <div className="flex gap-1.5">
          <div className="h-6 bg-gray-200 rounded-full w-16"></div>
          <div className="h-6 bg-gray-200 rounded-full w-20"></div>
          <div className="h-6 bg-gray-200 rounded-full w-12"></div>{' '}
        </div>
        {/* Footer skeleton */}       {' '}
        <div className="border-t border-gray-100 pt-2 flex justify-between">
          <div className="h-4 bg-gray-200 rounded w-16"></div>
          <div className="h-4 bg-gray-200 rounded w-20"></div>       {' '}
        </div>{' '}
      </div>{' '}
    </div>{' '}
  </div>
);

const TopRestaurants = () => {
  // --- Data and State Management (Local State) ---
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get location context (Global State)
  const {
    city: defaultCity,
    latitude: defaultLat,
    longitude: defaultLng,
  } = useSelector(state => state.location);

  const {
    selectedLocation,
    city: selectedCity,
    lat: selectedLat,
    lng: selectedLng,
  } = useSelector(state => state.searchContext);

  // Get location context (URL Params)
  const [searchParams] = useSearchParams();

  // --- Slider UI Logic (Kept as is) ---
  const itemsPerView = { mobile: 1.2, tablet: 2.5, desktop: 5 };

  const getItemsPerView = () => {
    if (typeof window === 'undefined') return itemsPerView.desktop;
    if (window.innerWidth >= 1024) return itemsPerView.desktop;
    if (window.innerWidth >= 768) return itemsPerView.tablet;
    return itemsPerView.mobile;
  };

  const [itemsToShow, setItemsToShow] = useState(itemsPerView.desktop);
  const [currentIndex, setCurrentIndex] = useState(0); // 1. Fetching Data Effect

  useEffect(() => {
    const finalCity = selectedLocation?.simpleCityName || defaultCity;
    const finalLat = selectedLocation?.lat || defaultLat;
    const finalLng = selectedLocation?.lng || defaultLng;

    if (!finalCity && !(finalLat && finalLng)) {
      setLoading(false);
      // Don't show the error, just hide the component
      return;
    }

    const fetchTopRatedRestaurants = async () => {
      setLoading(true);
      setError(null);

      try {
        // Construct query parameters based on the highest priority context
        const queryParams = new URLSearchParams();
        if (finalCity) {
          // Send city name if available (controller resolves to ID)
          queryParams.append('cityName', finalCity);
        } else if (finalLat && finalLng) {
          // Fallback to coordinates
          queryParams.append('latitude', finalLat);
          queryParams.append('longitude', finalLng);
        }

        const queryParaMeters = `${queryParams.toString()}`;

        // Direct API Call using axiosInstance
        const response = await axiosInstance.get(
          `${API.RESTAURANTS.TOP_RATED_RESTAURANTS}?${queryParaMeters}`
        );
        // console.log('response of top rated', response);
        // Check for successful response structure
        if (
          response.data &&
          response.data.data &&
          response.data.data.restaurants
        ) {
          setRestaurants(response.data.data.restaurants);
        } else {
          setRestaurants([]);
        }
      } catch (err) {
        console.error('Failed to fetch top rated restaurants:', err);
        setError(err.message || 'Unable to load top rated restaurants.');
        setRestaurants([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTopRatedRestaurants();
  }, [defaultCity, defaultLat, defaultLng, searchParams]); // Re-fetch on location or URL change

  // 2. Window Resize Effect (Kept as is)
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
  const translateXPct = -currentIndex * cardWidthPct; // --- Render Logic ---

  // Hide the entire section if loading is complete and no restaurants were found
  if (!loading && restaurants.length === 0) {
    return null;
  } // Loading State

  if (loading) {
    return (
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Header skeleton */}
          <div className="mb-8">
            <div className="h-10 bg-gray-200 rounded w-96 mb-2 animate-pulse"></div>{' '}
            <div className="h-5 bg-gray-200 rounded w-80 animate-pulse"></div>{' '}
          </div>
          {/* Cards skeleton */}
          <div className="flex space-x-0">
            {Array.from({ length: Math.ceil(itemsToShow) }).map((_, i) => (
              <SkeletonCard key={i} width={`${cardWidthPct}%`} />
            ))}
          </div>
        </div>
      </section>
    );
  } // Error State

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
            <h3 className="text-lg font-semibold text-red-800 mb-2">{error}</h3>
            <p className="text-red-600 mb-4">
              Please ensure your location is correctly set or try again later.  
            </p>
            {/* Note: Reload is usually fine, but for better UX, you could dispatch a thunk to re-fetch here if i weren't avoiding global state */}{' '}
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
  } // Main Slider Render

  return (
    <section className="bg-white py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Enhanced Header */}       {' '}
        <div className="flex items-center justify-between mb-8">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-800 mb-">
              Top Restaurants Chain In
              <span className="px-1">
                {searchParams.get(' cityName') || defaultCity || 'Your Area'}
              </span>
            </h2>
            <p className="text-gray-600 text-sm lg:text-base">
              Discover {restaurants.length} popular restaurants loved by our
              customers      
            </p>
          </div>
          {/* Navigation */}
          <div className="flex items-center space-x-2">
            {' '}
            <button
              onClick={() => setCurrentIndex(i => Math.max(0, i - 1))}
              disabled={currentIndex === 0}
              className={`p-2 rounded-full border transition-all cursor-pointer  ${
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
              className={`p-2 rounded-full  border transition-all  cursor-pointer ${
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
        {/* Slider Wrapper */}
        <div className="overflow-hidden rounded-lg">
          <div
            className="flex transition-transform duration-500 ease-in-out pb-1"
            style={{ transform: `translateX(${translateXPct}%)` }}
          >
            {restaurants.map(restaurant => {
              const restaurant_slug = restaurant.name
                .toLowerCase()
                .replace(/\s+/g, '-');
              return (
                <Link
                  to={`/menu/${restaurant_slug}/${restaurant._id}`}
                  className="flex-shrink-0 px-2 sm:px-3"
                  style={{ width: `${cardWidthPct}%` }}
                  key={restaurant._id} // Added key to Link element
                >
                  <RestaurantCard data={restaurant} className="" />
                </Link>
              );
            })}
          </div>
        </div>
        {/* Progress Indicator */}       {' '}
        <div className="flex flex-col items-center mt-6 space-y-3">
          {/* Dot indicators */}         {' '}
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
