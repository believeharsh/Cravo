import React, { useState } from 'react';
import {
  Edit3, Save, X, Eye, EyeOff, User, Mail, Lock, Camera, Check,
} from 'lucide-react';

const ProfilePage = () => {
  const [edit, setEdit] = useState({ profile: false, email: false, password: false });
  const [show, setShow] = useState({ current: false, new: false, confirm: false });

  const [profileData, setProfileData] = useState({
    firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567', dob: '1990-05-15', address: 'New York, NY',
    bio: 'Loves cooking and sharing recipes.', joinDate: 'Jan 2023'
  });

  const [form, setForm] = useState({
    ...profileData,
    email: profileData.email,
    currentPassword: '', newPassword: '', confirmPassword: ''
  });

  const handleSave = (type) => {
    if (type === 'profile') {
      setProfileData((prev) => ({ ...prev, ...form }));
    } else if (type === 'email') {
      setProfileData((prev) => ({ ...prev, email: form.email }));
    } else if (type === 'password') {
      if (form.newPassword !== form.confirmPassword) return alert('Passwords do not match!');
      alert('Password updated!');
      setForm((f) => ({ ...f, currentPassword: '', newPassword: '', confirmPassword: '' }));
    }
    setEdit((e) => ({ ...e, [type]: false }));
  };

  const handleCancel = (type) => {
    setForm((f) => ({
      ...f,
      ...profileData,
      currentPassword: '', newPassword: '', confirmPassword: ''
    }));
    setEdit((e) => ({ ...e, [type]: false }));
  };

  const Input = ({ label, name, type = 'text', passwordToggle }) => (
    <div className="flex-1">
      <label className="text-sm text-coffee">{label}</label>
      <div className="relative">
        <input
          type={passwordToggle ? (show[name] ? 'text' : 'password') : type}
          value={form[name]}
          onChange={(e) => setForm({ ...form, [name]: e.target.value })}
          className="w-full mt-1 px-3 py-2 text-sm border border-cream rounded-lg focus:ring-2 focus:ring-yellow-400"
        />
        {passwordToggle && (
          <button
            type="button"
            onClick={() => setShow((s) => ({ ...s, [name]: !s[name] }))}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          >
            {show[name] ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
    </div>
  );

  const Section = ({ title, type, children }) => (
    <div className="bg-white rounded-2xl shadow border border-cream p-4 space-y-3">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-charcoal">{title}</h2>
        {!edit[type] ? (
          <button onClick={() => setEdit((e) => ({ ...e, [type]: true }))} className="text-sm flex items-center gap-1 bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg">
            <Edit3 size={14} /> Edit
          </button>
        ) : (
          <div className="flex gap-2">
            <button onClick={() => handleSave(type)} className="text-sm flex items-center gap-1 bg-mint-green hover:bg-green-500 text-white px-3 py-1 rounded-lg">
              <Save size={14} /> Save
            </button>
            <button onClick={() => handleCancel(type)} className="text-sm flex items-center gap-1 bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded-lg">
              <X size={14} /> Cancel
            </button>
          </div>
        )}
      </div>
      {children}
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto space-y-5 text-sm">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-400 to-mint-green rounded-2xl p-6 text-white flex items-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-coffee" />
          </div>
          <button className="absolute -bottom-1 -right-1 bg-yellow-500 p-1 rounded-full">
            <Camera size={12} className="text-white" />
          </button>
        </div>
        <div>
          <h1 className="text-xl font-bold">{profileData.firstName} {profileData.lastName}</h1>
          <p className="text-yellow-100">{profileData.email}</p>
          <p className="text-yellow-100 text-xs">Since {profileData.joinDate}</p>
        </div>
      </div>

      {/* Profile Section */}
      <Section title="Profile Info" type="profile">
        <div className="grid grid-cols-2 gap-4">
          <Input label="First Name" name="firstName" />
          <Input label="Last Name" name="lastName" />
          <Input label="Phone" name="phone" />
          <Input label="Date of Birth" name="dob" type="date" />
          <Input label="Address" name="address" />
          <div className="col-span-2">
            <Input label="Bio" name="bio" />
          </div>
        </div>
      </Section>

      {/* Email Section */}
      <Section title="Email Settings" type="email">
        {edit.email ? (
          <Input label="Email Address" name="email" type="email" />
        ) : (
          <div className="flex items-center gap-3 bg-gray-50 px-3 py-2 rounded-lg">
            <Mail size={16} className="text-medium-gray" />
            <span>{profileData.email}</span>
            <span className="ml-auto bg-mint-green text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
              <Check size={12} /> Verified
            </span>
          </div>
        )}
      </Section>

      {/* Password Section */}
      <Section title="Change Password" type="password">
        {edit.password ? (
          <div className="space-y-3">
            <Input label="Current" name="currentPassword" passwordToggle />
            <Input label="New" name="newPassword" passwordToggle />
            <Input label="Confirm" name="confirmPassword" passwordToggle />
          </div>
        ) : (
          <div className="bg-gray-50 px-3 py-2 rounded-lg text-charcoal tracking-widest">
            ••••••••
          </div>
        )}
      </Section>
    </div>
  );
};

export default ProfilePage;
