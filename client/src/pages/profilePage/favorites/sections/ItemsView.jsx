import React from 'react';

import RestaurantCard from '../../../../components/shared/RestaurantCard';
import Icon from '../../../../components/ui/Icon';
import ProductGridCard from '../components/ProductGridCard';
import ProductListCard from '../components/ProductListCard';
import RestaurantGridCard from '../components/RestaurantGridCard';
import RestaurantListCard from '../components/RestaurantListCard';

const ItemsView = ({ selectedList, viewMode, setViewMode }) => {
  const productListItems = selectedList.items;
  const restaurantListItems = selectedList.restaurants;

  // Determine the actual list of items based on the list_type
  const activeItems =
    selectedList.list_type === 'productList'
      ? productListItems
      : restaurantListItems;

  // Now, check only the active list
  if (!activeItems || activeItems.length === 0) {
    return (
      <div className="text-text-muted p-8 text-center font-medium">
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
      selectedList.list_type === 'restaurantList'
        ? RestaurantListCard
        : ProductListCard;
  }

  const listContainerClass =
    viewMode === 'grid'
      ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
      : 'space-y-10';

  return (
    <>
      <div className="border-cream flex items-center justify-between rounded-2xl border bg-white p-4 shadow-lg">
        <p className="text-medium-gray text-sm">
          {selectedList.list_type === 'productList'
            ? `Showing ${productListItems.length || 0} items`
            : `Showing ${restaurantListItems.length || 0} restaurants`}
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`rounded-lg p-2 transition-colors ${viewMode === 'grid' ? 'bg-mint-green text-white' : 'text-charcoal bg-gray-100 hover:bg-gray-200'}`}
          >
            <Icon name="between-horizontal-end" className="h-5 w-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`rounded-lg p-2 transition-colors ${viewMode === 'list' ? 'bg-mint-green text-white' : 'text-charcoal bg-gray-100 hover:bg-gray-200'}`}
          >
            <Icon name="grid3x2" className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className={listContainerClass}>
        {selectedList.list_type === 'productList'
          ? productListItems.map(item => (
              <CardComponent
                key={item._id}
                item={item}
                list={selectedList}
                listId={selectedList._id}
              />
            ))
          : restaurantListItems.map(item => (
              <CardComponent
                key={item._id}
                item={item}
                list={selectedList}
                listId={selectedList}
              />
            ))}
      </div>
    </>
  );
};

export default ItemsView;
