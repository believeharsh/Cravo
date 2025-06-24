import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CategoriesSection = () => {
    const categories = [
        { name: "Pizza", emoji: "🍕" },
        { name: "Burger", emoji: "🍔" },
        { name: "Chinese", emoji: "🥡" },
        { name: "Biryani", emoji: "🍛" },
        { name: "Desserts", emoji: "🍰" },
        { name: "Beverages", emoji: "🥤" },
        { name: "North Indian", emoji: "🍛" },
        { name: "South Indian", emoji: "🥥" },
        { name: "Italian", emoji: "🍝" },
        { name: "Mexican", emoji: "🌮" },
        { name: "Thai", emoji: "🍜" },
        { name: "Japanese", emoji: "🍣" }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const categoriesPerView = {
        mobile: 2,
        tablet: 3,
        desktop: 6
    };

    const getCurrentCategoriesPerView = () => {
        if (typeof window !== 'undefined') {
            if (window.innerWidth < 640) return categoriesPerView.mobile;
            if (window.innerWidth < 1024) return categoriesPerView.tablet;
        }
        return categoriesPerView.desktop;
    };

    const [currentCategoriesPerView, setCurrentCategoriesPerView] = useState(getCurrentCategoriesPerView());

    React.useEffect(() => {
        const handleResize = () => {
            setCurrentCategoriesPerView(getCurrentCategoriesPerView());
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const nextSlide = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex((prevIndex) => {
            const maxIndex = Math.max(0, categories.length - currentCategoriesPerView);
            return prevIndex >= maxIndex ? 0 : prevIndex + 1;
        });
        setTimeout(() => setIsAnimating(false), 500);
    };

    const prevSlide = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex((prevIndex) => {
            const maxIndex = Math.max(0, categories.length - currentCategoriesPerView);
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

    const totalSlides = Math.max(0, categories.length - currentCategoriesPerView + 1);

    return (
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-12 sm:mb-16">
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                        Popular Categories
                    </h3>
                    <p className="text-gray-600 text-base sm:text-lg">
                        Explore your favorite cuisines
                    </p>
                </div>

                <div className="relative">
                    {/* Categories Slider Container */}
                    <div className="overflow-hidden rounded-2xl">
                        <div 
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ 
                                transform: `translateX(-${currentIndex * (100 / currentCategoriesPerView)}%)`,
                                width: `${(categories.length / currentCategoriesPerView) * 100}%`
                            }}
                        >
                            {categories.map((category, index) => (
                                <div
                                    key={index}
                                    className="flex-shrink-0 px-3"
                                    style={{ width: `${100 / categories.length}%` }}
                                >
                                    <div className="bg-cream-50 rounded-2xl p-6 sm:p-8 text-center hover:bg-yellow-50 transition-all duration-300 cursor-pointer group border border-gray-100 hover:border-yellow-400 hover:scale-105 transform">
                                        <div className="text-3xl sm:text-4xl lg:text-5xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                                            {category.emoji}
                                        </div>
                                        <p className="font-bold text-gray-800 text-sm sm:text-base">{category.name}</p>
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

export default CategoriesSection;

