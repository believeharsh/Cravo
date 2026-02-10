import React from 'react';
import Icon from '../../ui/Icon';
import Button from '../../ui/Button';

const SearchModal = ({
  isOpen,
  onClose,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 transition-transform duration-300 transform scale-100 opacity-100">
        <Button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-text-secondary transition-colors"
          variant="ghost"
        >
          <Icon name="x" size={24} />
        </Button>
        <h2 className="text-2xl font-bold text-text-main mb-6">Search</h2>
        <form onSubmit={onSearchSubmit} className="w-full relative">
          <div className="relative">
            <Icon
              name="search"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-muted cursor-pointer"
              size={20}
            />
            <input
              type="text"
              placeholder="Search for restaurants, cuisines, or dishes..."
              value={searchQuery}
              onChange={onSearchChange}
              className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 text-text-main font-medium transition-colors duration-200"
              autoFocus
            />
          </div>
        </form>
        <div className="mt-6">
          <p className="text-sm text-text-muted">
            Start typing to explore options...
          </p>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
