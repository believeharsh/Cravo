import React from 'react';
import OrderSummary from '../sections/OrderSummary';
import OrderDetails from '../sections/OrderDetails';

const OrderCard = ({
  order,
  status,
  isExpanded,
  onToggleExpand,
  onReorder,
  onCancel,
  onTrack,
  formatDate,
  formatETA,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
      <OrderSummary
        order={order}
        status={status}
        onReorder={onReorder}
        onCancel={onCancel}
        onTrack={onTrack}
        onToggleExpand={onToggleExpand}
        isExpanded={isExpanded}
        formatDate={formatDate}
        formatETA={formatETA}
      />

      {isExpanded && <OrderDetails order={order} />}
    </div>
  );
};

export default OrderCard;
