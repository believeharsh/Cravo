import React, { useState, useEffect, useRef, useCallback } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import CategoryHeader from './sections/CategoryHeader';
import FilterAndSortBar from './sections/FilterAndSortBar';
import RestaurantList from './sections/RestaurantList';
import ExploreMore from './sections/ExploreMore';
import { useParams, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategoryRestaurants } from '../../features/categoryResult/categoryResultSlice';

const CategoryResultPage = () => {
  const { categorySlug } = useParams();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const locationData = useSelector(state => state.location);
  const { cityName, latitude, longitude } = locationData;
  const {
    restaurants,
    isLoading: loading,
    error,
    currentPage,
    totalPages,
    totalResults,
    currentCategorySlug,
  } = useSelector(state => state.categoryResult);

  const urlPage = parseInt(searchParams.get('page')) || 1;

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

  const navbarRef = useRef(null);
  const filterBarRef = useRef(null);
  const restaurantSectionRef = useRef(null);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [isFilterBarSticky, setIsFilterBarSticky] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [navbarHeight, setNavbarHeight] = useState(0);

  // Hardcoded limit (should ideally be configurable)
  const limit = 50;

  // Logic to fetch restaurants when categorySlug or page changes
  useEffect(() => {
    const isDataStale =
      currentCategorySlug !== categorySlug || urlPage > currentPage; // User navigated to a higher page number

    // If data is already loaded for this category and page, skip the fetch.
    // The main check is that 'currentCategorySlug' is set and matches the URL slug
    // AND the URL page number is not greater than the current Redux page number.
    if (
      currentCategorySlug === categorySlug &&
      urlPage <= currentPage &&
      restaurants.length > 0
    ) {
      console.log(
        `Data for category "${categorySlug}" already in store. Skipping API call.`
      );
      return;
    }

    if (latitude && longitude) {
      console.log(`Dispatching fetch for ${categorySlug}, page ${urlPage}`);
      dispatch(
        fetchCategoryRestaurants({
          categorySlug,
          cityName,
          latitude,
          longitude,
          page: urlPage,
          limit,
        })
      );
    } else {
      // This is a placeholder for error handling if coordinates aren't found
      // setError("Could not determine active city coordinates.");
    }

    // Re-run effect only when categorySlug or URL page changes
  }, [
    categorySlug,
    urlPage,
    dispatch,
    currentCategorySlug,
    currentPage,
    restaurants.length,
    cityName,
    latitude,
    longitude,
  ]);

  // Handler for "Load More" button
  const handleLoadMore = () => {
    // The Redux state `currentPage` holds the last successfully loaded page.
    const nextPage = currentPage + 1;

    // Dispatch the thunk to load the next page, which will append to the slice.
    if (nextPage <= totalPages && latitude && longitude) {
      dispatch(
        fetchCategoryRestaurants({
          categorySlug,
          cityName,
          latitude,
          longitude,
          page: nextPage,
          limit,
        })
      );
      // We are no longer modifying searchParams for page number
      // unless you need it to persist the page number in the URL for sharing.
      // Keeping the searchParams update for good measure:
      // setSearchParams(prevParams => {
      //   prevParams.set('page', nextPage.toString());
      //   return prevParams;
      // });
    }
  };

  // (useEffect for scroll logic remains the same)

  useEffect(() => {
    // Get navbar height on mount
    if (navbarRef.current) {
      setNavbarHeight(navbarRef.current.offsetHeight);
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';

      // Get restaurant section position
      const restaurantSection = restaurantSectionRef.current;
      const filterBar = filterBarRef.current;

      if (restaurantSection && filterBar) {
        const restaurantSectionTop = restaurantSection.offsetTop;
        const filterBarHeight = filterBar.offsetHeight;

        // Calculate when to hide navbar and make filter bar sticky
        const triggerPoint =
          restaurantSectionTop - navbarHeight - filterBarHeight;

        // Hide navbar when scrolling down past trigger point
        if (currentScrollY > triggerPoint && scrollDirection === 'down') {
          setIsNavbarVisible(false);
          setIsFilterBarSticky(true);
        }
        // Show navbar when scrolling up or above trigger point
        else if (
          currentScrollY <= triggerPoint ||
          (scrollDirection === 'up' && currentScrollY < triggerPoint + 100)
        ) {
          setIsNavbarVisible(true);
          setIsFilterBarSticky(false);
        }
      }

      setLastScrollY(currentScrollY);
    };

    // Throttled scroll handler for better performance
    let ticking = false;
    const throttledScrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScrollHandler, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', throttledScrollHandler);
    };
  }, [lastScrollY, navbarHeight]);

  // Initial loading state (show full screen loader only if no restaurants are loaded yet)
  if (loading && restaurants.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-xl font-semibold text-gray-700">
          Loading restaurants...
        </p>
      </div>
    );
  }

  // Initial error state (show full screen error only if no restaurants are loaded yet)
  if (error && restaurants.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-xl font-semibold text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-helvetica">
      <div
        ref={navbarRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out ${
          isNavbarVisible
            ? 'transform translate-y-0'
            : 'transform -translate-y-full'
        }`}
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Navbar showSearch={true} currentPage="search" cartCount={2} />
      </div>

      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <CategoryHeader
            categoryName={categorySlug}
            categoryDescription={`Showing restaurants for ${categorySlug}`}
            restaurantCount={totalResults}
            cityName={cityName}
          />

          <div
            ref={filterBarRef}
            className={`transition-all duration-100 ease-in ${
              isFilterBarSticky
                ? 'fixed top-0 left-0 right-0 z-40 bg-white'
                : 'relative bg-transparent'
            }`}
            style={
              isFilterBarSticky ? { paddingTop: '', paddingBottom: '' } : {}
            }
          >
            <div
              className={`${isFilterBarSticky ? 'max-w-7xl mx-auto px-4 sm:px-6' : ''}`}
            >
              <FilterAndSortBar
                selectedSortBy={selectedSortBy}
                setSelectedSortBy={setSelectedSortBy}
                quickFilters={quickFilters}
                setQuickFilters={setQuickFilters}
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
              />
            </div>
          </div>

          <h3 className="text-xl font-bold">Restaurant To Explore</h3>
          <div
            ref={restaurantSectionRef}
            className={`transition-all duration-300 ease-in-out ${
              isFilterBarSticky ? 'pt-20' : 'pt-0'
            }`}
          >
            {restaurants.length > 0 ? (
              <RestaurantList restaurants={restaurants} isLoading={loading} />
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
          </div>

          <ExploreMore />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CategoryResultPage;
