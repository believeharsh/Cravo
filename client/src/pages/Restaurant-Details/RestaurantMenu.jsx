import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import axiosInstance from '../../api/axiosInstance';

// Importing the sectionc of this page
import RestaurantHeader from './sections/RestaurantHeader';
import MenuFilters from './sections/MenuFilters';
import ProductList from './sections/ProductList';
import DealsSection from './sections/DealsSections';

const RestaurantMenuPage = () => {
  const { restaurantID } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    const fetchRestaurantData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get(
          `/api/v1/products/restaurantProducts/${restaurantID}`
        );
        console.log(response);
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
      <Navbar showSearch={true} currentPage="restaurant" cartCount={2} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <RestaurantHeader restaurant={restaurant} />
        <DealsSection />
        <MenuFilters
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
        <ProductList menuItems={menuItems} activeFilter={activeFilter} />
      </div>

      <Footer />
    </div>
  );
};

export default RestaurantMenuPage;
