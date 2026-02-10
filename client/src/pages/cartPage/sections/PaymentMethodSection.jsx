import React from 'react';
import PaymentMethodCard from './PaymentMethodCard';
const PaymentMethodSection = ({
  paymentMethods,
  selectedPayment,
  setSelectedPayment,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-3">
      <h2 className="text-lg font-bold text-text-main mb-2">Payment Method</h2>
      <div className="flex flex-wrap gap-2">
        {paymentMethods.map(payment => (
          <PaymentMethodCard
            key={payment.id}
            payment={payment}
            isSelected={selectedPayment === payment.id}
            onSelect={setSelectedPayment}
          />
        ))}
      </div>
    </div>
  );
};

export default PaymentMethodSection;
