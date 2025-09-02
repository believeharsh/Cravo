import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Icon from '../../../components/ui/Icon';
import { useDispatch, useSelector } from 'react-redux';
import { openAuthModal } from '../../../features/authModal/authModelSlice';

const LandingNavigation = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.auth);
  const nevigate = useNavigate();
  const navigateToProfile = () => {
    nevigate('/profile');
  };
  return (
    <nav className="px-4 sm:px-6 py-4 sm:py-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left side - Logo and Company Name */}
        <Link to="/" className="flex items-center space-x-3 sm:space-x-4">
          <div className="w-8 h-8 sm:w-15 sm:h-15 rounded-2xl border-2 border-white flex items-center justify-center">
            <img src="/assets/Cravo_logo.png" alt="Cravo Logo" />
          </div>
          <div className="w-10 sm:w-32">
            <img src="/assets/Cravo_white_text_logo.png" alt="Cravo" />
          </div>
        </Link>

        {/* Right side - Navigation Links */}
        <div className="flex items-center space-x-4 sm:space-x-8">
          <div className="hidden lg:flex items-center space-x-6">
            {/* Corporate Link */}
            <NavLink
              to="/corporate"
              className={({ isActive }) =>
                `flex items-center space-x-2 transition-colors font-medium ${
                  isActive
                    ? 'text-yellow-600'
                    : 'text-gray-800 hover:text-gray-600'
                }`
              }
            >
              <Icon name={'building-2'} size={18} />
              <span>Corporate</span>
            </NavLink>

            {/* Partner with us Link - Fixed route */}
            <NavLink
              to="/partner"
              className={({ isActive }) =>
                `flex items-center space-x-2 transition-colors font-medium ${
                  isActive
                    ? 'text-yellow-600'
                    : 'text-gray-800 hover:text-gray-600'
                }`
              }
            >
              <span>Partner with us</span>
            </NavLink>

            {/* Get The App Link */}
            <NavLink to="/get-the-app">
              <button className="cursor-pointer flex items-center justify-center px-4 py-2 rounded-xl font-medium text-gray-800 transition-colors duration-200 border border-black text-sm">
                Get The App
              </button>
            </NavLink>
          </div>

          {/* Conditional rendering based on authentication */}

          {isAuthenticated ? (
            <button
              onClick={navigateToProfile}
              className="relative  cursor-pointer flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 hover:bg-gray-50 hover:scale-105 text-gray-700 hover:text-gray-900"
            >
              <Icon name={'profile'} size={18} />
              <span className="hidden xl:block">Profile</span>
            </button>
          ) : (
            <button
              className="cursor-pointer flex items-center space-x-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-xl font-medium text-gray-700 transition-colors duration-200 border border-gray-200"
              onClick={() => dispatch(openAuthModal({ mode: 'login' }))} // ✅ function now
            >
              <Icon name={'login'} size={16} className="text-blue-600" />
              <span className="font-medium text-gray-800 text-sm">Sign in</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default LandingNavigation;
