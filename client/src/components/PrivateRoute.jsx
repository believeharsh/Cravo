import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ allowedRoles = [] }) => {
  // Select the necessary authentication states from Redux
  const {isAuthenticated, role, isInitialized, isAuthChecking } = useSelector((state) => state.auth);

  if (isAuthChecking || !isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-xl font-semibold text-gray-700">
          Checking authentication...
        </div>
      </div>
    );
  }

  // const isAuthenticated = false ; 
  // 2. If the user is authenticated
  if (isAuthenticated) {
    // Check for role-based authorization if `allowedRoles` are specified
    if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
      // User is authenticated but does not have the required role
      return <Navigate to="/unauthorized" replace />;
    }
    // User is authenticated and has the required role (or no specific role is required)
    return <Outlet />; // Render the child routes
  }

  // 3. If the user is NOT authenticated (and check is initialized)
  // Redirect them to the login page.
  return <Navigate to="/unauthorized" replace />;
};

export default PrivateRoute;
