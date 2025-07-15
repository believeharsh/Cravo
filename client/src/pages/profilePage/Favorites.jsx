import React, { useState } from 'react';
import Icon from '../../components/ui/Icon';

const Favorites = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const [favorites, setFavorites] = useState([
    {
      id: '1',
      name: 'Margherita Pizza',
      description: 'Classic pizza with tomato, mozzarella, and fresh basil.',
      restaurant: 'Pizza Palace',
      category: 'Pizza',
      price: 12.99,
      rating: 4.8,
      reviews: 256,
      cookTime: '25-30 min',
      image: 'https://via.placeholder.com/400x250/FFD700/FFFFFF?text=MargheritaPizza',
      isAvailable: true,
      addedDate: '2024-01-15',
    },
    {
      id: '2',
      name: 'Butter Chicken',
      description: 'Creamy tomato-based curry with tender chicken pieces.',
      restaurant: 'Spice Route',
      category: 'Indian',
      price: 15.50,
      rating: 4.6,
      reviews: 180,
      cookTime: '35-45 min',
      image: 'https://via.placeholder.com/400x250/FFA500/FFFFFF?text=ButterChicken',
      isAvailable: true,
      addedDate: '2023-11-20',
    },
    {
      id: '3',
      name: 'Caesar Salad',
      description: 'Crisp romaine lettuce, croutons, parmesan, and Caesar dressing.',
      restaurant: 'Green Garden',
      category: 'Salads',
      price: 9.75,
      rating: 4.4,
      reviews: 95,
      cookTime: '15-20 min',
      image: 'https://via.placeholder.com/400x250/90EE90/FFFFFF?text=CaesarSalad',
      isAvailable: false,
      addedDate: '2024-02-01',
    },
    {
      id: '4',
      name: 'Classic Cheeseburger',
      description: 'Juicy beef patty with cheese, lettuce, tomato, and onion.',
      restaurant: 'Burger Barn',
      category: 'Burgers',
      price: 11.25,
      rating: 4.7,
      reviews: 310,
      cookTime: '20-25 min',
      image: 'https://via.placeholder.com/400x250/ADD8E6/FFFFFF?text=Cheeseburger',
      isAvailable: true,
      addedDate: '2023-10-05',
    },
    {
      id: '5',
      name: 'Chocolate Lava Cake',
      description: 'Warm chocolate cake with a molten chocolate center.',
      restaurant: 'Sweet Surrender',
      category: 'Desserts',
      price: 7.00,
      rating: 4.9,
      reviews: 120,
      cookTime: '10-15 min',
      image: 'https://via.placeholder.com/400x250/DDA0DD/FFFFFF?text=LavaCake',
      isAvailable: true,
      addedDate: '2024-03-10',
    },
    {
      id: '6',
      name: 'Pad Thai',
      description: 'Stir-fried rice noodles with shrimp, tofu, peanuts, and bean sprouts.',
      restaurant: 'Thai Temptations',
      category: 'Thai',
      price: 14.00,
      rating: 4.5,
      reviews: 150,
      cookTime: '30-40 min',
      image: 'https://via.placeholder.com/400x250/F0E68C/FFFFFF?text=PadThai',
      isAvailable: true,
      addedDate: '2024-01-28',
    },
  ]);

  const categories = ['all', 'Pizza', 'Indian', 'Salads', 'Burgers', 'Desserts', 'Thai'];

  /* ── Derived Lists ───────────────────────────────────────────────────────── */
  const filteredFavorites = favorites.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.restaurant.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  /* ── Actions ─────────────────────────────────────────────────────────────── */
  const handleRemoveFromFavorites = (id) => {
    if (window.confirm('Remove this item from your favorites?')) {
      setFavorites(favorites.filter((item) => item.id !== id));
    }
  };

  const handleAddToCart = (item) => {
    console.log('Added to cart:', item.name);
  };

  /* ── Grid Card ───────────────────────────────────────────────────────────── */
  const GridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredFavorites.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-2xl shadow-lg border border-cream overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          {/* Image */}
          <div className="relative h-48 bg-gray-200">
            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            <button
              onClick={() => handleRemoveFromFavorites(item.id)}
              className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-50 transition-colors"
            >
              <Icon name="heart" className="w-5 h-5 text-red-500 fill-current" />
            </button>
            {!item.isAvailable && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Currently Unavailable
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-5">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-bold text-charcoal line-clamp-1">{item.name}</h3>
              <span className="text-lg font-bold text-mint-green">${item.price}</span>
            </div>

            <p className="text-sm text-medium-gray mb-3 line-clamp-2">{item.description}</p>

            <div className="flex items-center gap-4 mb-3 text-sm text-medium-gray">
              <div className="flex items-center gap-1">
                <Icon name="star" className="w-4 h-4 text-yellow-400 fill-current" />
                <span>{item.rating}</span>
                <span>({item.reviews})</span>
              </div>
              <div className="flex items-center gap-1">
                <Icon name="clock" className="w-4 h-4" />
                <span>{item.cookTime}</span>
              </div>
            </div>

            <p className="text-sm text-coffee font-medium mb-4">{item.restaurant}</p>

            <button
              onClick={() => handleAddToCart(item)}
              disabled={!item.isAvailable}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all ${
                item.isAvailable
                  ? 'bg-yellow-400 hover:bg-yellow-500 text-white shadow-lg hover:shadow-xl'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Icon name="shopping-cart" className="w-5 h-5" />
              {item.isAvailable ? 'Add to Cart' : 'Unavailable'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  /* ── List Card ───────────────────────────────────────────────────────────── */
  const ListView = () => (
    <div className="space-y-4">
      {filteredFavorites.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-2xl shadow-lg border border-cream p-6 hover:shadow-xl transition-all"
        >
          <div className="flex items-center gap-6">
            {/* Image */}
            <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-gray-200 flex-shrink-0">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              {!item.isAvailable && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="text-white text-xs font-medium">N/A</span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-xl font-bold text-charcoal">{item.name}</h3>
                  <p className="text-coffee font-medium">{item.restaurant}</p>
                </div>
                <span className="text-xl font-bold text-mint-green">${item.price}</span>
              </div>

              <p className="text-medium-gray mb-3">{item.description}</p>

              <div className="flex items-center gap-6 text-sm text-medium-gray mb-4">
                <div className="flex items-center gap-1">
                  <Icon name="star" className="w-4 h-4 text-yellow-400 fill-current" />
                  <span>
                    {item.rating} ({item.reviews} reviews)
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="clock" className="w-4 h-4" />
                  <span>{item.cookTime}</span>
                </div>
                <span className="px-2 py-1 bg-cream text-coffee rounded-full text-xs">
                  {item.category}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-medium-gray">
                  Added on {new Date(item.addedDate).toLocaleDateString()}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleRemoveFromFavorites(item.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Icon name="lucide-trash-2" className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleAddToCart(item)}
                    disabled={!item.isAvailable}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                      item.isAvailable
                        ? 'bg-yellow-400 hover:bg-yellow-500 text-white'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <Icon name="shopping-cart" className="w-4 h-4" />
                    {item.isAvailable ? 'Add to Cart' : 'Unavailable'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  /* ── Main Render ─────────────────────────────────────────────────────────── */
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-charcoal">My Favorites</h1>
          <p className="text-medium-gray mt-1">
            {favorites.length} favorite {favorites.length === 1 ? 'item' : 'items'}
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-2 bg-white rounded-lg p-1 border border-cream">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md transition-colors ${
              viewMode === 'grid'
                ? 'bg-yellow-400 text-white'
                : 'text-medium-gray hover:bg-gray-100'
            }`}
          >
            <Icon name="grid-3x3" className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md transition-colors ${
              viewMode === 'list'
                ? 'bg-yellow-400 text-white'
                : 'text-medium-gray hover:bg-gray-100'
            }`}
          >
            <Icon name="list" className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-2xl shadow-lg border border-cream p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-medium-gray w-5 h-5" />
            <input
              type="text"
              placeholder="Search favorites..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-cream rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <Icon name="filter" className="absolute left-3 top-1/2 -translate-y-1/2 text-medium-gray w-5 h-5" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="pl-10 pr-8 py-3 border border-cream rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white min-w-[150px]"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Content */}
      {filteredFavorites.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg border border-cream p-12 text-center">
          <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto">
            <Icon name="heart" className="w-10 h-10 text-yellow-400 fill-current" />
          </div>
          <h3 className="mt-6 text-xl font-semibold text-charcoal">No favorites found</h3>
          <p className="text-medium-gray">
            Try adjusting your search or filter to see items here.
          </p>
        </div>
      ) : viewMode === 'grid' ? (
        <GridView />
      ) : (
        <ListView />
      )}
    </div>
  );
};

export default Favorites;