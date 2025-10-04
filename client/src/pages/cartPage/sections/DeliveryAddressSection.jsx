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
        <h2 className="text-xl font-bold text-gray-800 mb-3">
          Delivery Details
        </h2>
        <button
          className="text-xs font-bold bg-yellow-400 hover:bg-yellow-500 cursor-pointer p-2 rounded-full"
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
            onClick={() => setSelectedAddress(addr.id)}
            className={`p-3 rounded-xl cursor-pointer transition-all duration-200 ${selectedAddress === addr.id ? 'bg-yellow-50 border-2 border-yellow-400' : 'bg-gray-50 border border-transparent hover:bg-gray-100'}`}
          >
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow">
                <Icon name={addr.icon} className="w-4 h-4 text-gray-600" />
              </div>
              <div className="flex-grow">
                <p className="font-semibold text-gray-800">{addr.type}</p>
                <p className="text-sm text-gray-500">
                  {addr.address}, {addr.city}
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
