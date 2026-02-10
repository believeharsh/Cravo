import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

import Icon from '../components/ui/Icon';
import Navbar from './Navbar/Navbar';
import Button from './ui/Button';

const ProfileLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sidebarOptions = [
    {
      id: 'profile',
      path: 'account',
      title: 'Account',
      icon: 'user',
      color: 'text-yellow-400',
    },
    {
      id: 'orders',
      path: 'orders',
      title: 'Orders',
      icon: 'shopping-bag',
      color: 'text-yellow-400',
      count: '12',
    },
    {
      id: 'favorites',
      path: 'favorites',
      title: 'Favorites',
      icon: 'heart',
      color: 'text-red-500',
      count: '8',
    },
    {
      id: 'payments',
      path: 'payments',
      title: 'Payments',
      icon: 'credit-card',
      color: 'text-green-400',
    },
    {
      id: 'addresses',
      path: 'addresses',
      title: 'Addresses',
      icon: 'map-pin',
      color: 'text-blue-500',
      count: '3',
    },
    {
      id: 'settings',
      path: 'settings',
      title: 'Settings',
      icon: 'settings',
      color: 'text-text-secondary',
    },
  ];

  const additionalOptions = [
    {
      id: 'help',
      path: 'help-support',
      title: 'Help & Support',
      icon: 'help-circle',
      color: 'text-blue-500',
    },
    {
      id: 'logout',
      title: 'Logout',
      icon: 'logout',
      color: 'text-red-500',
      action: () => console.log('Logout clicked'),
    },
  ];

  const getMobileSectionTitle = () => {
    const currentPath = window.location.pathname.split('/').pop();
    const section = [...sidebarOptions, ...additionalOptions].find(
      opt => opt.path === currentPath
    );
    // If the path segment is empty (e.g., /profile/ and not /profile/dashboard), default to 'Profile' or 'Dashboard'
    if (!currentPath && window.location.pathname.endsWith('/profile/')) {
      return 'Profile Dashboard';
    }
    return section ? section.title : 'Profile';
  };

  return (
    <>
      <Navbar />
      <div className="bg-bg-subtle flex min-h-screen">
        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-20 bg-black opacity-50 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        {/* Sidebar */}
        <aside
          className={`border-border fixed inset-y-0 left-0 z-30 w-72 transform border-r bg-white transition-transform duration-300 ease-in-out lg:static ${
            isSidebarOpen
              ? 'translate-x-0'
              : '-translate-x-full lg:translate-x-0'
          }`}
        >
          {/* Close button for mobile sidebar */}
          <div className="absolute top-4 right-4 z-40 lg:hidden">
            <Button
              onClick={() => setIsSidebarOpen(false)}
              className="text-text-secondary hover:text-text-main"
            >
              <Icon name={'x'} size={24} />
            </Button>
          </div>

          <nav className="space-y-2 overflow-y-auto p-4">
            {[...sidebarOptions, ...additionalOptions].map(
              ({ id, title, icon, color, count, badge, path, action }) =>
                path ? (
                  <NavLink
                    key={id}
                    to={path}
                    className={({ isActive }) =>
                      `flex w-full items-center justify-between rounded-lg px-4 py-3 text-left hover:bg-gray-100 ${
                        isActive
                          ? 'bg-yellow-100 font-semibold text-yellow-700'
                          : 'text-text-main'
                      }`
                    }
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <div className="flex items-center gap-3">
                      <Icon name={icon} className={`${color}`} size={20} />{' '}
                      {/* Corrected here */}
                      <span>{title}</span>
                      {badge && (
                        <span className="ml-2 rounded-full bg-yellow-200 px-2 py-0.5 text-xs text-yellow-800">
                          {badge}
                        </span>
                      )}
                    </div>
                    {count && (
                      <span className="text-text-muted text-sm">{count}</span>
                    )}
                  </NavLink>
                ) : (
                  // For 'Logout' or actions without a route
                  <Button
                    key={id}
                    onClick={() => {
                      action && action();
                      setIsSidebarOpen(false);
                    }}
                    className={`text-text-main flex w-full items-center justify-between rounded-lg px-4 py-3 text-left hover:bg-gray-100`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon name={icon} className={`${color}`} size={20} />
                      <span>{title}</span>
                    </div>
                  </Button>
                )
            )}
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex flex-1 flex-col">
          <header className="border-border sticky top-0 z-20 flex items-center justify-between border-b p-4 lg:hidden">
            <Button onClick={() => setIsSidebarOpen(true)}>
              <Icon name={'menu'} size={24} />
            </Button>
            <h1 className="text-text-main text-lg font-semibold">
              {getMobileSectionTitle()}
            </h1>
            <div className="bg-primary flex h-6 w-6 items-center justify-center rounded-full text-white">
              <Icon name="shopping-cart" size={16} color="white" />
            </div>
          </header>

          {/* rendering different profile pages using Router's Outlet */}
          <div className="flex-1 overflow-y-auto p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
};

export default ProfileLayout;
