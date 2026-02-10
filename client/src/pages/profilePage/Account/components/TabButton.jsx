import React from 'react';

const TabButton = ({ label, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-2 rounded-lg font-medium cursor-pointer ${
        active
          ? 'bg-yellow-100 text-yellow-600'
          : 'hover:bg-bg-subtle text-text-secondary'
      }`}
    >
      {label}
    </button>
  );
};

export default TabButton;
