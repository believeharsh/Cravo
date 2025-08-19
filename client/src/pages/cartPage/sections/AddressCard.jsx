import React from 'react';
import Icon from '../../../components/ui/Icon';
import Button from '../../../components/ui/Button';

/**
 * Renders a card for a single delivery address.
 *
 * @param {object} props - Component props.
 * @param {object} props.address - The address object to display.
 * @param {boolean} props.isSelected - True if this address is currently selected.
 * @param {function(): void} props.onClick - Function to call when the card is clicked.
 * @returns {JSX.Element} The AddressCard component.
 */

const AddressCard = ({ address, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-xl border cursor-pointer transition-all ${
        isSelected
          ? 'border-yellow-400 bg-yellow-50'
          : 'border-cream hover:border-gray-300'
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
            isSelected ? 'bg-yellow-400' : 'bg-gray-100'
          }`}
        >
          <Icon
            name={address.icon}
            className={`w-4 h-4 ${
              isSelected ? 'text-white' : 'text-medium-gray'
            }`}
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-charcoal">{address.type}</span>
            {address.isDefault && (
              <span className="px-2 py-0.5 bg-mint-green text-white text-xs rounded-full">
                Default
              </span>
            )}
          </div>
          <p className="text-sm text-charcoal">{address.address}</p>
          <p className="text-sm text-medium-gray">{address.city}</p>
          {address.landmark && (
            <p className="text-xs text-medium-gray mt-1">{address.landmark}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressCard;
