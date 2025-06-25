import React from "react";
import { Link, NavLink } from "react-router-dom"; // Import Link and NavLink
import { User, Building2, Store } from "lucide-react";

const Navbar = () => {
    return (
        <>
            <nav className="px-4 sm:px-6 py-4 sm:py-6">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    {/* Left side - Logo and Company Name */}
                    {/* Use Link to navigate to the home page (/) when the logo is clicked */}
                    <Link to="/" className="flex items-center space-x-3 sm:space-x-4">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center">
                            <span className="text-yellow-400 font-bold text-lg sm:text-xl">🛒</span>
                        </div>
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Cravo</h1>
                    </Link>

                    {/* Right side - Navigation Links */}
                    <div className="flex items-center space-x-4 sm:space-x-8">
                        <div className="hidden lg:flex items-center space-x-6">
                            {/* NavLink for Corporate */}
                            <NavLink
                                to="/corporate" // Path for the Corporate page
                                className={({ isActive }) =>
                                    `flex items-center space-x-2 transition-colors font-medium ${
                                        isActive ? "text-yellow-600" : "text-gray-800 hover:text-gray-600"
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
                                        isActive ? "text-yellow-600" : "text-gray-800 hover:text-gray-600"
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
                                    isActive ? "text-yellow-600" : "text-gray-800 hover:text-gray-600"
                                }`
                            }
                        >
                            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center">
                                <User size={14} className="text-gray-600 sm:w-4 sm:h-4" />
                            </div>
                            <span className="hidden sm:block font-medium text-sm sm:text-base">Profile</span>
                        </NavLink>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;