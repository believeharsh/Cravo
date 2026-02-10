import React from 'react';
import Icon from '../../../../components/ui/Icon';

const ProfileAvatar = ({ onUploadClick }) => {
  return (
    <div className="relative">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center border-4 border-border-focus">
        <Icon name="users" className="w-10 h-10 text-yellow-500" />
      </div>
      <button
        onClick={onUploadClick}
        className="absolute bottom-1 right-1 bg-primary-hover hover:bg-yellow-600 p-2 rounded-full text-white shadow"
      >
        <Icon name="camera" size={14} />
      </button>
    </div>
  );
};

export default ProfileAvatar;
