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
      <h2 className="text-charcoal mb-4 text-lg font-semibold">
        Change Password
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-text-secondary text-sm">
            Current Password
          </label>
          <input
            type="password"
            value={passwords.current}
            onChange={e => handleChange('current', e.target.value)}
            className="border-border mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-400"
          />
        </div>
        <div>
          <label className="text-text-secondary text-sm">New Password</label>
          <input
            type="password"
            value={passwords.new}
            onChange={e => handleChange('new', e.target.value)}
            className="border-border mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-400"
          />
        </div>
        <div>
          <label className="text-text-secondary text-sm">
            Confirm Password
          </label>
          <input
            type="password"
            value={passwords.confirm}
            onChange={e => handleChange('confirm', e.target.value)}
            className="border-border mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-400"
          />
        </div>
        <button
          type="submit"
          className="bg-primary-hover rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-yellow-600"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordTab;
