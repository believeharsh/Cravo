import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllWishlists } from '../../../features/wishList/wishListSlice';
import Icon from '../../../components/ui/Icon';

// Import the new section components
import WishlistSelectionView from './sections/WishlistSelectionView';
import ItemsView from './sections/ItemsView';
import { useFavoriteActions } from '../../../hooks/useWishlistActions';

const FavoritesPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedListId, setSelectedListId] = useState(null);

  const { lists, loading } = useFavoriteActions();

  const selectedList = lists.find(list => list._id === selectedListId);
  console.log(selectedList);
  const handleRemoveFromFavorites = itemId =>
    console.log(`Removing item with ID: ${itemId}`);
  const handleAddToCart = item => console.log(`Adding ${item.name} to cart`);

  return (
    <div className="bg-cream min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-mint-green/20 flex items-center justify-center">
              <Icon name="heart" className="w-8 h-8 text-mint-green" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-charcoal tracking-tight">
                {selectedList
                  ? `Items in "${selectedList.name}"`
                  : 'My Favorites'}
              </h1>
              <p className="text-sm text-medium-gray mt-1">
                Organize and manage your favorite items and restaurants.
              </p>
            </div>
          </div>
          {selectedListId && (
            <button
              onClick={() => setSelectedListId(null)}
              className="flex items-center gap-2 text-charcoal hover:text-yellow-400 transition-colors font-medium"
            >
              <Icon name="arrow-left" className="w-5 h-5" /> Back to lists
            </button>
          )}
        </header>

        {selectedListId ? (
          <ItemsView
            selectedList={selectedList}
            viewMode={viewMode}
            setViewMode={setViewMode}
            handleRemoveFromFavorites={handleRemoveFromFavorites}
            handleAddToCart={handleAddToCart}
          />
        ) : (
          <WishlistSelectionView
            wishlists={lists}
            setSelectedListId={setSelectedListId}
          />
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
