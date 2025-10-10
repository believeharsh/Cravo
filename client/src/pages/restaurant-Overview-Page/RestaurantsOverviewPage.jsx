import React, { useEffect, useState, useRef } from 'react';

// Restaurant-Overview-Page sections import
import FiltersAndSerachBar from './sections/FiltersAndSerachBar';
import RestaurantGrid from './sections/RestRestaurant';
import NearbyCuisineGrid from './sections/Near-restaurants-card';
import Footer from '../../components/Footer';
import TopRestaurants from './sections/TopRestaurants';
import RestaurantCategoriesSlider from './sections/Category-Slider';
import Navbar from '../../components/Navbar/Navbar';
import AuthRequiredModal from '../../components/modules/auth/AuthRequiredModal';
import { useSelector } from 'react-redux';
import { useAuthForm } from '../../hooks/useAuthForm';

const RestaurantsOverviewPage = () => {
  const [showRestaurantNavbar, setShowRestaurantNavbar] = useState(false);
  const topRestaurantsRef = useRef(null);

  // auth require modal state extraction
  const { isAuthRequireModalOpen } = useSelector(
    state => state.ui.authRequireModal
  );

  const { handleCloseAuthRequireModal } = useAuthForm();

  useEffect(() => {
    const handleScroll = () => {
      if (topRestaurantsRef.current) {
        const topRestaurantsElement = topRestaurantsRef.current;
        const rect = topRestaurantsElement.getBoundingClientRect();

        // Switch to RestaurantNavbar when TopRestaurants section reaches top
        if (rect.top <= -50) {
          setShowRestaurantNavbar(true);
        } else {
          setShowRestaurantNavbar(false);
        }
      }
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll);

    // Checking initial position on mount
    handleScroll();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, []);

  return (
    <>
      {/* Fixed navbar container with smooth transition */}
      <div className="fixed top-0 left-0 right-0 z-50">
        {/* Main Navbar with fade transition */}
        <div
          className={`transition-opacity duration-300 ${
            showRestaurantNavbar
              ? 'opacity-0 pointer-events-none absolute'
              : 'opacity-100'
          }`}
        >
          <Navbar />
        </div>

        {/* Filters And Serach Bar with fade transition */}
        <div
          className={`transition-opacity duration-200 ${
            showRestaurantNavbar
              ? 'opacity-100'
              : 'opacity-0 pointer-events-none absolute'
          }`}
        >
          <FiltersAndSerachBar />
        </div>
      </div>

      {/* Main content with top padding to account for fixed navbar */}
      <div className="pt-20">
        <RestaurantCategoriesSlider />

        <div>
          <TopRestaurants />
        </div>

        {/* Tracking this section's position to trigger navbar switch */}
        <div className="" ref={topRestaurantsRef}>
          <RestaurantGrid />
        </div>

        <NearbyCuisineGrid />
        <Footer />
      </div>

      {/* showing the auth mess to the user if he is trying to use wishlist feature without log in  */}
      <AuthRequiredModal
        isOpen={isAuthRequireModalOpen}
        onClose={() => handleCloseAuthRequireModal()}
        title="Login to Save Favorites"
        message="Please log in to add restaurants to your wishlist. Create an account to save your favorite restaurants and never lose them!"
        action="Once logged in, you can access your wishlist anytime and get personalized recommendations."
      />
    </>
  );
};

export default RestaurantsOverviewPage;
