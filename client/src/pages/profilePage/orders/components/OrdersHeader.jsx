const OrdersHeader = ({ ordersCount }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-text-main">My Orders</h1>
      <p className="text-text-secondary mt-1">
        {ordersCount} {ordersCount === 1 ? 'order' : 'orders'}
      </p>
    </div>
  );
};

export default OrdersHeader;
