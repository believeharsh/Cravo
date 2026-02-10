import React from 'react';
import Icon from '../../../components/ui/Icon';
import Button from '../../../components/ui/Button';
import { useAddressActions } from '../../../hooks/useAddressActions';
import { useSelector } from 'react-redux';
import AddressModal from '../../../components/modules/address/AddressModal';

const DeliveryAddressSection = ({
  addresses,
  selectedAddress,
  setSelectedAddress,
}) => {
  const { isAddressModalOpen, isDeleteAddressModalOpen } = useSelector(
    state => state.ui.address
  );
  const { handleOpenAddressModal } = useAddressActions();

  return (
    <div className="bg-white rounded-3xl shadow-lg p-4">
      <div className="flex justify-between items-center pb-1">
        <h2 className="text-xl font-bold text-text-main mb-3">
          Delivery Details
        </h2>
        <button
          className="text-xs font-bold bg-primary hover:bg-primary-hover cursor-pointer p-2 rounded-full"
          onClick={() => {
            handleOpenAddressModal();
          }}
        >
          <Icon name="plus" />
        </button>
      </div>

      <div className="space-y-3">
        {addresses.map(addr => (
          <div
            key={addr.id}
            onClick={() => setSelectedAddress(addr._id)}
            className={`p-3 rounded-xl cursor-pointer transition-all duration-200 ${selectedAddress === addr._id ? 'bg-yellow-50 border-2 border-border-focus' : 'bg-bg-subtle border border-transparent hover:bg-gray-100'}`}
          >
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow">
                {addr.addressType === 'home' ? (
                  <Icon name="home" className="w-4 h-4 text-text-secondary" />
                ) : (
                  <Icon name="building" className="w-4 h-4 text-text-secondary" />
                )}
              </div>
              <div className="flex-grow">
                <p className="font-semibold text-text-main">
                  {addr.addressType}
                </p>
                <p className="text-sm text-text-muted">
                  {addr.addressLine1}, {addr.addressLine2},
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {isAddressModalOpen && <AddressModal />}
    </div>
  );
};

export default DeliveryAddressSection;
