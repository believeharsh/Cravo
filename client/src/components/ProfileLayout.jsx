import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Icon from '../components/ui/Icon';
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
      color: 'text-gray-600',
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
      return 'Profile Dashboard'; // Or just "Profile"
    }
    return section ? section.title : 'Profile';
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex bg-gray-50">
        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-20 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        {/* Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-30 w-72 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${
            isSidebarOpen
              ? 'translate-x-0'
              : '-translate-x-full lg:translate-x-0'
          }`}
        >
          {/* Close button for mobile sidebar */}
          <div className="lg:hidden absolute top-4 right-4 z-40">
            <Button
              onClick={() => setIsSidebarOpen(false)}
              className="text-gray-600 hover:text-gray-900"
            >
              <Icon name={'x'} size={24} />
            </Button>
          </div>

          <nav className="p-4 space-y-2 overflow-y-auto">
            {[...sidebarOptions, ...additionalOptions].map(
              ({ id, title, icon, color, count, badge, path, action }) =>
                path ? (
                  <NavLink
                    key={id}
                    to={path}
                    className={({ isActive }) =>
                      `flex items-center justify-between w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 ${
                        isActive
                          ? 'bg-yellow-100 text-yellow-700 font-semibold'
                          : 'text-gray-800'
                      }`
                    }
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <div className="flex items-center gap-3">
                      <Icon name={icon} className={`${color}`} size={20} />{' '}
                      {/* Corrected here */}
                      <span>{title}</span>
                      {badge && (
                        <span className="ml-2 text-xs bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded-full">
                          {badge}
                        </span>
                      )}
                    </div>
                    {count && (
                      <span className="text-sm text-gray-500">{count}</span>
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
                    className={`flex items-center justify-between w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-800`}
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
        <main className="flex-1 flex flex-col">
          <header className="lg:hidden sticky top-0 p-4 flex items-center justify-between border-b border-gray-200 z-20">
            <Button onClick={() => setIsSidebarOpen(true)}>
              <Icon name={'menu'} size={24} />
            </Button>
            <h1 className="text-lg font-semibold text-gray-800">
              {getMobileSectionTitle()}
            </h1>
            <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-white">
              <Icon name="shopping-cart" size={16} color="white" />
            </div>
          </header>

          {/* rendering different profile pages using Router's Outlet */}
          <div className="flex-1 p-6 overflow-y-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
};

export default ProfileLayout;
