// src/hooks/useSearchContext.js

import { useState, useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchLocationSuggestions,
  fetchCurrentLocation, // GPS thunk
  setConfirmedLocation, // Location setter
  setCategoryName, // Category setter
  setRestaurantName, // Added missing action for completeness
  clearSuggestions, // Added missing action for completeness
} from '../features/SearchContext/searchContaxtSlice'; // Assuming you added setRestaurantName and clearSuggestions

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
  // const Data = useSelector(state => state.searchContext) ;
  // console.log("Data inside hook", Data) ;

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
      const { city, region, country, lat, lng } = initialIpLocation;
      const initialLocationObject = {
        name: `${city}, ${region}, ${country}`,
        lat,
        lng,
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
  }, [initialIpLocation, selectedLocation, dispatch]); // Added missing dependencies

  // --- Handlers ---

  // 1. Location Input Change Handler
  const handleLocationChange = useCallback(
    e => {
      const value = e.target.value;
      setLocationSearchTerm(value);
      setShowSuggestions(true);

      // --- COMPLETED DEBOUNCE CALL ---
      debouncedFetchSuggestions(value);
      // --------------------------------
    },
    [debouncedFetchSuggestions]
  ); // Added debouncedFetchSuggestions as dependency

  // 2. Location Suggestion Selection Handler
  const handleSelectLocation = useCallback(
    location => {
      dispatch(setConfirmedLocation(location));
      // searchTerm will update via the useEffect hook
      setShowSuggestions(false); // Hide the dropdown manually
    },
    [dispatch]
  );

  // 3. Use Current Location Handler
  const handleUseCurrentLocation = useCallback(() => {
    dispatch(fetchCurrentLocation()); // Triggers GPS fetch and reverse geocoding
    dispatch(clearSuggestions()); // Clear the UI list while loading
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
    // Location-related exports
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
    handleRestaurantNameChange, // Export the new handler
    handleInputFocus,
    setShowSuggestions, // Export for the outside click handler in Hero.jsx
  };
};
