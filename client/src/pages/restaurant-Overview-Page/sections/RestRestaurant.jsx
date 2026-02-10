// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate, Link, useSearchParams } from 'react-router-dom';
// import axiosInstance from '../../../api/axiosInstance';
// import RestaurantCard from '../../../components/shared/RestaurantCard';
// import { API } from '../../../config/api';
// const RestaurantGrid = () => {
//   const { city, latitude, longitude } = useSelector(state => state.location);
//   const navigate = useNavigate();
//   // 3. Local State (Grid Data)
//   const [restaurants, setRestaurants] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const limit = 10;
//   const page = 1;
//   useEffect(() => {
//     const fetchRestaurants = async () => {
//       setError(null);
//       setIsLoading(true); // Always set loading state when starting fetch
//       const queryParams = new URLSearchParams();
//       if (city) {
//         queryParams.append('cityName', city);
//       } else if (latitude && longitude) {
//         queryParams.append('latitude', latitude);
//         queryParams.append('longitude', longitude);
//       } else {
//         console.log('No valid location data found to fetch restaurants.');
//         setIsLoading(false);
//         return;
//       }
//       queryParams.append('limit', limit);
//       queryParams.append('page', page);
//       try {
//         const apiUrl = `${API.RESTAURANTS.RESTAURANTS_LIST}?${queryParams.toString()}`;
//         console.log(apiUrl);
//         const response = await axiosInstance.get(apiUrl);
//         console.log('response inside the Rest Restaurants', response);
//         setRestaurants(response.data.data.restaurants || []);
//       } catch (err) {
//         console.error('Error fetching restaurants:', err);
//         setError(err.message || 'An unknown error occurred.');
//         setRestaurants([]);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     if (city || (latitude && longitude)) {
//       fetchRestaurants();
//     } else {
//       setIsLoading(false);
//     }
//   }, [city, latitude, longitude, limit, page]);
//   const handleNavigateToCategoryResultPage = categoryName => {
//     const queryParams = new URLSearchParams();
//     if (city) {
//       queryParams.append('cityName', city);
//     } else if (latitude && longitude) {
//       queryParams.append('lat', latitude);
//       queryParams.append('lng', longitude);
//     }
//     navigate(`/categories/${categoryName}?${queryParams.toString()}`);
//   };
//   if (isLoading) {
//     return (
//       <section className="py-6 text-center">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6">
//           <p className="text-text-muted">Loading restaurants...</p>
//         </div>
//       </section>
//     );
//   }
//   if (error) {
//     return (
//       <section className="py-6 text-center">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6">
//           <p className="text-red-500">Error: {error}</p>
//         </div>
//       </section>
//     );
//   }
//   if (restaurants.length === 0) {
//     return (
//       <section className="py-6 text-center">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6">
//           <p className="text-text-muted">
//             No restaurants found in {city || 'your area'}.
//           </p>
//         </div>
//       </section>
//     );
//   }
//   return (
//     <section className="py-6">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6">
//         <h2 className="text-xl font-bold text-text-main mb-8">
//           Restaurants with online delivery in {city}
//         </h2>
//         <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
//           {restaurants.map(r => {
//             const restaurant_slug = r.name.toLowerCase().replace(/\s+/g, '-');
//             return (
//               <Link
//                 to={`/menu/${restaurant_slug}/${r._id}`}
//                 className="flex-shrink-0 px-2 sm:px-3"
//                 key={r._id}
//               >
//                 <RestaurantCard data={r} />
//               </Link>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// };
// export default RestaurantGrid;
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import axiosInstance from '../../../api/axiosInstance';
import RestaurantCard from '../../../components/shared/RestaurantCard';
import RestaurantSkeletonCard from '../../../components/shared/RestaurantCardSkeleton';
import { API } from '../../../config/api';

const RestaurantGrid = () => {
  // --- Redux Location State (Single Source of Truth) ---
  const { city, latitude, longitude } = useSelector(state => state.location);
  const navigate = useNavigate();

  // --- Local State (Grid Data) ---
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Pagination State ---
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 6;

  // --- Intersection Observer Setup ---
  const observer = useRef();
  const lastRestaurantElementRef = useCallback(
    node => {
      // Only observe if we are NOT loading AND there is potentially more data
      if (isLoading || !hasMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting && hasMore) {
            setPage(prevPage => prevPage + 1);
          }
        },
        {
          rootMargin: '200px',
        }
      );

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  // --- Data Fetching Logic ---
  const fetchRestaurants = useCallback(
    async pageNum => {
      setError(null);
      // ⚠️ CRITICAL: Only set the loading state to true here ⚠️
      // This is because the initial load (page 1) needs loading, and subsequent loads need it.
      setIsLoading(true);

      const queryParams = new URLSearchParams();
      let locationValid = false;
      if (city) {
        queryParams.append('cityName', city);
        locationValid = true;
      } else if (latitude && longitude) {
        queryParams.append('latitude', latitude);
        locationValid = true;
      }

      if (!locationValid) {
        console.log('No valid location data found to fetch restaurants.');
        // If no valid location, ensure state is clean and stop loading
        if (pageNum === 1) setRestaurants([]);
        setIsLoading(false);
        return;
      }

      queryParams.append('limit', limit);
      queryParams.append('page', pageNum);

      try {
        const apiUrl = `${API.RESTAURANTS.RESTAURANTS_LIST}?${queryParams.toString()}`;
        const response = await axiosInstance.get(apiUrl);

        const newRestaurants = response.data.data.restaurants || [];
        const totalPages = parseInt(response.data.data.totalPages, 10);

        // Update state with new data
        setRestaurants(prevRestaurants => {
          if (pageNum === 1) {
            return newRestaurants; // Start fresh on page 1
          }
          return [...prevRestaurants, ...newRestaurants]; // Append on subsequent pages
        });

        // Update hasMore flag
        setHasMore(pageNum < totalPages);
      } catch (err) {
        console.error('Error fetching restaurants:', err);
        setError(err.message || 'An unknown error occurred.');
        setHasMore(false);
      } finally {
        setIsLoading(false);
      }
    },
    [city, latitude, longitude]
  );

  // --- Main Effect: Triggered by Location Change or Page Increment ---
  useEffect(() => {
    if (city || (latitude && longitude)) {
      // When location changes, force a reset to page 1
      if (page === 1) {
        fetchRestaurants(1);
      } else {
        // Intersection Observer triggered page change
        fetchRestaurants(page);
      }
    } else {
      setIsLoading(false);
      setRestaurants([]);
    }
  }, [city, latitude, longitude, page, fetchRestaurants]);

  // --- Initial Loading State (Before any data is loaded) ---
  // If no restaurants are loaded yet AND we are loading (page 1 fetch)
  if (isLoading && restaurants.length === 0) {
    return (
      <section className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-text-main mb-8 text-xl font-bold">
            Loading Restaurants...
          </h2>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {/* Show 8 skeletons for a good first-load experience */}
            {Array.from({ length: 8 }).map((_, index) => (
              <RestaurantSkeletonCard key={`initial-skel-${index}`} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // --- Error/Empty States ---
  if (error && restaurants.length === 0) {
    // ... (Error JSX as before)
  }
  if (restaurants.length === 0 && !isLoading) {
    // ... (No restaurants found JSX as before)
  }

  // --- Main Render ---
  return (
    <section className="">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="text-text-main mb-8 text-xl font-bold">
          Restaurants with online delivery in {city}
        </h2>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {/* Render all fetched restaurants */}
          {restaurants.map((r, index) => {
            const restaurant_slug = r.name.toLowerCase().replace(/\s+/g, '-');

            // Attach ref to the last element if we still expect more data
            const isLastElement = restaurants.length === index + 1;

            return (
              <Link
                ref={isLastElement ? lastRestaurantElementRef : null}
                to={`/menu/${restaurant_slug}/${r._id}`}
                className="flex-shrink-0 px-2 sm:px-3"
                key={r._id || index}
              >
                <RestaurantCard data={r} />
              </Link>
            );
          })}

          {/* ⚡️ INFINITE SCROLL SKELETONS ⚡️ */}
          {isLoading && restaurants.length > 0 && (
            // Show skeletons while loading the next page
            <>
              {Array.from({ length: limit }).map((_, index) => (
                <RestaurantSkeletonCard key={`scroll-skel-${index}`} />
              ))}
            </>
          )}
        </div>

        {/* End of List Message */}
        {!hasMore && restaurants.length > 0 && (
          <div className="py-8 text-center">
            <p className="text-text-muted">
              You've reached the end of the list. ✨
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default RestaurantGrid;
