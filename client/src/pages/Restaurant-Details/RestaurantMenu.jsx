import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import axiosInstance from '../../api/axiosInstance';
import { API } from '../../config/api';

// Importing the sections of this page
import RestaurantHeader from './sections/RestaurantHeader';
import MenuFilters from './sections/MenuFilters';
import ProductList from './sections/ProductList';
import DealsSection from './sections/DealsSections';
import { useSelector } from 'react-redux';
import {
  selectCartTotalQuantity,
  selectCartTotalValue,
} from '../../features/cart/cartSelectors';
import CartStatusSection from './sections/CartStatusSection';

const RestaurantMenuPage = () => {
  const { restaurantID } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const { items } = useSelector(state => state.cart);
  const cartCount = useSelector(selectCartTotalQuantity);
  const cartValue = useSelector(selectCartTotalValue);

  // useEffect for api calling
  useEffect(() => {
    const fetchRestaurantData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get(
          API.RESTAURANTS.PRODUCTS(restaurantID)
        );
        // console.log(response);
        if (response.status === 200 && response.data.success) {
          const { data: products, restaurantDetails: restaurant } =
            response.data;
          setRestaurant(restaurant);
          setMenuItems(products);
        } else {
          setError(response.data.message || 'Restaurant not found.');
        }
      } catch (e) {
        console.error('API call failed:', e);
        setError('Failed to fetch restaurant data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantData();
  }, [restaurantID]);

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-xl font-semibold text-gray-700">
          Loading restaurant menu...
        </p>
      </div>
    );
  }

  if (error || !restaurant) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <p className="text-xl font-semibold text-red-500 text-center">
          {error || 'Restaurant not found.'}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-yellow-400 text-gray-800 font-semibold rounded-full hover:bg-yellow-500 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-helvetica">
      <Navbar
        showSearch={true}
        currentPage="restaurant"
        cartCount={2}
        visibilty={''}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <RestaurantHeader restaurant={restaurant} />
        <DealsSection />
        <MenuFilters
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
        <ProductList menuItems={menuItems} activeFilter={activeFilter} />
      </div>
      <CartStatusSection />
      <Footer />
    </div>
  );
};

export default RestaurantMenuPage;
