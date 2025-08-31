import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import CategoryHeader from './sections/CategoryHeader';
import FilterAndSortBar from './sections/FilterAndSortBar';
import RestaurantList from './sections/RestaurantList';
import ExploreMore from './sections/ExploreMore';
import { useParams, useSearchParams } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';

const CategoryResultPage = () => {
  const { categorySlug } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();

  // State for API data
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Filter and sort state
  const [selectedSortBy, setSelectedSortBy] = useState('relevance');
  const [selectedFilters, setSelectedFilters] = useState({
    rating: [],
    price: [],
    deliveryTime: [],
    offers: [],
  });
  const [quickFilters, setQuickFilters] = useState({
    tenMinDelivery: false,
    topRated: false,
    offers: false,
  });

  // Function to fetch restaurants based on current URL parameters
  const fetchRestaurants = async (pageToFetch = 1) => {
    setLoading(true);
    setError(null);

    try {
      // Get values from URL parameters, providing a default if they are missing
      // const longitude = searchParams.get('lng') || 75.86;
      // const latitude = searchParams.get('lat') || 22.72;
      // const limit = searchParams.get('limit') || 5;

      const longitude = 75.86;
      const latitude = 22.72;
      const limit = 50;

      // Construct the API URL using dynamic parameters from the URL and state
      const apiUrl = `/api/v1/restaurants?categoryName=${categorySlug}&longitude=${longitude}&latitude=${latitude}&limit=${limit}&page=${pageToFetch}`;

      const response = await axiosInstance.get(apiUrl);
      // console.log('api response', response);
      const { data, totalResults, currentPage, totalPages } = response.data;

      // Handle loading more pages or fetching the first page
      setRestaurants(prevRestaurants =>
        pageToFetch === 1 ? data : [...prevRestaurants, ...data]
      );
      setTotalResults(totalResults);
      setCurrentPage(currentPage);
      setTotalPages(totalPages);
    } catch (e) {
      console.error('API call failed:', e);
      setError('Failed to fetch restaurants. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Effect to fetch restaurants when component mounts or query params change
  useEffect(() => {
    fetchRestaurants();
  }, [categorySlug, searchParams]);

  // Handler for "Load More" button
  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setSearchParams(prevParams => {
      prevParams.set('page', nextPage.toString());
      return prevParams;
    });
    fetchRestaurants(nextPage);
  };

  // Get current values for rendering from searchParams
  const userLat = searchParams.get('lat') || 'N/A';
  const userLng = searchParams.get('lng') || 'N/A';

  if (loading && restaurants.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-xl font-semibold text-gray-700">
          Loading restaurants...
        </p>
      </div>
    );
  }

  if (error && restaurants.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-xl font-semibold text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-helvetica">
      <Navbar showSearch={true} currentPage="search" cartCount={2} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <CategoryHeader
          categoryName={categorySlug}
          categoryDescription={`Showing restaurants for ${categorySlug}`}
          restaurantCount={totalResults}
          userLocation={`Lat: ${userLat}, Lng: ${userLng}`}
        />

        <FilterAndSortBar
          selectedSortBy={selectedSortBy}
          setSelectedSortBy={setSelectedSortBy}
          quickFilters={quickFilters}
          setQuickFilters={setQuickFilters}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />

        {restaurants.length > 0 ? (
          <RestaurantList restaurants={restaurants} />
        ) : (
          <p className="text-center text-gray-600 text-lg mt-8">
            No restaurants found for "{categorySlug}" in this area.
          </p>
        )}

        {currentPage < totalPages && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold rounded-xl transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Loading More...' : 'Load More'}
            </button>
          </div>
        )}

        {error && restaurants.length > 0 && (
          <p className="text-center text-red-500 text-sm mt-4">{error}</p>
        )}

        <ExploreMore />
      </div>
    </div>
  );
};

export default CategoryResultPage;
