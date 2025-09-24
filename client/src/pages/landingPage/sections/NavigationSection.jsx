import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Icon from '../../../components/ui/Icon';
import { useDispatch, useSelector } from 'react-redux';
import { openAuthSidebar } from '../../../features/ui/uiSlice';

const LandingNavigation = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const mobileMenuRef = useRef(null);
  const menuButtonRef = useRef(null);

  const navigateToProfile = () => {
    navigate('/profile');
  };

  const profileMenuItems = [
    { label: 'Account', path: '/profile/account', icon: 'user' },
    { label: 'Account Settings', path: '/profile/settings', icon: 'settings' },
    { label: 'My Orders', path: '/profile/orders', icon: 'package' },
    { label: 'Favorites', path: '/profile/favorites', icon: 'heart' },
    {
      label: 'Help & Support',
      path: '/profile/help-support',
      icon: 'help-circle',
    },
    { label: 'Sign Out', path: '/logout', icon: 'log-out' },
  ];

  const mobileMenuItems = [
    { label: 'Corporate', path: '/corporate', icon: 'building-2' },
    { label: 'Partner with us', path: '/partner', icon: 'handshake' },
    { label: 'Get The App', path: '/get-the-app', icon: 'smartphone' },
  ];

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = event => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="px-4 sm:px-6 py-4 sm:py-6 relative z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left side - Logo and Company Name */}
        <Link
          to="/"
          className="flex items-center space-x-3 sm:space-x-4 flex-shrink-0"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-2xl border-2 border-white flex items-center justify-center overflow-hidden">
            <img
              src="/assets/Cravo_logo.png"
              alt="Cravo Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="w-20 sm:w-28 md:w-32">
            <img
              src="/assets/Cravo_white_text_logo.png"
              alt="Cravo"
              className="w-full h-auto object-contain"
            />
          </div>
        </Link>

        {/* Right side - Navigation Links */}
        <div className="flex items-center space-x-2 sm:space-x-4 lg:space-x-6">
          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            <NavLink
              to="/corporate"
              className={({ isActive }) =>
                `flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 font-medium ${
                  isActive
                    ? 'text-yellow-600 bg-yellow-50'
                    : 'text-gray-800 hover:text-gray-600 hover:bg-gray-50'
                }`
              }
            >
              <Icon name="building-2" size={18} />
              <span className="text-md">Corporate</span>
            </NavLink>

            <NavLink
              to="/partner"
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-lg transition-all duration-200 font-medium ${
                  isActive
                    ? 'text-yellow-600 bg-yellow-50'
                    : 'text-gray-800 hover:text-gray-600 hover:bg-gray-50'
                }`
              }
            >
              <span className="text-md">Partner with us</span>
            </NavLink>

            <NavLink to="/get-the-app">
              <button className="flex items-center justify-center px-4 py-2 rounded-xl font-medium text-gray-800 transition-all duration-200 border border-gray-300 bg-gray-50 cursor-pointer hover:border-gray-400 hover:bg-gray-50 text-md">
                <Icon name="smartphone" size={16} className="mr-2" />
                Get The App
              </button>
            </NavLink>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden flex items-center justify-center p-2 rounded-lg text-gray-800 hover:bg-gray-50 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            ref={menuButtonRef}
          >
            <Icon name="menu" size={20} />
          </button>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div
              ref={mobileMenuRef}
              className="absolute top-full right-4 sm:right-6 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 lg:hidden z-50"
            >
              {mobileMenuItems.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 text-sm font-medium transition-colors duration-150 ${
                      isActive
                        ? 'text-yellow-600 bg-yellow-50'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`
                  }
                >
                  {item.icon && (
                    <Icon
                      name={item.icon}
                      size={16}
                      className="text-gray-500"
                    />
                  )}
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </div>
          )}

          {/* Authentication Section */}
          {isAuthenticated ? (
            <div
              className="relative"
              onMouseEnter={() => setIsProfileDropdownOpen(true)}
              onMouseLeave={() => setIsProfileDropdownOpen(false)}
            >
              <button className="flex items-center space-x-2 px-3 py-2 rounded-xl font-medium transition-all duration-200 hover:bg-gray-50 hover:scale-105 text-gray-700 hover:text-gray-900 border border-transparent hover:border-gray-200">
                <Icon name="user" size={18} />
                <span className="hidden sm:block text-md">Profile</span>
                <Icon
                  name="chevron-down"
                  size={14}
                  className={`transition-transform duration-200 ${
                    isProfileDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Profile Dropdown */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 top-full pt-2 z-50">
                  <div className="w-56 h-2 bg-transparent"></div>
                  <div className="w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2">
                    {profileMenuItems.map((item, index) => (
                      <Link
                        key={index}
                        to={item.path}
                        className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-150"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <Icon
                          name={item.icon}
                          size={16}
                          className="text-gray-500"
                        />
                        <span>{item.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              className="flex items-center space-x-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-xl font-medium text-gray-700 transition-all duration-200 border border-gray-200 hover:border-gray-300 hover:scale-105"
              onClick={() => dispatch(openAuthSidebar({ mode: 'login' }))}
            >
              <Icon name="log-in" size={16} className="text-blue-600" />
              <span className="font-medium text-gray-800 text-sm">Sign in</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default LandingNavigation;
