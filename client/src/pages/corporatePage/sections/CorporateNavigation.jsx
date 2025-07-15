import React from "react";
import { Link, NavLink } from "react-router-dom";
import Icon from "../../../components/ui/Icon";

const CorporateNavigation = () => {
  return (
    <>
      <nav className="px-2 lg:px-2 py-2 lg:py-1 bg-white border-b border-gray-200 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3 lg:space-x-5">
            <div className="w-7 h-7 lg:w-12 lg:h-12 rounded-2xl flex items-center justify-center">
              <img src={`/assets/Cravo_logo.png`} alt="Cravo Logo" />
            </div>
            <div className="w-8 lg:w-28">
              <img
                src={`/assets/Cravo_text_black_logo_without_bg.png`}
                alt="Cravo Text Logo"
              />
            </div>
          </Link>

          <div className="flex items-center space-x-3 lg:space-x-6">
            <div className="hidden lg:flex items-center space-x-4">
              <NavLink
                to="/corporate/about-cravo"
                className={({ isActive }) =>
                  `flex items-center gap-1 text-lg ${
                    isActive ? "text-yellow-600 font-semibold" : "text-gray-700 hover:text-gray-900"
                  }`
                }
              >
                <Icon name="info" size={20} />
                <span className="hidden xl:block">About Cravo</span>
              </NavLink>
              <NavLink
                to="/corporate/our-business"
                className={({ isActive }) =>
                  `flex items-center gap-1 text-lg ${
                    isActive ? "text-yellow-600 font-semibold" : "text-gray-700 hover:text-gray-900"
                  }`
                }
              >
                <Icon name="briefcase" size={20} />
                <span className="hidden xl:block">Our Business</span>
              </NavLink>
              <NavLink
                to="/corporate/newsroom" 
                className={({ isActive }) =>
                  `flex items-center gap-1 text-lg ${
                    isActive ? "text-yellow-600 font-semibold" : "text-gray-700 hover:text-gray-900"
                  }`
                }
              >
                <Icon name="newspaper" size={20} /> 
                <span className="hidden xl:block">NewsRoom</span>
              </NavLink>
              <NavLink
                to="/corporate/delivering-for-everyone"
                className={({ isActive }) =>
                  `flex items-center gap-1 text-lg ${
                    isActive ? "text-yellow-600 font-semibold" : "text-gray-700 hover:text-gray-900"
                  }`
                }
              >
                <Icon name="truck" size={20} /> 
                <span className="hidden xl:block">Delivering For Everyone</span>
              </NavLink>
              <NavLink
                to="/corporate/connect-us"
                className={({ isActive }) =>
                  `flex items-center gap-1 text-lg ${
                    isActive ? "text-yellow-600 font-semibold" : "text-gray-700 hover:text-gray-900"
                  }`
                }
              >
                <Icon name="mail" size={20} /> 
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