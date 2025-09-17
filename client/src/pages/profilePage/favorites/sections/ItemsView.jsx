import React from 'react';
import Icon from '../../../../components/ui/Icon';

import ProductGridCard from '../components/ProductGridCard';
import RestaurantGridCard from '../components/RestaurantGridCard';
import ProductListCard from '../components/ProductListCard';
import RestaurantListCard from '../components/RestaurantListCard';

const ItemsView = ({
  selectedList,
  viewMode,
  setViewMode,
  handleRemoveFromFavorites,
  handleAddToCart,
}) => {
  const items = selectedList.items;

  if (!items || items.length === 0) {
    return (
      <div className="text-center text-gray-500 font-medium p-8">
        This list is currently empty.
      </div>
    );
  }

  let CardComponent;
  if (viewMode === 'grid') {
    CardComponent =
      selectedList.list_type === 'productList'
        ? ProductGridCard
        : RestaurantGridCard;
  } else {
    CardComponent =
      selectedList.list_type === 'productList'
        ? ProductListCard
        : RestaurantListCard;
  }

  const listContainerClass =
    viewMode === 'grid'
      ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
      : 'space-y-4';

  return (
    <>
      <div className="flex items-center justify-between bg-white rounded-2xl shadow-lg border border-cream p-4">
        <p className="text-sm text-medium-gray">
          Showing {items.length || 0}{' '}
          {selectedList.list_type === 'productList'
            ? 'products'
            : 'restaurants'}
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-mint-green text-white' : 'bg-gray-100 text-charcoal hover:bg-gray-200'}`}
          >
            <Icon name="between-horizontal-end" className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-mint-green text-white' : 'bg-gray-100 text-charcoal hover:bg-gray-200'}`}
          >
            <Icon name="grid3x2" className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className={listContainerClass}>
        {items.map(item => (
          <CardComponent
            key={item._id}
            item={item}
            list={selectedList}
            listId={selectedList._id}
          />
        ))}
      </div>
    </>
  );
};

export default ItemsView;
