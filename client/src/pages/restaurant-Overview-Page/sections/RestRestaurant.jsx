import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { useSelector } from 'react-redux';
import { API } from '../../../config/api';
import axiosInstance from '../../../api/axiosInstance';
import Icon from '../../../components/ui/Icon';
import { Link } from 'react-router-dom';

// The RestaurantCard component is now expecting the restaurant data directly as 'data' prop
const RestaurantCard = ({ data }) => (
  // <div className="flex-shrink-0 px-2" onClick={() => onClick(c.name || c.slug)}>
  <div className="bg-white rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out group cursor-pointer w-full flex flex-col overflow-hidden border border-gray-100 my-1">
    {/* IMAGE CONTAINER */}
    <div className="relative h-34 flex-shrink-0 overflow-hidden">
      {/* Use the correct data structure from the API response */}
      <img
        src={data.images?.[0] || '/placeholder-restaurant.jpg'}
        different
        structure
        alt={data.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
        onError={e => {
          e.target.src = '/placeholder-restaurant.jpg';
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

      {/* Min order badge */}
      <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm rounded-lg px-2 py-1 shadow-md">
        <span className="text-gray-800 font-bold text-sm">
          Min ₹{data.min_order_value}
        </span>
      </div>

      {/* Delivery time badge */}
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
      <div className="flex flex-wrap gap-1">
        {/* Use optional chaining for safety */}
        {data.cuisine_type?.slice(0, 3).map(cuisine => (
          <span
            key={cuisine}
            className="text-xs text-gray-600 font-medium transition-colors"
          >
            {cuisine}
          </span>
        ))}
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
  // </div>
);

/* Main grid component */
const RestaurantGrid = () => {
  const { city, latitude, longitude } = useSelector(state => state.location);
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const limit = 10;
  const page = 2;

  useEffect(() => {
    const fetchRestaurants = async () => {
      // Don't set isLoading here to prevent a flicker on every city change
      setError(null);
      try {
        const apiUrl = `${API.RESTAURANTS.RESTAURANTS_LIST}?limit=${limit}&page=${page}&longitude=${longitude}&latitude=${latitude}&city=${city}`;
        const response = await axiosInstance.get(apiUrl);
        setRestaurants(response.data.data.restaurants);
      } catch (err) {
        console.error('Error fetching restaurants:', err);
        setError(err.message || 'An unknown error occurred.');
      } finally {
        setIsLoading(false);
      }
    };

    // Only fetch if required data is available
    if (city && latitude && longitude) {
      setIsLoading(true); // Set loading state only when data fetch is triggered
      fetchRestaurants();
    } else {
      setIsLoading(false); // Stop loading if data is not available
    }
  }, [city, latitude, longitude]); // Dependencies are crucial for a correct refetch

  const handleNavigateToCategoryResultPage = categoryName => {
    if (latitude && longitude) {
      navigate(`/categories/${categoryName}?lat=${latitude}&lng=${longitude}`);
    } else {
      navigate(`/categories/${categoryName}`);
    }
  };

  if (isLoading) {
    return (
      <section className="py-6 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-gray-500">Loading restaurants...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-6 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </section>
    );
  }

  if (restaurants.length === 0) {
    return (
      <section className="py-6 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-gray-500">No restaurants found in {city}.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-xl font-bold text-gray-800 mb-8">
          Restaurants with online delivery in {city}
        </h2>

        <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {/* Pass the entire restaurant object as the 'data' prop */}
          {restaurants.map(r => {
            const restaurant_slug = r.name.toLowerCase().replace(/\s+/g, '-');
            return (
              <Link
                key={r._id}
                to={`/menu/${restaurant_slug}/${r._id}`}
                className="flex-shrink-0 px-2 sm:px-3"
              >
                <RestaurantCard data={r} />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RestaurantGrid;
