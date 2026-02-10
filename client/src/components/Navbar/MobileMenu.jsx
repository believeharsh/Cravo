import React from 'react';
import { NavLink } from 'react-router-dom';
import Icon from '../ui/Icon';

const MobileMenu = ({ isOpen, navItems, userLocation, onClose }) => {
  return (
    <div
      className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
        isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
      }`}
    >
      <div className="py-4 border-t border-border space-y-2">
        <div className="flex items-center space-x-3 p-4 rounded-xl text-text-secondary">
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
                className="w-full flex items-center justify-between p-4 rounded-xl font-medium transition-all duration-200 text-text-secondary hover:bg-bg-subtle"
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
                  `w-full flex items-center justify-between p-4 rounded-xl font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-yellow-50 text-yellow-600 border border-yellow-200'
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
      <div className="p-4 bg-bg-subtle border-t border-border">
        <p className="text-sm text-text-secondary text-center">
          Cravo - Satisfy Your Cravings
        </p>
      </div>
    </div>
  );
};

export default MobileMenu;
