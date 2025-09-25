import React from 'react';

const CategoryHeader = ({
  categoryName,
  categoryDescription,
  restaurantCount,
  // userLocation,
  cityName,
}) => {
  return (
    <div className="relative mb-10 bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100 shadow-sm">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-yellow-50 to-transparent rounded-2xl opacity-60"></div>

      <div className="relative z-10">
        {/* Category badge */}
        <div className="inline-flex items-center px-3 py-1 rounded-full text-yellow-300 text-sm font-medium mb-1">
          <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
          Category
        </div>

        {/* Main heading */}
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3 leading-tight">
          {categoryName}
        </h1>

        {/* Description */}
        <p className="text-gray-600 text-lg lg:text-xl leading-relaxed mb-6 max-w-2xl">
          {categoryDescription}
        </p>

        {/* Meta information */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
          <div className="flex items-center space-x-2 text-gray-700">
            <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <span className="font-medium">{restaurantCount}</span>
            <span className="text-gray-500">restaurants available</span>
          </div>

          <div className="flex items-center space-x-2 text-gray-700">
            <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            </div>
            <span className="text-gray-500">Delivering to</span>
            <span className="font-medium">{cityName}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryHeader;
