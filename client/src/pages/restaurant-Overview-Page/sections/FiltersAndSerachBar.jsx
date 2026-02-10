import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/ui/Icon';

const FiltersAndSerachBar = ({
  isVisible = true,
  onFilterChange,
  onSortChange,
  onSearchChange,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortByOpen, setIsSortByOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedSortBy, setSelectedSortBy] = useState('relevance');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    fastDelivery: false,
    newProducts: false,
    rating4Plus: false,
    pureVeg: false,
    offers: false,
    price300to600: false,
    priceLess300: false,
  });

  const sortByRef = useRef(null);
  const filterRef = useRef(null);
  const searchRef = useRef(null);

  const sortOptions = [
    { id: 'relevance', label: 'Relevance', description: 'Best match for you' },
    { id: 'rating', label: 'Rating', description: 'Highest rated first' },
    {
      id: 'deliveryTime',
      label: 'Delivery Time',
      description: 'Fastest first',
    },
    {
      id: 'costLowToHigh',
      label: 'Cost: Low to High',
      description: 'Cheapest first',
    },
    {
      id: 'costHighToLow',
      label: 'Cost: High to Low',
      description: 'Most expensive first',
    },
    {
      id: 'popularity',
      label: 'Popularity',
      description: 'Most ordered first',
    },
  ];

  const quickFilters = [
    {
      id: 'fastDelivery',
      label: 'Fast Delivery',
      icon: 'zap',
      color: 'text-green-500',
      activeColor: 'bg-green-100 text-green-700 border-green-300',
    },
    {
      id: 'newProducts',
      label: 'New',
      icon: 'sparkles',
      color: 'text-purple-500',
      activeColor: 'bg-purple-100 text-purple-700 border-purple-300',
    },
    {
      id: 'rating4Plus',
      label: 'Rating 4.0+',
      icon: 'star',
      color: 'text-yellow-500',
      activeColor: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    },
    {
      id: 'pureVeg',
      label: 'Pure Veg',
      icon: 'leaf',
      color: 'text-green-600',
      activeColor: 'bg-green-100 text-green-700 border-green-300',
    },
    {
      id: 'offers',
      label: 'Offers',
      icon: 'tag',
      color: 'text-red-500',
      activeColor: 'bg-red-100 text-red-700 border-red-300',
    },
    {
      id: 'price300to600',
      label: '₹300-600',
      icon: null,
      color: 'text-blue-500',
      activeColor: 'bg-blue-100 text-blue-700 border-blue-300',
    },
    {
      id: 'priceLess300',
      label: 'Less than ₹300',
      icon: null,
      color: 'text-indigo-500',
      activeColor: 'bg-indigo-100 text-indigo-700 border-indigo-300',
    },
  ];

  useEffect(() => {
    const handleClickOutside = event => {
      if (sortByRef.current && !sortByRef.current.contains(event.target)) {
        setIsSortByOpen(false);
      }
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleQuickFilterToggle = filterId => {
    const newFilters = {
      ...activeFilters,
      [filterId]: !activeFilters[filterId],
    };
    setActiveFilters(newFilters);
    onFilterChange && onFilterChange(newFilters);
  };

  const handleSortChange = sortId => {
    setSelectedSortBy(sortId);
    setIsSortByOpen(false);
    onSortChange && onSortChange(sortId);
  };

  const handleSearchSubmit = e => {
    e.preventDefault();
    onSearchChange && onSearchChange(searchQuery);
  };

  const clearAllFilters = () => {
    const clearedFilters = Object.keys(activeFilters).reduce((acc, key) => {
      acc[key] = false;
      return acc;
    }, {});
    setActiveFilters(clearedFilters);
    onFilterChange && onFilterChange(clearedFilters);
  };

  const getActiveFiltersCount = () => {
    return Object.values(activeFilters).filter(Boolean).length;
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-40 transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="bg-white border-b border-border shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Desktop View */}
          <div className="hidden lg:block">
            <div className="flex items-center justify-between py-4">
              {/* Left Side - Quick Filters */}
              <div className="flex items-center space-x-2 flex-1 overflow-x-auto scrollbar-hide">
                {quickFilters.slice(0, 5).map(filter => {
                  const isActive = activeFilters[filter.id];

                  return (
                    <button
                      key={filter.id}
                      onClick={() => handleQuickFilterToggle(filter.id)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-xl font-medium transition-all duration-200 whitespace-nowrap border ${
                        isActive
                          ? filter.activeColor
                          : 'bg-bg-subtle text-text-secondary hover:bg-gray-100 border-border'
                      }`}
                    >
                      {filter.icon && <Icon name={filter.icon} size={16} />}
                      <span className="text-sm">{filter.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Right Side - Controls */}
              <div className="flex items-center space-x-3 ml-4">
                {/* Search Bar */}
                <form onSubmit={handleSearchSubmit} className="relative">
                  <Icon
                    name="search"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={16}
                  />
                  <input
                    type="text"
                    placeholder="Search restaurants..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-48 pl-10 pr-4 py-2 border border-border rounded-xl focus:outline-none focus:border-border-focus text-sm"
                  />
                </form>

                {/* Sort By Dropdown */}
                <div className="relative" ref={sortByRef}>
                  <button
                    onClick={() => setIsSortByOpen(!isSortByOpen)}
                    className="flex items-center space-x-2 px-4 py-2 bg-bg-subtle hover:bg-gray-100 rounded-xl font-medium text-text-secondary transition-colors duration-200 border border-border"
                  >
                    <span className="text-sm">Sort By</span>
                    <Icon
                      name="chevron-down"
                      size={16}
                      className={`transform transition-transform ${
                        isSortByOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isSortByOpen && (
                    <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-border rounded-2xl shadow-lg">
                      <div className="p-4 border-b border-gray-100">
                        <h3 className="font-bold text-text-main">Sort By</h3>
                      </div>
                      <div className="p-2 max-h-64 overflow-y-auto">
                        {sortOptions.map(option => (
                          <button
                            key={option.id}
                            onClick={() => handleSortChange(option.id)}
                            className="w-full flex items-center justify-between p-3 hover:bg-bg-subtle rounded-xl transition-colors"
                          >
                            <div className="text-left">
                              <p className="font-medium text-text-main text-sm">
                                {option.label}
                              </p>
                              <p className="text-xs text-text-secondary">
                                {option.description}
                              </p>
                            </div>
                            {selectedSortBy === option.id && (
                              <Icon
                                name="check"
                                size={16}
                                className="text-yellow-400"
                              />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Advanced Filter Button */}
                <div className="relative" ref={filterRef}>
                  <button
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="flex items-center space-x-2 px-4 py-2 bg-bg-subtle hover:bg-gray-100 rounded-xl font-medium text-text-secondary transition-colors duration-200 border border-border"
                  >
                    <Icon name="filter" size={16} />
                    <span className="text-sm">Filter</span>
                    {getActiveFiltersCount() > 0 && (
                      <span className="bg-primary text-text-main text-xs font-bold px-2 py-1 rounded-full">
                        {getActiveFiltersCount()}
                      </span>
                    )}
                  </button>

                  {isFilterOpen && (
                    <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-border rounded-2xl shadow-lg">
                      <div className="flex items-center justify-between p-4 border-b border-gray-100">
                        <h3 className="font-bold text-text-main">All Filters</h3>
                        <button
                          onClick={clearAllFilters}
                          className="text-yellow-400 hover:text-yellow-500 font-medium text-sm"
                        >
                          Clear All
                        </button>
                      </div>

                      <div className="p-4 max-h-80 overflow-y-auto">
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-text-main mb-3">
                              Quick Filters
                            </h4>
                            <div className="grid grid-cols-2 gap-2">
                              {quickFilters.map(filter => {
                                const isActive = activeFilters[filter.id];

                                return (
                                  <button
                                    key={filter.id}
                                    onClick={() =>
                                      handleQuickFilterToggle(filter.id)
                                    }
                                    className={`flex items-center space-x-2 p-3 rounded-xl transition-all duration-200 border text-sm ${
                                      isActive
                                        ? filter.activeColor
                                        : 'bg-bg-subtle text-text-secondary hover:bg-gray-100 border-border'
                                    }`}
                                  >
                                    {filter.icon && (
                                      <Icon name={filter.icon} size={14} />
                                    )}
                                    <span>{filter.label}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 border-t border-gray-100">
                        <button
                          onClick={() => setIsFilterOpen(false)}
                          className="w-full bg-primary hover:bg-primary-hover text-text-main font-semibold py-3 rounded-xl transition-colors duration-200"
                        >
                          Apply Filters
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Active Filters Display */}
            {getActiveFiltersCount() > 0 && (
              <div className="pb-4">
                <div className="flex items-center space-x-2 flex-wrap">
                  <span className="text-sm text-text-secondary">Active filters:</span>
                  {Object.entries(activeFilters).map(([key, isActive]) => {
                    if (!isActive) return null;
                    const filter = quickFilters.find(f => f.id === key);
                    return (
                      <span
                        key={key}
                        className="inline-flex items-center space-x-1 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm"
                      >
                        <span>{filter?.label}</span>
                        <button
                          onClick={() => handleQuickFilterToggle(key)}
                          className="hover:bg-yellow-200 rounded-full p-0.5"
                        >
                          <Icon name="x" size={12} />
                        </button>
                      </span>
                    );
                  })}
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-text-muted hover:text-text-secondary underline"
                  >
                    Clear all
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile & Tablet View */}
          <div className="lg:hidden py-3">
            {/* Top Row - Quick Filters Scroll */}
            <div className="flex items-center space-x-2 overflow-x-auto scrollbar-hide pb-3">
              {quickFilters.slice(0, 4).map(filter => {
                const isActive = activeFilters[filter.id];

                return (
                  <button
                    key={filter.id}
                    onClick={() => handleQuickFilterToggle(filter.id)}
                    className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap border text-xs ${
                      isActive
                        ? filter.activeColor
                        : 'bg-bg-subtle text-text-secondary hover:bg-gray-100 border-border'
                    }`}
                  >
                    {filter.icon && <Icon name={filter.icon} size={14} />}
                    <span>{filter.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Row - Action Buttons */}
            <div className="flex items-center space-x-2">
              {/* Search Button */}
              <div className="relative flex-1" ref={searchRef}>
                {!isSearchOpen ? (
                  <button
                    onClick={() => setIsSearchOpen(true)}
                    className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-bg-subtle hover:bg-gray-100 rounded-lg font-medium text-text-secondary transition-colors duration-200 border border-border"
                  >
                    <Icon name="search" size={16} />
                    <span className="text-sm">Search</span>
                  </button>
                ) : (
                  <form onSubmit={handleSearchSubmit} className="relative">
                    <Icon
                      name="search"
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={16}
                    />
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-10 py-2 border border-border rounded-lg focus:outline-none focus:border-border-focus text-sm"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setIsSearchOpen(false)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-text-secondary"
                    >
                      <Icon name="x" size={16} />
                    </button>
                  </form>
                )}
              </div>

              {/* Sort By Button */}
              <div className="relative" ref={sortByRef}>
                <button
                  onClick={() => setIsSortByOpen(!isSortByOpen)}
                  className="flex items-center space-x-1.5 px-3 py-2 bg-bg-subtle hover:bg-gray-100 rounded-lg font-medium text-text-secondary transition-colors duration-200 border border-border"
                >
                  <Icon name="arrow-up-down" size={16} />
                  <span className="text-sm">Sort</span>
                </button>

                {isSortByOpen && (
                  <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-border rounded-2xl shadow-lg z-50">
                    <div className="p-4 border-b border-gray-100">
                      <h3 className="font-bold text-text-main">Sort By</h3>
                    </div>
                    <div className="p-2 max-h-64 overflow-y-auto">
                      {sortOptions.map(option => (
                        <button
                          key={option.id}
                          onClick={() => handleSortChange(option.id)}
                          className="w-full flex items-center justify-between p-3 hover:bg-bg-subtle rounded-xl transition-colors"
                        >
                          <div className="text-left">
                            <p className="font-medium text-text-main text-sm">
                              {option.label}
                            </p>
                            <p className="text-xs text-text-secondary">
                              {option.description}
                            </p>
                          </div>
                          {selectedSortBy === option.id && (
                            <Icon
                              name="check"
                              size={16}
                              className="text-yellow-400"
                            />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Filter Button */}
              <div className="relative" ref={filterRef}>
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center space-x-1.5 px-3 py-2 bg-bg-subtle hover:bg-gray-100 rounded-lg font-medium text-text-secondary transition-colors duration-200 border border-border"
                >
                  <Icon name="filter" size={16} />
                  <span className="text-sm">Filter</span>
                  {getActiveFiltersCount() > 0 && (
                    <span className="bg-primary text-text-main text-xs font-bold px-1.5 py-0.5 rounded-full">
                      {getActiveFiltersCount()}
                    </span>
                  )}
                </button>

                {isFilterOpen && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center sm:justify-center">
                    <div className="bg-white w-full sm:w-96 sm:rounded-2xl rounded-t-2xl max-h-[85vh] flex flex-col">
                      <div className="flex items-center justify-between p-4 border-b border-gray-100">
                        <h3 className="font-bold text-text-main">All Filters</h3>
                        <button
                          onClick={() => setIsFilterOpen(false)}
                          className="text-gray-400 hover:text-text-secondary"
                        >
                          <Icon name="x" size={24} />
                        </button>
                      </div>

                      <div className="p-4 flex-1 overflow-y-auto">
                        <div className="space-y-4">
                          <div>
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-semibold text-text-main">
                                Quick Filters
                              </h4>
                              <button
                                onClick={clearAllFilters}
                                className="text-yellow-400 hover:text-yellow-500 font-medium text-sm"
                              >
                                Clear All
                              </button>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              {quickFilters.map(filter => {
                                const isActive = activeFilters[filter.id];

                                return (
                                  <button
                                    key={filter.id}
                                    onClick={() =>
                                      handleQuickFilterToggle(filter.id)
                                    }
                                    className={`flex items-center space-x-2 p-3 rounded-xl transition-all duration-200 border text-sm ${
                                      isActive
                                        ? filter.activeColor
                                        : 'bg-bg-subtle text-text-secondary hover:bg-gray-100 border-border'
                                    }`}
                                  >
                                    {filter.icon && (
                                      <Icon name={filter.icon} size={14} />
                                    )}
                                    <span>{filter.label}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 border-t border-gray-100">
                        <button
                          onClick={() => setIsFilterOpen(false)}
                          className="w-full bg-primary hover:bg-primary-hover text-text-main font-semibold py-3 rounded-xl transition-colors duration-200"
                        >
                          Apply Filters
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Active Filters Display - Mobile */}
            {getActiveFiltersCount() > 0 && (
              <div className="pt-3">
                <div className="flex items-center space-x-2 overflow-x-auto scrollbar-hide">
                  <span className="text-xs text-text-secondary whitespace-nowrap">
                    Active:
                  </span>
                  {Object.entries(activeFilters).map(([key, isActive]) => {
                    if (!isActive) return null;
                    const filter = quickFilters.find(f => f.id === key);
                    return (
                      <span
                        key={key}
                        className="inline-flex items-center space-x-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs whitespace-nowrap"
                      >
                        <span>{filter?.label}</span>
                        <button
                          onClick={() => handleQuickFilterToggle(key)}
                          className="hover:bg-yellow-200 rounded-full p-0.5"
                        >
                          <Icon name="x" size={10} />
                        </button>
                      </span>
                    );
                  })}
                  <button
                    onClick={clearAllFilters}
                    className="text-xs text-text-muted hover:text-text-secondary underline whitespace-nowrap"
                  >
                    Clear all
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiltersAndSerachBar;
