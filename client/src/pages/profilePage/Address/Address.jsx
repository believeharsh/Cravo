import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAddressActions } from '../../../hooks/useAddressActions';
import AddressModal from '../../../components/modules/address/AddressModal';
import AddressCard from './components/AddressCard';
import AddressDeleteConfirmationModal from '../../../components/modules/address/AddressDeleteConfirmationModal';

const AddressPage = () => {
  const { isAddressModalOpen, isDeleteAddressModalOpen } = useSelector(
    state => state.ui.address
  );

  const {
    list: userAddresses,
    loading,
    error,
  } = useSelector(state => state.address);

  const { handleOpenAddressModal, handleOpenDeleteAddressModal } =
    useAddressActions();

  const [currentAddress, setCurrentAddress] = useState(null);

  const handleOpenEditModal = address => {
    setCurrentAddress(address);
    handleOpenAddressModal();
  }; // Conditionally render based on loading and error states

  if (loading === 'pending') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        {' '}
        <p className="text-xl text-gray-700">
          Loading addresses...        {' '}
        </p>{' '}
      </div>
    );
  }

  if (loading === 'failed' && error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-xl text-red-500">Error: {error}</p>     {' '}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Your Addresses
          </h1>

          <button
            onClick={() => {
              setCurrentAddress(null); // Clear current address for 'Add' flow
              handleOpenAddressModal();
            }}
            className="px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition-colors cursor-pointer"
          >
            Add New Address
          </button>
        </div>

        {userAddresses.length === 0 ? (
          <div className="text-center p-8 bg-white rounded-xl shadow-md">
            <p className="text-xl text-gray-500">
              You have no saved addresses yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
