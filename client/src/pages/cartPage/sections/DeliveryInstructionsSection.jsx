import React from 'react';
import Icon from '../../../components/ui/Icon'; 
import Button from '../../../components/ui/Button'; 

/**
 * Renders the section for delivery instructions.
 *
 * @param {object} props - Component props.
 * @param {string} props.deliveryInstructions - The current delivery instructions text.
 * @param {function(React.ChangeEvent<HTMLTextAreaElement>): void} props.setDeliveryInstructions - Function to update delivery instructions.
 * @returns {JSX.Element} The DeliveryInstructionsSection component.
 */
const DeliveryInstructionsSection = ({ deliveryInstructions, setDeliveryInstructions }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-cream p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
          <Icon name="truck" className="w-5 h-5 text-yellow-600" />
        </div>
        <h3 className="text-lg font-semibold text-charcoal">
          Delivery Instructions
        </h3>
      </div>

      <textarea
        value={deliveryInstructions}
        onChange={(e) => setDeliveryInstructions(e.target.value)}
        placeholder="Add delivery instructions (optional)"
        rows={3}
        className="w-full p-3 border border-cream rounded-lg resize-none focus:ring-1 focus:ring-yellow-400"
      />

      <div className="mt-3 flex items-center gap-2 text-sm text-medium-gray">
        <Icon name="info" className="w-4 h-4" />
        e.g., "Leave at door", "Ring bell", "Call when arrived"
      </div>
    </div>
  );
};

export default DeliveryInstructionsSection;