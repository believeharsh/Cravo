import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { useSelector } from 'react-redux';
import { API } from '../../../config/api';
import axiosInstance from '../../../api/axiosInstance';
import { Link } from 'react-router-dom';
import RestaurantCard from '../../../components/shared/RestaurantCard';

const RestaurantGrid = () => {
  const { city, latitude, longitude } = useSelector(state => state.location);
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const limit = 10;
  const page = 2;

  useEffect(() => {
    const fetchRestaurants = async () => {
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
                to={`/menu/${restaurant_slug}/${r._id}`}
                className="flex-shrink-0 px-2 sm:px-3"
              >
                <RestaurantCard key={r._id} data={r} />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RestaurantGrid;
