import React from 'react';

import Button from '../../ui/Button';
import Icon from '../../ui/Icon';

const SearchModal = ({
  isOpen,
  onClose,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
}) => {
  if (!isOpen) return null;

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-start justify-center bg-black p-4 backdrop-blur-sm transition-opacity duration-300">
      <div className="relative w-full max-w-2xl scale-100 transform rounded-2xl bg-white p-6 opacity-100 shadow-xl transition-transform duration-300">
        <Button
          onClick={onClose}
          className="hover:text-text-secondary absolute top-4 right-4 text-gray-400 transition-colors"
          variant="ghost"
        >
          <Icon name="x" size={24} />
        </Button>
        <h2 className="text-text-main mb-6 text-2xl font-bold">Search</h2>
        <form onSubmit={onSearchSubmit} className="relative w-full">
          <div className="relative">
            <Icon
              name="search"
              className="text-text-muted absolute top-1/2 left-4 -translate-y-1/2 transform cursor-pointer"
              size={20}
            />
            <input
              type="text"
              placeholder="Search for restaurants, cuisines, or dishes..."
              value={searchQuery}
              onChange={onSearchChange}
              className="text-text-main w-full rounded-xl bg-gray-100 py-3 pr-4 pl-12 font-medium transition-colors duration-200 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              autoFocus
            />
          </div>
        </form>
        <div className="mt-6">
          <p className="text-text-muted text-sm">
            Start typing to explore options...
          </p>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
