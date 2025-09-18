import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { selectCartTotalQuantity } from '../features/cart/cartSelectors';
import Icon from './ui/Icon';
// import { openAuthModal } from '../features/authModal/authModelSlice';
import { openAuthSidebar } from '../features/ui/uiSlice';
import { useDispatch } from 'react-redux';

// Simple, self-contained Button component
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

// SearchModal component will be rendered as a pop-up
const SearchModal = ({
  isOpen,
  onClose,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
}) => {
  // Return null if the modal is not open
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 transition-transform duration-300 transform scale-100 opacity-100">
        {/* Close button */}
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
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
              size={20}
            />
            <input
              type="text"
              placeholder="Search for restaurants, cuisines, or dishes..."
              value={searchQuery}
              onChange={onSearchChange}
              className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-800 font-medium transition-colors duration-200"
              autoFocus // Automatically focus the input when the modal opens
            />
          </div>
        </form>
        {/* You can add recent searches or popular suggestions here */}
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
  // State for mobile menu and search modal
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState('Indore, MP, India');

  const dispatch = useDispatch();
  const { isAuthenticated, user, role, token } = useSelector(
    state => state.auth
  );
  // console.log(isAuthenticated);
  console.log('user', user);
  console.log('role', role);
  console.log('token', token);

  const cartCount = useSelector(selectCartTotalQuantity);
  // console.log('Quantity of the products in the cart', cartCount);

  // Use useMemo to create the navItems array, so it only recomputes when dependencies change.
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
        label: 'Cart',
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
        path: '/profile',
        showOnMobile: true,
      });
    } else {
      // If not authenticated, add a "Sign In" button item
      baseNavItems.push({
        id: 'signin',
        label: 'Sign In',
        Iconname: 'login',
        action: () => dispatch(openAuthSidebar()),
        showOnMobile: true,
      });
    }

    return baseNavItems;
  }, [isAuthenticated, cartCount]);

  // Handle the search submission
  const handleSearchSubmit = e => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // In a real app, you'd navigate here, e.g., navigate(`/search?query=${searchQuery}`);
    setIsSearchModalOpen(false); // Close modal after search
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
        <div className="max-w-7xl mx-auto px-4 sm:px-3">
          {/* Top Row: Logo, Location, Search (Desktop), Desktop Nav, Mobile Toggle */}
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo Section */}
            <Link
              to="/"
              className="flex items-center space-x-3 cursor-pointer flex-shrink-0"
            >
              <div className="w-8 h-8 sm:w-15 sm:h-15 rounded-2xl border-2 border-white flex items-center justify-center">
                {/* Fallback to simple icon if image is not found */}
                <img
                  src={`/assets/Cravo_logo.png`}
                  alt="Cravo Logo"
                  onError={e => {
                    e.target.onerror = null;
                    e.target.src =
                      'https://placehold.co/60x60/fde047/6b7280?text=C';
                  }}
                />
              </div>
              <div className="w-10 sm:w-32 hidden sm:block">
                <img
                  src={`/assets/Cravo_text_black_logo_without_bg.png`}
                  alt="Cravo Text Logo"
                  onError={e => {
                    e.target.onerror = null;
                    e.target.src =
                      'https://placehold.co/128x38/fde047/6b7280?text=Cravo';
                  }}
                />
              </div>
            </Link>

            {/* Location & Search section (Desktop & Mobile) */}
            <div className="hidden sm:flex flex-1 items-center space-x-4 ml-6 mr-auto">
              {/* Location display */}
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

              {/* Smaller Search field that opens modal */}
              {showSearch && (
                <div
                  className="hidden lg:flex items-center space-x-2 px-3 py-1.5 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200 transition-colors max-w-xs"
                  onClick={openSearchModal}
                >
                  <Icon name="search" size={18} className="text-gray-500" />
                  <span className="text-gray-500 text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                    Search for food, restaurants...
                  </span>
                </div>
              )}
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2 flex-shrink-0">
              {navItems.map(item =>
                item.action ? (
                  <button
                    key={item.id}
                    onClick={item.action}
                    className="relative  cursor-pointer flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 hover:bg-gray-50 hover:scale-105 text-gray-700 hover:text-gray-900"
                  >
                    <Icon name={item.Iconname} size={18} />
                    <span className="hidden xl:block">{item.label}</span>
                  </button>
                ) : (
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
                    {/* Badge & Count */}
                    {item.badge && (
                      <span className="absolute -top-1 -right-1 bg-yellow-400 text-gray-800 text-xs font-bold px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                    {item.count && (
                      <span className="absolute -top-0.5 -right-1 bg-green-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                        {/* {item.count > 99 ? '99+' : item.count} */}
                        {cartCount > 99 ? '99+' : `  ${cartCount}`}
                      </span>
                    )}
                  </NavLink>
                )
              )}
            </div>

            {/* Mobile Menu Button & Search Icon */}
            <div className="sm:hidden flex items-center space-x-2 flex-shrink-0">
              {showSearch && (
                <Button
                  onClick={openSearchModal}
                  className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
                  aria-label="Open search"
                >
                  <Icon name={'search'} size={24} className="text-gray-600" />
                </Button>
              )}
              <Button
                onClick={toggleMobileMenu}
                className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
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
            </div>
          </div>

          {/* Mobile Navigation Menu (expands downwards) */}
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
                  item.action ? (
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
                CravingCart - Satisfy Your Cravings
              </p>
            </div>
          </div>
        </div>
      </nav>
      {/* Render the search modal */}
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
