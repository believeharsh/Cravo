import React from 'react';

const ExploreMore = () => {
  const categories = [
    "Burgers", "Chinese", "Desserts", "South Indian", "Healthy", "Biryani"
  ];

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Explore More Categories
      </h2>
      <div className="flex flex-wrap gap-4">
        {categories.map((item) => (
          <button
            key={item}
            className="px-5 py-2 bg-gray-100 hover:bg-yellow-100 rounded-xl text-gray-700 font-medium transition-all"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ExploreMore;