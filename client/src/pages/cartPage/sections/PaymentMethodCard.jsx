import React from 'react';
import Icon from '../../../components/ui/Icon';

const PaymentMethodCard = ({ payment, isSelected, onSelect }) => {
  return (
    <button
      onClick={() => onSelect(payment.id)}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-all duration-200 cursor-pointer ${
        isSelected
          ? 'bg-yellow-100 border-border-focus text-yellow-700'
          : 'bg-bg-subtle border-gray-300 text-text-secondary hover:bg-gray-100'
      }`}
    >
      <Icon name={payment.icon} className="w-4 h-4" />
      {payment.type}
    </button>
  );
};

export default PaymentMethodCard;
