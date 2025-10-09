import React, { useState } from 'react';
import Icon from '../../../components/ui/Icon';
import { useSelector } from 'react-redux';

const AccountPage = () => {
  const [tab, setTab] = useState('profile');
  const userProfileData = useSelector(state => state.auth);
  const userAddresses = useSelector(state => state.address);

  // finding the default user address
  const userdefaultAddress = userAddresses?.list?.find(
    da => da.isDefault === true
  );
  console.log(userdefaultAddress);
  const finalUserAddressstring = userdefaultAddress
    ? `${userdefaultAddress.city}, ${userdefaultAddress.state}, ${userdefaultAddress.country}`
    : 'No address added';

  console.log(finalUserAddressstring);

  // Extract first and last name from full name
  const fullName = userProfileData?.user?.name || '';
  const nameParts = fullName.trim().split(' ');
  const firstName = nameParts[0] || 'Not added';
  const lastName = nameParts.slice(1).join(' ') || 'Not added';

  const [profileData, setProfileData] = useState({
    firstName: firstName,
    lastName: lastName,
    email: userProfileData?.user?.email || 'Not added',
    phone: 'Not added',
    // dob: '11-01-2004',
    address: finalUserAddressstring,
    // bio: 'Software Engineer At Carvo Private limited.',
    joinDate: userProfileData?.user?.joinedAt || 'Not available',
  });

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-12 gap-6">
      {/* Left Sidebar */}
      <div className="transition-all border border-yellow-400 col-span-4 bg-white rounded-2xl shadow p-6 flex flex-col items-center text-center">
        <div className="relative">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center border-4 border-yellow-400">
            <Icon name="users" className="w-10 h-10 text-yellow-500" />
          </div>
          <button className="absolute bottom-1 right-1 bg-yellow-500 hover:bg-yellow-600 p-2 rounded-full text-white shadow">
            <Icon name="camera" size={14} />
          </button>
        </div>
        <h1 className="mt-4 text-xl font-bold text-charcoal">
          {profileData.firstName} {profileData.lastName}
        </h1>
        <p className="text-sm text-gray-500">{profileData.email}</p>
        <p className="text-xs text-gray-400">
          Member since {profileData.joinDate}
        </p>
        <div className="mt-6 space-y-2 w-full">
          <button
            onClick={() => setTab('profile')}
            className={`w-full text-left px-4 py-2 rounded-lg font-medium cursor-pointer ${
              tab === 'profile'
                ? 'bg-yellow-100 text-yellow-600'
                : 'hover:bg-gray-50 text-gray-700'
            }`}
          >
            Profile Info
          </button>
          <button
            onClick={() => setTab('email')}
            className={`w-full text-left px-4 py-2 rounded-lg font-medium cursor-pointer ${
              tab === 'email'
                ? 'bg-yellow-100 text-yellow-600'
                : 'hover:bg-gray-50 text-gray-700'
            }`}
          >
            Email Settings
          </button>
          <button
            onClick={() => setTab('password')}
            className={`w-full text-left px-4 py-2 rounded-lg font-medium cursor-pointer ${
              tab === 'password'
                ? 'bg-yellow-100 text-yellow-600'
                : 'hover:bg-gray-50 text-gray-700'
            }`}
          >
            Change Password
          </button>
        </div>
      </div>

      {/* Right Content Area */}
      <div className="col-span-8 bg-white rounded-2xl shadow p-6">
        {tab === 'profile' && (
          <div>
            <h2 className="text-lg font-semibold text-charcoal mb-4">
              Profile Info
            </h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <label className="text-gray-500">First Name</label>
                <p className="font-medium">{profileData.firstName}</p>
              </div>
              <div>
                <label className="text-gray-500">Last Name</label>
                <p className="font-medium">{profileData.lastName}</p>
              </div>
              <div>
                <label className="text-gray-500">Phone</label>
                <p className="font-medium">{profileData.phone}</p>
              </div>
              {/* <div>
                <label className="text-gray-500">Date of Birth</label>
                <p className="font-medium">{profileData.dob}</p>
              </div> */}
              <div className="col-span-2">
                <label className="text-gray-500">Address</label>
                <p className="font-medium">{profileData.address}</p>
              </div>
              {/* <div className="col-span-2">
                <label className="text-gray-500">Bio</label>
                <p className="font-medium">{profileData.bio}</p>
              </div> */}
            </div>
          </div>
        )}

        {tab === 'email' && (
          <div>
            <h2 className="text-lg font-semibold text-charcoal mb-4">
              Email Settings
            </h2>
            <div className="flex items-center gap-3 bg-gray-50 px-3 py-2 rounded-lg">
              <Icon name="mail" size={16} className="text-gray-400" />
              <span>{profileData.email}</span>
              <span className="ml-auto bg-green-500 text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                <Icon name="check" size={12} /> Verified
              </span>
            </div>
          </div>
        )}

        {tab === 'password' && (
          <div>
            <h2 className="text-lg font-semibold text-charcoal mb-4">
              Change Password
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600">
                  Current Password
                </label>
                <input
                  type="password"
                  className="w-full mt-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">New Password</label>
                <input
                  type="password"
                  className="w-full mt-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="w-full mt-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                Update Password
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountPage;
