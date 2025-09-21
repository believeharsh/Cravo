import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useCartActions } from '../../../hooks/useCartActions';

const ItemDeleteConfirmation = () => {
  const { handleDeleteItemFromCart, handleCloseDeleteModal } = useCartActions();
  const { isDeleteModalOpen, modalProps } = useSelector(state => state.ui.cart);
  const itemName = modalProps.itemName;
  const itemId = modalProps.itemId;

  return (
    <AnimatePresence>
      {isDeleteModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Background overlay */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={handleCloseDeleteModal}
          />

          {/* Modal container */}
          <motion.div
            initial={{ y: 20, scale: 0.95, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 20, scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-sm p-8 bg-white rounded-xl shadow-2xl"
          >
            {/* Modal content */}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800">
                Confirm Deletion
              </h3>
              <p className="mt-4 text-sm text-gray-600">
                Are you sure you want to delete{' '}
                <span className="font-semibold text-gray-900">{itemName}</span>{' '}
                from your cart?
              </p>
            </div>

            {/* Action buttons */}
            <div className="mt-8 flex justify-end space-x-3">
              <button
                onClick={handleCloseDeleteModal}
                className="px-5 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteItemFromCart({ itemId, itemName })}
                className="px-5 py-2 text-sm font-medium text-black bg-yellow-500 rounded-lg hover:bg-yellow-600 transition-colors cursor-pointer"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ItemDeleteConfirmation;
