import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Icon from '../../../components/ui/Icon';
import { Navigate, useNavigate } from 'react-router-dom';

const Categorycard = ({
  c,
  totalVisibleItems,
  gapValue,
  handleNavigateToCategoryResultPage,
}) => {
  const calculatedWidth = `calc((100% - ${gapValue * (totalVisibleItems - 1)}px) / ${totalVisibleItems})`;

  return (
    <div className="flex-shrink-0" style={{ width: calculatedWidth }}>
      <div className="flex flex-col items-center cursor-pointer">
        <img
          src={c.image}
          alt={c.name}
          className="w-20 h-20 sm:w-22 sm:h-22 md:w-24 md:h-24 object-cover rounded-full"
          onError={e => {
            e.target.src = '/placeholder-category.png';
          }}
          onClick={() => handleNavigateToCategoryResultPage(c.name || c.slug)}
        />
        <span className="mt-1 font-semibold text-text-secondary text-sm text-center px-1">
          {c.name}
        </span>
      </div>
    </div>
  );
};

const RestaurantCategoriesSlider = () => {
  // Define how many items should be visible per screen size
  const itemsPerView = { mobile: 4, tablet: 6, desktop: 8 };

  // Define the gap size in pixels. This is the **actual** space between cards.
  const cardGapPx = 8; // Example: 8px for a tight gap (Tailwind's gap-2)

  const [foodCategories, setFoodCategories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data, isLoading, error } = useSelector(state => state.landingPage);
  const { user } = useSelector(state => state.auth);

  const Statelocation = useSelector(state => state.location);
  const { latitude, longitude } = Statelocation;

  const navigate = useNavigate();

  const categoriesData = data.categories;
  const userName = user?.name;
  const UserFirstName = userName ? userName.split(' ')[0] : '';

  useEffect(() => {
    if (categoriesData) {
      setFoodCategories([...categoriesData]);
    }
  }, [data]);

  const getItemsPerView = () => {
    if (typeof window === 'undefined') return itemsPerView.mobile;
    if (window.innerWidth >= 1024) return itemsPerView.desktop;
    if (window.innerWidth >= 768) return itemsPerView.tablet;
    return itemsPerView.mobile;
  };

  const [visibleItemsCount, setVisibleItemsCount] = useState(getItemsPerView());

  useEffect(() => {
    const update = () => setVisibleItemsCount(getItemsPerView());
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Calculate the maximum index the slider can reach.
  const maxIndex = Math.max(0, foodCategories.length - visibleItemsCount);

  useEffect(() => {
    setCurrentIndex(prevIndex => Math.min(prevIndex, maxIndex));
  }, [visibleItemsCount, maxIndex, foodCategories.length]);

  const slideLeft = () => {
    setCurrentIndex(prevIndex => Math.max(0, prevIndex - 3));
  };

  const slideRight = () => {
    setCurrentIndex(prevIndex => Math.min(maxIndex, prevIndex + 3));
  };

  const handleNavigateToCategoryResultPage = categoryName => {
    if (latitude && longitude) {
      navigate(`/categories/${categoryName}?lat=${latitude}&lng=${longitude}`);
    } else {
      navigate(`/categories/${categoryName}`);
    }
  };

  // Calculate the width of one "slide step" (one card + its gap)
  const cardWidthWithGap = `calc((100% - ${cardGapPx * (visibleItemsCount - 1)}px) / ${visibleItemsCount} + ${cardGapPx}px)`;

  // Show loading state (skeleton loaders)
  if (isLoading) {
    return (
      <section className="py-5 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-6">
            <p className="text-xl font-bold text-text-main">
              {UserFirstName} What's on your mind?
            </p>
          </div>
          <div className="flex" style={{ gap: `${cardGapPx}px` }}>
            {[...Array(visibleItemsCount)].map((_, i) => (
              <div
                key={i}
                className="flex-shrink-0"
                style={{
                  width: `calc((100% - ${cardGapPx * (visibleItemsCount - 1)}px) / ${visibleItemsCount})`,
                }}
              >
                <div className="flex flex-col items-center">
                  <div className="bg-gray-200 rounded-full w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 animate-pulse"></div>
                  <div className="bg-gray-200 rounded h-4 w-16 mt-2 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Show error state
  if (error) {
    return (
      <section className="py-5 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center py-8">
            <p className="text-red-500">Failed to load categories</p>
          </div>
        </div>
      </section>
    );
  }

  // Don't render if no categories (shouldn't happen with dummy data fallback)
  if (!foodCategories.length) {
    return null;
  }

  return (
    <section className="py-2 mb-2 bg-white ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 border-b border-border box-border">
        {/* Header and navigation arrows */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-xl font-bold text-text-main">
            {UserFirstName} What's on your mind?
          </p>
          {/* Show arrows only if there are more categories than can fit in view */}
          {foodCategories.length > visibleItemsCount && (
            <div className="flex gap-2">
              <button
                onClick={slideLeft}
                disabled={currentIndex === 0}
                className={`p-2 rounded-full border transition cursor-pointer ${
                  currentIndex === 0
                    ? 'border-border text-gray-300 cursor-not-allowed'
                    : 'border-gray-300 text-text-secondary hover:border-border-focus hover:text-yellow-600'
                }`}
                aria-label="Previous categories"
              >
                <Icon name={'chevron-left'} size={18} />
              </button>
              <button
                onClick={slideRight}
                disabled={currentIndex === maxIndex}
                className={`p-2 rounded-full border transition cursor-pointer ${
                  currentIndex === maxIndex
                    ? 'border-border text-gray-300 cursor-not-allowed'
                    : 'border-gray-300 text-text-secondary hover:border-border-focus hover:text-yellow-600'
                }`}
                aria-label="Next categories"
              >
                <Icon name={'chevron-right'} size={18} />
              </button>
            </div>
          )}
        </div>

        {/* Single row slider container */}
        <div className="relative overflow-hidden pb-5">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              // Removed the 'width' property from here
              transform: `translateX(calc(-${currentIndex} * ${cardWidthWithGap}))`, // Precise translation
              gap: `${cardGapPx}px`, // Apply the smaller gap here
            }}
          >
            {foodCategories.map(c => (
              <Categorycard
                key={c._id}
                c={c}
                totalVisibleItems={visibleItemsCount}
                gapValue={cardGapPx}
                handleNavigateToCategoryResultPage={
                  handleNavigateToCategoryResultPage
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RestaurantCategoriesSlider;
