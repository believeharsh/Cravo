import React from 'react';

const DeliveryInstructionsSection = ({
  deliveryInstructions,
  setDeliveryInstructions,
}) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-4">
      <h2 className="text-xl font-bold text-text-main mb-3">
        Delivery Instructions
      </h2>
      <textarea
        className="w-full h-24 p-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
        placeholder="e.g., Leave at the front door, don't ring bell"
        value={deliveryInstructions}
        onChange={e => setDeliveryInstructions(e.target.value)}
      />
    </div>
  );
};

export default DeliveryInstructionsSection;
