import React from 'react';

import BillSummary from '../components/BillSummary';
import DeliveryInfo from '../components/DeliveryInfo';
import OrderItemsList from '../components/OrderItemsList';

const OrderDetails = ({ order }) => {
  return (
    <div className="border-border bg-bg-subtle space-y-6 border-t p-6">
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
