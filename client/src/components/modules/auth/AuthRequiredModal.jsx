import React from 'react';
import { useDispatch } from 'react-redux';
import Icon from '../../ui/Icon';
import { openAuthSidebar } from '../../../features/ui/uiSlice';

const AuthRequiredModal = ({ isOpen, onClose, title, message, action }) => {
  const dispatch = useDispatch();

  if (!isOpen) return null;

  const handleLogin = () => {
    onClose();
    dispatch(openAuthSidebar());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-gray-200 opacity-20 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100 opacity-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="cursor-pointer absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-full"
          aria-label="Close modal"
        >
          <Icon name="x" size={20} />
        </button>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
              <Icon name="user" size={32} className="text-yellow-600" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">
            {title || 'Login Required'}
          </h2>

          {/* Message */}
          <p className="text-gray-600 text-center mb-6 leading-relaxed">
            {message ||
              'Please log in to continue. You need to be logged in to add items to your wishlist.'}
          </p>

          {/* Action Info (if provided) */}
          {action && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
              <div className="flex items-start space-x-3">
                <Icon
                  name="info"
                  size={20}
                  className="text-yellow-600 flex-shrink-0 mt-0.5"
                />
                <p className="text-sm text-gray-700">{action}</p>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col  gap-3">
            <button
              onClick={handleLogin}
              className="cursor-pointer flex-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Icon name="log-in" size={18} />
              <span>Login / Sign Up</span>
            </button>
            <button
              onClick={onClose}
              className="cursor-pointer  flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all duration-200"
            >
              Maybe Later
            </button>
          </div>
        </div>

        {/* Bottom Decoration */}
        <div className="h-2 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 rounded-b-2xl" />
      </div>
    </div>
  );
};

export default AuthRequiredModal;
