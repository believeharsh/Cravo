import React from 'react';

import Icon from '../../../../components/ui/Icon';

const EmailSettingsTab = ({ email, isVerified = true }) => {
  return (
    <div>
      <h2 className="text-charcoal mb-4 text-lg font-semibold">
        Email Settings
      </h2>
      <div className="bg-bg-subtle flex items-center gap-3 rounded-lg px-3 py-2">
        <Icon name="mail" size={16} className="text-gray-400" />
        <span>{email}</span>
        {isVerified && (
          <span className="ml-auto flex items-center gap-1 rounded-full bg-green-500 px-2 py-0.5 text-xs text-white">
            <Icon name="check" size={12} /> Verified
          </span>
        )}
      </div>
    </div>
  );
};

export default EmailSettingsTab;
