import React from 'react';

const ProfileField = ({ label, value, fullWidth = false }) => {
  return (
    <div className={fullWidth ? 'col-span-2' : ''}>
      <label className="text-text-muted">{label}</label>
      <p className="font-medium">{value}</p>
    </div>
  );
};

export default ProfileField;
