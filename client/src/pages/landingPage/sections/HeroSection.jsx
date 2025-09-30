import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/ui/Icon';
import { useSearchContext } from '../../../hooks/useSearchContext';
import { useDispatch, useSelector } from 'react-redux';
import { setUserLocation } from '../../../features/location/locationSlice';

const SUPPORTED_CITIES = [
  'ahmadabad',
  'bangalore',
  'bhopal',
  'calcutta',
  'chennai',
  'delhi',
  'hyderabad',
  'indore',
  'jaipur',
  'kochi',
  'lucknow',
  'mumbai',
  'nagpur',
  'pune',
  'surat',
];

const Hero = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const locationRef = useRef(null);

  const initialIpLocation = useSelector(state => state.location);

  const {
    locationSearchTerm,
    isLocationLoading,
    suggestions,
    showSuggestions,
    selectedLocation,
    categoryName,
    restaurantName,
    handleLocationChange,
    handleSelectLocation,
    handleUseCurrentLocation,
    handleCategoryChange,
    handleInputFocus,
    setShowSuggestions,
    handleRestaurantNameChange,
  } = useSearchContext(initialIpLocation);

  useEffect(() => {
    const handleClickOutside = event => {
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [locationRef, setShowSuggestions]);

  const handleSearchSubmit = e => {
    e.preventDefault();

    if (!selectedLocation) {
      alert('Please select a location.');
      return;
    }

    const params = new URLSearchParams();
    const cityToCheck = selectedLocation.simpleCityName?.toLowerCase();

    if (cityToCheck && SUPPORTED_CITIES.includes(cityToCheck)) {
      params.set('cityName', selectedLocation.simpleCityName);
    } else {
      params.set('longitude', selectedLocation.lng);
      params.set('latitude', selectedLocation.lat);
    }

    if (categoryName.trim()) {
      params.set('categoryName', categoryName.trim());
    }
    if (restaurantName.trim()) {
      params.set('restaurantName', restaurantName.trim());
    }

    const newLocation = {
      city: selectedLocation.simpleCityName,
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
    };
    dispatch(setUserLocation(newLocation));

    navigate(`/restaurants?${params.toString()}`);
  };

  const locationPlaceholder = `${initialIpLocation.city}, ${initialIpLocation.region}, ${initialIpLocation.country}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 sm:pt-8 pb-12 sm:pb-20">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start lg:items-center">
        {/* LEFT SECTION */}
        <div className="space-y-6 sm:space-y-8">
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black italic font-stretch-semi-condensed text-center sm:text-left">
              <span className="text-gray-900 block">Your Favorite</span>
              <span className="text-gray-900 block">Food, </span>
              <span className="relative inline-block">
                <span className="text-gray-900 relative z-10">Delivered</span>
                <span className="absolute bottom-2 left-0 w-full rounded-se-4xl rounded-ss-4xl h-3 bg-white -z-0"></span>
              </span>
              <span className="text-gray-900"> Fast</span>
            </h1>
            <p className="text-gray-700 text-base sm:text-lg md:text-xl max-w-xl text-center sm:text-left font-medium">
              Order from 1000+ restaurants and get your cravings delivered in
              just 30 minutes ⚡
            </p>
          </div>

          {/* Search Section */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {/* Location Search */}
                <div className="relative" ref={locationRef}>
                  <Icon
                    name="map-pin"
                    className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder={locationPlaceholder}
                    value={locationSearchTerm}
                    onChange={handleLocationChange}
                    onFocus={handleInputFocus}
                    className="w-full pl-10 sm:pl-12 pr-10 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-yellow-400 text-gray-800 font-medium text-sm sm:text-base"
                  />
                  <Icon
                    name={isLocationLoading ? 'spinner' : 'chevron-down'}
                    className={`absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-500 ${
                      isLocationLoading ? 'animate-spin' : ''
                    }`}
                    size={18}
                  />

                  {/* Suggestions Dropdown */}
                  {showSuggestions &&
                    (suggestions.length > 0 || isLocationLoading) && (
                      <div className="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden max-h-64 overflow-y-auto">
                        <div
                          className="flex items-center gap-3 p-4 text-sm font-medium text-blue-600 hover:bg-gray-50 cursor-pointer"
                          onClick={handleUseCurrentLocation}
                        >
                          <Icon name="locate-fixed" size={18} />
                          <span>Use My Current Location</span>
                        </div>
                        <hr className="border-gray-200" />

                        {isLocationLoading && (
                          <div className="p-4 text-center text-sm text-gray-500">
                            Loading...
                          </div>
                        )}
                        {!isLocationLoading && suggestions.length > 0 && (
                          <ul>
                            {suggestions.map((location, index) => (
                              <li
                                key={index}
                                className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-sm font-medium text-gray-700"
                                onMouseDown={e => e.preventDefault()}
                                onClick={() => handleSelectLocation(location)}
                              >
                                {location.name}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                </div>

                {/* Category/Food Search */}
                <div className="relative">
                  <Icon
                    name="search"
                    className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="Pizza, Burger, Chinese..."
                    value={categoryName}
                    onChange={handleCategoryChange}
                    className="w-full pl-10 sm:pl-12 pr-10 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-yellow-400 text-gray-800 font-medium text-sm sm:text-base"
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                onClick={handleSearchSubmit}
                disabled={!selectedLocation || isLocationLoading}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-3 sm:py-4 rounded-xl transition-colors shadow-md text-sm sm:text-base cursor-pointer disabled:opacity-50"
              >
                Find Delicious Food
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION (Branding Circle) */}
        <div className="relative mt-8 lg:mt-0">
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="text-center space-y-4 sm:space-y-6">
              <div className="relative">
                <div className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 mx-auto bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                  <div className="text-center">
                    <div className="text-4xl sm:text-5xl lg:text-6xl mb-2 sm:mb-4">
                      🍽️
                    </div>
                    <p className="text-gray-800 text-base sm:text-lg font-bold">
                      Premium Quality
                    </p>
                    <p className="text-gray-600 text-xs sm:text-sm">
                      Fresh & Fast
                    </p>
                  </div>
                </div>

                <div className="absolute -top-2 sm:-top-4 -left-2 sm:-left-4 bg-green-400 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full font-bold shadow-lg text-xs sm:text-sm">
                  🌿 Fresh
                </div>
                <div className="absolute -bottom-2 sm:-bottom-4 -right-2 sm:-right-4 bg-yellow-500 text-gray-800 px-2 sm:px-4 py-1 sm:py-2 rounded-full font-bold shadow-lg text-xs sm:text-sm">
                  ⚡ 30 min
                </div>
                <div className="absolute top-1/2 -right-4 sm:-right-8 bg-white text-gray-800 px-2 sm:px-3 py-1 sm:py-2 rounded-full font-semibold shadow-lg text-xs sm:text-sm border-2 border-yellow-400">
                  1000+ 🏪
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
