import React from "react";
import { Link, NavLink } from "react-router-dom"; // Import Link and NavLink
import {
  User,
  Building2,
  Store,
  ChevronDown,
  LogIn,
  UserPlus,
} from "lucide-react";

import { useState, useRef, useEffect } from "react";
// import { ChevronDown, User, LogIn, UserPlus } from "lucide-react";

const AuthDropdown = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const authRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (authRef.current && !authRef.current.contains(event.target)) {
        setIsAuthOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={authRef}>
      <button
        onClick={() => setIsAuthOpen(!isAuthOpen)}
        className=" cursor-pointer flex items-center space-x-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-xl font-medium text-gray-700 transition-colors duration-200 border border-gray-200"
      >
        <User size={16} />
        <span className="text-sm">Auth</span>
        <ChevronDown
          size={16}
          className={`transform transition-transform duration-200 ${
            isAuthOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isAuthOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-2xl shadow-lg z-50">
          <div className="p-2">
            <NavLink to={"/login"}>
              <button className="  cursor-pointer w-full flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-xl transition-colors duration-200 text-left">
                <LogIn size={16} className="text-blue-600" />
                <span className="font-medium text-gray-800 text-sm">Login</span>
              </button>
            </NavLink>

            <NavLink to={"/signup"}>
              <button className=" cursor-pointer w-full flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-xl transition-colors duration-200 text-left">
                <UserPlus size={16} className="text-yellow-600" />
                <span className="font-medium text-gray-800 text-sm">
                  Sign Up
                </span>
              </button>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

const Navbar = () => {
  return (
    <>
      <nav className="px-4 sm:px-6 py-4 sm:py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Left side - Logo and Company Name */}
          <Link to="/" className="flex items-center space-x-3 sm:space-x-4">
            <div className="w-8 h-8 sm:w-15 sm:h-15 rounded-2xl border-2 border-white flex items-center justify-center">
              <img src={`/assets/Cravo_logo.png`} alt="" />
            </div>
            <div className="w-10 sm:w-32 ">
              <img
                src={`/assets/Cravo_white_text_logo.png`}
                alt=""
              />
            </div>
          </Link>

          {/* Right side - Navigation Links */}
          <div className="flex items-center space-x-4 sm:space-x-8">
            <div className="hidden lg:flex items-center space-x-6">
              {/* NavLink for Corporate */}
              <NavLink
                to="/corporate" // Path for the Corporate page
                className={({ isActive }) =>
                  `flex items-center space-x-2 transition-colors font-medium ${
                    isActive
                      ? "text-yellow-600"
                      : "text-gray-800 hover:text-gray-600"
                  }`
                }
              >
                <Building2 size={18} />
                <span>Corporate</span>
              </NavLink>

              {/* NavLink for Restaurants */}
              <NavLink
                to="/restaurants" // Path for the Restaurants page
                className={({ isActive }) =>
                  `flex items-center space-x-2 transition-colors font-medium ${
                    isActive
                      ? "text-yellow-600"
                      : "text-gray-800 hover:text-gray-600"
                  }`
                }
              >
                <Store size={18} />
                <span>Restaurants</span>
              </NavLink>
            </div>

            {/* NavLink for Profile */}
            <NavLink
              to="/profile" // Path for the Profile page (will redirect to /profile/dashboard)
              className={({ isActive }) =>
                `flex items-center space-x-2 transition-colors ${
                  isActive
                    ? "text-yellow-600"
                    : "text-gray-800 hover:text-gray-600"
                }`
              }
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center">
                <User size={14} className="text-gray-600 sm:w-4 sm:h-4" />
              </div>
              <span className="hidden sm:block font-medium text-sm sm:text-base">
                Profile
              </span>
            </NavLink>
            <AuthDropdown />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
