import React, { useState } from 'react';
import {

  CheckCircle,
  XCircle,
  Calendar,
  Search,
  ChevronDown,
  ChevronUp,
  Phone,
  Navigation,
  Receipt,
} from 'lucide-react';
import Icon from '../../components/ui/Icon';

const Orders = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [filterDateRange, setFilterDateRange] = useState('all');

  const [orders, setOrders] = useState([
    /* ------ seed data unchanged ------ */
  ]);

  /* ── Helpers ───────────────────────────────────────────────────────────── */
  const getStatusInfo = (status) => {
    switch (status) {
      case 'preparing':
        return {
          label: 'Preparing',
          color: 'text-yellow-600 bg-yellow-50 border-yellow-200',
          icon: "clock",
        };
      case 'on_the_way':
        return {
          label: 'On the way',
          color: 'text-blue-600 bg-blue-50 border-blue-200',
          icon: "truck",
        };
      case 'delivered':
        return {
          label: 'Delivered',
          color: 'text-mint-green bg-green-50 border-green-200',
          icon: "check-circle",
        };
      case 'cancelled':
        return {
          label: 'Cancelled',
          color: 'text-red-600 bg-red-50 border-red-200',
          icon: "x-circle",
        };
      default:
        return {
          label: 'Unknown',
          color: 'text-medium-gray bg-gray-50 border-gray-200',
          icon: "package",
        };
    }
  };

  const formatDate = (d) =>
    new Date(d).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  const formatETA = (d) => {
    const eta = new Date(d);
    const diff = Math.ceil((eta - Date.now()) / 60000);
    if (diff <= 0) return 'Any moment now';
    if (diff < 60) return `${diff} min`;
    return `${Math.floor(diff / 60)}h ${diff % 60}m`;
  };

  /* ── Filtering ─────────────────────────────────────────────────────────── */
  const filteredOrders = orders.filter((o) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      o.id.toLowerCase().includes(term) ||
      o.restaurant.name.toLowerCase().includes(term) ||
      o.items.some((it) => it.name.toLowerCase().includes(term));

    const matchesTab =
      activeTab === 'all' ||
      (activeTab === 'active' && ['preparing', 'on_the_way'].includes(o.status)) ||
      (activeTab === 'completed' && o.status === 'delivered') ||
      (activeTab === 'cancelled' && o.status === 'cancelled');

    const dateOk = (() => {
      if (filterDateRange === 'all') return true;
      const diff = Date.now() - new Date(o.orderDate).getTime();
      const day = 24 * 60 * 60 * 1000;
      if (filterDateRange === 'week') return diff <= 7 * day;
      if (filterDateRange === 'month') return diff <= 30 * day;
      if (filterDateRange === 'year') return diff <= 365 * day;
      return true;
    })();

    return matchesSearch && matchesTab && dateOk;
  });

  /* ── Actions ───────────────────────────────────────────────────────────── */
  const handleReorder = (order) => console.log('Reorder:', order.id);
  const handleCancelOrder = (id) => {
    if (window.confirm('Cancel this order?')) {
      setOrders((prev) =>
        prev.map((o) =>
          o.id === id ? { ...o, status: 'cancelled', canCancel: false } : o,
        ),
      );
    }
  };
  const handleTrackOrder = (o) => console.log('Track:', o.id);
  const toggleExpand = (id) => setExpandedOrder(expandedOrder === id ? null : id);

  /* ── JSX ───────────────────────────────────────────────────────────────── */
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-charcoal">My Orders</h1>
          <p className="text-medium-gray mt-1">
            {filteredOrders.length} {filteredOrders.length === 1 ? 'order' : 'orders'} found
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-lg border border-cream p-2">
        <div className="flex flex-wrap gap-2">
          {[
            { key: 'all', label: 'All Orders' },
            { key: 'active', label: 'Active' },
            { key: 'completed', label: 'Completed' },
            { key: 'cancelled', label: 'Cancelled' },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === key
                  ? 'bg-yellow-400 text-white shadow-lg'
                  : 'text-medium-gray hover:text-charcoal hover:bg-gray-100'
              }`}
            >
              {label}
              <span
                className={`px-2 py-0.5 rounded-full text-xs ${
                  activeTab === key
                    ? 'bg-white bg-opacity-20 text-white'
                    : 'bg-gray-200 text-medium-gray'
                }`}
              >
                {
                  {
                    all: orders.length,
                    active: orders.filter((o) =>
                      ['preparing', 'on_the_way'].includes(o.status),
                    ).length,
                    completed: orders.filter((o) => o.status === 'delivered').length,
                    cancelled: orders.filter((o) => o.status === 'cancelled').length,
                  }[key]
                }
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Search & Date Filter */}
      <div className="bg-white rounded-2xl shadow-lg border border-cream p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Icon name={"search"} className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-medium-gray" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search orders, restaurants, or items..."
              className="w-full pl-10 pr-4 py-3 border border-cream rounded-lg focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div className="relative">
            <Icon name={"calendar"} className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-medium-gray" />
            <select
              value={filterDateRange}
              onChange={(e) => setFilterDateRange(e.target.value)}
              className="pl-10 pr-8 py-3 border border-cream rounded-lg focus:ring-2 focus:ring-yellow-400 bg-white min-w-[150px]"
            >
              <option value="all">All Time</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="year">Last Year</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((o) => {
          const status = getStatusInfo(o.status);
          const isOpen = expandedOrder === o.id;
          return (
            <div
              key={o.id}
              className="bg-white rounded-2xl shadow-lg border border-cream hover:shadow-xl transition-all"
            >
              {/* Summary Row */}
              <button
                onClick={() => toggleExpand(o.id)}
                className="w-full p-6 flex items-start justify-between text-left"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={o.restaurant.image}
                    alt={o.restaurant.name}
                    className="w-16 h-16 rounded-lg object-cover bg-gray-200"
                  />
                  <div>
                    <h3 className="font-semibold text-charcoal">
                      {o.restaurant.name}
                    </h3>
                    <p className="text-medium-gray text-sm">{formatDate(o.orderDate)}</p>
                    <div
                      className={`inline-flex items-center gap-1 px-2 py-0.5 mt-1 text-xs rounded-full border ${status.color}`}
                    >
                      <status.icon className="w-3 h-3" />
                      {status.label}
                    </div>
                    {o.estimatedDelivery && o.status !== 'delivered' && (
                      <p className="text-sm text-yellow-600 mt-1">
                        ETA: {formatETA(o.estimatedDelivery)}
                      </p>
                    )}
                    {o.status === 'cancelled' && o.cancellationReason && (
                      <p className="text-xs text-red-600 mt-1">
                        Reason: {o.cancellationReason}
                      </p>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-bold text-charcoal">${o.total.toFixed(2)}</p>
                  <p className="text-sm text-medium-gray">{o.items.length} items</p>
                  <div className="mt-3">
                    {isOpen ? (
                      <Icon name={"chevron-up"} className="w-5 h-5 text-medium-gray" />
                    ) : (
                      <Icon name={"chevron-down"} className="w-5 h-5 text-medium-gray" />
                    )}
                  </div>
                </div>
              </button>

              {/* Expanded Details */}
              {isOpen && (
                <div className="border-t border-cream px-6 pb-6 space-y-6">
                  {/* Items */}
                  <div className="space-y-4">
                    {o.items.map((it) => (
                      <div key={it.id} className="flex items-center gap-4">
                        <img
                          src={it.image}
                          alt={it.name}
                          className="w-14 h-14 rounded-lg object-cover bg-gray-200"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-charcoal">
                            {it.quantity}× {it.name}
                          </p>
                          {it.customizations.length > 0 && (
                            <p className="text-xs text-medium-gray">
                              {it.customizations.join(', ')}
                            </p>
                          )}
                        </div>
                        <p className="font-medium text-charcoal">${it.price.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>

                  {/* Charges & Actions */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                    <div className="space-y-1 text-sm">
                      <p className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${o.subtotal.toFixed(2)}</span>
                      </p>
                      <p className="flex justify-between">
                        <span>Delivery</span>
                        <span>${o.deliveryFee.toFixed(2)}</span>
                      </p>
                      <p className="flex justify-between">
                        <span>Tax</span>
                        <span>${o.tax.toFixed(2)}</span>
                      </p>
                      <p className="flex justify-between font-semibold text-charcoal">
                        <span>Total</span>
                        <span>${o.total.toFixed(2)}</span>
                      </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-wrap gap-2">
                      {o.canReorder && (
                        <button
                          onClick={() => handleReorder(o)}
                          className="flex items-center gap-1 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg transition-colors"
                        >
                          <Icon name={"shopping-cart"} className="w-4 h-4" />
                          Reorder
                        </button>
                      )}
                      {o.status !== 'cancelled' && o.canCancel && (
                        <button
                          onClick={() => handleCancelOrder(o.id)}
                          className="flex items-center gap-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                        >
                          <Icon name={"x-circle"} className="w-4 h-4" />
                          Cancel Order
                        </button>
                      )}
                      {['preparing', 'on_the_way'].includes(o.status) && (
                        <button
                          onClick={() => handleTrackOrder(o)}
                          className="flex items-center gap-1 px-4 py-2 border border-yellow-400 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                        >
                          <Icon name={"navigation"} className="w-4 h-4" />
                          Track
                        </button>
                      )}
                      <button
                        className="flex items-center gap-1 px-4 py-2 border border-cream hover:bg-gray-50 rounded-lg transition-colors"
                        onClick={() => console.log('Invoice for', o.id)}
                      >
                        <Icon name={"recipt"} className="w-4 h-4" />
                        Invoice
                      </button>
                    </div>
                  </div>

                  {/* Delivery info */}
                  <div className="pt-6 border-t border-cream space-y-3 text-sm">
                    <p className="flex items-center gap-2 text-medium-gray">
                      <Icon name={"map-pin"} className="w-4 h-4" />
                      {o.deliveryAddress}
                    </p>
                    {o.deliveryInstructions && (
                      <p className="flex items-center gap-2 text-medium-gray">
                        <Icon name={"clock"} className="w-4 h-4" />
                        {o.deliveryInstructions}
                      </p>
                    )}
                    {o.driver && (
                      <p className="flex items-center gap-2 text-medium-gray">
                        <Icon name={"phone"} className="w-4 h-4" />
                        {o.driver.name} &middot; {o.driver.phone}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Empty-state */}
        {filteredOrders.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg border border-cream p-12 text-center">
            <Icon name={"package"} className="w-10 h-10 mx-auto text-yellow-400" />
            <h3 className="mt-4 text-xl font-semibold text-charcoal">
              No orders match your filters
            </h3>
            <p className="text-medium-gray">Try adjusting search or date range.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
