import React from 'react';
import { useSelector } from 'react-redux';
import { useAddressActions } from '../../../hooks/useAddressActions';

const AddressDeleteConfirmationModal = () => {
  const { deleteAddressID } = useSelector(state => state.ui.address);
  console.log(deleteAddressID);
  const { handleCloseDeleteAddressModal, handleDeleteAddress } =
    useAddressActions();

  return (
    <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Confirm Deletion
        </h2>
        <p className="text-gray-700 mb-6">
          Are you sure you want to delete this address This action cannot be
          undone.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleCloseDeleteAddressModal}
            className="px-6 py-3 text-gray-800 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => handleDeleteAddress(deleteAddressID)}
            className="px-6 py-3 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressDeleteConfirmationModal;
