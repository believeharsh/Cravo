import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import axiosInstance from "../../api/axiosInstance" ; 



const categories = [
  { id: 1, label: "Pizza", icon: "🍕" },
  { id: 2, label: "Burgers", icon: "🍔" },
  { id: 3, label: "Desserts", icon: "🍰" },
  { id: 4, label: "Chinese", icon: "🥟" },
  { id: 5, label: "Salads", icon: "🥗" },
  { id: 6, label: "Sushi", icon: "🍣" },
  { id: 7, label: "Coffee", icon: "☕" },
  { id: 8, label: "Indian", icon: "🍛" },
  { id: 9, label: "Mexican", icon: "🌮" },
  { id: 10, label: "BBQ", icon: "🥩" },
];

const CategoryCard = ({ c, width }) => (
  <div
    className="flex-shrink-0 px-2 sm:px-3"
    style={{ width }} /* % width from parent */
  >
    <div
      className="bg-white rounded-xl border border-gray-200 flex flex-col items-center
                 justify-center py-5 hover:-translate-y-1 hover:shadow-md
                 transition-transform duration-200 ease-out"
    >
      <span className="text-4xl">{c.icon}</span>
      <span className="mt-3 font-medium text-gray-700 text-sm">{c.label}</span>
    </div>
  </div>
);

const CategoriesSlider = () => {
  const itemsPerView = { mobile: 2, tablet: 4, desktop: 6 };
  const [foodCategories , setfoodCategories] = useState([]) ; 

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosInstance.get("/api/v1/categories");
        console.log("API response:", res.data);        
        setfoodCategories(res.data.data || []);          
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };

    fetchCategories();
  }, []); // ← dependency array means “only on mount”

  /* SSR-safe “items per view” */
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
  const maxIndex = Math.max(0, categories.length - itemsToShow);
  useEffect(
    () => setIndex((i) => Math.min(i, maxIndex)),
    [itemsToShow, maxIndex]
  );

  const cardWidthPct = 100 / itemsToShow;
  const translatePct = -index * cardWidthPct;

  return (
    <section className="py-5 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* header + arrows */}
        <div className="flex items-center justify-between mb-6 mt-15">
          <h2 className="text-xl font-bold text-gray-800">
            Browse by Category
          </h2>
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
              <ChevronLeft size={18} />
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
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* slider track */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(${translatePct}%)` }}
          >
            {categories.map((c) => (
              <CategoryCard key={c.id} c={c} width={`${cardWidthPct}%`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSlider;



