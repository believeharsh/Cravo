import React from 'react';

const TabButton = ({ label, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full cursor-pointer rounded-lg px-4 py-2 text-left font-medium ${
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
