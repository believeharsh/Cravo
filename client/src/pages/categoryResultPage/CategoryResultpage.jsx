import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import CategoryHeader from "./sections/CategoryHeader";
import FilterAndSortBar from "./sections/FilterAndSortBar";
import RestaurantList from "./sections/RestaurantList";
import ExploreMore from "./sections/ExploreMore";
import { useParams, useSearchParams } from "react-router-dom"; // Import useParams to get the category name from the URL
import axiosInstance from "../../api/axiosInstance";

const CategoryResultPage = () => {
  // Use useSearchParams to get and manage query parameters from the URL
  const [searchParams, setSearchParams] = useSearchParams();

  // Get initial values from URL or set defaults
  const initialCategoryName = searchParams.get("CategoryName") || "Pizza";
  const initialLongitude = parseFloat(searchParams.get("longitude")) || 75.86; // Default to Indore's longitude
  const initialLatitude = parseFloat(searchParams.get("latitude")) || 22.72;  // Default to Indore's latitude
  const initialLimit = parseInt(searchParams.get("limit")) || 5;
  const initialPage = parseInt(searchParams.get("page")) || 1;

  // State for API data
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Filter and sort state (remains the same, but now passed to FilterAndSortBar)
  const [selectedSortBy, setSelectedSortBy] = useState("relevance");
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

  // Function to fetch restaurants
  const fetchRestaurants = async (pageToFetch) => {
    setLoading(true);
    setError(null); // Clear previous errors

    try {
      const category = searchParams.get("CategoryName");
      const longitude = searchParams.get("longitude");
      const latitude = searchParams.get("latitude");
      const limit = searchParams.get("limit");

      // Construct the API URL using current query parameters and the page to fetch
      const apiUrl = `api/v1/categories/category-result?CategoryName=${initialCategoryName}&longitude=${initialLongitude}&latitude=${initialLatitude}&limit=${initialLimit}&page=${initialPage}`;

      const response = await axiosInstance.get(apiUrl);
      console.log("Api Response from the category result page", response)
      const { data, totalResults, currentPage, totalPages } = response.data;

      // If fetching the first page, replace existing restaurants
      // Otherwise, append new restaurants
      setRestaurants(prevRestaurants => 
        pageToFetch === 1 ? data : [...prevRestaurants, ...data]
      );
      setTotalResults(totalResults);
      setCurrentPage(currentPage);
      setTotalPages(totalPages);

    } catch (e) {
      console.error("API call failed:", e);
      setError("Failed to fetch restaurants. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Effect to fetch restaurants when component mounts or query params change
  useEffect(() => {
    // Initial fetch when component mounts or search params change
    // We pass initialPage here to ensure it fetches the correct page on load
    fetchRestaurants(initialPage); 
  }, [
    searchParams.get("CategoryName"),
    searchParams.get("longitude"),
    searchParams.get("latitude"),
    searchParams.get("limit")
    // Note: We don't include 'page' here directly to avoid infinite loops
    // 'page' is controlled by 'loadMore' function
  ]);

  // Handler for "Load More" button
  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setSearchParams(prevParams => {
      prevParams.set("page", nextPage.toString());
      return prevParams;
    });
    fetchRestaurants(nextPage); // Fetch the next page
  };


  if (loading && restaurants.length === 0) { // Only show full loading screen if no data yet
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-xl font-semibold text-gray-700">Loading restaurants...</p>
      </div>
    );
  }

  if (error && restaurants.length === 0) { // Only show full error screen if no data yet
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
          categoryName={initialCategoryName}
          categoryDescription="Delicious pizzas from the best restaurants in your area"
          restaurantCount={totalResults} // Use totalResults from API
          userLocation={`${initialLatitude}, ${initialLongitude}`} // Display coordinates for user location
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
            No restaurants found for "{initialCategoryName}" in this area.
          </p>
        )}

        {/* Load More Button */}
        {currentPage < totalPages && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleLoadMore}
              disabled={loading} // Disable button while loading
              className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold rounded-xl transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Loading More..." : "Load More"}
            </button>
          </div>
        )}

        {error && restaurants.length > 0 && ( // Show error message if some data loaded but new error occurs
          <p className="text-center text-red-500 text-sm mt-4">{error}</p>
        )}

        <ExploreMore />
      </div>
    </div>
  );
};

export default CategoryResultPage;