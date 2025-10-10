import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { selectCartTotalQuantity } from '../../features/cart/cartSelectors';
import { openAuthSidebar } from '../../features/ui/uiSlice';
import Icon from '../ui/Icon';
import Button from '../ui/Button';
import SearchModal from '../modules/Search/SearchModal';
import MobileMenu from './MobileMenu';
import { getNavItems } from './NavbarConfig';
import ProfileDropdown from './ProfileDropDown';

const Navbar = ({ showSearch = true, visibilty }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // profile button dropdown state
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const dispatch = useDispatch();
  const { isAuthenticated, user, role, token } = useSelector(
    state => state.auth
  );
  const cartCount = useSelector(selectCartTotalQuantity);

  // current selected location fetching from loction slice state
  const userLocation = useSelector(state => state.location);
  const { city, regionName, country } = userLocation;

  const CurrentLocation = `${city}, ${regionName ? regionName : ''}, ${country ? country : ''}`;

  const navItems = useMemo(() => {
    return getNavItems(
      isAuthenticated,
      cartCount,
      dispatch,
      openAuthSidebar,
      setIsProfileDropdownOpen
    );
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
            {/* Logo */}
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

            {/* Location & Search - Desktop */}
            <div className="hidden sm:flex flex-1 items-center space-x-4 ml-6 mr-auto">
              <div className="flex items-center space-x-2 text-gray-700 hover:text-yellow-600 transition-colors cursor-pointer group">
                <Icon
                  name="map-pin"
                  size={20}
                  className="text-gray-400 group-hover:text-yellow-500 transition-colors"
                />
                <span className="font-medium text-sm md:text-base hidden sm:inline">
                  {CurrentLocation}
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

            {/* Desktop Navigation Items */}
            <div className="hidden md:flex items-center space-x-2 flex-shrink-0">
              {navItems.map(item => {
                // Profile dropdown
                if (item.id === 'profile') {
                  return (
                    <ProfileDropdown
                      key={item.id}
                      isOpen={isProfileDropdownOpen}
                      onClose={() => setIsProfileDropdownOpen(false)}
                      onToggle={() => setIsProfileDropdownOpen(prev => !prev)}
                    />
                  );
                }

                // Sign-in button
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

                // Regular navigation links
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

            {/* Mobile Controls */}
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

          {/* Mobile Menu */}
          <MobileMenu
            isOpen={isMobileMenuOpen}
            navItems={navItems}
            userLocation={CurrentLocation}
            onClose={toggleMobileMenu}
          />
        </div>
      </nav>

      {/* Search Modal */}
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
