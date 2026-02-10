import React from 'react';
import { NavLink } from 'react-router-dom';

import Icon from '../ui/Icon';

const MobileMenu = ({ isOpen, navItems, userLocation, onClose }) => {
  return (
    <div
      className={`overflow-hidden transition-all duration-300 ease-in-out lg:hidden ${
        isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
      }`}
    >
      <div className="border-border space-y-2 border-t py-4">
        <div className="text-text-secondary flex items-center space-x-3 rounded-xl p-4">
          <Icon name="map-pin" size={20} className="text-gray-400" />
          <span>{userLocation}</span>
        </div>
        {navItems
          .filter(item => item.showOnMobile)
          .map(item =>
            item.action && item.id !== 'profile' ? (
              <button
                key={item.id}
                onClick={() => {
                  item.action();
                  onClose();
                }}
                className="text-text-secondary hover:bg-bg-subtle flex w-full items-center justify-between rounded-xl p-4 font-medium transition-all duration-200"
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
                onClick={onClose}
                className={({ isActive }) =>
                  `flex w-full items-center justify-between rounded-xl p-4 font-medium transition-all duration-200 ${
                    isActive
                      ? 'border border-yellow-200 bg-yellow-50 text-yellow-600'
                      : 'text-text-secondary hover:bg-bg-subtle'
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
      <div className="bg-bg-subtle border-border border-t p-4">
        <p className="text-text-secondary text-center text-sm">
          Cravo - Satisfy Your Cravings
        </p>
      </div>
    </div>
  );
};

export default MobileMenu;
