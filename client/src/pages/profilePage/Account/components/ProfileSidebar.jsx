import React from 'react';

import ProfileAvatar from './ProfileAvatar';
import TabButton from './TabButton';

const ProfileSidebar = ({ profileData, tab, setTab, onAvatarUpload }) => {
  const tabs = [
    { id: 'profile', label: 'Profile Info' },
    { id: 'email', label: 'Email Settings' },
    { id: 'password', label: 'Change Password' },
  ];

  return (
    <div className="border-border-focus col-span-4 flex flex-col items-center rounded-2xl border bg-white p-6 text-center shadow transition-all">
      <ProfileAvatar onUploadClick={onAvatarUpload} />

      <h1 className="text-charcoal mt-4 text-xl font-bold">
        {profileData.firstName} {profileData.lastName}
      </h1>
      <p className="text-text-muted text-sm">{profileData.email}</p>
      <p className="text-xs text-gray-400">
        Member since {profileData.joinDate}
      </p>

      <div className="mt-6 w-full space-y-2">
        {tabs.map(({ id, label }) => (
          <TabButton
            key={id}
            label={label}
            active={tab === id}
            onClick={() => setTab(id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProfileSidebar;
