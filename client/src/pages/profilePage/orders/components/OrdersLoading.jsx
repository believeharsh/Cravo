import React from 'react';

const OrdersLoading = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-border-focus border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default OrdersLoading;
