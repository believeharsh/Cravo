import React from "react";
import { Link, NavLink } from "react-router-dom"; // Import Link and NavLink
import { User, Building2, Store } from "lucide-react";

const CorporateNavigation = () => {
  return (
    <>
      <nav className="px-2 lg:px-2 py-2 lg:py-1 bg-white border-b border-gray-200 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 lg:space-x-3"> 
            <div className="w-7 h-7 lg:w-12 lg:h-12 rounded-2xl flex items-center justify-center">
              <img src={`/assets/Cravo_logo.png`} alt="" />
            </div>
            <div className="w-8 lg:w-28"> {/* Slightly reduced width */}
              <img
                src={`/assets/Cravo_text_black_logo_without_bg.png`}
                alt=""
              />
            </div>
          </Link>

          {/* Right side - Navigation Links */}
          <div className="flex items-center space-x-3 lg:space-x-6"> 
            <div className="hidden lg:flex items-center space-x-4"> 
              <NavLink>
                <span className="hidden xl:block text-lg">About Cravo</span>
              </NavLink>
              <NavLink>
                <span className="hidden xl:block text-lg">Our Business</span>
              </NavLink>
              <NavLink>
                <span className="hidden xl:block text-lg">NewsRoom</span>
              </NavLink>
              <NavLink>
                <span className="hidden xl:block text-lg">Delivering For Everyone</span>
              </NavLink>
              <NavLink>
                <span className="hidden xl:block text-lg">Connect Us</span>
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default CorporateNavigation;