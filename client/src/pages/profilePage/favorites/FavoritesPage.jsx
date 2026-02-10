import React, { useEffect, useState } from 'react';

import Icon from '../../../components/ui/Icon';
import { useFavoriteActions } from '../../../hooks/useWishlistActions';
import ItemsView from './sections/ItemsView';
// Imports of the section components
import WishlistSelectionView from './sections/WishlistSelectionView';

const FavoritesPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedListId, setSelectedListId] = useState(null);

  const { lists, loading } = useFavoriteActions();

  const selectedList = lists.find(list => list._id === selectedListId);

  return (
    <div className="bg-cream min-h-screen py-2">
      <div className="mx-auto max-w-7xl space-y-2 px-4 sm:px-6 lg:px-8">
        <header className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div className="flex items-center gap-4">
            <div className="bg-mint-green/20 flex h-16 w-16 items-center justify-center rounded-full">
              <Icon name="heart" className="text-mint-green h-8 w-8" />
            </div>
            <div>
              <h1 className="text-text-main mb-2 text-4xl font-bold">
                {selectedList && `Items in "${selectedList.name}"`}
              </h1>
            </div>
          </div>
          {selectedListId && (
            <button
              onClick={() => setSelectedListId(null)}
              className="text-charcoal flex cursor-pointer items-center gap-2 font-medium transition-colors hover:text-yellow-400"
            >
              <Icon name="arrow-left" className="h-5 w-5" /> Back to lists
            </button>
          )}
        </header>

        {selectedListId ? (
          <ItemsView
            selectedList={selectedList}
            viewMode={viewMode}
            setViewMode={setViewMode}
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
