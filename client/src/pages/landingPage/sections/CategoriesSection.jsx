import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Icon from "../../../components/ui/Icon";

// Dummy categories for fallback when API doesn't return enough data
const dummyCategories = [
  { _id: 'dummy-1', name: 'Chinese', image: 'https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=400&h=400&fit=crop', slug: 'chinese' },
  { _id: 'dummy-2', name: 'Mexican', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=400&fit=crop', slug: 'mexican' },
  { _id: 'dummy-3', name: 'Thai', image: 'https://images.unsplash.com/photo-1559847844-d721426d6edc?w=400&h=400&fit=crop', slug: 'thai' },
  { _id: 'dummy-4', name: 'Japanese', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=400&fit=crop', slug: 'japanese' },
  { _id: 'dummy-5', name: 'Mediterranean', image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=400&fit=crop', slug: 'mediterranean' },
  { _id: 'dummy-6', name: 'American', image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=400&fit=crop', slug: 'american' },
  { _id: 'dummy-7', name: 'French', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=400&fit=crop', slug: 'french' },
  { _id: 'dummy-8', name: 'Korean', image: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=400&h=400&fit=crop', slug: 'korean' },
  { _id: 'dummy-9', name: 'Greek', image: 'https://images.unsplash.com/photo-1544982503-9f984c14501a?w=400&h=400&fit=crop', slug: 'greek' },
  { _id: 'dummy-10', name: 'Lebanese', image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=400&fit=crop', slug: 'lebanese' },
  { _id: 'dummy-11', name: 'Spanish', image: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=400&h=400&fit=crop', slug: 'spanish' },
  { _id: 'dummy-12', name: 'Turkish', image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=400&fit=crop', slug: 'turkish' }
];

const CategoryCard = ({ c, width }) => (
  <div
    className="flex-shrink-0 px-2 sm:px-3"
    style={{ width }}
  >
    <div
      className="bg-white rounded-xl border border-gray-200 flex flex-col items-center
                 justify-center py-6 hover:-translate-y-1 hover:shadow-md
                 transition-transform duration-200 ease-out cursor-pointer"
    >
      <img 
        src={c.image} 
        alt={c.name}
        className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-lg"
        onError={(e) => {
          e.target.src = '/placeholder-category.png'; // Fallback image
        }}
      />
      <span className="mt-3 font-medium text-gray-700 text-sm text-center">
        {c.name}
      </span>
    </div>
  </div>
);

const CategoriesSlider = () => {
  const itemsPerView = { mobile: 2, tablet: 4, desktop: 6 };
  const [foodCategories, setFoodCategories] = useState([]);
  const { data, isLoading, error } = useSelector((state) => state.landingPage);

  // Set categories from Redux store and ensure we have enough for two rows
  useEffect(() => {
    let categories = [];
    
    if (data?.data?.categories?.data?.categories) {
      categories = [...data.data.categories.data.categories];
    }
    
    // Calculate minimum categories needed for two rows
    const minCategoriesNeeded = itemsPerView.desktop * 2; // 12 categories for desktop view
    
    // If we don't have enough categories, add dummy data
    if (categories.length < minCategoriesNeeded) {
      const additionalNeeded = minCategoriesNeeded - categories.length;
      const additionalCategories = dummyCategories.slice(0, additionalNeeded);
      categories = [...categories, ...additionalCategories];
    }
    
    setFoodCategories(categories);
    console.log("Categories in categories Section:", categories);
  }, [data]);

  /* SSR-safe "items per view" */
  const getItemsPerView = () => {
    if (typeof window === "undefined") return itemsPerView.mobile;
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
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Split categories into two rows
  const totalCategories = foodCategories.length;
  const categoriesPerRow = Math.ceil(totalCategories / 2);
  const firstRowCategories = foodCategories.slice(0, categoriesPerRow);
  const secondRowCategories = foodCategories.slice(categoriesPerRow);

  /* keep index in range when viewport shrinks */
  const maxIndex = Math.max(0, categoriesPerRow - itemsToShow);
  useEffect(
    () => setIndex((i) => Math.min(i, maxIndex)),
    [itemsToShow, maxIndex]
  );

  const cardWidthPct = 100 / itemsToShow;
  const translatePct = -index * cardWidthPct;

  // Show loading state
  if (isLoading) {
    return (
      <section className="py-5 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">What's on your mind</h2>
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
          <h2 className="text-xl font-bold text-gray-800">
            What's on your mind
          </h2>
          {categoriesPerRow > itemsToShow && (
            <div className="flex gap-2">
              <button
                onClick={() => setIndex((i) => Math.max(0, i - 1))}
                disabled={index === 0}
                className={`p-2 rounded-full border transition ${
                  index === 0
                    ? "border-gray-200 text-gray-300 cursor-not-allowed"
                    : "border-gray-300 text-gray-600 hover:border-yellow-400 hover:text-yellow-600"
                }`}
              >
                <Icon name={"chevron-left"} size={18} />
              </button>
              <button
                onClick={() => setIndex((i) => Math.min(maxIndex, i + 1))}
                disabled={index === maxIndex}
                className={`p-2 rounded-full border transition ${
                  index === maxIndex
                    ? "border-gray-200 text-gray-300 cursor-not-allowed"
                    : "border-gray-300 text-gray-600 hover:border-yellow-400 hover:text-yellow-600"
                }`}
              >
                <Icon name={"chevron-right"} size={18} />
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
              {firstRowCategories.map((c) => (
                <CategoryCard key={`row1-${c._id}`} c={c} width={`${cardWidthPct}%`} />
              ))}
            </div>
          </div>

          {/* Second Row */}
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(${translatePct}%)` }}
            >
              {secondRowCategories.map((c) => (
                <CategoryCard key={`row2-${c._id}`} c={c} width={`${cardWidthPct}%`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSlider;
