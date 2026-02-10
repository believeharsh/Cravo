import React from 'react';

import Icon from '../../../../components/ui/Icon';

const ProfileAvatar = ({ onUploadClick }) => {
  return (
    <div className="relative">
      <div className="border-border-focus flex h-24 w-24 items-center justify-center rounded-full border-4 bg-gray-100">
        <Icon name="users" className="h-10 w-10 text-yellow-500" />
      </div>
      <button
        onClick={onUploadClick}
        className="bg-primary-hover absolute right-1 bottom-1 rounded-full p-2 text-white shadow hover:bg-yellow-600"
      >
        <Icon name="camera" size={14} />
      </button>
    </div>
  );
};

export default ProfileAvatar;
