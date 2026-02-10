import React, { useState } from 'react';

const ChangePasswordTab = ({ onSubmit }) => {
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const handleChange = (field, value) => {
    setPasswords(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(passwords);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-charcoal mb-4">
        Change Password
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm text-text-secondary">Current Password</label>
          <input
            type="password"
            value={passwords.current}
            onChange={e => handleChange('current', e.target.value)}
            className="w-full mt-1 px-3 py-2 text-sm border border-border rounded-lg focus:ring-2 focus:ring-yellow-400"
          />
        </div>
        <div>
          <label className="text-sm text-text-secondary">New Password</label>
          <input
            type="password"
            value={passwords.new}
            onChange={e => handleChange('new', e.target.value)}
            className="w-full mt-1 px-3 py-2 text-sm border border-border rounded-lg focus:ring-2 focus:ring-yellow-400"
          />
        </div>
        <div>
          <label className="text-sm text-text-secondary">Confirm Password</label>
          <input
            type="password"
            value={passwords.confirm}
            onChange={e => handleChange('confirm', e.target.value)}
            className="w-full mt-1 px-3 py-2 text-sm border border-border rounded-lg focus:ring-2 focus:ring-yellow-400"
          />
        </div>
        <button
          type="submit"
          className="bg-primary-hover hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordTab;
