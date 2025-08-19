import React from 'react';
import Icon from '../../../components/ui/Icon';
import Button from '../../../components/ui/Button';
import PaymentMethodCard from './PaymentMethodCard';

/**
 * Renders the section for selecting a payment method.
 *
 * @param {object} props - Component props.
 * @param {Array<object>} props.paymentMethods - An array of payment method objects.
 * @param {number} props.selectedPayment - The index of the currently selected payment method.
 * @param {function(number): void} props.setSelectedPayment - Function to set the selected payment method index.
 * @returns {JSX.Element} The PaymentMethodSection component.
 */

const PaymentMethodSection = ({
  paymentMethods,
  selectedPayment,
  setSelectedPayment,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-cream p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
          <Icon name="credit-card" className="w-5 h-5 text-yellow-600" />
        </div>
        <h3 className="text-lg font-semibold text-charcoal">Payment Method</h3>
      </div>

      <div className="space-y-3">
        {paymentMethods.map((method, index) => (
          <PaymentMethodCard
            key={method.id}
            method={method}
            isSelected={selectedPayment === index}
            onClick={() => setSelectedPayment(index)}
          />
        ))}

        <Button
          className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl text-medium-gray hover:border-yellow-400 hover:text-yellow-600 transition-colors flex items-center justify-center gap-2"
          type="button"
        >
          <Icon name="plus" className="w-4 h-4" />
          Add Payment Method
        </Button>
      </div>
    </div>
  );
};

export default PaymentMethodSection;
