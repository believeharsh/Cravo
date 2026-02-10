import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import Icon from '../../../components/ui/Icon';

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

const Hero = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLocationLoading, setIsLocationLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locationFocused, setLocationFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [foodFocused, setFoodFocused] = useState(false);

  const { city, region, country } = useSelector(state => state.location);

  const location_placehoder = `${city}, ${region}, ${country}`;

  // Reference for the location search container to handle clicks outside
  const locationRef = useRef(null);

  // Function for manual search (Geocoding) using OpenStreetMap Nominatim API
  const fetchGeocodeSuggestions = async query => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }
    setIsLocationLoading(true);
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      query
    )}&format=json&addressdetails=1&limit=5`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch suggestions from OpenStreetMap');
      }
      const data = await response.json();
      const formattedSuggestions = data.map(item => ({
        name: item.display_name,
        lat: parseFloat(item.lat),
        lng: parseFloat(item.lon),
      }));
      setSuggestions(formattedSuggestions);
    } catch (error) {
      console.error('Geocoding API error:', error);
      setSuggestions([]);
    } finally {
      setIsLocationLoading(false);
    }
  };

  // Function for current location (Reverse Geocoding)
  const fetchReverseGeocode = async (lat, lng) => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch address from OpenStreetMap');
      }
      const data = await response.json();
      const newLocation = {
        name: data.display_name,
        lat,
        lng,
      };
      setSelectedLocation(newLocation);
      setSearchTerm(data.display_name);
    } catch (error) {
      console.error('Reverse geocoding API error:', error);
      // Fallback in case API fails
      const fallbackName = `Location: ${lat.toFixed(2)}, ${lng.toFixed(2)}`;
      const newLocation = {
        name: fallbackName,
        lat,
        lng,
      };
      setSelectedLocation(newLocation);
      setSearchTerm(fallbackName);
    }
  };

  // Debounced version of the search function
  const debouncedFetchSuggestions = useRef(
    debounce(fetchGeocodeSuggestions, 500)
  ).current;

  // Handle changes in the location input field
  const handleLocationChange = e => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowSuggestions(true);
    debouncedFetchSuggestions(value);
  };

  const handleSelectLocation = location => {
    setSelectedLocation(location);
    setSearchTerm(location.name);
    setShowSuggestions(false);
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      setIsLocationLoading(true);
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          fetchReverseGeocode(latitude, longitude);
          setIsLocationLoading(false);
          setShowSuggestions(false);
        },
        error => {
          console.error('Geolocation error:', error);
          setIsLocationLoading(false);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      // I have to show a message to the user that their browser doesn't support geolocation
    }
  };

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
  }, [locationRef]);

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pt-4 pb-12 sm:px-6 sm:pt-8 sm:pb-20">
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-text-main text-3xl leading-tight font-bold sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                Satisfy Your <br />
                <span className="text-whitess">Cravings</span> <br />
                <span className="block sm:inline">Instantly</span>
              </h2>
            </div>

            {/* Search Section */}
            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-lg sm:p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
                  {/* Location Search Input & Suggestions */}
                  <div className="relative" ref={locationRef}>
                    <Icon
                      name={'map-pin'}
                      className="text-text-muted absolute top-1/2 left-3 -translate-y-1/2 transform sm:left-4"
                      size={18}
                    />
                    <input
                      type="text"
                      placeholder={location_placehoder}
                      className="border-border focus:border-border-focus text-text-main w-full rounded-xl border-2 py-3 pr-10 pl-10 text-sm font-medium focus:outline-none sm:py-4 sm:pl-12 sm:text-base"
                      value={searchTerm}
                      onChange={handleLocationChange}
                      onFocus={() => {
                        setShowSuggestions(true);
                        setLocationFocused(true);
                      }}
                      onBlur={() => setLocationFocused(false)}
                    />
                    <Icon
                      name={isLocationLoading ? 'spinner' : 'chevron-down'}
                      className={`text-text-muted absolute top-1/2 right-3 -translate-y-1/2 transform transition-transform duration-200 sm:right-4 ${
                        locationFocused && !isLocationLoading
                          ? 'rotate-180'
                          : ''
                      } ${isLocationLoading ? 'animate-spin' : ''}`}
                      size={18}
                    />

                    {/* Suggestions Dropdown */}
                    {showSuggestions &&
                      (searchTerm.length >= 3 ||
                        suggestions.length > 0 ||
                        isLocationLoading) && (
                        <div className="border-border absolute z-10 mt-2 max-h-64 w-full overflow-hidden overflow-y-auto rounded-xl border bg-white shadow-2xl">
                          {/* Use My Current Location Button */}
                          <div
                            className="hover:bg-bg-subtle flex cursor-pointer items-center gap-3 p-4 text-sm font-medium text-blue-600"
                            onClick={handleUseCurrentLocation}
                          >
                            <Icon name="locate-fixed" size={18} />
                            <span>Use My Current Location</span>
                          </div>

                          <hr className="border-border" />

                          {/* Loading State */}
                          {isLocationLoading && (
                            <div className="text-text-muted p-4 text-center text-sm">
                              Loading...
                            </div>
                          )}

                          {/* No Results State */}
                          {!isLocationLoading &&
                            suggestions.length === 0 &&
                            searchTerm.length >= 3 && (
                              <div className="text-text-muted p-4 text-center text-sm">
                                No locations found.
                              </div>
                            )}

                          {/* List of Suggestions */}
                          {!isLocationLoading && suggestions.length > 0 && (
                            <ul>
                              {suggestions.map((location, index) => (
                                <li
                                  key={index}
                                  className="text-text-secondary cursor-pointer px-4 py-3 text-sm font-medium hover:bg-gray-100"
                                  onMouseDown={e => e.preventDefault()} // Prevents blur event on click
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

                  {/* Restaurant Search Input */}
                  <div className="relative">
                    <Icon
                      name={'search'}
                      className="text-text-muted absolute top-1/2 left-3 -translate-y-1/2 transform sm:left-4"
                      size={18}
                    />
                    <input
                      type="text"
                      placeholder="Pizza, Burger, Chinese..."
                      className="border-border focus:border-border-focus text-text-main w-full rounded-xl border-2 py-3 pr-10 pl-10 text-sm font-medium focus:outline-none sm:py-4 sm:pl-12 sm:text-base"
                      onFocus={() => setFoodFocused(true)}
                      onBlur={() => setFoodFocused(false)}
                    />
                    <Icon
                      name={'chevron-down'}
                      className={`text-text-muted absolute top-1/2 right-3 -translate-y-1/2 transform transition-transform duration-200 sm:right-4 ${
                        foodFocused ? 'rotate-180' : ''
                      }`}
                      size={18}
                    />
                  </div>
                </div>

                <NavLink to={'/restaurants'}>
                  <button className="bg-primary hover:bg-primary-hover text-text-main w-full cursor-pointer rounded-xl py-3 text-sm font-bold shadow-md transition-colors sm:py-4 sm:text-base">
                    Find Delicious Food
                  </button>
                </NavLink>
              </div>
            </div>
          </div>

          {/* Right Image/Branding */}
          <div className="relative mt-8 lg:mt-0">
            <div className="rounded-3xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl sm:p-8">
              <div className="space-y-4 text-center sm:space-y-6">
                <div className="relative">
                  <div className="from-primary to-primary-hover mx-auto flex h-48 w-48 items-center justify-center rounded-full bg-gradient-to-br shadow-lg sm:h-56 sm:w-56 lg:h-64 lg:w-64">
                    <div className="text-center">
                      <div className="mb-2 text-4xl sm:mb-4 sm:text-5xl lg:text-6xl">
                        🍽️
                      </div>
                      <p className="text-text-main text-base font-bold sm:text-lg">
                        Premium Quality
                      </p>
                      <p className="text-text-secondary text-xs sm:text-sm">
                        Fresh & Fast
                      </p>
                    </div>
                  </div>

                  <div className="bg-secondary absolute -top-2 -left-2 rounded-full px-2 py-1 text-xs font-bold text-white shadow-lg sm:-top-4 sm:-left-4 sm:px-4 sm:py-2 sm:text-sm">
                    🌿 Fresh
                  </div>
                  <div className="bg-primary-hover text-text-main absolute -right-2 -bottom-2 rounded-full px-2 py-1 text-xs font-bold shadow-lg sm:-right-4 sm:-bottom-4 sm:px-4 sm:py-2 sm:text-sm">
                    ⚡ 30 min
                  </div>
                  <div className="text-text-main border-border-focus absolute top-1/2 -right-4 rounded-full border-2 bg-white px-2 py-1 text-xs font-semibold shadow-lg sm:-right-8 sm:px-3 sm:py-2 sm:text-sm">
                    1000+ 🏪
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
