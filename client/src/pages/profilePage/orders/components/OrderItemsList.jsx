import React from 'react';

const OrderItemsList = ({ items }) => {
  return (
    <div>
      <h4 className="font-semibold text-text-main mb-3">Order Items</h4>
      <div className="space-y-3">
        {items.map(item => (
          <div
            key={item.id}
            className="flex items-center gap-3 bg-white rounded-lg p-3"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-14 h-14 rounded-lg object-cover"
            />
            <div className="flex-1">
              <p className="font-medium text-text-main">
                {item.quantity}× {item.name}
              </p>
              {item.customizations.length > 0 && (
                <p className="text-xs text-text-muted mt-0.5">
                  {item.customizations.join(', ')}
                </p>
              )}
            </div>
            <p className="font-semibold text-text-main">
              ₹{(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderItemsList;
