import React from 'react';
import Icon from '../../../components/ui/Icon';
import Button from '../../../components/ui/Button';

/**
 * Renders a card for a single payment method.
 *
 * @param {object} props - Component props.
 * @param {object} props.method - The payment method object to display.
 * @param {boolean} props.isSelected - True if this payment method is currently selected.
 * @param {function(): void} props.onClick - Function to call when the card is clicked.
 * @returns {JSX.Element} The PaymentMethodCard component.
 */
const PaymentMethodCard = ({ method, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-xl border cursor-pointer transition-all ${
        isSelected
          ? 'border-yellow-400 bg-yellow-50'
          : 'border-cream hover:border-gray-300'
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
            isSelected ? 'bg-yellow-400' : 'bg-gray-100'
          }`}
        >
          {/* Note: Icons for payment methods might be specific,
              you might want to use a different icon mapping logic here
              if 'credit-card' isn't always appropriate. */}
          <Icon
            name={method.icon}
            className={`w-4 h-4 ${
              isSelected ? 'text-white' : 'text-medium-gray'
            }`}
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-charcoal">{method.type}</span>
            {method.isDefault && (
              <span className="px-2 py-0.5 bg-mint-green text-white text-xs rounded-full">
                Default
              </span>
            )}
          </div>
          <p className="text-sm text-medium-gray">{method.details}</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodCard;
