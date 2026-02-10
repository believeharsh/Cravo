import React from 'react';
import Icon from '../../../../components/ui/Icon';

const EmailSettingsTab = ({ email, isVerified = true }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold text-charcoal mb-4">
        Email Settings
      </h2>
      <div className="flex items-center gap-3 bg-bg-subtle px-3 py-2 rounded-lg">
        <Icon name="mail" size={16} className="text-gray-400" />
        <span>{email}</span>
        {isVerified && (
          <span className="ml-auto bg-green-500 text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
            <Icon name="check" size={12} /> Verified
          </span>
        )}
      </div>
    </div>
  );
};

export default EmailSettingsTab;
