import { useState, useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchLocationSuggestions,
  fetchCurrentLocation,
  setConfirmedLocation,
  setCategoryName,
  setRestaurantName,
  clearSuggestions,
} from '../features/SearchContext/searchContaxtSlice';
import { setUserLocation } from '../features/location/locationSlice';

// Debounce utility
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

export const useSearchContext = initialIpLocation => {
  const dispatch = useDispatch();

  // --- Redux State ---
  const {
    suggestions,
    loading: isLocationLoading,
    selectedLocation,
    categoryName: persistedCategoryName,
    restaurantName: persistedRestaurantName,
  } = useSelector(state => state.searchContext);

  // --- Local UI State for Input Values ---
  const [locationSearchTerm, setLocationSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  // --- Debounce Setup ---
  // Use useRef to keep a stable reference to the debounced function
  const debouncedFetchSuggestions = useRef(
    debounce(query => dispatch(fetchLocationSuggestions(query)), 500)
  ).current;

  // --- Effects (Initialization) ---
  useEffect(() => {
    // 1. Initialize location input from IP data if no selection exists
    if (initialIpLocation && initialIpLocation.city && !selectedLocation) {
      const { city, region, country, latitude, longitude } = initialIpLocation;
      const initialLocationObject = {
        name: `${city}, ${region}, ${country}`,
        city: city,
        lat: latitude,
        lng: longitude,
        simpleCityName: city,
      };
      dispatch(setConfirmedLocation(initialLocationObject));
    }

    // 2. Initialize local input state from Redux
    // Note: This relies on the setConfirmedLocation dispatch above finishing
    if (selectedLocation) {
      setLocationSearchTerm(selectedLocation.name);
    } else if (initialIpLocation && initialIpLocation.city) {
      // Fallback for initial placeholder if selectedLocation is still null
      setLocationSearchTerm(
        `${initialIpLocation.city}, ${initialIpLocation.region}, ${initialIpLocation.country}`
      );
    }
  }, [initialIpLocation, selectedLocation, dispatch]);

  // --- Handlers ---

  // 1. Location Input Change Handler
  const handleLocationChange = useCallback(
    e => {
      const value = e.target.value;
      setLocationSearchTerm(value);
      setShowSuggestions(true);
      debouncedFetchSuggestions(value);
    },
    [debouncedFetchSuggestions]
  );

  // 2. Location Suggestion Selection Handler
  const handleSelectLocation = useCallback(
    location => {
      dispatch(setConfirmedLocation(location));
      setShowSuggestions(false);
      console.log('for watching the acions inside the handleSelectLocation');
      console.log('location', location);
      dispatch(setUserLocation(location));
    },
    [dispatch]
  );

  // 3. Use Current Location Handler
  const handleUseCurrentLocation = useCallback(() => {
    dispatch(fetchCurrentLocation()); // Triggers GPS fetch and reverse geocoding
    dispatch(clearSuggestions());
  }, [dispatch]);

  // 4. Category/Food Input Change Handler
  const handleCategoryChange = useCallback(
    e => {
      dispatch(setCategoryName(e.target.value));
    },
    [dispatch]
  );

  // 5. Restaurant Name Input Change Handler (Assuming a separate input)
  const handleRestaurantNameChange = useCallback(
    e => {
      dispatch(setRestaurantName(e.target.value));
    },
    [dispatch]
  );

  // 6. Focus Handler (Used to show the dropdown)
  const handleInputFocus = useCallback(() => {
    setShowSuggestions(true);
  }, []);

  return {
    locationSearchTerm,
    isLocationLoading,
    suggestions,
    showSuggestions,
    selectedLocation,

    // Category/Restaurant exports
    categoryName: persistedCategoryName,
    restaurantName: persistedRestaurantName,

    // Handlers
    handleLocationChange,
    handleSelectLocation,
    handleUseCurrentLocation,
    handleCategoryChange,
    handleRestaurantNameChange,
    handleInputFocus,
    setShowSuggestions,
  };
};
