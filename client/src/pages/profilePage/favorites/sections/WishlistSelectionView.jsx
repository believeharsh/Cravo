import React, { useState } from 'react';
import {
  Plus,
  ShoppingBag,
  Coffee,
  Heart,
  Star,
  ChevronRight,
} from 'lucide-react';
import { useFavoriteActions } from '../../../../hooks/useWishlistActions';

const WishlistSelectionView = ({ wishlists, setSelectedListId }) => {
  const [showNewListInput, setShowNewListInput] = useState(false);
  const [newListName, setNewListName] = useState('');

  const [newListType, setNewListType] = useState('productList');

  const { handleCreateNewWishList } = useFavoriteActions();

  const handleSave = () => {
    if (newListName.trim()) {
      handleCreateNewWishList({
        listName: newListName,
        list_type: newListType,
      });

      setNewListName('');
      setNewListType('productList');
      setShowNewListInput(false);
    }
  };

  const getListIcon = listType => {
    switch (listType) {
      case 'productList':
        return ShoppingBag;
      case 'restaurantList':
        return Coffee;
      default:
        return Heart;
    }
  };

  const getGradientClass = index => {
    const gradients = [
      'from-yellow-50 to-amber-100',
      'from-green-50 to-emerald-100',
      'from-orange-50 to-yellow-100',
      'from-amber-50 to-orange-100',
      'from-lime-50 to-green-100',
      'from-yellow-50 to-orange-100',
    ];
    return gradients[index % gradients.length];
  };

  if (!wishlists || wishlists.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <div className="w-24 h-24 bg-gradient-to-br from-yellow-50 to-amber-100 rounded-full flex items-center justify-center mb-8 shadow-lg">
          <Heart className="w-12 h-12 text-amber-500" strokeWidth={1.5} />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-3">
          No Wishlists Yet
        </h3>
        <p className="text-gray-600 mb-8 max-w-md leading-relaxed">
          Create your first wishlist to start organizing your favorite items and
          discover new possibilities.
        </p>
        <button
          onClick={() => setShowNewListInput(true)}
          className="group inline-flex items-center gap-3 px-8 py-4 bg-yellow-400 text-gray-800 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 hover:bg-yellow-300"
        >
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          Create Your First List
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            My Wishlists
          </h1>
          <p className="text-gray-600">
            Organize and manage your favorite collections
          </p>
        </div>
        {!showNewListInput && (
          <button
            onClick={() => setShowNewListInput(true)}
            className=" cursor-pointer group inline-flex items-center gap-3 px-6 py-3 bg-yellow-400 text-gray-800 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 self-start hover:bg-yellow-300"
          >
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            Create New List
          </button>
        )}
      </div>

      {/* New List Input */}
      {showNewListInput && (
        <div className="bg-white rounded-2xl shadow-xl border border-yellow-100 p-6 transform animate-in slide-in-from-top-4 duration-300">
          {/* 3. New List Type Selector Buttons */}
          <div className="mb-6 flex items-center space-x-4 p-2 bg-gray-50 rounded-xl shadow-inner">
            <button
              onClick={() => setNewListType('productList')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all duration-200 ${
                newListType === 'productList'
                  ? 'bg-yellow-400 text-gray-800 shadow-md' // Active style
                  : 'text-gray-600 hover:bg-gray-100' // Inactive style
              }`}
            >
              <ShoppingBag className="w-5 h-5" />
              Product List
            </button>
            <button
              onClick={() => setNewListType('restaurantList')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all duration-200 ${
                newListType === 'restaurantList'
                  ? 'bg-yellow-400 text-gray-800 shadow-md' // Active style
                  : 'text-gray-600 hover:bg-gray-100' // Inactive style
              }`}
            >
              <Coffee className="w-5 h-5" />
              Restaurant List
            </button>
          </div>
          {/* End of New List Type Selector Buttons */}

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-grow">
              <input
                type="text"
                value={newListName}
                onChange={e => setNewListName(e.target.value)}
                placeholder={`Enter name for your new ${newListType.replace('List', '').toLowerCase()} list...`}
                className="w-full px-6 py-4 bg-yellow-50 border border-yellow-200 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-200"
                autoFocus
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                disabled={!newListName.trim()}
                className="px-8 py-4 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transform hover:-translate-y-0.5 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setShowNewListInput(false);
                  setNewListName('');
                }}
                className="px-6 py-4 bg-yellow-100 text-gray-800 font-semibold rounded-xl hover:bg-yellow-200 transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Wishlists Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {wishlists.map((list, index) => {
          const IconComponent = getListIcon(list.list_type);
          // 4. Calculate itemCount based on the actual list type data structure
          // If list.items is defined, use it, otherwise fall back to list.restaurants (for older data structures)
          const itemCount =
            (list.items?.length ?? list.restaurants?.length) || 0;

          return (
            <div
              key={list._id}
              onClick={() => setSelectedListId(list._id)}
              className={`group relative bg-gradient-to-br ${getGradientClass(index)} rounded-2xl p-5 cursor-pointer transform hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-2xl border border-yellow-200/50`}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-yellow-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon and Arrow */}
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 border border-yellow-200/30">
                    <IconComponent
                      className="w-7 h-7 text-brown"
                      strokeWidth={1.5}
                    />
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-brown group-hover:translate-x-1 transition-all duration-300" />
                </div>

                {/* List Info */}
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors duration-200 line-clamp-2">
                    {list.name}
                  </h3>

                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/70 backdrop-blur-sm rounded-full text-sm font-medium text-brown capitalize border border-yellow-200/50">
                      <Star
                        className="w-3.5 h-3.5 text-yellow-500"
                        fill="currentColor"
                      />
                      {list.list_type?.replace('List', '') || 'Custom'} List
                    </span>

                    <span className="text-lg font-bold text-gray-800 group-hover:text-gray-900 transition-colors duration-200">
                      {itemCount}
                      <span className="text-sm font-medium text-gray-600 ml-1">
                        {itemCount === 1 ? 'item' : 'items'}
                      </span>
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4 pt-4 border-t border-yellow-300/40">
                  <div className="flex items-center gap-2">
                    <div className="flex-grow bg-yellow-200/40 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min((itemCount / 10) * 100, 100)}%`,
                        }}
                      />
                    </div>
                    <span className="text-xs font-medium text-brown">
                      {Math.min(itemCount, 10)}/10
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Stats Footer */}
      {wishlists.length > 0 && (
        <div className="mt-12 p-6 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl border border-yellow-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-2xl font-bold text-gray-800">
                {wishlists.length}{' '}
                {wishlists.length === 1 ? 'Wishlist' : 'Wishlists'}
              </p>
              <p className="text-gray-600">
                {wishlists.reduce(
                  (total, list) =>
                    total +
                    ((list.items?.length ?? list.restaurants?.length) || 0),
                  0
                )}{' '}
                total items saved
              </p>
            </div>
            <div className="flex items-center gap-2 text-brown">
              <Heart className="w-5 h-5 text-red-400" fill="currentColor" />
              <span className="text-sm font-medium">
                Keep exploring and saving!
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WishlistSelectionView;
