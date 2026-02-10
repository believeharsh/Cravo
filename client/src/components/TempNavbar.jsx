import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import { logoutUser } from '../features/auth/authSlice';
import { selectCartTotalQuantity } from '../features/cart/cartSelectors';
import { openAuthSidebar } from '../features/ui/uiSlice';
import Icon from './ui/Icon';

// The Button component is self-contained and doesn't need changes.
const Button = ({
  children,
  onClick,
  className = '',
  variant = 'default',
  ...props
}) => {
  const baseStyles =
    'px-4 py-2 rounded-xl font-medium transition-all duration-200';
  const variantStyles = {
    default: 'bg-gray-200 text-text-main hover:bg-gray-300',
    primary: 'bg-primary text-text-main hover:bg-primary-hover',
    ghost: 'bg-transparent text-gray-400 hover:bg-gray-100',
  };
  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// The SearchModal component is also well-structured and doesn't need changes.
const SearchModal = ({
  isOpen,
  onClose,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
}) => {
  if (!isOpen) return null;

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-start justify-center bg-black p-4 backdrop-blur-sm transition-opacity duration-300">
      <div className="relative w-full max-w-2xl scale-100 transform rounded-2xl bg-white p-6 opacity-100 shadow-xl transition-transform duration-300">
        <Button
          onClick={onClose}
          className="hover:text-text-secondary absolute top-4 right-4 text-gray-400 transition-colors"
          variant="ghost"
        >
          <Icon name="x" size={24} />
        </Button>
        <h2 className="text-text-main mb-6 text-2xl font-bold">Search</h2>
        <form onSubmit={onSearchSubmit} className="relative w-full">
          <div className="relative">
            <Icon
              name="search"
              className="text-text-muted absolute top-1/2 left-4 -translate-y-1/2 transform cursor-pointer"
              size={20}
            />
            <input
              type="text"
              placeholder="Search for restaurants, cuisines, or dishes..."
              value={searchQuery}
              onChange={onSearchChange}
              className="text-text-main w-full rounded-xl bg-gray-100 py-3 pr-4 pl-12 font-medium transition-colors duration-200 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              autoFocus
            />
          </div>
        </form>
        <div className="mt-6">
          <p className="text-text-muted text-sm">
            Start typing to explore options...
          </p>
        </div>
      </div>
    </div>
  );
};

const Navbar = ({ showSearch = true, visibilty }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState('Indore, MP, India');
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user, role, token } = useSelector(
    state => state.auth
  );

  const cartCount = useSelector(selectCartTotalQuantity);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setIsProfileDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileDropdownRef]);

  const navItems = useMemo(() => {
    const baseNavItems = [
      {
        id: 'offers',
        label: 'Offers',
        Iconname: 'tag',
        path: '/offers',
        badge: 'New',
        showOnMobile: true,
      },
      {
        id: 'corporate',
        label: 'Corporate',
        Iconname: 'building2',
        path: '/corporate',
        showOnMobile: true,
      },
      {
        id: 'help',
        label: 'Help',
        Iconname: 'help-circle',
        path: '/help',
        showOnMobile: true,
      },
      {
        id: 'cart',
        label: 'Cart ',
        Iconname: 'shopping-cart',
        path: '/cart',
        count: cartCount,
        showOnMobile: true,
      },
    ];

    if (isAuthenticated) {
      baseNavItems.push({
        id: 'profile',
        label: 'Profile',
        Iconname: 'user',
        path: '/profile/account', // Path for mobile
        action: () => setIsProfileDropdownOpen(prev => !prev), // Action for desktop
        showOnMobile: true,
      });
    } else {
      baseNavItems.push({
        id: 'signin',
        label: 'Sign In',
        Iconname: 'login',
        action: () => dispatch(openAuthSidebar()),
        showOnMobile: true,
      });
    }

    return baseNavItems;
  }, [isAuthenticated, cartCount, dispatch]);

  const handleSearchSubmit = e => {
    e.preventDefault();
    setIsSearchModalOpen(false);
  };

  const openSearchModal = () => {
    setIsSearchModalOpen(true);
  };

  const closeSearchModal = () => {
    setIsSearchModalOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav
        className={`border-border top-0 z-50 border-b bg-white shadow-sm ${visibilty}`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between lg:h-20">
            <Link
              to="/"
              className="flex flex-shrink-0 items-center space-x-2 sm:space-x-3"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-white sm:h-14 sm:w-14 md:h-16 md:w-16">
                <img
                  src={`/assets/Cravo_logo.png`}
                  alt="Cravo Logo"
                  className="rounded-xl"
                  onError={e => {
                    e.target.onerror = null;
                    e.target.src =
                      'https://placehold.co/60x60/fde047/6b7280?text=C';
                  }}
                />
              </div>
            </Link>

            <div className="mr-auto ml-6 hidden flex-1 items-center space-x-4 sm:flex">
              <div className="text-text-secondary group flex cursor-pointer items-center space-x-2 transition-colors hover:text-yellow-600">
                <Icon
                  name="map-pin"
                  size={20}
                  className="text-gray-400 transition-colors group-hover:text-yellow-500"
                />
                <span className="hidden text-sm font-medium sm:inline md:text-base">
                  {userLocation}
                </span>
                <Icon
                  name="chevron-down"
                  size={20}
                  className="text-gray-400 transition-colors group-hover:text-yellow-500"
                />
              </div>

              {showSearch && (
                <div
                  className="hidden max-w-xs cursor-pointer items-center space-x-2 rounded-full bg-gray-100 px-4 py-2 transition-colors hover:bg-gray-200 lg:flex"
                  onClick={openSearchModal}
                >
                  <Icon name="search" size={18} className="text-text-muted" />
                  <span className="text-text-muted overflow-hidden text-sm font-medium text-ellipsis whitespace-nowrap">
                    Search for food, restaurants...
                  </span>
                </div>
              )}
            </div>

            <div className="hidden flex-shrink-0 items-center space-x-2 lg:flex">
              {navItems.map(item => {
                // Special case for profile with dropdown
                if (item.id === 'profile') {
                  return (
                    <div
                      key={item.id}
                      className="relative"
                      ref={profileDropdownRef}
                    >
                      <button
                        onClick={item.action}
                        className={`hover:bg-bg-subtle relative flex cursor-pointer items-center space-x-2 rounded-xl px-4 py-2 font-medium transition-all duration-200 hover:scale-105 ${
                          isProfileDropdownOpen
                            ? 'bg-yellow-50 text-yellow-600'
                            : 'text-text-secondary hover:text-text-main'
                        }`}
                      >
                        <Icon name={item.Iconname} size={18} />
                        <span className="hidden xl:block">{item.label}</span>
                        <Icon
                          name="chevron-down"
                          size={18}
                          className={`transition-transform duration-200 ${
                            isProfileDropdownOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {isProfileDropdownOpen && (
                        <div className="absolute top-full right-0 z-50 mt-2 w-56 rounded-sm bg-white shadow-lg">
                          <div className="py-1">
                            {/* Account */}
                            <Link
                              to="/profile/account"
                              className="text-text-secondary flex items-center px-4 py-2 text-sm hover:bg-gray-100"
                              onClick={() => setIsProfileDropdownOpen(false)}
                            >
                              <Icon name="user" size={16} className="mr-2" />
                              Account
                            </Link>

                            {/* Settings */}
                            <Link
                              to="/profile/settings"
                              className="text-text-secondary flex items-center px-4 py-2 text-sm hover:bg-gray-100"
                              onClick={() => setIsProfileDropdownOpen(false)}
                            >
                              <Icon
                                name="settings"
                                size={16}
                                className="mr-2"
                              />
                              Settings
                            </Link>

                            {/* Favorites */}
                            <Link
                              to="/profile/favorites"
                              className="text-text-secondary flex items-center px-4 py-2 text-sm hover:bg-gray-100"
                              onClick={() => setIsProfileDropdownOpen(false)}
                            >
                              <Icon name="heart" size={16} className="mr-2" />
                              Favorites
                            </Link>

                            {/* Orders */}
                            <Link
                              to="/profile/orders"
                              className="text-text-secondary flex items-center px-4 py-2 text-sm hover:bg-gray-100"
                              onClick={() => setIsProfileDropdownOpen(false)}
                            >
                              <Icon
                                name="shopping-bag"
                                size={16}
                                className="mr-2"
                              />
                              Orders
                            </Link>

                            {/* Help & Support */}
                            <Link
                              to="/help"
                              className="text-text-secondary flex items-center px-4 py-2 text-sm hover:bg-gray-100"
                              onClick={() => setIsProfileDropdownOpen(false)}
                            >
                              <Icon
                                name="help-circle"
                                size={16}
                                className="mr-2"
                              />
                              Help & Support
                            </Link>

                            {/* Logout */}
                            <button
                              onClick={() => {
                                setIsProfileDropdownOpen(false);
                                dispatch(logoutUser());
                                navigate('/');
                              }}
                              className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                            >
                              <Icon name="log-out" size={16} className="mr-2" />
                              Logout
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                // Normal button for sign-in
                if (item.action) {
                  return (
                    <button
                      key={item.id}
                      onClick={item.action}
                      className="hover:bg-bg-subtle text-text-secondary hover:text-text-main relative flex cursor-pointer items-center space-x-2 rounded-xl px-4 py-2 font-medium transition-all duration-200 hover:scale-105"
                    >
                      <Icon name={item.Iconname} size={18} />
                      <span className="hidden xl:block">{item.label}</span>
                    </button>
                  );
                }

                // Normal NavLink
                return (
                  <NavLink
                    key={item.id}
                    to={item.path}
                    className={({ isActive }) =>
                      `hover:bg-bg-subtle relative flex items-center space-x-2 rounded-xl px-4 py-2 font-medium transition-all duration-200 hover:scale-105 ${
                        isActive
                          ? 'bg-yellow-50 text-yellow-600'
                          : 'text-text-secondary hover:text-text-main'
                      }`
                    }
                  >
                    <Icon name={item.Iconname} size={18} />
                    <span className="hidden xl:block">{item.label}</span>
                    {item.badge && (
                      <span className="bg-primary text-text-main absolute -top-1 -right-1 rounded-full px-2 py-0.5 text-xs font-bold">
                        {item.badge}
                      </span>
                    )}
                    {item.count && (
                      <span className="absolute -top-0.5 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-xs font-bold text-white">
                        {cartCount > 99 ? '99+' : `${cartCount}`}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>

            <div className="flex flex-shrink-0 items-center space-x-2 sm:hidden">
              {showSearch && (
                <Button
                  onClick={openSearchModal}
                  className="rounded-xl p-2"
                  variant="ghost"
                  aria-label="Open search"
                >
                  <Icon
                    name={'search'}
                    size={24}
                    className="text-text-secondary"
                  />
                </Button>
              )}
              <Button
                onClick={toggleMobileMenu}
                className="rounded-xl p-2"
                variant="ghost"
                aria-label={
                  isMobileMenuOpen ? 'Close mobile menu' : 'Open mobile menu'
                }
              >
                {isMobileMenuOpen ? (
                  <Icon name={'x'} size={24} className="text-text-secondary" />
                ) : (
                  <Icon
                    name={'menu'}
                    size={24}
                    className="text-text-secondary"
                  />
                )}
              </Button>
              <div className="flex items-center">
                <NavLink
                  to="/cart"
                  className="relative rounded-xl p-2 transition-colors hover:bg-gray-100"
                >
                  <Icon
                    name={'shopping-cart'}
                    size={24}
                    className="text-text-secondary"
                  />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-xs font-bold text-white">
                      {cartCount > 99 ? '99+' : cartCount}
                    </span>
                  )}
                </NavLink>
              </div>
            </div>
          </div>

          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out lg:hidden ${
              isMobileMenuOpen
                ? 'max-h-screen opacity-100'
                : 'max-h-0 opacity-0'
            }`}
          >
            <div className="border-border space-y-2 border-t py-4">
              <div className="text-text-secondary flex items-center space-x-3 rounded-xl p-4">
                <Icon name="map-pin" size={20} className="text-gray-400" />
                <span>{userLocation}</span>
              </div>
              {navItems
                .filter(item => item.showOnMobile)
                .map(item =>
                  item.action && item.id !== 'profile' ? (
                    <button
                      key={item.id}
                      onClick={() => {
                        item.action();
                        toggleMobileMenu();
                      }}
                      className="text-text-secondary hover:bg-bg-subtle flex w-full items-center justify-between rounded-xl p-4 font-medium transition-all duration-200"
                    >
                      <div className="flex items-center space-x-3">
                        <Icon name={item.Iconname} size={20} />
                        <span>{item.label}</span>
                      </div>
                      <Icon
                        name="chevron-right"
                        size={16}
                        className="text-gray-400"
                      />
                    </button>
                  ) : (
                    <NavLink
                      key={item.id}
                      to={item.path}
                      onClick={toggleMobileMenu}
                      className={({ isActive }) =>
                        `flex w-full items-center justify-between rounded-xl p-4 font-medium transition-all duration-200 ${
                          isActive
                            ? 'border border-yellow-200 bg-yellow-50 text-yellow-600'
                            : 'text-text-secondary hover:bg-bg-subtle'
                        }`
                      }
                    >
                      <div className="flex items-center space-x-3">
                        <Icon name={item.Iconname} size={20} />
                        <span>{item.label}</span>
                      </div>
                      <Icon
                        name="chevron-right"
                        size={16}
                        className="text-gray-400"
                      />
                    </NavLink>
                  )
                )}
            </div>
            <div className="bg-bg-subtle border-border border-t p-4">
              <p className="text-text-secondary text-center text-sm">
                Cravo - Satisfy Your Cravings
              </p>
            </div>
          </div>
        </div>
      </nav>
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={closeSearchModal}
        searchQuery={searchQuery}
        onSearchChange={e => setSearchQuery(e.target.value)}
        onSearchSubmit={handleSearchSubmit}
      />
    </>
  );
};

export default Navbar;
