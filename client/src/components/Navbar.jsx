import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { selectCartTotalQuantity } from '../features/cart/cartSelectors';
import { openAuthSidebar } from '../features/ui/uiSlice';
import Icon from './ui/Icon';
import { logoutUser } from '../features/auth/authSlice';

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
    default: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    primary: 'bg-yellow-400 text-gray-800 hover:bg-yellow-500',
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
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 transition-transform duration-300 transform scale-100 opacity-100">
        <Button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          variant="ghost"
        >
          <Icon name="x" size={24} />
        </Button>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Search</h2>
        <form onSubmit={onSearchSubmit} className="w-full relative">
          <div className="relative">
            <Icon
              name="search"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              size={20}
            />
            <input
              type="text"
              placeholder="Search for restaurants, cuisines, or dishes..."
              value={searchQuery}
              onChange={onSearchChange}
              className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-800 font-medium transition-colors duration-200"
              autoFocus
            />
          </div>
        </form>
        <div className="mt-6">
          <p className="text-sm text-gray-500">
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
        className={`bg-white border-b border-gray-200 top-0 z-50 shadow-sm ${visibilty}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link
              to="/"
              className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl border-2 border-white flex items-center justify-center">
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

            <div className="hidden sm:flex flex-1 items-center space-x-4 ml-6 mr-auto">
              <div className="flex items-center space-x-2 text-gray-700 hover:text-yellow-600 transition-colors cursor-pointer group">
                <Icon
                  name="map-pin"
                  size={20}
                  className="text-gray-400 group-hover:text-yellow-500 transition-colors"
                />
                <span className="font-medium text-sm md:text-base hidden sm:inline">
                  {userLocation}
                </span>
                <Icon
                  name="chevron-down"
                  size={20}
                  className="text-gray-400 group-hover:text-yellow-500 transition-colors"
                />
              </div>

              {showSearch && (
                <div
                  className="hidden lg:flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200 transition-colors max-w-xs"
                  onClick={openSearchModal}
                >
                  <Icon name="search" size={18} className="text-gray-500" />
                  <span className="text-gray-500 text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                    Search for food, restaurants...
                  </span>
                </div>
              )}
            </div>

            <div className="hidden lg:flex items-center space-x-2 flex-shrink-0">
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
                        className={`relative cursor-pointer flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 hover:bg-gray-50 hover:scale-105 ${
                          isProfileDropdownOpen
                            ? 'bg-yellow-50 text-yellow-600'
                            : 'text-gray-700 hover:text-gray-900'
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
                        <div className="absolute top-full mt-2 right-0 w-56 bg-white rounded-sm shadow-lg z-50">
                          <div className="py-1">
                            {/* Account */}
                            <Link
                              to="/profile/account"
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => setIsProfileDropdownOpen(false)}
                            >
                              <Icon name="user" size={16} className="mr-2" />
                              Account
                            </Link>

                            {/* Settings */}
                            <Link
                              to="/profile/settings"
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
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
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => setIsProfileDropdownOpen(false)}
                            >
                              <Icon name="heart" size={16} className="mr-2" />
                              Favorites
                            </Link>

                            {/* Orders */}
                            <Link
                              to="/profile/orders"
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
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
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
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
                }

                // Normal button for sign-in
                if (item.action) {
                  return (
                    <button
                      key={item.id}
                      onClick={item.action}
                      className="relative cursor-pointer flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 hover:bg-gray-50 hover:scale-105 text-gray-700 hover:text-gray-900"
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
                      `relative flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 hover:bg-gray-50 hover:scale-105 ${
                        isActive
                          ? 'bg-yellow-50 text-yellow-600'
                          : 'text-gray-700 hover:text-gray-900'
                      }`
                    }
                  >
                    <Icon name={item.Iconname} size={18} />
                    <span className="hidden xl:block">{item.label}</span>
                    {item.badge && (
                      <span className="absolute -top-1 -right-1 bg-yellow-400 text-gray-800 text-xs font-bold px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                    {item.count && (
                      <span className="absolute -top-0.5 -right-1 bg-green-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                        {cartCount > 99 ? '99+' : `${cartCount}`}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>

            <div className="sm:hidden flex items-center space-x-2 flex-shrink-0">
              {showSearch && (
                <Button
                  onClick={openSearchModal}
                  className="p-2 rounded-xl"
                  variant="ghost"
                  aria-label="Open search"
                >
                  <Icon name={'search'} size={24} className="text-gray-600" />
                </Button>
              )}
              <Button
                onClick={toggleMobileMenu}
                className="p-2 rounded-xl"
                variant="ghost"
                aria-label={
                  isMobileMenuOpen ? 'Close mobile menu' : 'Open mobile menu'
                }
              >
                {isMobileMenuOpen ? (
                  <Icon name={'x'} size={24} className="text-gray-600" />
                ) : (
                  <Icon name={'menu'} size={24} className="text-gray-600" />
                )}
              </Button>
              <div className="flex items-center">
                <NavLink
                  to="/cart"
                  className="relative p-2 rounded-xl transition-colors hover:bg-gray-100"
                >
                  <Icon
                    name={'shopping-cart'}
                    size={24}
                    className="text-gray-600"
                  />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                      {cartCount > 99 ? '99+' : cartCount}
                    </span>
                  )}
                </NavLink>
              </div>
            </div>
          </div>

          <div
            className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              isMobileMenuOpen
                ? 'max-h-screen opacity-100'
                : 'max-h-0 opacity-0'
            }`}
          >
            <div className="py-4 border-t border-gray-200 space-y-2">
              <div className="flex items-center space-x-3 p-4 rounded-xl text-gray-700">
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
                      className="w-full flex items-center justify-between p-4 rounded-xl font-medium transition-all duration-200 text-gray-700 hover:bg-gray-50"
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
                        `w-full flex items-center justify-between p-4 rounded-xl font-medium transition-all duration-200 ${
                          isActive
                            ? 'bg-yellow-50 text-yellow-600 border border-yellow-200'
                            : 'text-gray-700 hover:bg-gray-50'
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
            <div className="p-4 bg-gray-50 border-t border-gray-200">
              <p className="text-sm text-gray-600 text-center">
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
