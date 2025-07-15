import React, { useState, useEffect } from 'react';
import Icon from '../../../components/ui/Icon';

/* ------------------------------------------------------------------ */
/*  Restaurant card                                                   */
/* ------------------------------------------------------------------ */

const RestaurantCard = ({ data, width }) => (
  <div className="flex-shrink-0 px-3" style={{ width }}>
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden group cursor-pointer">
      {/* image + price */}
      <div className="relative h-40 bg-gradient-to-br from-yellow-100 to-yellow-200 flex items-center justify-center">
        <span className="text-5xl group-hover:scale-110 transition-transform duration-300">
          {data.image}
        </span>

        {/* price (white & bold) */}
        <span className="absolute bottom-2 left-3 text-white font-extrabold text-lg drop-shadow">
          {data.price}
        </span>
      </div>

      {/* text content */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 group-hover:text-yellow-600 transition-colors">
          {data.name}
        </h3>

        <div className="flex items-center space-x-2 my-2">
          <span className="flex items-center space-x-1 bg-green-100 px-2 py-0.5 rounded-lg">
            <Icon name={"star"} size={12} className="text-green-600 fill-current" />
            <span className="text-green-700 font-semibold text-xs">{data.rating}</span>
          </span>
          <span className="text-gray-500 text-xs">(500+)</span>
        </div>

        <div className="flex flex-wrap gap-1">
          {data.categories.slice(0, 4).map(c => (
            <span
              key={c}
              className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium"
            >
              {c}
            </span>
          ))}
        </div>

        <div className="mt-3 pt-3 border-t border-gray-100 text-[13px] flex justify-between text-gray-600">
          <span>25-30 min</span>
          <span className="text-yellow-600 font-medium">Free delivery</span>
        </div>
      </div>
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/*  Main slider                                                       */
/* ------------------------------------------------------------------ */

const TopRestaurants = () => {
  /* 1. YOUR DATA (put it here or fetch/prop-drill) ---------------- */
  const restaurants = [
    { id: 1, name: 'Pizza Palace',   image: '🍕', price: '₹299', rating: 4.5, categories: ['Italian', 'Fast Food', 'Pizza', 'Continental'] },
    { id: 2, name: 'Burger King',    image: '🍔', price: '₹199', rating: 4.2, categories: ['American', 'Fast Food', 'Burgers', 'Fries'] },
    { id: 3, name: 'Sushi Express',  image: '🍣', price: '₹599', rating: 4.7, categories: ['Japanese', 'Sushi', 'Asian', 'Seafood'] },
    { id: 4, name: 'Taco Bell',      image: '🌮', price: '₹249', rating: 4.1, categories: ['Mexican', 'Fast Food', 'Tacos', 'Wraps'] },
    { id: 5, name: 'Pasta Corner',   image: '🍝', price: '₹349', rating: 4.4, categories: ['Italian', 'Pasta', 'Continental', 'Cheese'] },
    { id: 6, name: 'Biryani House',  image: '🍛', price: '₹399', rating: 4.6, categories: ['Indian', 'Biryani', 'Mughlai', 'Rice'] },
    { id: 7, name: 'Donut Delight',  image: '🍩', price: '₹149', rating: 4.3, categories: ['Desserts', 'Bakery', 'Sweet', 'Coffee'] },
    { id: 8, name: 'Noodle Express', image: '🍜', price: '₹279', rating: 4.2, categories: ['Chinese', 'Noodles', 'Asian', 'Soup'] },
    { id: 9, name: 'Sandwich Hub',   image: '🥪', price: '₹179', rating: 4.0, categories: ['Continental', 'Sandwich', 'Fast Food', 'Healthy'] },
    { id: 10, name: 'Ice-Cream Paradise', image: '🍦', price: '₹129', rating: 4.5, categories: ['Desserts', 'Ice Cream', 'Cold', 'Sweet'] },
    { id: 11, name: 'Chicken Corner', image: '🍗', price: '₹329', rating: 4.4, categories: ['Non-Veg', 'Chicken', 'Fried', 'Spicy'] },
    { id: 12, name: 'Salad Station', image: '🥗', price: '₹229', rating: 4.1, categories: ['Healthy', 'Salads', 'Vegan', 'Fresh'] },
    { id: 13, name: 'Cake Castle',   image: '🎂', price: '₹449', rating: 4.6, categories: ['Desserts', 'Cakes', 'Bakery', 'Custom'] },
    { id: 14, name: 'Curry Kitchen', image: '🍛', price: '₹319', rating: 4.3, categories: ['Indian', 'Curry', 'Spicy', 'Traditional'] },
    { id: 15, name: 'Smoothie Bar',  image: '🥤', price: '₹159', rating: 4.2, categories: ['Beverages', 'Healthy', 'Fresh', 'Fruit'] },
  ];

  /* 2. BREAKPOINT-SAFE “ITEMS PER VIEW” --------------------------- */
  const itemsPerView = { mobile: 1, tablet: 2, desktop: 4 };

  const getItemsPerView = () => {
    if (typeof window === 'undefined') return 1;                // SSR guard
    if (window.innerWidth >= 1024) return itemsPerView.desktop;
    if (window.innerWidth >= 768)  return itemsPerView.tablet;
    return itemsPerView.mobile;
  };

  const [itemsToShow, setItemsToShow] = useState(1);            // safe default
  const [currentIndex, setCurrentIndex] = useState(0);

  /* update itemsToShow *after* mount + on resize */
  useEffect(() => {
    const update = () => setItemsToShow(getItemsPerView());
    update();                         // run once in browser
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  /* keep currentIndex valid when viewport shrinks */
  useEffect(() => {
    setCurrentIndex(i => Math.min(i, Math.max(0, restaurants.length - itemsToShow)));
  }, [itemsToShow, restaurants.length]);

  const maxIndex       = Math.max(0, restaurants.length - itemsToShow);
  const cardWidthPct   = 100 / itemsToShow;
  const translateXPct  = -currentIndex * cardWidthPct;

  /* ---------------------------------------------------------------- */
  /*  Render                                                          */
  /* ---------------------------------------------------------------- */
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">
              Top Restaurants in the City
            </h2>
            <p className="text-gray-600">
              Discover the most popular restaurants loved by our customers
            </p>
          </div>

          {/* arrows */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentIndex(i => Math.max(0, i - 1))}
              disabled={currentIndex === 0}
              className={`p-3 rounded-full border-2 transition ${
                currentIndex === 0
                  ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                  : 'border-gray-300 text-gray-600 hover:border-yellow-400 hover:text-yellow-600 hover:bg-yellow-50'
              }`}
            >
              <Icon name={"chevron-left"} size={18} />
            </button>

            <button
              onClick={() => setCurrentIndex(i => Math.min(maxIndex, i + 1))}
              disabled={currentIndex === maxIndex}
              className={`p-3 rounded-full border-2 transition ${
                currentIndex === maxIndex
                  ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                  : 'border-gray-300 text-gray-600 hover:border-yellow-400 hover:text-yellow-600 hover:bg-yellow-50'
              }`}
            >
              <Icon name={"chevron-right"} size={18} />
            </button>
          </div>
        </div>

        {/* slider */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(${translateXPct}%)` }}
          >
            {restaurants.map(r => (
              <RestaurantCard key={r.id} data={r} width={`${cardWidthPct}%`} />
            ))}
          </div>
        </div>

        {/* progress + CTA */}
        <div className="flex flex-col items-center mt-6 space-y-4">
          <span className="bg-gray-100 rounded-full px-4 py-1 text-sm text-gray-600">
            {currentIndex + 1}-{Math.min(currentIndex + itemsToShow, restaurants.length)} of {restaurants.length}
          </span>

          <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold px-8 py-3 rounded-xl transition-transform duration-200 hover:scale-105 shadow">
            View All Restaurants
          </button>
        </div>
      </div>
    </section>
  );
};

export default TopRestaurants;

