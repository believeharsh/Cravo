import React from 'react';
import { MapPin, Clock, Phone } from 'lucide-react';

const DeliveryInfo = ({ address, instructions, driver }) => {
  return (
    <div className="bg-white rounded-lg p-4 space-y-3">
      <h4 className="font-semibold text-text-main mb-3">Delivery Information</h4>
      <div className="flex items-start gap-3 text-sm text-text-secondary">
        <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
        <span>{address}</span>
      </div>
      {instructions && (
        <div className="flex items-start gap-3 text-sm text-text-secondary">
          <Clock className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
          <span>{instructions}</span>
        </div>
      )}
      {driver && (
        <div className="flex items-start gap-3 text-sm text-text-secondary">
          <Phone className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
          <span>
            {driver.name} • {driver.phone}
          </span>
        </div>
      )}
    </div>
  );
};

export default DeliveryInfo;
