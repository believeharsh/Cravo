import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const CityCard = ({ city }) => (
  <div className="px-2 sm:px-3 mb-4">
    <div
      className="bg-white rounded-xl border border-gray-200 flex flex-col items-center
                 justify-center py-5 hover:-translate-y-1 hover:shadow-md
                 transition-transform duration-200 ease-out"
    >
      <span className="font-medium text-gray-700 text-sm text-center">
        {city.name}
      </span>
    </div>
  </div>
);

const CitiesSection = () => {
  const { data, isLoading, error } = useSelector(state => state.landingPage);
  const citiesData = data.cities;

  const [cities, setCities] = useState([]);
  const [showAll, setShowAll] = useState(false);

  // Number of cities to show initially
  const INITIAL_CITIES_COUNT = 8;

  useEffect(() => {
    if (citiesData) {
      setCities(citiesData);
    }
  }, [data]);

  // Get cities to display based on showAll state
  const citiesToDisplay = showAll
    ? cities
    : cities.slice(0, INITIAL_CITIES_COUNT);
  const hasMoreCities = cities.length > INITIAL_CITIES_COUNT;

  const handleShowMore = () => {
    setShowAll(true);
  };

  const handleShowLess = () => {
    setShowAll(false);
  };

  return (
    <section className="mb-2 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 mt-15">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Cities We Serve</h2>
            <p className="text-gray-600 text-sm mt-1">
              Bringing delicious food to your doorstep across India
            </p>
          </div>
        </div>

        {/* Cities Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {citiesToDisplay.map(city => (
            <CityCard key={city._id} city={city} />
          ))}
        </div>

        {/* Show More/Less Button */}
        {hasMoreCities && (
          <div className="flex justify-center mt-6">
            {!showAll ? (
              <button
                onClick={handleShowMore}
                className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 
                         transition-colors duration-200 font-medium text-sm"
              >
                Show More Cities ({cities.length - INITIAL_CITIES_COUNT})
              </button>
            ) : (
              <button
                onClick={handleShowLess}
                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 
                         transition-colors duration-200 font-medium text-sm"
              >
                Show Less
              </button>
            )}
          </div>
        )}

        {/* Loading and Error States */}
        {isLoading && (
          <div className="flex justify-center items-center py-8">
            <div className="text-gray-500">Loading cities...</div>
          </div>
        )}

        {error && (
          <div className="flex justify-center items-center py-8">
            <div className="text-red-500">Error loading cities</div>
          </div>
        )}

        {!isLoading && !error && cities.length === 0 && (
          <div className="flex justify-center items-center py-8">
            <div className="text-gray-500">No cities available</div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CitiesSection;
