import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import axiosInstance from '../../api/axiosInstance';
import { Star, IndianRupee, ShoppingCart, Timer } from 'lucide-react';

const RestaurantMenuPage = () => {
  // Extract the restaurantSlug from the URL using the useParams hook
  const { restaurantSlug } = useParams();
  console.log(restaurantSlug);

  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurantData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Use the extracted restaurantSlug directly in the API call
        const response = await axiosInstance.get(
          `/api/v1/products/restaurantProducts/${restaurantSlug}`,
          {
            validateStatus: status =>
              (status >= 200 && status < 300) || status === 304,
          }
        );

        if (response.status === 200 && response.data.success) {
          console.log('API response:', response.data);

          setMenuItems(response.data.data);

          setRestaurant(response.data.restaurantDetails);
        } else if (response.status === 304) {
          console.log('Data not modified, using cached version.');
        }
      } catch (e) {
        console.error('API call failed:', e);
        setError('Failed to fetch restaurant data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    // The effect will now re-run whenever the restaurantSlug changes
    fetchRestaurantData();
  }, [restaurantSlug]);

  const handleAddToCart = item => {
    console.log('Adding to cart:', item.name);
  };

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
        {/* Restaurant Header Section */}
        <div
          className="relative mb-6 rounded-3xl overflow-hidden shadow-lg h-64 bg-cover bg-center"
          style={{ backgroundImage: `url(${restaurant.images?.[0]})` }}
        >
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="relative z-10 p-6 flex flex-col justify-end h-full">
            <h1 className="text-4xl font-bold text-white mb-2">
              {restaurant.name}
            </h1>
            <p className="text-white text-lg font-medium">
              {restaurant.cuisine_type?.join(', ')}
            </p>
            <div className="flex items-center text-white mt-2">
              <span className="flex items-center text-sm font-semibold bg-green-500 px-2 py-1 rounded-full mr-2">
                <Star className="w-4 h-4 mr-1 fill-current" />{' '}
                {restaurant.rating}
              </span>
              <span className="flex items-center text-sm bg-yellow-400 px-2 py-1 rounded-full mr-2 text-gray-800">
                <Timer className="w-4 h-4 mr-1" />{' '}
                {restaurant.delivery_time_mins}
              </span>
            </div>
          </div>
        </div>

        {/* Menu Items Section */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {menuItems.length > 0 ? (
            menuItems.map(item => (
              <div
                key={item._id}
                className="bg-white rounded-3xl shadow-md p-6 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
              >
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex flex-col">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">
                        {item.description}
                      </p>
                      {item.isBestseller && (
                        <div className="flex items-center text-sm font-semibold text-amber-500 mb-1">
                          <Star className="w-4 h-4 mr-1 fill-current" />{' '}
                          Bestseller
                        </div>
                      )}
                      <div className="flex items-center">
                        <IndianRupee className="text-gray-800 w-4 h-4 mr-1" />
                        <span className="text-xl font-extrabold text-gray-800">
                          {item.price}
                        </span>
                      </div>
                    </div>
                    {item.images && item.images.length > 0 && (
                      <div className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 ml-4 rounded-xl overflow-hidden shadow-sm border border-gray-200">
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="flex items-center px-4 py-2 bg-yellow-400 text-gray-800 font-semibold rounded-full hover:bg-yellow-500 transition-colors duration-200 shadow-md"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" /> Add
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 text-lg col-span-full mt-8">
              No menu items available for this restaurant.
            </p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RestaurantMenuPage;
