import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Icon from "../../../components/ui/Icon";

const CityCard = ({ city, width }) => (
  <div
    className="flex-shrink-0 px-2 sm:px-3"
    style={{ width }} /* % width from parent */
  >
    <div
      className="bg-white rounded-xl border border-gray-200 flex flex-col items-center
                 justify-center py-5 hover:-translate-y-1 hover:shadow-md
                 transition-transform duration-200 ease-out"
    >
      <span className="font-medium text-gray-700 text-sm text-center">{city.name}</span>
    </div>
  </div>
);

const CitiesSection = () => {
  const itemsPerView = { mobile: 2, tablet: 4, desktop: 6 };
  const { data, isLoading, error } = useSelector((state) => state.landingPage);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    if (data?.data?.citiesWeServe?.data) {
      setCities(data.data.citiesWeServe.data);
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
  const maxIndex = Math.max(0, cities.length - itemsToShow);
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
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Cities We Serve
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              Bringing delicious food to your doorstep across India
            </p>
          </div>
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
        </div>

        {/* slider track */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(${translatePct}%)` }}
          >
            {cities.map((city) => (
              <CityCard key={city._id} city={city} width={`${cardWidthPct}%`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CitiesSection;