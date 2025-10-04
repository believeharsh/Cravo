import React from 'react';
import { Package } from 'lucide-react';

const EmptyOrdersState = ({ hasFilters, searchTerm }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Package className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">No orders found</h3>
      <p className="text-gray-600">
        {searchTerm || hasFilters
          ? 'Try adjusting your search or filters'
          : "You haven't placed any orders yet"}
      </p>
    </div>
  );
};

export default EmptyOrdersState;
