import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ allowedRoles = [] }) => {
  const { isAuthenticated, role, isInitialized, isAuthChecking } = useSelector(
    state => state.auth
  );

  if (isAuthChecking || !isInitialized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-text-secondary text-xl font-semibold">
          Checking authentication...
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
      return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
  }

  // If the user is NOT authenticated (and check is initialized) redirect him to unauthorized path
  return <Navigate to="/unauthorized" replace />;
};

export default PrivateRoute;
