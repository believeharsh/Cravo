import React from 'react';

const CategoryHeader = ({ categoryName, categoryDescription, restaurantCount, userLocation }) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
        {categoryName}
      </h1>
      <p className="text-gray-600 text-lg">{categoryDescription}</p>
      <div className="flex items-center space-x-4 mt-4 text-sm text-gray-500">
        <span>{restaurantCount} restaurants</span>
        <span>•</span>
        <span>Delivering to {userLocation}</span>
      </div>
    </div>
  );
};

export default CategoryHeader;