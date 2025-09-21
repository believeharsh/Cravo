// import React, { useState, useEffect, useRef } from 'react';
// import { NavLink } from 'react-router-dom';
// import Icon from '../../../components/ui/Icon';
// import { useSelector } from 'react-redux';

// // Utility function to debounce API calls
// const debounce = (func, delay) => {
//   let timeoutId;
//   return (...args) => {
//     if (timeoutId) {
//       clearTimeout(timeoutId);
//     }
//     timeoutId = setTimeout(() => {
//       func.apply(null, args);
//     }, delay);
//   };
// };

// const Hero = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [suggestions, setSuggestions] = useState([]);
//   const [isLocationLoading, setIsLocationLoading] = useState(false);
//   const [selectedLocation, setSelectedLocation] = useState(null);
//   const [locationFocused, setLocationFocused] = useState(false);
//   const [showSuggestions, setShowSuggestions] = useState(false);

//   // State for food input (not implemented in this version, but kept for consistency)
//   const [foodFocused, setFoodFocused] = useState(false);

//   const { city, region, country } = useSelector(state => state.location);

//   const location_placehoder = `${city}, ${region}, ${country}`;

//   // Reference for the location search container to handle clicks outside
//   const locationRef = useRef(null);

//   // --- API Functions (your "frontend backend") ---

//   // Function for manual search (Geocoding) using OpenStreetMap Nominatim API
//   const fetchGeocodeSuggestions = async query => {
//     if (query.length < 3) {
//       setSuggestions([]);
//       return;
//     }
//     setIsLocationLoading(true);
//     const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
//       query
//     )}&format=json&addressdetails=1&limit=5`;
//     try {
//       const response = await fetch(url);
//       if (!response.ok) {
//         throw new Error('Failed to fetch suggestions from OpenStreetMap');
//       }
//       const data = await response.json();
//       const formattedSuggestions = data.map(item => ({
//         name: item.display_name,
//         lat: parseFloat(item.lat),
//         lng: parseFloat(item.lon),
//       }));
//       setSuggestions(formattedSuggestions);
//     } catch (error) {
//       console.error('Geocoding API error:', error);
//       setSuggestions([]);
//     } finally {
//       setIsLocationLoading(false);
//     }
//   };

//   // Function for current location (Reverse Geocoding)
//   const fetchReverseGeocode = async (lat, lng) => {
//     const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;
//     try {
//       const response = await fetch(url);
//       if (!response.ok) {
//         throw new Error('Failed to fetch address from OpenStreetMap');
//       }
//       const data = await response.json();
//       const newLocation = {
//         name: data.display_name,
//         lat,
//         lng,
//       };
//       setSelectedLocation(newLocation);
//       setSearchTerm(data.display_name);
//     } catch (error) {
//       console.error('Reverse geocoding API error:', error);
//       // Fallback in case API fails
//       const fallbackName = `Location: ${lat.toFixed(2)}, ${lng.toFixed(2)}`;
//       const newLocation = {
//         name: fallbackName,
//         lat,
//         lng,
//       };
//       setSelectedLocation(newLocation);
//       setSearchTerm(fallbackName);
//     }
//   };

//   // Debounced version of the search function
//   const debouncedFetchSuggestions = useRef(
//     debounce(fetchGeocodeSuggestions, 500)
//   ).current;

//   // --- Event Handlers ---

//   // Handle changes in the location input field
//   const handleLocationChange = e => {
//     const value = e.target.value;
//     setSearchTerm(value);
//     setShowSuggestions(true); // Show suggestions as soon as user types
//     debouncedFetchSuggestions(value);
//   };

//   // Handle when a suggestion is clicked
//   const handleSelectLocation = location => {
//     setSelectedLocation(location);
//     setSearchTerm(location.name);
//     setShowSuggestions(false);
//   };

//   // Handle the "Use My Current Location" button click
//   const handleUseCurrentLocation = () => {
//     if (navigator.geolocation) {
//       setIsLocationLoading(true);
//       navigator.geolocation.getCurrentPosition(
//         position => {
//           const { latitude, longitude } = position.coords;
//           fetchReverseGeocode(latitude, longitude);
//           setIsLocationLoading(false);
//           setShowSuggestions(false); // Hide the dropdown
//         },
//         error => {
//           console.error('Geolocation error:', error);
//           setIsLocationLoading(false);
//           // You could show an error message to the user here
//         },
//         { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
//       );
//     } else {
//       console.error('Geolocation is not supported by this browser.');
//       // You could show a message to the user that their browser doesn't support geolocation
//     }
//   };

//   // Close the suggestions dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = event => {
//       if (locationRef.current && !locationRef.current.contains(event.target)) {
//         setShowSuggestions(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [locationRef]);

//   // --- JSX ---
//   return (
//     <>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 sm:pt-2 pb-12 sm:pb-20">
//         <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start lg:items-center">
//           {/* Left Content */}
//           <div className="space-y-6 sm:space-y-8">
//             <div className="space-y-4 sm:space-y-6">
//               <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-800 leading-tight">
//                 Satisfy Your <br />
//                 <span className="text-whitess">Cravings</span> <br />
//                 <span className="block sm:inline">Instantly</span>
//               </h2>
//             </div>

//             {/* Search Section */}
//             <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
//               <div className="space-y-4">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
//                   {/* Location Search Input & Suggestions */}
//                   <div className="relative" ref={locationRef}>
//                     <Icon
//                       name={'map-pin'}
//                       className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
//                       size={18}
//                     />
//                     <input
//                       type="text"
//                       // placeholder="Indore, MP, India"
//                       placeholder={location_placehoder}
//                       className="w-full pl-10 sm:pl-12 pr-10 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-yellow-400 text-gray-800 font-medium text-sm sm:text-base"
//                       value={searchTerm}
//                       onChange={handleLocationChange}
//                       onFocus={() => {
//                         setShowSuggestions(true);
//                         setLocationFocused(true);
//                       }}
//                       onBlur={() => setLocationFocused(false)}
//                     />
//                     <Icon
//                       name={isLocationLoading ? 'spinner' : 'chevron-down'}
//                       className={`absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-500 transition-transform duration-200 ${
//                         locationFocused && !isLocationLoading
//                           ? 'rotate-180'
//                           : ''
//                       } ${isLocationLoading ? 'animate-spin' : ''}`}
//                       size={18}
//                     />

//                     {/* Suggestions Dropdown */}
//                     {showSuggestions &&
//                       (searchTerm.length >= 3 ||
//                         suggestions.length > 0 ||
//                         isLocationLoading) && (
//                         <div className="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden max-h-64 overflow-y-auto">
//                           {/* Use My Current Location Button */}
//                           <div
//                             className="flex items-center gap-3 p-4 text-sm font-medium text-blue-600 hover:bg-gray-50 cursor-pointer"
//                             onClick={handleUseCurrentLocation}
//                           >
//                             <Icon name="locate-fixed" size={18} />
//                             <span>Use My Current Location</span>
//                           </div>

//                           <hr className="border-gray-200" />

//                           {/* Loading State */}
//                           {isLocationLoading && (
//                             <div className="p-4 text-center text-sm text-gray-500">
//                               Loading...
//                             </div>
//                           )}

//                           {/* No Results State */}
//                           {!isLocationLoading &&
//                             suggestions.length === 0 &&
//                             searchTerm.length >= 3 && (
//                               <div className="p-4 text-center text-sm text-gray-500">
//                                 No locations found.
//                               </div>
//                             )}

//                           {/* List of Suggestions */}
//                           {!isLocationLoading && suggestions.length > 0 && (
//                             <ul>
//                               {suggestions.map((location, index) => (
//                                 <li
//                                   key={index}
//                                   className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-sm font-medium text-gray-700"
//                                   onMouseDown={e => e.preventDefault()} // Prevents blur event on click
//                                   onClick={() => handleSelectLocation(location)}
//                                 >
//                                   {location.name}
//                                 </li>
//                               ))}
//                             </ul>
//                           )}
//                         </div>
//                       )}
//                   </div>

//                   {/* Restaurant Search Input */}
//                   <div className="relative">
//                     <Icon
//                       name={'search'}
//                       className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
//                       size={18}
//                     />
//                     <input
//                       type="text"
//                       placeholder="Pizza, Burger, Chinese..."
//                       className="w-full pl-10 sm:pl-12 pr-10 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-yellow-400 text-gray-800 font-medium text-sm sm:text-base"
//                       onFocus={() => setFoodFocused(true)}
//                       onBlur={() => setFoodFocused(false)}
//                     />
//                     <Icon
//                       name={'chevron-down'}
//                       className={`absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-500 transition-transform duration-200 ${
//                         foodFocused ? 'rotate-180' : ''
//                       }`}
//                       size={18}
//                     />
//                   </div>
//                 </div>

//                 {/* The "Find Delicious Food" button now needs to be smarter.
//                     It should use the selectedLocation, but for now we'll keep the link. */}
//                 <NavLink to={'/restaurants'}>
//                   <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-3 sm:py-4 rounded-xl transition-colors shadow-md text-sm sm:text-base cursor-pointer">
//                     Find Delicious Food
//                   </button>
//                 </NavLink>
//               </div>
//             </div>
//           </div>

//           {/* Right Image/Branding */}
//           <div className="relative mt-8 lg:mt-0">
//             <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-6 sm:p-8 shadow-xl">
//               <div className="text-center space-y-4 sm:space-y-6">
//                 <div className="relative">
//                   <div className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 mx-auto bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
//                     <div className="text-center">
//                       <div className="text-4xl sm:text-5xl lg:text-6xl mb-2 sm:mb-4">
//                         🍽️
//                       </div>
//                       <p className="text-gray-800 text-base sm:text-lg font-bold">
//                         Premium Quality
//                       </p>
//                       <p className="text-gray-600 text-xs sm:text-sm">
//                         Fresh & Fast
//                       </p>
//                     </div>
//                   </div>

//                   <div className="absolute -top-2 sm:-top-4 -left-2 sm:-left-4 bg-green-400 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full font-bold shadow-lg text-xs sm:text-sm">
//                     🌿 Fresh
//                   </div>
//                   <div className="absolute -bottom-2 sm:-bottom-4 -right-2 sm:-right-4 bg-yellow-500 text-gray-800 px-2 sm:px-4 py-1 sm:py-2 rounded-full font-bold shadow-lg text-xs sm:text-sm">
//                     ⚡ 30 min
//                   </div>
//                   <div className="absolute top-1/2 -right-4 sm:-right-8 bg-white text-gray-800 px-2 sm:px-3 py-1 sm:py-2 rounded-full font-semibold shadow-lg text-xs sm:text-sm border-2 border-yellow-400">
//                     1000+ 🏪
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Hero;

import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import Icon from '../../../components/ui/Icon';
import { useSelector } from 'react-redux';

// Utility function to debounce API calls
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

  // State for food input (not implemented in this version, but kept for consistency)
  const [foodFocused, setFoodFocused] = useState(false);

  const { city, region, country } = useSelector(state => state.location);

  const location_placehoder = `${city}, ${region}, ${country}`;

  // Reference for the location search container to handle clicks outside
  const locationRef = useRef(null);

  // --- API Functions (your "frontend backend") ---

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

  // --- Event Handlers ---

  // Handle changes in the location input field
  const handleLocationChange = e => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowSuggestions(true); // Show suggestions as soon as user types
    debouncedFetchSuggestions(value);
  };

  // Handle when a suggestion is clicked
  const handleSelectLocation = location => {
    setSelectedLocation(location);
    setSearchTerm(location.name);
    setShowSuggestions(false);
  };

  // Handle the "Use My Current Location" button click
  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      setIsLocationLoading(true);
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          fetchReverseGeocode(latitude, longitude);
          setIsLocationLoading(false);
          setShowSuggestions(false); // Hide the dropdown
        },
        error => {
          console.error('Geolocation error:', error);
          setIsLocationLoading(false);
          // You could show an error message to the user here
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      // You could show a message to the user that their browser doesn't support geolocation
    }
  };

  // Close the suggestions dropdown when clicking outside
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

  // --- JSX ---
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-1  pb-12 sm:pb-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start lg:items-center">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-4 sm:space-y-6">
              {/* Enhanced Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                <span className="text-gray-900">Satisfy Your</span>
                <br />
                <span className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
                  Cravings
                </span>
                <br />
                <span className="text-gray-700">Instantly</span>
              </h1>

              {/* Added subtitle for better context */}
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-lg">
                Discover amazing food from local restaurants and get it
                delivered fresh to your doorstep.
              </p>
            </div>

            {/* Enhanced Search Section */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-xl border border-gray-200/50">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {/* Location Search Input & Suggestions */}
                  <div className="relative" ref={locationRef}>
                    <Icon
                      name={'map-pin'}
                      className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                      size={18}
                    />
                    <input
                      type="text"
                      placeholder={location_placehoder}
                      className="w-full pl-10 sm:pl-12 pr-10 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 text-gray-800 font-medium text-sm sm:text-base transition-all duration-200"
                      value={searchTerm}
                      onChange={handleLocationChange}
                      onFocus={() => {
                        setShowSuggestions(true);
                        setLocationFocused(true);
                      }}
                      onBlur={() => setLocationFocused(false)}
                    />
                    <Icon
                      name={isLocationLoading ? 'loader-2' : 'chevron-down'}
                      className={`absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-500 transition-transform duration-200 ${
                        locationFocused && !isLocationLoading
                          ? 'rotate-180'
                          : ''
                      } ${isLocationLoading ? 'animate-spin' : ''}`}
                      size={18}
                    />

                    {/* Enhanced Suggestions Dropdown */}
                    {showSuggestions &&
                      (searchTerm.length >= 3 ||
                        suggestions.length > 0 ||
                        isLocationLoading) && (
                        <div className="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden max-h-64 overflow-y-auto">
                          {/* Use My Current Location Button */}
                          <div
                            className="flex items-center gap-3 p-4 text-sm font-medium text-blue-600 hover:bg-blue-50 cursor-pointer transition-colors duration-150"
                            onClick={handleUseCurrentLocation}
                          >
                            <Icon name="locate-fixed" size={18} />
                            <span>Use My Current Location</span>
                          </div>

                          <hr className="border-gray-200" />

                          {/* Loading State */}
                          {isLocationLoading && (
                            <div className="p-4 text-center text-sm text-gray-500">
                              <Icon
                                name="loader-2"
                                className="animate-spin mx-auto mb-2"
                                size={20}
                              />
                              Loading...
                            </div>
                          )}

                          {/* No Results State */}
                          {!isLocationLoading &&
                            suggestions.length === 0 &&
                            searchTerm.length >= 3 && (
                              <div className="p-4 text-center text-sm text-gray-500">
                                No locations found.
                              </div>
                            )}

                          {/* List of Suggestions */}
                          {!isLocationLoading && suggestions.length > 0 && (
                            <ul>
                              {suggestions.map((location, index) => (
                                <li
                                  key={index}
                                  className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-sm font-medium text-gray-700 transition-colors duration-150 flex items-center gap-3"
                                  onMouseDown={e => e.preventDefault()} // Prevents blur event on click
                                  onClick={() => handleSelectLocation(location)}
                                >
                                  <Icon
                                    name="map-pin"
                                    size={16}
                                    className="text-gray-400 flex-shrink-0"
                                  />
                                  <span className="truncate">
                                    {location.name}
                                  </span>
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
                      className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                      size={18}
                    />
                    <input
                      type="text"
                      placeholder="Pizza, Burger, Chinese..."
                      className="w-full pl-10 sm:pl-12 pr-10 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 text-gray-800 font-medium text-sm sm:text-base transition-all duration-200"
                      onFocus={() => setFoodFocused(true)}
                      onBlur={() => setFoodFocused(false)}
                    />
                    <Icon
                      name={'chevron-down'}
                      className={`absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-500 transition-transform duration-200 ${
                        foodFocused ? 'rotate-180' : ''
                      }`}
                      size={18}
                    />
                  </div>
                </div>

                {/* Enhanced CTA Button */}
                <NavLink to={'/restaurants'}>
                  <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 sm:py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] cursor-pointer flex items-center justify-center space-x-2 text-sm sm:text-base">
                    <Icon name="search" size={18} />
                    <span>Find Delicious Food</span>
                    <Icon name="arrow-right" size={18} />
                  </button>
                </NavLink>
              </div>
            </div>
          </div>

          {/* Right Image/Branding - Enhanced but kept minimal */}
          <div className="relative mt-8 lg:mt-0">
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100">
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

                  {/* Enhanced floating badges */}
                  <div className="absolute -top-2 sm:-top-4 -left-2 sm:-left-4 bg-green-500 text-white px-3 sm:px-4 py-2 rounded-full font-semibold shadow-lg text-xs sm:text-sm flex items-center space-x-1">
                    <Icon name="leaf" size={14} />
                    <span>Fresh</span>
                  </div>
                  <div className="absolute -bottom-2 sm:-bottom-4 -right-2 sm:-right-4 bg-orange-500 text-white px-3 sm:px-4 py-2 rounded-full font-semibold shadow-lg text-xs sm:text-sm flex items-center space-x-1">
                    <Icon name="zap" size={14} />
                    <span>30 min</span>
                  </div>
                  <div className="absolute top-1/2 -right-4 sm:-right-8 bg-white text-gray-800 px-3 py-2 rounded-full font-semibold shadow-lg text-xs sm:text-sm border-2 border-yellow-400 flex items-center space-x-1">
                    <span>1000+</span>
                    <Icon name="store" size={14} />
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
