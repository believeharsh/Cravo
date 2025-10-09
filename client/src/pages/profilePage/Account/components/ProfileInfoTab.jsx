import React from 'react';
import ProfileField from './ProfileField';

const ProfileInfoTab = ({ profileData }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold text-charcoal mb-4">Profile Info</h2>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <ProfileField label="First Name" value={profileData.firstName} />
        <ProfileField label="Last Name" value={profileData.lastName} />
        <ProfileField label="Phone" value={profileData.phone} />
        <ProfileField label="Address" value={profileData.address} fullWidth />
      </div>
    </div>
  );
};

export default ProfileInfoTab;
