import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom"; 

import {
  ShoppingBag,
  Crown,
  Heart,
  CreditCard,
  MapPin,
  Settings,
  Edit3,
  User,
  Mail,
  Phone,
  Calendar,
  ChevronRight,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import Navbar from "../components/Navbar"; 

const ProfileLayout = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sidebarOptions = [
    {
      id: "profile",
      path: "dashboard",
      title: "Profile",
      icon: User,
      color: "text-yellow-400",
    },
    {
      id: "orders",
      path: "orders",
      title: "Orders",
      icon: ShoppingBag,
      color: "text-yellow-400",
      count: "12",
    },
    {
      id: "favorites",
      path: "favorites",
      title: "Favorites",
      icon: Heart,
      color: "text-red-500",
      count: "8",
    }, // 'favorites' to match route
    {
      id: "payments",
      path: "payments",
      title: "Payments",
      icon: CreditCard,
      color: "text-green-400",
    },
    {
      id: "addresses",
      path: "addresses",
      title: "Addresses",
      icon: MapPin,
      color: "text-blue-500",
      count: "3",
    },
    {
      id: "settings",
      path: "settings",
      title: "Settings",
      icon: Settings,
      color: "text-gray-600",
    },
  ];

  const additionalOptions = [
    {
      id: "help",
      path: "help-support",
      title: "Help & Support",
      icon: HelpCircle,
      color: "text-blue-500",
    },
    {
      id: "logout",
      title: "Logout",
      icon: LogOut,
      color: "text-red-500",
      action: () => console.log("Logout clicked"),
    }, 
  ];

  // Function to get current section title for mobile header using location
  const getMobileSectionTitle = () => {
    const currentPath = window.location.pathname.split("/").pop(); // Get last segment of path
    const section = [...sidebarOptions, ...additionalOptions].find(
      (opt) => opt.path === currentPath
    );
    return section ? section.title : "Profile"; // Default to 'Profile' or 'Dashboard'
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
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }`}
        >
          {/* Close button for mobile sidebar */}
          <div className="lg:hidden absolute top-4 right-4 z-40">
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="text-gray-600 hover:text-gray-900"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="p-4 space-y-2 overflow-y-auto">
            {[...sidebarOptions, ...additionalOptions].map(
              ({ id, title, icon: Icon, color, count, badge, path, action }) =>
                // Conditionally render NavLink or a regular button for logout
                path ? (
                  <NavLink
                    key={id}
                    to={path} // Use the 'path' for NavLink
                    className={({ isActive }) =>
                      `flex items-center justify-between w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 ${
                        isActive
                          ? "bg-yellow-100 text-yellow-700 font-semibold"
                          : "text-gray-800"
                      }`
                    }
                    onClick={() => setIsSidebarOpen(false)} // Close sidebar on nav click
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`${color}`} size={20} />
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
                  <button
                    key={id}
                    onClick={() => {
                      action && action(); // Execute action if present
                      setIsSidebarOpen(false); // Close sidebar
                    }}
                    className={`flex items-center justify-between w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-800`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`${color}`} size={20} />
                      <span>{title}</span>
                    </div>
                  </button>
                )
            )}
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1  flex flex-col">
          <header className="lg:hidden sticky top-0 bg-white p-4 flex items-center justify-between border-b border-gray-200 z-20">
            <button onClick={() => setIsSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <h1 className="text-lg font-semibold text-gray-800">
              {getMobileSectionTitle()}
            </h1>
            <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-white">
              🛒
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
