const OrdersHeader = ({ ordersCount }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
      <p className="text-gray-600 mt-1">
        {ordersCount} {ordersCount === 1 ? 'order' : 'orders'}
      </p>
    </div>
  );
};

export default OrdersHeader;
