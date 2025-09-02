import React from 'react';
import { Star } from 'lucide-react';
import { useSelector } from 'react-redux';

/* sample data */

const restaurants = [
  {
    id: 1,
    name: 'Pizza Palace',
    image: '🍕',
    rating: 4.5,
    reviewCount: 1250,
    deliveryTime: '25-30 mins',
    priceForTwo: '₹300',
    cuisines: ['Italian', 'Fast Food', 'Pizza'],
  },
  {
    id: 2,
    name: 'Burger Junction',
    image: '🍔',
    rating: 4.2,
    reviewCount: 890,
    deliveryTime: '20-25 mins',
    priceForTwo: '₹250',
    cuisines: ['American', 'Burgers', 'Fast Food'],
  },
  {
    id: 3,
    name: 'Sushi Sashimi',
    image: '🍣',
    rating: 4.7,
    reviewCount: 1500,
    deliveryTime: '35-40 mins',
    priceForTwo: '₹600',
    cuisines: ['Japanese', 'Sushi', 'Asian'],
  },
  {
    id: 4,
    name: 'Curry Kingdom',
    image: '🍛',
    rating: 4.3,
    reviewCount: 1100,
    deliveryTime: '30-35 mins',
    priceForTwo: '₹400',
    cuisines: ['Indian', 'Curry', 'North Indian'],
  },
  {
    id: 5,
    name: 'Taco Town',
    image: '🌮',
    rating: 4.0,
    reviewCount: 750,
    deliveryTime: '20-25 mins',
    priceForTwo: '₹280',
    cuisines: ['Mexican', 'Tacos', 'Tex-Mex'],
  },
  {
    id: 6,
    name: 'Pasta Paradise',
    image: '🍝',
    rating: 4.6,
    reviewCount: 1300,
    deliveryTime: '30-35 mins',
    priceForTwo: '₹350',
    cuisines: ['Italian', 'Pasta', 'Mediterranean'],
  },
  {
    id: 7,
    name: 'Doughnut Dream',
    image: '🍩',
    rating: 4.8,
    reviewCount: 950,
    deliveryTime: '15-20 mins',
    priceForTwo: '₹150',
    cuisines: ['Desserts', 'Donuts', 'Bakery'],
  },
  {
    id: 8,
    name: 'Seafood Sensation',
    image: '🦐',
    rating: 4.4,
    reviewCount: 1050,
    deliveryTime: '40-45 mins',
    priceForTwo: '₹700',
    cuisines: ['Seafood', 'Coastal', 'Grill'],
  },
  {
    id: 9,
    name: 'Vegan Vault',
    image: '🥗',
    rating: 4.1,
    reviewCount: 600,
    deliveryTime: '25-30 mins',
    priceForTwo: '₹320',
    cuisines: ['Vegan', 'Healthy', 'Salads'],
  },
  {
    id: 10,
    name: 'Kebab King',
    image: '🍢',
    rating: 4.3,
    reviewCount: 800,
    deliveryTime: '30-35 mins',
    priceForTwo: '₹380',
    cuisines: ['Middle Eastern', 'Kebab', 'Grill'],
  },
  {
    id: 11,
    name: 'Waffle Wonderland',
    image: '🧇',
    rating: 4.5,
    reviewCount: 700,
    deliveryTime: '20-25 mins',
    priceForTwo: '₹200',
    cuisines: ['Desserts', 'Waffles', 'Breakfast'],
  },
  {
    id: 12,
    name: 'Noodle Nook',
    image: '🍜',
    rating: 4.2,
    reviewCount: 980,
    deliveryTime: '25-30 mins',
    priceForTwo: '₹330',
    cuisines: ['Chinese', 'Noodles', 'Asian'],
  },
  {
    id: 13,
    name: 'Coffee Corner',
    image: '☕',
    rating: 4.6,
    reviewCount: 1600,
    deliveryTime: '10-15 mins',
    priceForTwo: '₹180',
    cuisines: ['Cafe', 'Beverages', 'Snacks'],
  },
  {
    id: 14,
    name: 'Biryani Bistro',
    image: '🍚',
    rating: 4.7,
    reviewCount: 1800,
    deliveryTime: '35-40 mins',
    priceForTwo: '₹450',
    cuisines: ['Indian', 'Biryani', 'Hyderabadi'],
  },
  {
    id: 15,
    name: 'Smoothie Spot',
    image: '🥤',
    rating: 4.0,
    reviewCount: 550,
    deliveryTime: '15-20 mins',
    priceForTwo: '₹100',
    cuisines: ['Healthy', 'Beverages', 'Juice'],
  },
  {
    id: 16,
    name: 'Steakhouse Supreme',
    image: '🥩',
    rating: 4.8,
    reviewCount: 1400,
    deliveryTime: '45-50 mins',
    priceForTwo: '₹800',
    cuisines: ['Steak', 'American', 'Fine Dining'],
  },
  {
    id: 17,
    name: 'Pancake Place',
    image: '🥞',
    rating: 4.1,
    reviewCount: 650,
    deliveryTime: '20-25 mins',
    priceForTwo: '₹220',
    cuisines: ['Breakfast', 'Desserts', 'American'],
  },
  {
    id: 18,
    name: 'Soup Sanctuary',
    image: '🍲',
    rating: 3.9,
    reviewCount: 400,
    deliveryTime: '25-30 mins',
    priceForTwo: '₹200',
    cuisines: ['Healthy', 'Soups', 'Continental'],
  },
  {
    id: 19,
    name: 'Crepe Corner',
    image: '🍮',
    rating: 4.4,
    reviewCount: 780,
    deliveryTime: '20-25 mins',
    priceForTwo: '₹250',
    cuisines: ['French', 'Desserts', 'Cafe'],
  },
  {
    id: 20,
    name: 'Grill House',
    image: '🍖',
    rating: 4.5,
    reviewCount: 1150,
    deliveryTime: '30-35 mins',
    priceForTwo: '₹500',
    cuisines: ['BBQ', 'Grill', 'American'],
  },
];

/* Card */

const RestaurantCard = ({ r }) => (
  <div className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden">
    <div className="h-32 flex items-center justify-center bg-gradient-to-br from-yellow-100 to-yellow-200 text-6xl">
      {r.image}
    </div>

    <div className="p-4">
      <h3 className="font-bold text-gray-800">{r.name}</h3>

      <div className="flex items-center gap-1 mt-1 text-sm text-gray-600">
        <Star size={14} className="fill-current text-green-600" />
        {r.rating} · {r.reviewCount} reviews
      </div>

      <div className="text-xs text-gray-500 mt-2">
        {r.deliveryTime} • {r.priceForTwo} for two
      </div>

      <div className="flex flex-wrap gap-1 mt-2">
        {r.cuisines.map(c => (
          <span
            key={c}
            className="bg-gray-100 text-gray-600 rounded-full px-2 py-0.5 text-[10px]"
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  </div>
);

/*  Main grid component */

const RestaurantGrid = () => {
  const { data, isLoading, error } = useSelector(state => state.landingPage);
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-8">
          All Restaurants
        </h2>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {restaurants.map(r => (
            <RestaurantCard key={r.id} r={r} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RestaurantGrid;
