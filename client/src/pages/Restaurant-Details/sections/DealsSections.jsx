import React from 'react';

// Mock data for deals, replace with API call if needed
const deals = [
  { id: 1, title: 'Flat 10% Off', description: 'On orders above ₹500' },
  { id: 2, title: '20% Off', description: 'Upto ₹100' },
  { id: 3, title: 'Flat ₹150 Off', description: 'On orders above ₹1000' },
  { id: 4, title: 'Free Delivery', description: 'On first order' },
];

const DealsSection = () => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Deals for You</h2>
      <div className="flex gap-4 p-1 overflow-x-auto scrollbar-hide">
        {deals.map(deal => (
          <div
            key={deal.id}
            className="flex-shrink-0 w-64 bg-yellow-50 rounded-2xl p-1.5 shadow-sm border border-yellow-200"
          >
            <p className="text-lg font-semibold text-gray-800 mb-1">
              {deal.title}
            </p>
            <p className="text-sm text-gray-600">{deal.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DealsSection;
