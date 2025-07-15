import React from 'react';

/* ------------------------------------------------------------------ */
/*  Sample data – tweak / extend any time                             */
/* ------------------------------------------------------------------ */
const restaurants = [
  { id: 1,  name: 'North Spice House',   cuisine: 'North Indian',   icon: '🍛' },
  { id: 2,  name: 'Curry Mahal',         cuisine: 'North Indian',   icon: '🍲' },
  { id: 3,  name: 'Tandoori Treats',     cuisine: 'Punjabi',        icon: '🍢' },
  { id: 4,  name: 'Punjab Junction',     cuisine: 'Punjabi',        icon: '🥘' },
  { id: 5,  name: 'Saffron North',       cuisine: 'North Indian',   icon: '🫕' },
  { id: 6,  name: 'Southern Spice',      cuisine: 'South Indian',   icon: '🍛' },
  { id: 7,  name: 'Dosa Corner',         cuisine: 'South Indian',   icon: '🥞' },
  { id: 8,  name: 'Idli Express',        cuisine: 'South Indian',   icon: '🍘' },
  { id: 9,  name: 'Andhra Bites',        cuisine: 'South Indian',   icon: '🌶️' },
  { id: 10, name: 'Chettinad Kitchen',   cuisine: 'South Indian',   icon: '🍲' },
  { id: 11, name: 'Biryani Junction',    cuisine: 'Hyderabadi',     icon: '🍗' },
  { id: 12, name: 'Kolhapuri Curry',     cuisine: 'Maharashtrian',  icon: '🍲' },
  { id: 13, name: 'Rajasthani Rasoi',    cuisine: 'Rajasthani',     icon: '🍛' },
  { id: 14, name: 'Bengali Bistro',      cuisine: 'Bengali',        icon: '🐟' },
  { id: 15, name: 'Gujarati Thali',      cuisine: 'Gujarati',       icon: '🥗' },
];

/* ------------------------------------------------------------------ */
/*  Single card                                                       */
/* ------------------------------------------------------------------ */
const CuisineCard = ({ r }) => (
  <div className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden">
    {/* text */}
    <div className="p-4">
      <h3 className="font-bold text-gray-800">{r.name}</h3>
      <p className="text-xs text-gray-500 mt-1">{r.cuisine} cuisine</p>
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/*  Main grid component                                               */
/* ------------------------------------------------------------------ */
const NearbyCuisineGrid = () => (
  <section className="py-12 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-8">
        Best Cuisines Near You
      </h2>

      {/* responsive grid — 1 / 2 / 4 cols */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {restaurants.map(r => (
          <CuisineCard key={r.id} r={r} />
        ))}
      </div>
    </div>
  </section>
);

export default NearbyCuisineGrid;
