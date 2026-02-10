import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../ui/Icon';
import { useFavoriteActions } from '../../../hooks/useWishlistActions';
import { closeWishlistModal } from '../../../features/ui/uiSlice';
import { selectDefaultProductListId } from '../../../features/wishList/wishListSelectors';

const WishlistModal = ({ productId }) => {
  const dispatch = useDispatch();
  const { lists, handleCreateNewProductList, handleTransferProductFromList } =
    useFavoriteActions();

  const { isWishlistModalOpen: isOpen, modalProps } = useSelector(
    state => state.ui.wishlist
  );

  const defaultListId = useSelector(selectDefaultProductListId);

  const [isCreatingNewList, setIsCreatingNewList] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [selectedListId, setSelectedListId] = useState(defaultListId);
  const [isTranfering, setIsTransfering] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Setting the initial selected list ID from the payload, if it exists
      if (modalProps && modalProps.sourceListId) {
        setSelectedListId(modalProps.sourceListId);
      }
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, defaultListId, modalProps]);

  const handleCreateListClick = () => {
    if (newListName.trim()) {
      handleCreateNewProductList({ listName: newListName });
      setNewListName('');
      setIsCreatingNewList(false);
    }
  };

  const handleMoveProductClick = async () => {
    setIsTransfering(true);
    if (selectedListId && selectedListId !== defaultListId) {
      try {
        await handleTransferProductFromList({
          productId: modalProps?.productId,
          sourceListId: modalProps?.sourceListId,
          destinationListId: selectedListId,
        });
      } finally {
        setIsTransfering(false);
      }
    } else {
      setIsTransfering(false);
    }
  };

  const renderContent = () => {
    return (
      <>
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-text-main">Your Wishlists</h2>
          <button
            onClick={() => dispatch(closeWishlistModal())}
            className="text-gray-400 hover:text-text-main transition-colors duration-200 cursor-pointer"
            aria-label="Close"
          >
            <Icon name="x-circle" className="w-5 h-5" />
          </button>
        </div>

        {/* Existing Lists */}
        <div className="flex-grow overflow-y-auto mb-4 custom-scrollbar">
          <h3 className="text-sm font-semibold text-text-main mb-2">
            Select a list to move the product to
          </h3>
          <div className="space-y-2">
            {lists.map(
              list =>
                list.list_type === 'productList' && (
                  <button
                    key={list._id}
                    onClick={() => setSelectedListId(list._id)}
                    className={`w-full text-left flex items-center justify-between py-2 px-3 rounded-lg shadow-sm transition-all duration-200 cursor-pointer
                  ${
                    selectedListId === list._id
                      ? 'bg-primary text-text-main shadow-md'
                      : 'bg-white hover:bg-bg-subtle'
                  }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Icon
                        name={
                          list.list_type === 'productList'
                            ? 'shopping-bag'
                            : 'coffee'
                        }
                        className="w-4 h-4"
                      />
                      <span className="text-sm font-medium line-clamp-1">
                        {list.name}
                      </span>
                    </div>
                    <span className="text-xs">{list.items?.length}</span>
                  </button>
                )
            )}
          </div>
        </div>

        {/* Create New List Section */}
        <div className="border-t border-border pt-4">
          {!isCreatingNewList ? (
            <button
              onClick={() => setIsCreatingNewList(true)}
              className="w-full cursor-pointer flex items-center justify-center space-x-2 py-2 bg-gray-200 text-text-main font-semibold rounded-lg hover:bg-gray-300 transition-colors text-sm"
            >
              <Icon name="plus" className="w-4 h-4" />
              <span>Create New List</span>
            </button>
          ) : (
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={newListName}
                onChange={e => setNewListName(e.target.value)}
                placeholder="New list name"
                className="flex-grow py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
                onKeyDown={e => {
                  if (e.key === 'Enter') handleCreateListClick();
                }}
              />
              <button
                disabled={newListName == ''}
                onClick={handleCreateListClick}
                className="bg-primary text-text-main rounded-full p-2 hover:bg-primary-hover transition-colors"
              >
                <Icon name="check" className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        <button
          onClick={handleMoveProductClick}
          className={`w-full py-2 mt-4 text-center rounded-lg font-semibold transition-colors text-sm cursor-pointer
    ${
      selectedListId === defaultListId
        ? 'bg-gray-400 text-text-secondary cursor-not-allowed'
        : 'bg-primary text-text-main hover:bg-primary-hover'
    }`}
          disabled={selectedListId === defaultListId || isTranfering}
        >
          {isTranfering
            ? 'Adding product in selected list...'
            : 'Move to Selected List'}
        </button>
      </>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-end p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-gray-200 opacity-20"
            onClick={() => dispatch(closeWishlistModal())}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4 }}
            className="relative h-full w-full max-w-sm bg-white rounded-2xl shadow-2xl flex flex-col p-6"
          >
            {renderContent()}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WishlistModal;
