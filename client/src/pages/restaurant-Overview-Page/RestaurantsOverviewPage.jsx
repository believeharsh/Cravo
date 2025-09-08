import React, { useEffect, useState, useRef } from 'react';

// Restaurant-Overview-Page sections import
import RestaurantNavbar from './sections/RestarurantNavbar';
import RestaurantGrid from './sections/RestRestaurant';
import NearbyCuisineGrid from './sections/Near-restaurants-card';
import Footer from '../../components/Footer';
import TopRestaurants from './sections/TopRestaurants';
import Navbar from '../../components/Navbar';
import RestaurantCategoriesSlider from './sections/Category-Slider';

const RestaurantsOverviewPage = () => {
  const [showRestaurantNavbar, setShowRestaurantNavbar] = useState(false);
  const topRestaurantsRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (topRestaurantsRef.current) {
        const topRestaurantsElement = topRestaurantsRef.current;
        const rect = topRestaurantsElement.getBoundingClientRect();

        // Switch navbar when TopRestaurants section reaches the top of viewport
        if (rect.top <= 100) {
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

    // Add scroll event listener
    window.addEventListener('scroll', throttledHandleScroll);

    // Check initial position
    handleScroll();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, []);

  return (
    <>
      {/* Always fixed navbar container */}
      <div className="fixed top-0 left-0 right-0 z-50">
        {showRestaurantNavbar ? <RestaurantNavbar /> : <Navbar />}
      </div>

      {/* Always add padding top since navbar is always fixed */}
      <div className="mt-20">
        <RestaurantCategoriesSlider />
        {/* Add ref to TopRestaurants to track its position */}
        <div ref={topRestaurantsRef}>
          <TopRestaurants />
        </div>
        <RestaurantGrid />
        <NearbyCuisineGrid />
        <Footer />
      </div>
    </>
  );
};

export default RestaurantsOverviewPage;
