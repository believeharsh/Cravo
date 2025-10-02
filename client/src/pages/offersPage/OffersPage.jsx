import React, { useState } from 'react';
import {
  Search,
  Tag,
  Gift,
  Percent,
  Truck,
  Star,
  Clock,
  Copy,
  Check,
  Sparkles,
  TrendingUp,
  ChevronRight,
} from 'lucide-react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const OffersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [copiedId, setCopiedId] = useState(null);

  const categories = [
    { key: 'all', label: 'All Offers' },
    { key: 'pizza', label: 'Pizza' },
    { key: 'burgers', label: 'Burgers' },
    { key: 'asian', label: 'Asian' },
    { key: 'desserts', label: 'Desserts' },
  ];

  const featuredOffers = [
    {
      id: 'f1',
      title: 'Flat 50% Off on First Order',
      description:
        'New user exclusive! Get half off on your first delicious meal',
      image:
        'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80',
      discount: '50%',
      code: 'WELCOME50',
      type: 'percentage',
      category: 'pizza',
      isNew: true,
      isTrending: true,
      minOrder: 20,
      maxDiscount: 15,
      validUntil: '2025-12-31',
      restaurant: {
        name: 'Pizza Paradise',
        rating: 4.5,
        deliveryTime: '30-40',
      },
    },
    {
      id: 'f2',
      title: 'Buy 1 Get 1 Free on All Burgers',
      description: 'Double the joy! BOGO deal on our premium burger collection',
      image:
        'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',
      discount: 'BOGO',
      code: 'BURGERBOGO',
      type: 'bogo',
      category: 'burgers',
      isNew: false,
      isTrending: true,
      minOrder: 15,
      maxDiscount: null,
      validUntil: '2025-11-15',
      restaurant: {
        name: 'Burger Bliss',
        rating: 4.3,
        deliveryTime: '25-35',
      },
    },
    {
      id: 'f3',
      title: 'Free Delivery on Orders Over $25',
      description: 'Save on delivery! Order more and pay nothing for shipping',
      image:
        'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
      discount: 'FREE',
      code: 'FREEDEL25',
      type: 'free_delivery',
      category: 'all',
      isNew: true,
      isTrending: false,
      minOrder: 25,
      maxDiscount: null,
      validUntil: '2025-10-31',
      restaurant: {
        name: 'Quick Bites',
        rating: 4.7,
        deliveryTime: '20-30',
      },
    },
  ];

  const regularOffers = [
    {
      id: 'r1',
      title: '$5 Off on Sushi Orders',
      description: 'Fresh sushi delivered with a sweet discount',
      image:
        'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&q=80',
      discount: '$5',
      code: 'SUSHI5',
      type: 'fixed',
      category: 'asian',
      minOrder: 30,
      validUntil: '2025-09-30',
      restaurant: {
        name: 'Sushi House',
        rating: 4.6,
      },
    },
    {
      id: 'r2',
      title: '15% Off Weekend Special',
      description: 'Make your weekends delicious with our special discount',
      image:
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80',
      discount: '15%',
      code: 'WEEKEND15',
      type: 'percentage',
      category: 'all',
      minOrder: 20,
      validUntil: '2025-08-31',
      restaurant: {
        name: 'Food Haven',
        rating: 4.4,
      },
    },
    {
      id: 'r3',
      title: 'Dessert Deal: 2 for $10',
      description: 'Sweet treats at sweeter prices',
      image:
        'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80',
      discount: '$10',
      code: 'SWEET2FOR10',
      type: 'fixed',
      category: 'desserts',
      minOrder: 10,
      validUntil: '2025-07-20',
      restaurant: {
        name: 'Sweet Delights',
        rating: 4.8,
      },
    },
    {
      id: 'r4',
      title: '20% Off Chinese Cuisine',
      description: 'Enjoy authentic Chinese flavors with amazing savings',
      image:
        'https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=800&q=80',
      discount: '20%',
      code: 'CHINESE20',
      type: 'percentage',
      category: 'asian',
      minOrder: 25,
      validUntil: '2025-10-15',
      restaurant: {
        name: 'Dragon Wok',
        rating: 4.5,
      },
    },
    {
      id: 'r5',
      title: 'Combo Meal Deal - $15',
      description: 'Complete meal with sides and drink included',
      image:
        'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80',
      discount: '$15',
      code: 'COMBO15',
      type: 'fixed',
      category: 'all',
      minOrder: 15,
      validUntil: '2025-11-30',
      restaurant: {
        name: 'Meal Masters',
        rating: 4.3,
      },
    },
    {
      id: 'r6',
      title: '30% Off Family Pack',
      description: 'Perfect for family dinner nights',
      image:
        'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80',
      discount: '30%',
      code: 'FAMILY30',
      type: 'percentage',
      category: 'all',
      minOrder: 50,
      validUntil: '2025-09-20',
      restaurant: {
        name: 'Family Feast',
        rating: 4.7,
      },
    },
  ];

  const allOffers = [...featuredOffers, ...regularOffers];

  const handleCopyCode = offer => {
    navigator.clipboard.writeText(offer.code);
    setCopiedId(offer.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getOfferIcon = type => {
    switch (type) {
      case 'percentage':
        return <Percent className="w-4 h-4" />;
      case 'bogo':
        return <Gift className="w-4 h-4" />;
      case 'free_delivery':
        return <Truck className="w-4 h-4" />;
      default:
        return <Tag className="w-4 h-4" />;
    }
  };

  const filterOffers = offers => {
    return offers.filter(offer => {
      const matchesSearch =
        offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offer.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === 'all' || offer.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50/50 to-white">
      {/* Hero Section */}
      <div className="relative h-[500px] overflow-hidden">
        {/* Background Image */}
        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&q=80"
          alt="Delicious Food"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/50"></div>

        {/* Animated Accent */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-yellow-400/20 rounded-full blur-3xl animate-pulse"></div>

        {/* Content */}
        <div className="relative h-full max-w-7xl mx-auto px-4 flex items-center">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-yellow-400/20 backdrop-blur-xl border border-yellow-400/30 text-yellow-400 px-5 py-2.5 rounded-full text-sm font-bold mb-6 shadow-lg">
              <Sparkles className="w-4 h-4" />
              Limited Time Offers
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white">Grab Amazing</span>
              <br />
              <span className="text-yellow-400">Deals & Save Big! 🍛</span>
            </h1>

            {/* Description */}
            <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
              Discover exclusive offers from your favorite restaurants. More
              savings, more happiness!
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-3 py-2">
                <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center">
                  <Tag className="w-6 h-6 text-gray-900" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">
                    {allOffers.length}+
                  </p>
                  <p className="text-xs text-gray-300 font-medium">
                    Active Offers
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-3 py-2">
                <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-gray-900" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">50%</p>
                  <p className="text-xs text-gray-300 font-medium">
                    Max Discount
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-3 py-2">
                <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center">
                  <Gift className="w-6 h-6 text-gray-900" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">BOGO</p>
                  <p className="text-xs text-gray-300 font-medium">
                    Free Deals
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter Section */}
      <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for offers, restaurants, or cuisines..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-4 py-2.5 rounded-xl font-semibold transition-all ${
                    selectedCategory === cat.key
                      ? 'bg-yellow-400 text-gray-900 shadow-lg shadow-yellow-200'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Featured Offers Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-5 h-5 text-gray-900" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Featured Offers
              </h2>
              <p className="text-sm text-gray-600">
                Hot deals you don't want to miss
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filterOffers(featuredOffers).map(offer => (
            <div
              key={offer.id}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                  {offer.isNew && (
                    <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                      NEW
                    </span>
                  )}
                  {offer.isTrending && (
                    <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      HOT
                    </span>
                  )}
                </div>

                {/* Discount Badge */}
                <div className="absolute top-3 right-3 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-xl">
                  <span className="text-gray-900 font-bold text-lg">
                    {offer.discount}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Type Badge */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center text-yellow-600">
                    {getOfferIcon(offer.type)}
                  </div>
                  <span className="text-sm font-semibold text-yellow-600 capitalize">
                    {offer.type.replace('_', ' ')}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                  {offer.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {offer.description}
                </p>

                {/* Restaurant Info */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {offer.restaurant.name}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-gray-600 mt-1">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        {offer.restaurant.rating}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {offer.restaurant.deliveryTime} min
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-600">
                    <p>Min: ${offer.minOrder}</p>
                    <p>
                      Valid till{' '}
                      {new Date(offer.validUntil).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  <button
                    onClick={() => handleCopyCode(offer)}
                    className="flex items-center gap-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-xl font-semibold transition-colors"
                  >
                    {copiedId === offer.id ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        {offer.code}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* More Offers Section */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center">
            <Tag className="w-5 h-5 text-yellow-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              More Great Deals
            </h2>
            <p className="text-sm text-gray-600">
              Additional offers just for you
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filterOffers(regularOffers).map(offer => (
            <div
              key={offer.id}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all"
            >
              <div className="relative h-40">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute top-3 right-3 w-14 h-14 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-gray-900 font-bold">
                    {offer.discount}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-2">{offer.title}</h3>
                <p className="text-sm text-gray-600 mb-4">
                  {offer.description}
                </p>

                <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-100">
                  <div className="text-xs text-gray-600">
                    <p className="font-semibold text-gray-900">
                      {offer.restaurant.name}
                    </p>
                    <p className="flex items-center gap-1 mt-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      {offer.restaurant.rating}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleCopyCode(offer)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-semibold transition-colors"
                >
                  {copiedId === offer.id ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      {offer.code}
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Don't Miss Out on These Deals!
            </h2>
            <p className="text-lg text-gray-800 mb-6">
              Start ordering now and enjoy incredible savings on your favorite
              meals
            </p>

            <Link to={'/restaurants'}>
              <button className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-xl">
                Browse All Restaurants
                <ChevronRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OffersPage;
