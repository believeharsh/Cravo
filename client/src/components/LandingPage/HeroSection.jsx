import React, { useState } from "react";
import { MapPin, Search, ChevronDown } from "lucide-react";

const Hero = () => {
    const [locationFocused, setLocationFocused] = useState(false);
    const [foodFocused, setFoodFocused] = useState(false);
    return (
        <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 sm:pt-8 pb-12 sm:pb-20">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start lg:items-center">
                    {/* Left Content */}
                    <div className="space-y-6 sm:space-y-8">
                        {/* Tagline - Moved higher */}
                        <div className="space-y-4 sm:space-y-6">
                            <h2 className="text-3xl sm:text-xl lg:text-5xl xl:text-6xl font-bold text-gray-800 leading-tight">
                                Satisfy Your <br />
                                <span className="text-white">Cravings</span> <br />
                                <span className="block sm:inline">Instantly</span>
                            </h2>
                            {/* <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed">
                                    Discover amazing food from your favorite local restaurants.
                                    Fresh ingredients, fast delivery, unforgettable taste.
                                </p> */}
                        </div>

                        {/* Search Section - Side by side */}
                        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
                            <div className="space-y-4">
                                {/* Search Bars - Side by side on larger screens */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                                    {/* Location Search */}
                                    <div className="relative">
                                        <MapPin className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                                        <input
                                            type="text"
                                            placeholder="Mumbai, Maharashtra"
                                            className="w-full pl-10 sm:pl-12 pr-10 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-yellow-400 text-gray-800 font-medium text-sm sm:text-base"
                                            onFocus={() => setLocationFocused(true)}
                                            onBlur={() => setLocationFocused(false)}
                                        />
                                        <ChevronDown
                                            className={`absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-500 transition-transform duration-200 ${locationFocused ? 'rotate-180' : ''}`}
                                            size={18}
                                        />
                                    </div>

                                    {/* Restaurant Search */}
                                    <div className="relative">
                                        <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                                        <input
                                            type="text"
                                            placeholder="Pizza, Burger, Chinese..."
                                            className="w-full pl-10 sm:pl-12 pr-10 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-yellow-400 text-gray-800 font-medium text-sm sm:text-base"
                                            onFocus={() => setFoodFocused(true)}
                                            onBlur={() => setFoodFocused(false)}
                                        />
                                        <ChevronDown
                                            className={`absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-500 transition-transform duration-200 ${foodFocused ? 'rotate-180' : ''}`}
                                            size={18}
                                        />
                                    </div>
                                </div>

                                <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-3 sm:py-4 rounded-xl transition-colors shadow-md text-sm sm:text-base">
                                    Find Delicious Food
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Image/Branding - Moved higher */}
                    <div className="relative mt-8 lg:mt-0">
                        <div className="bg-gradient-to-br from-white to-cream-50 rounded-3xl p-6 sm:p-8 shadow-xl">
                            <div className="text-center space-y-4 sm:space-y-6">
                                {/* Main Branding Visual */}
                                <div className="relative">
                                    <div className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 mx-auto bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                                        <div className="text-center">
                                            <div className="text-4xl sm:text-5xl lg:text-6xl mb-2 sm:mb-4">🍽️</div>
                                            <p className="text-gray-800 text-base sm:text-lg font-bold">Premium Quality</p>
                                            <p className="text-gray-600 text-xs sm:text-sm">Fresh & Fast</p>
                                        </div>
                                    </div>

                                    {/* Floating Elements - Responsive positioning */}
                                    <div className="absolute -top-2 sm:-top-4 -left-2 sm:-left-4 bg-green-400 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full font-bold shadow-lg text-xs sm:text-sm">
                                        🌿 Fresh
                                    </div>
                                    <div className="absolute -bottom-2 sm:-bottom-4 -right-2 sm:-right-4 bg-yellow-500 text-gray-800 px-2 sm:px-4 py-1 sm:py-2 rounded-full font-bold shadow-lg text-xs sm:text-sm">
                                        ⚡ 30 min
                                    </div>
                                    <div className="absolute top-1/2 -right-4 sm:-right-8 bg-white text-gray-800 px-2 sm:px-3 py-1 sm:py-2 rounded-full font-semibold shadow-lg text-xs sm:text-sm border-2 border-yellow-400">
                                        1000+ 🏪
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Hero; 