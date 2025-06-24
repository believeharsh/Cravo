import React, { useState, useRef, useEffect } from "react";
import {
    Filter,
    ChevronDown,
    Clock,
    Star,
    MapPin,
    Heart,
    Check,
    X,
    Zap,
    TrendingUp,
    Award,
    Users
} from "lucide-react";
import Navbar from "../components/Navbar";

const CategorySearch = ({ categoryName = "Pizza", categoryDescription = "Delicious pizzas from the best restaurants in your area" }) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isSortByOpen, setIsSortByOpen] = useState(false);
    const [selectedSortBy, setSelectedSortBy] = useState('relevance');
    const [selectedFilters, setSelectedFilters] = useState({
        rating: [],
        price: [],
        deliveryTime: [],
        offers: []
    });
    const [quickFilters, setQuickFilters] = useState({
        tenMinDelivery: false,
        topRated: false,
        offers: false
    });

    const sortByRef = useRef(null);
    const filterRef = useRef(null);

    const sortOptions = [
        { id: 'relevance', label: 'Relevance', description: 'Best match for your search' },
        { id: 'rating', label: 'Rating', description: 'Highest rated first' },
        { id: 'deliveryTime', label: 'Delivery Time', description: 'Fastest delivery first' },
        { id: 'costLowToHigh', label: 'Cost: Low to High', description: 'Cheapest first' },
        { id: 'costHighToLow', label: 'Cost: High to Low', description: 'Most expensive first' }
    ];

    const filterOptions = {
        rating: [
            { id: '4.5+', label: '4.5+ Rating', count: 120 },
            { id: '4.0+', label: '4.0+ Rating', count: 250 },
            { id: '3.5+', label: '3.5+ Rating', count: 380 }
        ],
        price: [
            { id: 'under200', label: 'Under ₹200', count: 85 },
            { id: '200-400', label: '₹200 - ₹400', count: 150 },
            { id: '400-600', label: '₹400 - ₹600', count: 95 },
            { id: 'above600', label: 'Above ₹600', count: 45 }
        ],
        deliveryTime: [
            { id: 'under30', label: 'Under 30 mins', count: 180 },
            { id: '30-45', label: '30-45 mins', count: 220 },
            { id: 'above45', label: 'Above 45 mins', count: 75 }
        ],
        offers: [
            { id: 'discount', label: 'Discounts Available', count: 95 },
            { id: 'freeDelivery', label: 'Free Delivery', count: 120 },
            { id: 'buyOneGetOne', label: 'Buy 1 Get 1', count: 35 }
        ]
    };

    // Sample restaurant data
    const restaurants = [
        {
            id: 1,
            name: "Pizza Palace",
            rating: 4.5,
            deliveryTime: "25-30 mins",
            price: "₹300 for two",
            image: "🍕",
            offer: "50% OFF up to ₹100",
            distance: "2.1 km",
            cuisines: ["Italian", "Fast Food"],
            isFavorite: false,
            isTopRated: true,
            hasQuickDelivery: true
        },
        {
            id: 2,
            name: "Domino's Pizza",
            rating: 4.2,
            deliveryTime: "20-25 mins",
            price: "₹400 for two",
            image: "🍕",
            offer: "Buy 1 Get 1 Free",
            distance: "1.8 km",
            cuisines: ["Pizza", "Italian"],
            isFavorite: true,
            isTopRated: false,
            hasQuickDelivery: true
        },
        {
            id: 3,
            name: "Chicago Pizza",
            rating: 4.7,
            deliveryTime: "35-40 mins",
            price: "₹500 for two",
            image: "🍕",
            offer: "Free Delivery",
            distance: "3.2 km",
            cuisines: ["Italian", "American"],
            isFavorite: false,
            isTopRated: true,
            hasQuickDelivery: false
        }
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sortByRef.current && !sortByRef.current.contains(event.target)) {
                setIsSortByOpen(false);
            }
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setIsFilterOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleQuickFilter = (filterType) => {
        setQuickFilters(prev => ({
            ...prev,
            [filterType]: !prev[filterType]
        }));
    };

    const handleFilterChange = (category, filterId) => {
        setSelectedFilters(prev => ({
            ...prev,
            [category]: prev[category].includes(filterId)
                ? prev[category].filter(id => id !== filterId)
                : [...prev[category], filterId]
        }));
    };

    const clearAllFilters = () => {
        setSelectedFilters({
            rating: [],
            price: [],
            deliveryTime: [],
            offers: []
        });
        setQuickFilters({
            tenMinDelivery: false,
            topRated: false,
            offers: false
        });
    };

    const getActiveFiltersCount = () => {
        const filterCount = Object.values(selectedFilters).flat().length;
        const quickFilterCount = Object.values(quickFilters).filter(Boolean).length;
        return filterCount + quickFilterCount;
    };

    return (
        <div className="min-h-screen bg-gray-50 font-helvetica">
            <Navbar
                showSearch={true}
                currentPage="search"
                cartCount={2}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                {/* Category Header */}
                <div className="mb-8">
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">{categoryName}</h1>
                    <p className="text-gray-600 text-lg">{categoryDescription}</p>
                    <div className="flex items-center space-x-4 mt-4 text-sm text-gray-500">
                        <span>475 restaurants</span>
                        <span>•</span>
                        <span>Delivering to your location</span>
                    </div>
                </div>

                {/* Filter and Sort Bar */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 mb-6">
                    <div className="flex flex-wrap items-center gap-3">
                        {/* Quick Filters */}
                        <button
                            onClick={() => handleQuickFilter('tenMinDelivery')}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${quickFilters.tenMinDelivery
                                ? 'bg-yellow-400 text-gray-800'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            <Zap size={16} />
                            <span>10 Min Delivery</span>
                        </button>

                        <button
                            onClick={() => handleQuickFilter('topRated')}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${quickFilters.topRated
                                ? 'bg-yellow-400 text-gray-800'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            <Award size={16} />
                            <span>Top Rated</span>
                        </button>

                        <button
                            onClick={() => handleQuickFilter('offers')}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${quickFilters.offers
                                ? 'bg-yellow-400 text-gray-800'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            <TrendingUp size={16} />
                            <span>Offers</span>
                        </button>

                        <div className="flex-1"></div>

                        {/* Sort By Dropdown */}
                        <div className="relative" ref={sortByRef}>
                            <button
                                onClick={() => setIsSortByOpen(!isSortByOpen)}
                                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium text-gray-700 transition-colors duration-200"
                            >
                                <span>Sort By</span>
                                <ChevronDown size={16} className={`transform transition-transform ${isSortByOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isSortByOpen && (
                                <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-2xl shadow-lg z-20">
                                    <div className="p-4 border-b border-gray-100">
                                        <h3 className="font-bold text-gray-800">Sort By</h3>
                                    </div>
                                    <div className="p-2">
                                        {sortOptions.map((option) => (
                                            <button
                                                key={option.id}
                                                onClick={() => {
                                                    setSelectedSortBy(option.id);
                                                    setIsSortByOpen(false);
                                                }}
                                                className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors"
                                            >
                                                <div className="text-left">
                                                    <p className="font-medium text-gray-800">{option.label}</p>
                                                    <p className="text-sm text-gray-600">{option.description}</p>
                                                </div>
                                                {selectedSortBy === option.id && (
                                                    <Check size={16} className="text-yellow-400" />
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
                                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium text-gray-700 transition-colors duration-200"
                            >
                                <Filter size={16} />
                                <span>Filter</span>
                                {getActiveFiltersCount() > 0 && (
                                    <span className="bg-yellow-400 text-gray-800 text-xs font-bold px-2 py-1 rounded-full">
                                        {getActiveFiltersCount()}
                                    </span>
                                )}
                            </button>

                            {isFilterOpen && (
                                <div className="absolute right-0 top-full mt-2 w-96 bg-white border border-gray-200 rounded-2xl shadow-lg z-20">
                                    <div className="flex items-center justify-between p-4 border-b border-gray-100">
                                        <h3 className="font-bold text-gray-800">Filters</h3>
                                        <button
                                            onClick={clearAllFilters}
                                            className="text-yellow-400 hover:text-yellow-500 font-medium text-sm"
                                        >
                                            Clear All
                                        </button>
                                    </div>

                                    <div className="max-h-96 overflow-y-auto">
                                        {Object.entries(filterOptions).map(([category, options]) => (
                                            <div key={category} className="p-4 border-b border-gray-100 last:border-b-0">
                                                <h4 className="font-semibold text-gray-800 mb-3 capitalize">
                                                    {category === 'deliveryTime' ? 'Delivery Time' : category}
                                                </h4>
                                                <div className="space-y-2">
                                                    {options.map((option) => (
                                                        <label
                                                            key={option.id}
                                                            className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded-lg"
                                                        >
                                                            <div className="flex items-center space-x-3">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={selectedFilters[category].includes(option.id)}
                                                                    onChange={() => handleFilterChange(category, option.id)}
                                                                    className="w-4 h-4 text-yellow-400 border-gray-300 rounded focus:ring-yellow-400"
                                                                />
                                                                <span className="text-gray-700">{option.label}</span>
                                                            </div>
                                                            <span className="text-sm text-gray-500">({option.count})</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="p-4 border-t border-gray-100">
                                        <button
                                            onClick={() => setIsFilterOpen(false)}
                                            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold py-3 rounded-xl transition-colors duration-200"
                                        >
                                            Apply Filters
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Restaurant Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {restaurants.map((restaurant) => (
                        <div
                            key={restaurant.id}
                            className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 transition hover:shadow-md"
                        >
                            <div className="flex items-center space-x-4 mb-4">
                                <div className="text-5xl">{restaurant.image}</div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800">{restaurant.name}</h3>
                                    <p className="text-sm text-gray-500">{restaurant.cuisines.join(", ")}</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                                <div className="flex items-center space-x-1">
                                    <Star className="text-yellow-400" size={16} />
                                    <span>{restaurant.rating}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <Clock size={16} />
                                    <span>{restaurant.deliveryTime}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <MapPin size={16} />
                                    <span>{restaurant.distance}</span>
                                </div>
                            </div>
                            <p className="text-sm text-gray-500 mb-2">{restaurant.price}</p>
                            {restaurant.offer && (
                                <div className="text-sm font-medium text-yellow-800 bg-yellow-100 px-3 py-1 rounded-full inline-block mb-2">
                                    {restaurant.offer}
                                </div>
                            )}
                            <div className="flex flex-wrap gap-2">
                                {restaurant.isTopRated && (
                                    <span className="text-xs font-semibold bg-green-100 text-green-600 px-2 py-1 rounded-full">
                                        Top Rated
                                    </span>
                                )}
                                {restaurant.hasQuickDelivery && (
                                    <span className="text-xs font-semibold bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                                        Quick Delivery
                                    </span>
                                )}
                                {restaurant.isFavorite && (
                                    <span className="text-xs font-semibold bg-red-100 text-red-600 px-2 py-1 rounded-full">
                                        ❤️ Favourite
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                {/* Explore More */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Explore More Categories</h2>
                    <div className="flex flex-wrap gap-4">
                        {["Burgers", "Chinese", "Desserts", "South Indian", "Healthy", "Biryani"].map((item) => (
                            <button
                                key={item}
                                className="px-5 py-2 bg-gray-100 hover:bg-yellow-100 rounded-xl text-gray-700 font-medium transition-all"
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategorySearch;
