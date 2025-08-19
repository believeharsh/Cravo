import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Icon from '../../../components/ui/Icon';

const CartNavigation = () => {
  return (
    <>
      <nav className="px-4 sm:px-6 py-4 sm:py-6 bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3 sm:space-x-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-yellow-400 font-bold text-lg sm:text-xl">
                <Icon
                  name="shopping-cart"
                  size={24}
                  className="text-yellow-400"
                />
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
              Secure Checkout
            </h1>
          </Link>

          <div className="flex items-center space-x-4 sm:space-x-8">
            <div className="hidden lg:flex items-center space-x-6">
              <NavLink
                to="/help-support"
                className={({ isActive }) =>
                  `flex items-center gap-1 ${
                    isActive
                      ? 'text-yellow-600 font-semibold'
                      : 'text-gray-600 hover:text-gray-800'
                  }`
                }
              >
                <Icon name="help-circle" size={20} />
                <span className="hidden xl:block">Help</span>
              </NavLink>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `flex items-center gap-1 ${
                    isActive
                      ? 'text-yellow-600 font-semibold'
                      : 'text-gray-600 hover:text-gray-800'
                  }`
                }
              >
                <Icon name="user" size={20} />
                <span className="hidden xl:block">Profile</span>
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default CartNavigation;
