import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Search,
  Calendar,
  ChevronDown,
  ChevronUp,
  MapPin,
  Phone,
  Clock,
  ShoppingCart,
  XCircle,
  Navigation,
  Receipt,
  Package,
} from 'lucide-react';

const Orders = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedOrder, setExpandedOrder] = useState(null);

  // Get orders from Redux store - adjust the path according to your store structure
  const userOrders = useSelector(state => state.orders?.userOrders || []);
  console.log('userOrders', userOrders);
  const isLoading = useSelector(state => state.orders?.isLoading || false);

  // Fetch orders on component mount if needed
  // useEffect(() => {
  //   dispatch(fetchUserOrders());
  // }, [dispatch]);

  // Transform API data to match the UI structure
  const transformedOrders = userOrders.map(order => {
    // Map order status
    const getUIStatus = apiStatus => {
      const statusMap = {
        Confirmed: 'preparing',
        Preparing: 'preparing',
        'Out for Delivery': 'on_the_way',
        Delivered: 'delivered',
        Cancelled: 'cancelled',
      };
      return statusMap[apiStatus] || 'preparing';
    };

    // Get restaurant name from first item (assuming all items from same restaurant)
    const restaurantName =
      order.orderItems[0]?.product?.restaurantName || 'Restaurant';
    const restaurantImage =
      order.orderItems[0]?.product?.images?.[0] ||
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200&q=80';

    // Calculate estimated delivery (30-40 mins from creation)
    const orderDate = new Date(order.createdAt);
    const estimatedDelivery = new Date(orderDate.getTime() + 35 * 60000); // +35 mins

    const uiStatus = getUIStatus(order.orderStatus);
    const isActive = ['preparing', 'on_the_way'].includes(uiStatus);

    return {
      id: order._id,
      orderId: order._id.slice(-8).toUpperCase(), // Show last 8 chars
      razorpayOrderId: order.razorpayOrderId,
      restaurant: {
        name: restaurantName,
        image: restaurantImage,
      },
      orderDate: order.createdAt,
      status: uiStatus,
      estimatedDelivery: isActive ? estimatedDelivery.toISOString() : null,
      items: order.orderItems.map(item => ({
        id: item._id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image:
          item.product?.images?.[0] ||
          'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&q=80',
        customizations: item.customizations || [],
      })),
      subtotal: order.subTotal,
      deliveryFee: order.shippingCost,
      tax: order.taxAmount,
      discount: order.discountApplied,
      total: order.totalAmount,
      deliveryAddress: `${order.deliveryAddress.street}, ${order.deliveryAddress.city}, ${order.deliveryAddress.state} - ${order.deliveryAddress.zipCode}`,
      deliveryInstructions: order.deliveryInstructions || null,
      paymentMethod: order.paymentMethod,
      paymentStatus: order.paymentStatus,
      cancellationReason: order.cancellationReason || null,
      canReorder: true, // Can always reorder past orders
      canCancel: isActive && order.paymentStatus === 'Paid', // Can cancel active paid orders
      driver: order.driver || null, // Add driver info if available in API
    };
  });

  const getStatusConfig = status => {
    switch (status) {
      case 'preparing':
        return {
          label: 'Preparing',
          color: 'bg-yellow-100 text-yellow-800',
          dotColor: 'bg-yellow-500',
        };
      case 'on_the_way':
        return {
          label: 'On the way',
          color: 'bg-blue-100 text-blue-800',
          dotColor: 'bg-blue-500',
        };
      case 'delivered':
        return {
          label: 'Delivered',
          color: 'bg-green-100 text-green-800',
          dotColor: 'bg-green-500',
        };
      case 'cancelled':
        return {
          label: 'Cancelled',
          color: 'bg-red-100 text-red-800',
          dotColor: 'bg-red-500',
        };
      default:
        return {
          label: 'Unknown',
          color: 'bg-gray-100 text-gray-800',
          dotColor: 'bg-gray-500',
        };
    }
  };

  const formatDate = d => {
    return new Date(d).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatETA = d => {
    const eta = new Date(d);
    const diff = Math.ceil((eta - Date.now()) / 60000);
    if (diff <= 0) return 'Any moment now';
    if (diff < 60) return `${diff} min`;
    return `${Math.floor(diff / 60)}h ${diff % 60}m`;
  };

  const filteredOrders = transformedOrders.filter(o => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      o.orderId.toLowerCase().includes(term) ||
      o.razorpayOrderId?.toLowerCase().includes(term) ||
      o.restaurant.name.toLowerCase().includes(term) ||
      o.items.some(it => it.name.toLowerCase().includes(term));

    const matchesTab =
      activeTab === 'all' ||
      (activeTab === 'active' &&
        ['preparing', 'on_the_way'].includes(o.status)) ||
      (activeTab === 'completed' && o.status === 'delivered') ||
      (activeTab === 'cancelled' && o.status === 'cancelled');

    return matchesSearch && matchesTab;
  });

  const handleReorder = order => {
    console.log('Reorder:', order.id);
    // Dispatch action to add items to cart
    // order.items.forEach(item => {
    //   dispatch(addToCart({
    //     productId: item.id,
    //     quantity: item.quantity,
    //     customizations: item.customizations
    //   }));
    // });
  };

  const handleCancelOrder = id => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      console.log('Cancel order:', id);
      // dispatch(cancelOrder(id));
    }
  };

  const handleTrackOrder = o => {
    console.log('Track:', o.id);
    // Navigate to tracking page or open tracking modal
  };

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
        <p className="text-gray-600 mt-1">
          {filteredOrders.length}{' '}
          {filteredOrders.length === 1 ? 'order' : 'orders'}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[
          { key: 'all', label: 'All Orders', count: transformedOrders.length },
          {
            key: 'active',
            label: 'Active',
            count: transformedOrders.filter(o =>
              ['preparing', 'on_the_way'].includes(o.status)
            ).length,
          },
          {
            key: 'completed',
            label: 'Completed',
            count: transformedOrders.filter(o => o.status === 'delivered')
              .length,
          },
          {
            key: 'cancelled',
            label: 'Cancelled',
            count: transformedOrders.filter(o => o.status === 'cancelled')
              .length,
          },
        ].map(({ key, label, count }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-6 py-2.5 rounded-xl font-semibold whitespace-nowrap transition-all ${
              activeTab === key
                ? 'bg-yellow-400 text-gray-900 shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {label} {count > 0 && `(${count})`}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search by order ID, restaurant, or item..."
          className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
        />
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map(order => {
          const status = getStatusConfig(order.status);
          const isExpanded = expandedOrder === order.id;

          return (
            <div
              key={order.id}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Order Summary */}
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

                          {order.estimatedDelivery &&
                            order.status !== 'delivered' && (
                              <span className="text-xs text-yellow-600 font-medium">
                                ETA: {formatETA(order.estimatedDelivery)}
                              </span>
                            )}
                        </div>

                        {order.status === 'cancelled' &&
                          order.cancellationReason && (
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
                          onClick={() => handleReorder(order)}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-lg font-semibold transition-colors text-sm"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          Reorder
                        </button>
                      )}

                      {['preparing', 'on_the_way'].includes(order.status) &&
                        order.canCancel && (
                          <button
                            onClick={() => handleCancelOrder(order.id)}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg font-semibold transition-colors text-sm"
                          >
                            <XCircle className="w-4 h-4" />
                            Cancel
                          </button>
                        )}

                      {['preparing', 'on_the_way'].includes(order.status) && (
                        <button
                          onClick={() => handleTrackOrder(order)}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg font-semibold transition-colors text-sm"
                        >
                          <Navigation className="w-4 h-4" />
                          Track
                        </button>
                      )}

                      <button
                        onClick={() =>
                          setExpandedOrder(isExpanded ? null : order.id)
                        }
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

              {/* Expanded Details */}
              {isExpanded && (
                <div className="border-t border-gray-200 bg-gray-50 p-6 space-y-6">
                  {/* Items List */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Order Items
                    </h4>
                    <div className="space-y-3">
                      {order.items.map(item => (
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
                            <p className="font-medium text-gray-900">
                              {item.quantity}× {item.name}
                            </p>
                            {item.customizations.length > 0 && (
                              <p className="text-xs text-gray-500 mt-0.5">
                                {item.customizations.join(', ')}
                              </p>
                            )}
                          </div>
                          <p className="font-semibold text-gray-900">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price Breakdown */}
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Bill Summary
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span>₹{order.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Delivery Fee</span>
                        <span>₹{order.deliveryFee.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Tax & Charges</span>
                        <span>₹{order.tax.toFixed(2)}</span>
                      </div>
                      {order.discount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>Discount</span>
                          <span>-₹{order.discount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between font-bold text-gray-900 text-base pt-2 border-t border-gray-200">
                        <span>Total Paid</span>
                        <span>₹{order.total.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-500 mt-1">
                        <span>Payment Method</span>
                        <span>{order.paymentMethod}</span>
                      </div>
                    </div>
                  </div>

                  {/* Delivery Info */}
                  <div className="bg-white rounded-lg p-4 space-y-3">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Delivery Information
                    </h4>
                    <div className="flex items-start gap-3 text-sm text-gray-600">
                      <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                      <span>{order.deliveryAddress}</span>
                    </div>
                    {order.deliveryInstructions && (
                      <div className="flex items-start gap-3 text-sm text-gray-600">
                        <Clock className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                        <span>{order.deliveryInstructions}</span>
                      </div>
                    )}
                    {order.driver && (
                      <div className="flex items-start gap-3 text-sm text-gray-600">
                        <Phone className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                        <span>
                          {order.driver.name} • {order.driver.phone}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Empty State */}
        {filteredOrders.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No orders found
            </h3>
            <p className="text-gray-600">
              {searchTerm || activeTab !== 'all'
                ? 'Try adjusting your search or filters'
                : "You haven't placed any orders yet"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
