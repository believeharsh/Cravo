import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Icon from '../../ui/Icon';
// import { selectAllWishlists } from '../../../features/wishlist/wishlistSelectors';
import { useFavoriteActions } from '../../../hooks/useWishlistActions';

const WishlistModal = ({ isOpen, onClose, onListSelect, onNewListCreate }) => {
  const { lists } = useFavoriteActions();
  const [isCreatingNewList, setIsCreatingNewList] = useState(false);
  const [newListName, setNewListName] = useState('');

  const handleCreateList = () => {
    if (newListName.trim()) {
      onNewListCreate(newListName);
      setNewListName('');
      setIsCreatingNewList(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-500 ease-in-out transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-40"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="absolute right-0 top-0 h-full w-full sm:w-96 bg-gray-100 shadow-2xl flex flex-col p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-charcoal">Your Wishlists</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-charcoal transition-colors"
          >
            <Icon name="x-circle" className="w-6 h-6" />
          </button>
        </div>

        {/* Existing Lists */}
        <div className="flex-grow overflow-y-auto mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Select a list
          </h3>
          <div className="space-y-3">
            {allWishlists.map(list => (
              <button
                key={list._id}
                onClick={() => onListSelect(list._id)}
                className="w-full text-left flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center space-x-3">
                  <Icon
                    name={
                      list.list_type === 'productList' ? 'box' : 'restaurant'
                    }
                    className="w-5 h-5 text-gray-600"
                  />
                  <span className="text-base font-medium text-gray-900 line-clamp-1">
                    {list.name}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  {list.items.length} items
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Create New List Section */}
        <div className="border-t border-gray-200 pt-6">
          {!isCreatingNewList ? (
            <button
              onClick={() => setIsCreatingNewList(true)}
              className="w-full flex items-center justify-center space-x-2 py-3 bg-yellow-400 text-charcoal font-semibold rounded-xl hover:bg-yellow-500 transition-colors"
            >
              <Icon name="plus" className="w-5 h-5" />
              <span>Create New List</span>
            </button>
          ) : (
            <div className="flex items-center space-x-3">
              <input
                type="text"
                value={newListName}
                onChange={e => setNewListName(e.target.value)}
                placeholder="New list name"
                className="flex-grow p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 text-base"
                onKeyDown={e => {
                  if (e.key === 'Enter') handleCreateList();
                }}
              />
              <button
                onClick={handleCreateList}
                className="bg-charcoal text-white rounded-full p-3 hover:bg-gray-800 transition-colors"
              >
                <Icon name="check" className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WishlistModal;
