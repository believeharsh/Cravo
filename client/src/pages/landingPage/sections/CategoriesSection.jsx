import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Icon from "../../../components/ui/Icon";

const CategoryCard = ({ c, width }) => (
  <div
    className="flex-shrink-0 px-2 sm:px-3"
    style={{ width }}
  >
    <div
      className="bg-white rounded-xl border border-gray-200 flex flex-col items-center
                 justify-center py-5 hover:-translate-y-1 hover:shadow-md
                 transition-transform duration-200 ease-out cursor-pointer"
    >
      <img 
        src={c.image} 
        alt={c.name}
        className="w-20 h-20 object-cover rounded-lg"
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
  console.log("CategoriesSlider Mounted/Rendered on path:", window.location.pathname);
  const [foodCategories, setFoodCategories] = useState([]);
  console.log(foodCategories)
  const { data, isLoading, error } = useSelector((state) => state.landingPage);

  // Set categories from Redux store
  useEffect(() => {
    if (data?.data?.categories?.data?.categories) {
      setFoodCategories(data.data.categories.data.categories);
      console.log(foodCategories)
    }
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

  /* keep index in range when viewport shrinks */
  const maxIndex = Math.max(0, foodCategories.length - itemsToShow);
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
          <div className="flex gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex-1">
                <div className="bg-gray-200 rounded-xl h-32 animate-pulse"></div>
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

  // Don't render if no categories
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
          {foodCategories.length > itemsToShow && (
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
                <Icon name={"chevron-right"}size={18} />
              </button>
            </div>
          )}
        </div>

        {/* slider track */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(${translatePct}%)` }}
          >
            {foodCategories.map((c) => (
              <CategoryCard key={c._id} c={c} width={`${cardWidthPct}%`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSlider;
