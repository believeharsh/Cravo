import React from 'react';
import Icon from '../../../components/ui/Icon'; 
import Button from '../../../components/ui/Button'; 
import AddressCard from './AddressCard'; 

/**
 * Renders the section for selecting a delivery address.
 *
 * @param {object} props - Component props.
 * @param {Array<object>} props.addresses - An array of address objects.
 * @param {number} props.selectedAddress - The index of the currently selected address.
 * @param {function(number): void} props.setSelectedAddress - Function to set the selected address index.
 * @returns {JSX.Element} The DeliveryAddressSection component.
 */


const DeliveryAddressSection = ({ addresses, selectedAddress, setSelectedAddress }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-cream p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
          <Icon name="map-pin" className="w-5 h-5 text-yellow-600" />
        </div>
        <h3 className="text-lg font-semibold text-charcoal">
          Delivery Address
        </h3>
      </div>

      <div className="space-y-3">
        {addresses.map((address, index) => (
          <AddressCard
            key={address.id}
            address={address}
            isSelected={selectedAddress === index}
            onClick={() => setSelectedAddress(index)}
          />
        ))}

        <Button
          className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl text-medium-gray hover:border-yellow-400 hover:text-yellow-600 transition-colors flex items-center justify-center gap-2"
          type="button" // Important: Ensure this is a button type
        >
          <Icon name="plus" className="w-4 h-4" />
          Add New Address
        </Button>
      </div>
    </div>
  );
};

export default DeliveryAddressSection;