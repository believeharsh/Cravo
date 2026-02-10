import React from 'react';

const OrdersTabs = ({ activeTab, setActiveTab, counts }) => {
  const tabs = [
    { key: 'all', label: 'All Orders', count: counts.all },
    { key: 'active', label: 'Active', count: counts.active },
    { key: 'completed', label: 'Completed', count: counts.completed },
    { key: 'cancelled', label: 'Cancelled', count: counts.cancelled },
  ];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {tabs.map(({ key, label, count }) => (
        <button
          key={key}
          onClick={() => setActiveTab(key)}
          className={`px-6 py-2.5 rounded-xl font-semibold whitespace-nowrap transition-all ${
            activeTab === key
              ? 'bg-primary text-text-main shadow-lg'
              : 'bg-white text-text-secondary hover:bg-bg-subtle border border-border'
          }`}
        >
          {label} {count > 0 && `(${count})`}
        </button>
      ))}
    </div>
  );
};

export default OrdersTabs;
