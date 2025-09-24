import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAddressActions } from '../../../hooks/useAddressActions';
import AddressModal from '../../../components/modules/address/AddressModal';
import AddressCard from './components/AddressCard';
import AddressDeleteConfirmationModal from '../../../components/modules/address/AddressDeleteConfirmationModal';

import Icon from '../../../components/ui/Icon';

const AddressPage = () => {
  const { isAddressModalOpen, isDeleteAddressModalOpen } = useSelector(
    state => state.ui.address
  );

  const {
    list: userAddresses,
    loading,
    error,
  } = useSelector(state => state.address);

  const { handleOpenAddressModal } = useAddressActions();

  const [currentAddress, setCurrentAddress] = useState(null);

  const handleOpenEditModal = address => {
    setCurrentAddress(address);
    handleOpenAddressModal();
  };

  // Conditionally render based on loading and error states
  if (loading === 'pending') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-xl font-medium text-gray-700 animate-pulse">
          Loading addresses...
        </p>
      </div>
    );
  }

  if (loading === 'failed' && error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-xl text-red-500 font-medium">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen  text-gray-800 py-2 rounded-xl">
      <div className="md:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-3">
            <Icon name="home" className="h-9 w-9 text-gray-700" />
            <h1 className="text-4xl font-extrabold text-gray-800">
              Your Addresses
            </h1>
          </div>
          <button
            onClick={() => {
              setCurrentAddress(null);
              handleOpenAddressModal();
            }}
            className="cursor-pointer px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg shadow-lg hover:bg-yellow-600 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75"
          >
            New
          </button>
        </div>

        {userAddresses.length === 0 ? (
          <div className="text-center p-12 bg-white rounded-xl shadow-md border border-gray-200">
            <p className="text-xl text-gray-500 font-light">
              You haven't saved any addresses yet. Add one to get started!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userAddresses.map(address => (
              <AddressCard
                key={address._id}
                address={address}
                onEdit={handleOpenEditModal}
              />
            ))}
          </div>
        )}
      </div>

      {isAddressModalOpen && <AddressModal initialData={currentAddress} />}
      {isDeleteAddressModalOpen && <AddressDeleteConfirmationModal />}
    </div>
  );
};

export default AddressPage;
