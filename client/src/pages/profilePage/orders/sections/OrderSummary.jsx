import React from 'react';
import {
  ShoppingCart,
  XCircle,
  Navigation,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

const OrderSummary = ({
  order,
  status,
  onReorder,
  onCancel,
  onTrack,
  onToggleExpand,
  isExpanded,
  formatDate,
  formatETA,
}) => {
  return (
    <div className="p-6">
      <div className="flex items-start gap-4">
        <img
          src={order.restaurant.image}
          alt={order.restaurant.name}
          className="w-20 h-20 rounded-xl object-cover"
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900">
                {order.restaurant.name}
              </h3>
              <p className="text-sm text-gray-500 mt-0.5">
                {formatDate(order.orderDate)}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Order ID: {order.orderId}
              </p>

              <div className="flex items-center gap-3 mt-3">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${status.color}`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${status.dotColor}`}
                  ></span>
                  {status.label}
                </span>

                {order.estimatedDelivery && order.status !== 'delivered' && (
                  <span className="text-xs text-yellow-600 font-medium">
                    ETA: {formatETA(order.estimatedDelivery)}
                  </span>
                )}
              </div>

              {order.status === 'cancelled' && order.cancellationReason && (
                <p className="text-xs text-red-600 mt-2">
                  Reason: {order.cancellationReason}
                </p>
              )}
            </div>

            <div className="text-right">
              <p className="text-xl font-bold text-gray-900">
                ₹{order.total.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {order.items.length} items
              </p>
              <p className="text-xs text-green-600 font-medium mt-1">
                {order.paymentStatus}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 mt-4">
            {order.canReorder && (
              <button
                onClick={() => onReorder(order)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-lg font-semibold transition-colors text-sm"
              >
                <ShoppingCart className="w-4 h-4" />
                Reorder
              </button>
            )}

            {['preparing', 'on_the_way'].includes(order.status) &&
              order.canCancel && (
                <button
                  onClick={() => onCancel(order.id)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg font-semibold transition-colors text-sm"
                >
                  <XCircle className="w-4 h-4" />
                  Cancel
                </button>
              )}

            {['preparing', 'on_the_way'].includes(order.status) && (
              <button
                onClick={() => onTrack(order)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg font-semibold transition-colors text-sm"
              >
                <Navigation className="w-4 h-4" />
                Track
              </button>
            )}

            <button
              onClick={onToggleExpand}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg font-semibold transition-colors text-sm"
            >
              {isExpanded ? 'Hide' : 'View'} Details
              {isExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
