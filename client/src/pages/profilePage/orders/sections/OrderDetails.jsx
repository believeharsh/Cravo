import React from 'react';
import OrderItemsList from '../components/OrderItemsList';
import BillSummary from '../components/BillSummary';
import DeliveryInfo from '../components/DeliveryInfo';

const OrderDetails = ({ order }) => {
  return (
    <div className="border-t border-gray-200 bg-gray-50 p-6 space-y-6">
      <OrderItemsList items={order.items} />

      <BillSummary
        subtotal={order.subtotal}
        deliveryFee={order.deliveryFee}
        tax={order.tax}
        discount={order.discount}
        total={order.total}
        paymentMethod={order.paymentMethod}
      />

      <DeliveryInfo
        address={order.deliveryAddress}
        instructions={order.deliveryInstructions}
        driver={order.driver}
      />
    </div>
  );
};

export default OrderDetails;
