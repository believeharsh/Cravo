import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Icon from '../../../components/ui/Icon';
import { useNavigate } from 'react-router-dom';

// This component can render either a real category card or a skeleton loader
const CategoryCard = ({ c, width, onClick, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex-shrink-0 sm:px-1" style={{ width }}>
        <div className="flex flex-col items-center justify-center">
          <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gray-100 rounded-full animate-pulse"></div>
          <div className="mt-2 w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
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
          className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-full"
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
};

const CategoriesSlider = () => {
  const itemsPerView = { mobile: 2, tablet: 4, desktop: 6 };
  const [foodCategories, setFoodCategories] = useState([]);
  const { data, isLoading, error } = useSelector(state => state.landingPage);
  const { user } = useSelector(state => state.auth);

  const userName = user?.name;
  const UserFirstName = userName?.split(' ')[0];

  const categoriesData = data.categories;

  const Statelocation = useSelector(state => state.location);
  const { latitude, longitude } = Statelocation;

  const navigate = useNavigate();

  // Add a small delay to the data display for a smoother transition
  useEffect(() => {
    let timer;
    if (categoriesData) {
      timer = setTimeout(() => {
        setFoodCategories([...categoriesData]);
      }, 300); // 300ms delay
    }

    // Cleanup the timer to prevent memory leaks
    return () => clearTimeout(timer);
  }, [categoriesData]);

  // SSR-safe "items per view"
  const getItemsPerView = () => {
    if (typeof window === 'undefined') return itemsPerView.mobile;
    if (window.innerWidth >= 1024) return itemsPerView.desktop;
    if (window.innerWidth >= 640) return itemsPerView.tablet;
    return itemsPerView.mobile;
  };

  const [itemsToShow, setItemsToShow] = useState(getItemsPerView());
  const [index, setIndex] = useState(0);

  // Update on resize
  useEffect(() => {
    const update = () => setItemsToShow(getItemsPerView());
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Split categories into two rows
  const totalCategories = foodCategories.length;
  const categoriesPerRow = Math.ceil(totalCategories / 2);
  const firstRowCategories = foodCategories.slice(0, categoriesPerRow);
  const secondRowCategories = foodCategories.slice(categoriesPerRow);

  // Keeping index in range when viewport shrinks
  const maxIndex = Math.max(0, categoriesPerRow - itemsToShow);
  useEffect(
    () => setIndex(i => Math.min(i, maxIndex)),
    [itemsToShow, maxIndex]
  );

  const cardWidthPct = 100 / itemsToShow;
  const translatePct = -index * cardWidthPct;

  const handleNavigateToCategoryResultPage = categoryName => {
    if (latitude && longitude) {
      navigate(`/categories/${categoryName}?lat=${latitude}&lng=${longitude}`);
    } else {
      navigate(`/categories/${categoryName}`);
    }
  };

  const renderContent = categories => {
    // If loading, render skeleton cards
    if (isLoading) {
      return [...Array(itemsToShow * 2)].map((_, i) => (
        <CategoryCard
          key={`skeleton-${i}`}
          isLoading={true}
          width={`${cardWidthPct}%`}
        />
      ));
    }
    // If not loading, render real category cards
    return categories.map(c => (
      <CategoryCard
        key={c._id || c.name}
        c={c}
        width={`${cardWidthPct}%`}
        onClick={handleNavigateToCategoryResultPage}
      />
    ));
  };

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

  return (
    <section className="py-5 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-6">
          <p className="text-xl font-semibold text-gray-800">
            What's on your mind <span>{UserFirstName}</span> ?
          </p>
          {categoriesPerRow > itemsToShow && !isLoading && (
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

        <div className="space-y-4">
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(${translatePct}%)` }}
            >
              {renderContent(firstRowCategories)}
            </div>
          </div>
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(${translatePct}%)` }}
            >
              {renderContent(secondRowCategories)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSlider;
