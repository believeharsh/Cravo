import React from 'react';
import Icon from '../../../../components/ui/Icon';

const WishlistSelectionView = ({ wishlists, setSelectedListId }) => {
  if (!wishlists || wishlists.length === 0) {
    return (
      <div className="text-center text-gray-500 font-medium p-8">
        You don't have any wishlists yet.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {wishlists.map(list => (
        <div
          key={list._id}
          onClick={() => setSelectedListId(list._id)}
          className="bg-white rounded-2xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <div className="flex items-center gap-4 mb-2">
            <span className="w-12 h-12 flex-shrink-0 rounded-full bg-mint-green/20 flex items-center justify-center">
              <Icon
                name={
                  list.list_type === 'productList'
                    ? 'shopping-bag'
                    : 'restaurant'
                }
                className="w-6 h-6 text-mint-green"
              />
            </span>
            <div className="min-w-0">
              <h3 className="text-xl font-bold text-charcoal line-clamp-1">
                {list.name}
              </h3>
              <p className="text-sm text-medium-gray mt-1 capitalize">
                {list.list_type.replace('List', '')} Wishlist
              </p>
            </div>
          </div>
          <p className="text-sm text-coffee mt-3 font-medium">
            {list.items?.length || 0} items
          </p>
        </div>
      ))}
    </div>
  );
};

export default WishlistSelectionView;
