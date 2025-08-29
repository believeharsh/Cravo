import React from 'react';
import Icon from '../../../components/ui/Icon';

const MenuFilters = ({ activeFilter, setActiveFilter }) => {
  const allCategories = ['All', 'Bestseller', 'Veg', 'Non-Veg'];
  return (
    <div className="sticky top-0 z-20 bg-gray-50 pt-6 -mt-6">
      <div className="flex gap-4 p-4 -mx-4 overflow-x-auto scrollbar-hide bg-white rounded-3xl shadow-sm">
        {allCategories.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`flex items-center justify-center min-w-[100px] py-2 px-4 rounded-full text-sm font-semibold transition-all duration-200 ease-in-out whitespace-nowrap
              ${
                activeFilter === filter
                  ? 'bg-yellow-400 text-gray-800 shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            {filter === 'All' && 'All Items'}
            {filter === 'Bestseller' && (
              <div className="flex items-center">
                <Icon name="star" className="w-4 h-4 mr-1 fill-current" />{' '}
                Bestsellers
              </div>
            )}
            {filter === 'Veg' && (
              <div className="flex items-center">
                <Icon name="salad" className="w-4 h-4 mr-1" /> Veg
              </div>
            )}
            {filter === 'Non-Veg' && (
              <div className="flex items-center">
                <Icon name="pizza" className="w-4 h-4 mr-1" /> Non-Veg
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MenuFilters;
