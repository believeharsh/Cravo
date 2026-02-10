import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import Icon from '../../../components/ui/Icon';
import LoadingSpinner from '../../../components/ui/LoadingSpinner';
import { logoutUser } from '../../../features/auth/authSlice';
import { openAuthSidebar } from '../../../features/ui/uiSlice';

const LandingNavigation = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, isAuthChecking } = useSelector(state => state.auth);

  const navigate = useNavigate();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const mobileMenuRef = useRef(null);
  const menuButtonRef = useRef(null);

  const handleSignOut = () => {
    dispatch(logoutUser());
    setIsProfileDropdownOpen(false);
    navigate('/');
  };

  const profileMenuItems = [
    { label: 'Account', path: '/profile/account', icon: 'user', type: 'link' },
    {
      label: 'Account Settings',
      path: '/profile/settings',
      icon: 'settings',
      type: 'link',
    },
    {
      label: 'My Orders',
      path: '/profile/orders',
      icon: 'package',
      type: 'link',
    },
    {
      label: 'Favorites',
      path: '/profile/favorites',
      icon: 'heart',
      type: 'link',
    },
    {
      label: 'Help & Support',
      path: '/profile/help-support',
      icon: 'help-circle',
      type: 'link',
    },
    // ⚡️ Define Sign Out as a 'button' type ⚡️
    {
      label: 'Sign Out',
      icon: 'log-out',
      type: 'button',
      onClick: handleSignOut,
    },
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
    <nav className="relative z-50 px-4 py-4 sm:px-6 sm:py-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Left side - Logo and Company Name (omitted for brevity) */}
        <Link
          to="/"
          className="flex flex-shrink-0 items-center space-x-3 sm:space-x-4"
        >
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl border-2 border-white sm:h-14 sm:w-14">
            <img
              src="/assets/Cravo_logo.png"
              alt="Cravo Logo"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="w-20 sm:w-28 md:w-32">
            <img
              src="/assets/Cravo_white_text_logo.png"
              alt="Cravo"
              className="h-auto w-full object-contain"
            />
          </div>
        </Link>

        {/* Right side - Navigation Links (omitted for brevity) */}
        <div className="flex items-center space-x-2 sm:space-x-4 lg:space-x-6">
          <div className="hidden items-center space-x-4 lg:flex xl:space-x-6">
            <NavLink
              to="/corporate"
              className={({ isActive }) =>
                `flex items-center space-x-2 rounded-lg px-3 py-2 font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-yellow-50 text-yellow-600'
                    : 'text-text-main hover:text-text-secondary hover:bg-bg-subtle'
                }`
              }
            >
              <Icon name="building-2" size={18} />
              <span className="text-md">Corporate</span>
            </NavLink>
            {/* ... other desktop links ... */}
            <NavLink
              to="/partner"
              className={({ isActive }) =>
                `flex items-center rounded-lg px-3 py-2 font-medium transition-all duration-200 ${isActive ? 'bg-yellow-50 text-yellow-600' : 'text-text-main hover:text-text-secondary hover:bg-bg-subtle'}`
              }
            >
              <span className="text-md">Partner with us</span>
            </NavLink>
            <NavLink to="/get-the-app">
              <button className="text-text-main bg-bg-subtle hover:bg-bg-subtle text-md flex cursor-pointer items-center justify-center rounded-xl border border-gray-300 px-4 py-2 font-medium transition-all duration-200 hover:border-gray-400">
                <Icon name="smartphone" size={16} className="mr-2" />
                Get The App
              </button>
            </NavLink>
          </div>

          {/* Mobile menu button and dropdown (omitted for brevity) */}
          <button
            className="text-text-main hover:bg-bg-subtle flex items-center justify-center rounded-lg p-2 transition-colors lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            ref={menuButtonRef}
          >
            <Icon name="menu" size={20} />
          </button>
          {isMobileMenuOpen && (
            <div
              ref={mobileMenuRef}
              className="border-border absolute top-full right-4 z-50 mt-2 w-56 rounded-xl border bg-white py-2 shadow-lg sm:right-6 lg:hidden"
            >
              {mobileMenuItems.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 text-sm font-medium transition-colors duration-150 ${
                      isActive
                        ? 'bg-yellow-50 text-yellow-600'
                        : 'text-text-secondary hover:bg-bg-subtle'
                    }`
                  }
                >
                  {item.icon && (
                    <Icon
                      name={item.icon}
                      size={16}
                      className="text-text-muted"
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
              <button className="hover:bg-bg-subtle text-text-secondary hover:text-text-main hover:border-border flex items-center space-x-2 rounded-xl border border-transparent px-3 py-2 font-medium transition-all duration-200 hover:scale-105">
                <Icon name="user" size={18} />
                <span className="text-md hidden sm:block">Profile</span>
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
                <div className="absolute top-full right-0 z-50 pt-2">
                  <div className="h-2 w-56 bg-transparent"></div>
                  <div className="border-border w-56 rounded-xl border bg-white py-2 shadow-lg">
                    {profileMenuItems.map((item, index) => {
                      // ⚡️ CONDITIONAL RENDERING LOGIC ⚡️
                      if (item.type === 'link') {
                        return (
                          <Link
                            key={index}
                            to={item.path}
                            className="text-text-secondary hover:bg-bg-subtle hover:text-text-main flex items-center space-x-3 px-4 py-3 text-sm transition-colors duration-150"
                            onClick={() => setIsProfileDropdownOpen(false)}
                          >
                            <Icon
                              name={item.icon}
                              size={16}
                              className="text-text-muted"
                            />
                            <span>{item.label}</span>
                          </Link>
                        );
                      }

                      // Render Sign Out as a button
                      return (
                        <button
                          key={index}
                          onClick={item.onClick}
                          className="text-text-secondary hover:bg-bg-subtle flex w-full items-center space-x-3 px-4 py-3 text-sm transition-colors duration-150 hover:text-red-600"
                        >
                          <Icon
                            name={item.icon}
                            size={16}
                            className="text-red-500"
                          />
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="">
              {/* {isAuthChecking ? (
                <button className="flex items-center space-x-2 px-4 py-2 rounded-xl font-medium text-text-secondary transition-all duration-200 hover:scale-105">
                  <LoadingSpinner />
                </button>
              ) : ( */}
              <button
                className="bg-bg-subtle text-text-secondary border-border flex items-center space-x-2 rounded-xl border px-4 py-2 font-medium transition-all duration-200 hover:scale-105 hover:border-gray-300 hover:bg-gray-100"
                onClick={() => dispatch(openAuthSidebar({ mode: 'login' }))}
              >
                <Icon name="log-in" size={16} className="text-blue-600" />
                <span className="text-text-main text-sm font-medium">
                  {/* {!isAuthenticated ? 'Sign in' : ''} */}
                  Sign in
                </span>
              </button>
              {/* )} */}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default LandingNavigation;
