import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import OrdersTabs from './components/OrdersTabs';
import OrdersSearch from './components/OrdersSearch';
import OrderCard from './components/OrderCard';
import EmptyOrdersState from './components/EmptyOrdersState';
import OrdersLoading from './components/OrdersLoading';
import OrdersHeader from './components/OrdersHeader';

const Orders = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedOrder, setExpandedOrder] = useState(null);

  const userOrders = useSelector(state => state.orders?.userOrders || []);
  const isLoading = useSelector(state => state.orders?.isLoading || false);

  // Fetch orders on mount
  // useEffect(() => {
  //   dispatch(fetchUserOrders());
  // }, [dispatch]);

  const getStatusConfig = status => {
    const configs = {
      preparing: {
        label: 'Preparing',
        color: 'bg-yellow-100 text-yellow-800',
        dotColor: 'bg-yellow-500',
      },
      on_the_way: {
        label: 'On the way',
        color: 'bg-blue-100 text-blue-800',
        dotColor: 'bg-blue-500',
      },
      delivered: {
        label: 'Delivered',
        color: 'bg-green-100 text-green-800',
        dotColor: 'bg-green-500',
      },
      cancelled: {
        label: 'Cancelled',
        color: 'bg-red-100 text-red-800',
        dotColor: 'bg-red-500',
      },
    };
    return configs[status] || configs.preparing;
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

  const transformedOrders = userOrders.map(order => {
    const restaurantName =
      order.orderItems[0]?.product?.restaurantName || 'Restaurant';
    const restaurantImage =
      order.orderItems[0]?.product?.images?.[0] ||
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200&q=80';

    const orderDate = new Date(order.createdAt);
    const estimatedDelivery = new Date(orderDate.getTime() + 35 * 60000);

    const uiStatus = getUIStatus(order.orderStatus);
    const isActive = ['preparing', 'on_the_way'].includes(uiStatus);

    return {
      id: order._id,
      orderId: order._id.slice(-8).toUpperCase(),
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
      canReorder: true,
      canCancel: isActive && order.paymentStatus === 'Paid',
      driver: order.driver || null,
    };
  });

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

  const tabCounts = {
    all: transformedOrders.length,
    active: transformedOrders.filter(o =>
      ['preparing', 'on_the_way'].includes(o.status)
    ).length,
    completed: transformedOrders.filter(o => o.status === 'delivered').length,
    cancelled: transformedOrders.filter(o => o.status === 'cancelled').length,
  };

  const handleReorder = order => {
    console.log('Reorder:', order.id);
    // Implement reorder logic
  };

  const handleCancelOrder = id => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      console.log('Cancel order:', id);
      // dispatch(cancelOrder(id));
    }
  };

  const handleTrackOrder = o => {
    console.log('Track:', o.id);
    // Navigate to tracking page
  };

  if (isLoading) {
    return <OrdersLoading />;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <OrdersHeader ordersCount={filteredOrders.length} />

      <OrdersTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        counts={tabCounts}
      />

      <OrdersSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="space-y-4">
        {filteredOrders.map(order => (
          <OrderCard
            key={order.id}
            order={order}
            status={getStatusConfig(order.status)}
            isExpanded={expandedOrder === order.id}
            onToggleExpand={() =>
              setExpandedOrder(expandedOrder === order.id ? null : order.id)
            }
            onReorder={handleReorder}
            onCancel={handleCancelOrder}
            onTrack={handleTrackOrder}
            formatDate={formatDate}
            formatETA={formatETA}
          />
        ))}

        {filteredOrders.length === 0 && (
          <EmptyOrdersState
            hasFilters={activeTab !== 'all'}
            searchTerm={searchTerm}
          />
        )}
      </div>
    </div>
  );
};

export default Orders;
