import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Icon from '../../../components/ui/Icon';
import { useNavigate } from 'react-router-dom';

const CategoryCard = ({ c, width, onClick }) => (
  <div
    className="flex-shrink-0 sm:px-1"
    style={{ width }}
    onClick={() => onClick(c.name || c.slug)}
  >
    <div
      className="flex flex-col items-center
                   justify-center hover:-translate-y-1
                   transition-transform duration-200 ease-out cursor-pointer"
    >
      <img
        src={c.image}
        alt={c.name}
        className="w-24 h-24 sm:w-28 sm:h-28 object-cover "
        onError={e => {
          e.target.src = '/placeholder-category.png';
        }}
      />
      <span className="mt-2 font-semibold text-gray-700 text-md text-center">
        {c.name}
      </span>
    </div>
  </div>
);

const CategoriesSlider = () => {
  const itemsPerView = { mobile: 2, tablet: 4, desktop: 6 };
  const [foodCategories, setFoodCategories] = useState([]);
  const { data, isLoading, error } = useSelector(state => state.landingPage);
  console.log('data is coming inside the landing/categoryslider', data);
  const { latitude, longitude } = useSelector(state => state.location);
  const categoriesData = data.categories;

  const navigate = useNavigate();

  useEffect(() => {
    let categories = [];

    if (categoriesData) {
      categories = [...categoriesData];
    }

    setFoodCategories(categories);
  }, [data]);

  /* SSR-safe "items per view" */
  const getItemsPerView = () => {
    if (typeof window === 'undefined') return itemsPerView.mobile;
    if (window.innerWidth >= 1024) return itemsPerView.desktop;
    if (window.innerWidth >= 640) return itemsPerView.tablet;
    return itemsPerView.mobile;
  };

  const [itemsToShow, setItemsToShow] = useState(getItemsPerView());
  const [index, setIndex] = useState(0);

  /* update on resize */
  useEffect(() => {
    const update = () => setItemsToShow(getItemsPerView());
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Split categories into two rows
  const totalCategories = foodCategories.length;
  const categoriesPerRow = Math.ceil(totalCategories / 2);
  const firstRowCategories = foodCategories.slice(0, categoriesPerRow);
  const secondRowCategories = foodCategories.slice(categoriesPerRow);

  /* keep index in range when viewport shrinks */
  const maxIndex = Math.max(0, categoriesPerRow - itemsToShow);
  useEffect(
    () => setIndex(i => Math.min(i, maxIndex)),
    [itemsToShow, maxIndex]
  );

  const cardWidthPct = 100 / itemsToShow;
  const translatePct = -index * cardWidthPct;

  const handleNavigateToCategoryResultPage = categorySlug => {
    // Check if location data exists before navigating
    if (latitude && longitude) {
      navigate(`/categories/${categorySlug}?lat=${latitude}&lng=${longitude}`);
    } else {
      // Fallback: navigate without location if it's not available
      navigate(`/categories/${categorySlug}`);
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <section className="py-5 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              What's on your mind
            </h2>
          </div>
          <div className="space-y-4">
            {/* First row skeleton */}
            <div className="flex gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex-1">
                  <div className="bg-gray-200 rounded-xl h-36 animate-pulse"></div>
                </div>
              ))}
            </div>
            {/* Second row skeleton */}
            <div className="flex gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex-1">
                  <div className="bg-gray-200 rounded-xl h-36 animate-pulse"></div>
                </div>
              ))}
            </div>
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

  // Don't render if no categories (this shouldn't happen now due to dummy data)
  if (!foodCategories.length) {
    return null;
  }

  return (
    <section className="py-5 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* header + arrows */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-semibold text-gray-800">
            What's on your mind
          </h2>
          {categoriesPerRow > itemsToShow && (
            <div className="flex gap-2">
              <button
                onClick={() => setIndex(i => Math.max(0, i - 1))}
                disabled={index === 0}
                className={`p-2 rounded-full border transition ${
                  index === 0
                    ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                    : 'border-gray-300 text-gray-600 hover:border-yellow-400 hover:text-yellow-600'
                }`}
              >
                <Icon name={'chevron-left'} size={18} />
              </button>
              <button
                onClick={() => setIndex(i => Math.min(maxIndex, i + 1))}
                disabled={index === maxIndex}
                className={`p-2 rounded-full border transition ${
                  index === maxIndex
                    ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                    : 'border-gray-300 text-gray-600 hover:border-yellow-400 hover:text-yellow-600'
                }`}
              >
                <Icon name={'chevron-right'} size={18} />
              </button>
            </div>
          )}
        </div>

        {/* Two-row slider container */}
        <div className="space-y-4">
          {/* First Row */}
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(${translatePct}%)` }}
            >
              {firstRowCategories.map(c => (
                <CategoryCard
                  key={`row1-${c._id}`}
                  c={c}
                  width={`${cardWidthPct}%`}
                  onClick={() => handleNavigateToCategoryResultPage(c.name)}
                />
              ))}
            </div>
          </div>

          {/* Second Row */}
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(${translatePct}%)` }}
            >
              {secondRowCategories.map(c => (
                <CategoryCard
                  key={`row2-${c._id}`}
                  c={c}
                  width={`${cardWidthPct}%`}
                  onClick={() => handleNavigateToCategoryResultPage(c.name)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSlider;
