// import React from "react";
// const CitiesSection = ()  => {

//     const cities = [
//         "Mumbai", "Delhi", "Bangalore", "Hyderabad",
//         "Chennai", "Kolkata", "Pune", "Ahmedabad"
//     ];

//     return (
//         <>
//               <section className="py-12 sm:py-16 lg:py-20 bg-cream-50">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6">
//                     <div className="text-center mb-12 sm:mb-16">
//                         <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
//                             Cities We Serve
//                         </h3>
//                         <p className="text-gray-600 text-base sm:text-lg">Bringing delicious food to your doorstep across India</p>
//                     </div>
//                     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
//                         {cities.map((city, index) => (
//                             <div
//                                 key={index}
//                                 className="bg-white rounded-xl p-4 sm:p-6 text-center shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border border-gray-100 hover:border-yellow-400"
//                             >
//                                 <p className="font-bold text-gray-800 text-sm sm:text-base">{city}</p>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </section>
//         </>
//     )
// }

// export default CitiesSection ; 

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CitiesSection = () => {
    const cities = [
        "Mumbai", "Delhi", "Bangalore", "Hyderabad", 
        "Chennai", "Kolkata", "Pune", "Ahmedabad",
        "Jaipur", "Lucknow", "Kanpur", "Nagpur",
        "Indore", "Thane", "Bhopal", "Visakhapatnam"
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const citiesPerView = {
        mobile: 2,
        tablet: 4,
        desktop: 8
    };

    const getCurrentCitiesPerView = () => {
        if (typeof window !== 'undefined') {
            if (window.innerWidth < 640) return citiesPerView.mobile;
            if (window.innerWidth < 1024) return citiesPerView.tablet;
        }
        return citiesPerView.desktop;
    };

    const [currentCitiesPerView, setCurrentCitiesPerView] = useState(getCurrentCitiesPerView());

    React.useEffect(() => {
        const handleResize = () => {
            setCurrentCitiesPerView(getCurrentCitiesPerView());
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const nextSlide = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex((prevIndex) => {
            const maxIndex = Math.max(0, cities.length - currentCitiesPerView);
            return prevIndex >= maxIndex ? 0 : prevIndex + 1;
        });
        setTimeout(() => setIsAnimating(false), 500);
    };

    const prevSlide = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex((prevIndex) => {
            const maxIndex = Math.max(0, cities.length - currentCitiesPerView);
            return prevIndex <= 0 ? maxIndex : prevIndex - 1;
        });
        setTimeout(() => setIsAnimating(false), 500);
    };

    const goToSlide = (index) => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex(index);
        setTimeout(() => setIsAnimating(false), 500);
    };

    const totalSlides = Math.max(0, cities.length - currentCitiesPerView + 1);

    return (
        <section className="py-12 sm:py-16 lg:py-20 bg-cream-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-12 sm:mb-16">
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                        Cities We Serve
                    </h3>
                    <p className="text-gray-600 text-base sm:text-lg">
                        Bringing delicious food to your doorstep across India
                    </p>
                </div>

                <div className="relative">
                    {/* Cities Slider Container */}
                    <div className="overflow-hidden rounded-2xl">
                        <div 
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ 
                                transform: `translateX(-${currentIndex * (100 / currentCitiesPerView)}%)`,
                                width: `${(cities.length / currentCitiesPerView) * 100}%`
                            }}
                        >
                            {cities.map((city, index) => (
                                <div
                                    key={index}
                                    className="flex-shrink-0 px-2"
                                    style={{ width: `${100 / cities.length}%` }}
                                >
                                    <div className="bg-white rounded-xl p-4 sm:p-6 text-center shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 hover:border-yellow-400 hover:scale-105 transform">
                                        <p className="font-bold text-gray-800 text-sm sm:text-base">{city}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    {totalSlides > 1 && (
                        <>
                            <button
                                onClick={prevSlide}
                                disabled={isAnimating}
                                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-yellow-400 hover:bg-yellow-500 text-gray-800 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 disabled:opacity-50 z-10"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <button
                                onClick={nextSlide}
                                disabled={isAnimating}
                                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-yellow-400 hover:bg-yellow-500 text-gray-800 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 disabled:opacity-50 z-10"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </>
                    )}
                </div>

                {/* Dots Indicator */}
                {totalSlides > 1 && (
                    <div className="flex justify-center mt-8 space-x-2">
                        {Array.from({ length: totalSlides }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                disabled={isAnimating}
                                className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                                    currentIndex === index
                                        ? 'bg-yellow-400 scale-125'
                                        : 'bg-gray-300 hover:bg-gray-400'
                                }`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default CitiesSection;

