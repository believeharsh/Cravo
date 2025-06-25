import React from "react";
import { Link, NavLink } from "react-router-dom"; // Import Link and NavLink
import { User, Building2, Store } from "lucide-react";

const CorporateNavigation = () => {
  return (
    <>
      <nav className="px-4 sm:px-6 py-4 sm:py-6 bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Left side - Logo and Company Name */}
          {/* Use Link to navigate to the home page (/) when the logo is clicked */}
          <Link to="/" className="flex items-center space-x-3 sm:space-x-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-yellow-400 font-bold text-lg sm:text-xl">
                🛒
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
              Cravo
            </h1>
          </Link>

          {/* Right side - Navigation Links */}
          <div className="flex items-center space-x-4 sm:space-x-8">
            <div className="hidden lg:flex items-center space-x-6">
              <NavLink>
                <span className="hidden xl:block">About Cravo</span>
              </NavLink>
              <NavLink>
                <span className="hidden xl:block">Our Business</span>
              </NavLink>
              <NavLink>
                <span className="hidden xl:block">NewsRoom</span>
              </NavLink>
              <NavLink>
                <span className="hidden xl:block">Delivering For Everyone</span>
              </NavLink>
              <NavLink>
                <span className="hidden xl:block">Connect Us</span>
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default CorporateNavigation;
