import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Icon from '../../../components/ui/Icon';

const CartNavigation = () => {
  return (
    <>
      <nav className="px-4 sm:px-6 py-1 sm:py-1 bg-white border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className=" bg-white rounded-full flex items-center justify-center">
              <div className="w-8 h-8 sm:w-16 sm:h-16 rounded-2xl border-2 border-white flex items-center justify-center cursor-pointer">
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
            </div>
            <h1 className="text-xl sm:text-xl font-bold text-text-main">
              Secure Checkout
            </h1>
          </div>

          <div className="flex items-center space-x-4 sm:space-x-8">
            <div className="hidden lg:flex items-center space-x-6">
              <NavLink
                to="/help-support"
                className={({ isActive }) =>
                  `flex items-center gap-1 ${
                    isActive
                      ? 'text-yellow-600 font-semibold'
                      : 'text-text-secondary hover:text-text-main'
                  }`
                }
              >
                <Icon name="help-circle" size={20} />
                <span className="hidden xl:block">Help</span>
              </NavLink>
              <NavLink
                to="/profile/account"
                className={({ isActive }) =>
                  `flex items-center gap-1 ${
                    isActive
                      ? 'text-yellow-600 font-semibold'
                      : 'text-text-secondary hover:text-text-main'
                  }`
                }
              >
                <Icon name="user" size={20} />
                <span className="hidden xl:block ">Profile</span>
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default CartNavigation;
