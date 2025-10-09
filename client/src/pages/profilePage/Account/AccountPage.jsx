import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ProfileSidebar from './components/ProfileSidebar';
import ProfileInfoTab from './components/ProfileInfoTab';
import EmailSettingsTab from './components/EmailSettingsTab';
import ChangePasswordTab from './components/ChangePasswordTab';

const AccountPage = () => {
  const [tab, setTab] = useState('profile');
  const userProfileData = useSelector(state => state.auth);
  const userAddresses = useSelector(state => state.address);

  // Get default address
  const userdefaultAddress = userAddresses?.list?.find(
    da => da.isDefault === true
  );
  const finalUserAddressstring = userdefaultAddress
    ? `${userdefaultAddress.city}, ${userdefaultAddress.state}, ${userdefaultAddress.country}`
    : 'No address added';

  // Extract first and last name from full name
  const fullName = userProfileData?.user?.name || '';
  const nameParts = fullName.trim().split(' ');
  const firstName = nameParts[0] || 'Not added';
  const lastName = nameParts.slice(1).join(' ') || 'Not added';

  const profileData = {
    firstName: firstName,
    lastName: lastName,
    email: userProfileData?.user?.email || 'Not added',
    phone: 'Not added',
    address: finalUserAddressstring,
    joinDate: userProfileData?.user?.joinedAt || 'Not available',
  };

  const handleAvatarUpload = () => {
    // Handle avatar upload logic here
    console.log('Avatar upload clicked');
  };

  const handlePasswordChange = passwords => {
    // Handle password change logic here
    console.log('Password change submitted:', passwords);
  };

  const renderTabContent = () => {
    switch (tab) {
      case 'profile':
        return <ProfileInfoTab profileData={profileData} />;
      case 'email':
        return (
          <EmailSettingsTab
            email={profileData.email}
            isVerified={userProfileData?.user?.isVerified}
          />
        );
      case 'password':
        return <ChangePasswordTab onSubmit={handlePasswordChange} />;
      default:
        return <ProfileInfoTab profileData={profileData} />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-12 gap-6">
      <ProfileSidebar
        profileData={profileData}
        tab={tab}
        setTab={setTab}
        onAvatarUpload={handleAvatarUpload}
      />

      <div className="col-span-8 bg-white rounded-2xl shadow p-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default AccountPage;
