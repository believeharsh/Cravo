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
    <div className="transition-all border border-yellow-400 col-span-4 bg-white rounded-2xl shadow p-6 flex flex-col items-center text-center">
      <ProfileAvatar onUploadClick={onAvatarUpload} />

      <h1 className="mt-4 text-xl font-bold text-charcoal">
        {profileData.firstName} {profileData.lastName}
      </h1>
      <p className="text-sm text-gray-500">{profileData.email}</p>
      <p className="text-xs text-gray-400">
        Member since {profileData.joinDate}
      </p>

      <div className="mt-6 space-y-2 w-full">
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
