import { useState, useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  fetchLocationSuggestions,
  setSelectedLocation as setSelectedSearchLocation,
  fetchCurrentLocation as fetchReverseGeocode,
} from '../features/location/locationSlice';

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

export const useLocationSearch = () => {
  const dispatch = useDispatch();

  // --- Redux State (Source of Truth) ---
  // Get IP-based location for initial placeholder/coordinates
  const initialIpLocation = useSelector(state => ({
    city: state.location.city,
    region: state.location.region,
    country: state.location.country,
    lat: state.location.latitude,
    lng: state.location.longitude,
  }));

  // Get search-related state from the new slice
  const {
    suggestions,
    loading: isLocationLoading,
    selectedLocation: persistedSearchLocation,
  } = useSelector(state => state.locationSearch);

  // --- Local UI State (Temporary/Display) ---
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Debounced function reference
  const debouncedFetchSuggestions = useRef(
    debounce(query => dispatch(fetchLocationSuggestions(query)), 500)
  ).current;

  // --- Effects ---

  // 1. Initialize searchTerm and selectedLocation from IP-based data on first load
  // This ensures the input field is never empty and the app starts with coordinates.
  useEffect(() => {
    const { city, region, country, lat, lng } = initialIpLocation;

    if (city && lat && lng && !persistedSearchLocation) {
      const initialName = `${city}, ${region}, ${country}`;

      const initialLocationObject = {
        name: initialName,
        lat: lat,
        lng: lng,
        simpleCityName: city,
      };

      // Set the initial location in the locationSearch slice
      dispatch(setSelectedSearchLocation(initialLocationObject));
      setSearchTerm(initialName);
    }
  }, [initialIpLocation, persistedSearchLocation, dispatch]);

  // 2. Update local searchTerm when the selected location changes in Redux
  useEffect(() => {
    if (persistedSearchLocation) {
      setSearchTerm(persistedSearchLocation.name);
      setShowSuggestions(false);
    }
  }, [persistedSearchLocation]);

  // --- Handlers ---

  // Handle user typing in the location input
  const handleLocationChange = useCallback(
    e => {
      const value = e.target.value;
      setSearchTerm(value);
      setShowSuggestions(true);
      debouncedFetchSuggestions(value);
    },
    [debouncedFetchSuggestions]
  );

  // Handle user clicking a suggestion item
  const handleSelectLocation = useCallback(
    location => {
      dispatch(setSelectedSearchLocation(location));
    },
    [dispatch]
  );

  // Handle "Use My Current Location" button click
  const handleUseCurrentLocation = useCallback(() => {
    // Trigger the Redux thunk for browser geolocation/reverse geocoding
    dispatch(fetchReverseGeocode());
  }, [dispatch]);

  // Handle when the location input gains focus
  const handleInputFocus = useCallback(() => {
    setShowSuggestions(true);
    if (searchTerm.length < 3) {
      // Optionally clear old suggestions if input is reset
      // dispatch(clearSuggestions());
    }
  }, [searchTerm, dispatch]);

  return {
    searchTerm,
    suggestions,
    isLocationLoading,
    persistedSearchLocation,
    showSuggestions,
    initialPlaceholder: `${initialIpLocation.city}, ${initialIpLocation.region}, ${initialIpLocation.country}`,

    // Handlers
    handleLocationChange,
    handleSelectLocation,
    handleUseCurrentLocation,
    handleInputFocus,
    setShowSuggestions,
  };
};
