import React, { useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Icon from '../ui/Icon';
import { logoutUser } from '../../features/auth/authSlice';

const ProfileDropdown = ({ isOpen, onClose, onToggle }) => {
  const profileDropdownRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleLogout = () => {
    onClose();
    dispatch(logoutUser());
    navigate('/');
  };

  return (
    <div className="relative" ref={profileDropdownRef}>
      <button
        onClick={onToggle}
        className={`relative cursor-pointer flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 hover:bg-bg-subtle hover:scale-105 ${
          isOpen
            ? 'bg-yellow-50 text-yellow-600'
            : 'text-text-secondary hover:text-text-main'
        }`}
      >
        <Icon name="user" size={18} />
        <span className="hidden xl:block">Profile</span>
        <Icon
          name="chevron-down"
          size={18}
          className={`transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className="absolute top-full mt-2 right-0 w-56 bg-white rounded-sm shadow-lg z-50">
          <div className="py-1">
            {/* Account */}
            <Link
              to="/profile/account"
              className="flex items-center px-4 py-2 text-sm text-text-secondary hover:bg-gray-100"
              onClick={onClose}
            >
              <Icon name="user" size={16} className="mr-2" />
              Account
            </Link>

            {/* Settings */}
            <Link
              to="/profile/settings"
              className="flex items-center px-4 py-2 text-sm text-text-secondary hover:bg-gray-100"
              onClick={onClose}
            >
              <Icon name="settings" size={16} className="mr-2" />
              Settings
            </Link>

            {/* Favorites */}
            <Link
              to="/profile/favorites"
              className="flex items-center px-4 py-2 text-sm text-text-secondary hover:bg-gray-100"
              onClick={onClose}
            >
              <Icon name="heart" size={16} className="mr-2" />
              Favorites
            </Link>

            {/* Orders */}
            <Link
              to="/profile/orders"
              className="flex items-center px-4 py-2 text-sm text-text-secondary hover:bg-gray-100"
              onClick={onClose}
            >
              <Icon name="shopping-bag" size={16} className="mr-2" />
              Orders
            </Link>

            {/* Help & Support */}
            <Link
              to="/help"
              className="flex items-center px-4 py-2 text-sm text-text-secondary hover:bg-gray-100"
              onClick={onClose}
            >
              <Icon name="help-circle" size={16} className="mr-2" />
              Help & Support
            </Link>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              <Icon name="log-out" size={16} className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
