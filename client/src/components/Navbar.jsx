import React, { useState, useMemo } from "react"; 
import { Link, NavLink } from "react-router-dom";
import Icon from "./ui/Icon";
import Button from "../components/ui/Button"
import { useSelector } from "react-redux";

const Navbar = ({ showSearch = true, cartCount = 0 }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { isAuthenticated } = useSelector((state) => state.auth);

  // Use useMemo to create the navItems array,
  // so it only recomputes when isAuthenticated or cartCount changes.
  const navItems = useMemo(() => {
    const baseNavItems = [
      {
        id: "offers",
        label: "Offers",
        Iconname: "tag",
        path: "/offers",
        badge: "New",
        showOnMobile: true,
      },
      {
        id: "corporate",
        label: "Corporate",
        Iconname: "building2",
        path: "/corporate",
        showOnMobile: true,
      },
      {
        id: "help",
        label: "Help",
        Iconname: "help-circle",
        path: "/help",
        showOnMobile: true,
      },
      {
        id: "cart",
        label: "Cart",
        Iconname: "shopping-cart",
        path: "/cart",
        count: cartCount,
        showOnMobile: true,
      },
    ];

    if (isAuthenticated) {
      baseNavItems.push({
        id: "profile",
        label: "Profile",
        Iconname: "user",
        path: "/profile",
        showOnMobile: true,
      });
    } else {
      // If not authenticated, add a "Sign In" button item
      baseNavItems.push({
        id: "signin",
        label: "Sign In",
        Iconname: "login", 
        path: "/auth/signin",
        // isButton: true, 
        showOnMobile: true,
      });
    }

    return baseNavItems;
  }, [isAuthenticated, cartCount]); // Depend on these values

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // In a real app, you'd likely use navigate('/search-results?query=' + searchQuery)
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-3">
          {/* Top Row: Logo, Search (Desktop), Desktop Nav, Mobile Toggle */}
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo Section */}
            <Link to="/" className="flex items-center space-x-3 cursor-pointer">
              <div className="w-8 h-8 sm:w-15 sm:h-15 rounded-2xl border-2 border-white flex items-center justify-center">
                <img src={`/assets/Cravo_logo.png`} alt="Cravo Logo" />
              </div>
              <div className="w-10 sm:w-32 ">
                <img
                  src={`/assets/Cravo_text_black_logo_without_bg.png`}
                  alt="Cravo Text Logo"
                />
              </div>
            </Link>

            {/* Search Bar (Desktop) */}
            {showSearch && (
              <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
                <form onSubmit={handleSearch} className="w-full relative">
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
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setIsSearchFocused(true)}
                      onBlur={() => setIsSearchFocused(false)}
                      className="w-full pl-12 pr-4 py-3 border-2  border-gray-200 rounded-xl focus:outline-none focus:border-yellow-400 text-gray-800 font-medium transition-colors duration-200"
                    />
                    {isSearchFocused && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg p-4 z-10">
                        <p className="text-sm text-gray-600">
                          Start typing to search...
                        </p>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            )}

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2">
              {navItems.map((item) => {
                if (!item.path) return null; // Should not happen with the current setup
                
                // Conditional rendering for authenticated user
                if (!isAuthenticated) {
                  return (
                    <NavLink
                    key={item.id}
                    to={item.path}
                    className={({ isActive }) =>
                      `relative flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 hover:bg-gray-50 hover:scale-105 ${
                        isActive
                          ? "bg-yellow-50 text-yellow-600"
                          : "text-gray-700 hover:text-gray-900"
                      }`
                    }
                  >
                    <Icon name={item.Iconname} size={18} />
                    <span className="hidden xl:block">{item.label}</span>

                    </NavLink>
                    
                  );
                }

                return (
                  <NavLink
                    key={item.id}
                    to={item.path}
                    className={({ isActive }) =>
                      `relative flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 hover:bg-gray-50 hover:scale-105 ${
                        isActive
                          ? "bg-yellow-50 text-yellow-600"
                          : "text-gray-700 hover:text-gray-900"
                      }`
                    }
                  >
                    <Icon name={item.Iconname} size={18} />
                    <span className="hidden xl:block">{item.label}</span>

                    {/* Badge */}
                    {item.badge && (
                      <span className="absolute -top-1 -right-1 bg-yellow-400 text-gray-800 text-xs font-bold px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}

                    {/* Count */}
                    {item.count > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                        {item.count > 99 ? "99+" : item.count}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <Button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
              aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
            >
              {isMobileMenuOpen ? (
                <Icon name={"x"} size={24} className="text-gray-600" />
              ) : (
                <Icon name={"menu"} size={24} className="text-gray-600" />
              )}
            </Button>
          </div>

          {/* Mobile Search Bar (always visible below the top row on mobile) */}
          {showSearch && (
            <div className="lg:hidden pb-4">
              <form onSubmit={handleSearch} className="relative">
                <Icon
                  name={"search"}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search restaurants, food..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-yellow-400 text-gray-800 font-medium"
                />
              </form>
            </div>
          )}

          {/* Mobile Navigation Menu (expands downwards) */}
          <div
            className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="py-4 border-t border-gray-200 space-y-2">
              {navItems
                .filter((item) => item.showOnMobile)
                .map((item) => {
                  // Conditional rendering for button vs. NavLink in mobile menu
                  if (item.isButton) {
                    return (
                      <Link key={item.id} to={item.path} onClick={toggleMobileMenu}>
                        <Button
                          variant="primary"
                          className="w-full justify-center py-3" // Make button full width and center text for mobile
                        >
                          <Icon name={item.Iconname} size={20} className="mr-3" />
                          <span>{item.label}</span>
                        </Button>
                      </Link>
                    );
                  }

                  return (
                    <NavLink
                      key={item.id}
                      to={item.path}
                      onClick={toggleMobileMenu} // Close menu on item click
                      className={({ isActive }) =>
                        `w-full flex items-center justify-between p-4 rounded-xl font-medium transition-all duration-200 ${
                          isActive
                            ? "bg-yellow-50 text-yellow-600 border border-yellow-200"
                            : "text-gray-700 hover:bg-gray-50"
                        }`
                      }
                    >
                      <div className="flex items-center space-x-3">
                        <Icon name={item.Iconname} size={20} />
                        <span>{item.label}</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        {/* Badge */}
                        {item.badge && (
                          <span className="bg-yellow-400 text-gray-800 text-xs font-bold px-2 py-1 rounded-full">
                            {item.badge}
                          </span>
                        )}

                        {/* Count */}
                        {item.count > 0 && (
                          <span className="bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                            {item.count > 99 ? "99+" : item.count}
                          </span>
                        )}
                        <Icon name="chevron-right" size={16} className="text-gray-400" />
                      </div>
                    </NavLink>
                  );
                })}
            </div>

            {/* Mobile Menu Footer (optional, inside the expanding menu) */}
            <div className="p-4 bg-gray-50 border-t border-gray-200">
              <p className="text-sm text-gray-600 text-center">
                CravingCart - Satisfy Your Cravings
              </p>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;