import "./App.css";
import CategorySearch from "./pages/CategoryResultPage";
import OffersPage from "./pages/OffersPage";
import AdminPage from "./pages/AdminPage";
import LandingPage from "./pages/LandingPage"; // Your primary guest landing page
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"; 

import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";

import RestaurantPage from "./pages/RestaurantsPage";
import CartPage from "./pages/CartPage";
import Settings from "./pages/profile/Settings";
import Favorites from "./pages/profile/Favorites";
import HelpSupport from "./pages/profile/Help-Support";
import Orders from "./pages/profile/Orders";
import Payments from "./pages/profile/Payment";
import Addresses from "./pages/profile/Address";
import Dashboard from "./pages/profile/Dashboard";

import ProfileLayout from "./components/ProfileLayout"; 
import NotFound from "./components/NotFound";
import CorporatePage from "./pages/CorporatePage";
import PrivateRoute from './components/PrivateRoute';


import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthStatus } from "./features/auth/authSlice"; 
import UnauthorizedPage from "./components/UnAuthorizedPage";

function App() {
  const dispatch = useDispatch();
  const { isAuthChecking, isAuthenticated, isInitialized } = useSelector((state) => state.auth);

  useEffect(() => {
    // Dispatch the initial authentication status check when the component mounts
    dispatch(checkAuthStatus());
  }, [dispatch]); 

  // Show a loading screen while the initial authentication status is being determined
  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-xl font-semibold text-gray-700">
          Loading application...
        </div>
      </div>
    );
  }

  // Once authentication status is initialized, render the appropriate routes
  return (
    <Routes>
      {/* Public Routes (accessible to both guests and authenticated users) */}
      {/* The root path '/' now always renders the LandingPage initially */}
      <Route index element={<LandingPage />} /> 

      {/* These pages are accessible to everyone (guests and logged-in users) */}
      <Route path="restaurants" element={<RestaurantPage />} />
      <Route path="categories" element={<CategorySearch />} />
      <Route path="offers" element={<OffersPage />} />
      <Route path="cart" element={<CartPage />} />
      <Route path="corporate" element={<CorporatePage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<SignupPage />} />
      <Route path="unauthorized" element={<UnauthorizedPage />} /> 

      {/* Protected Routes (require authentication) */}
      {/* Use PrivateRoute to wrap routes that require a user to be logged in */}
      <Route element={<PrivateRoute />}>
        {/* All routes nested here will only be accessible if isAuthenticated is true */}
        <Route path="profile" element={<ProfileLayout />}>
          {/* Default child route for /profile: redirects to dashboard */}
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="payments" element={<Payments />} />
          <Route path="addresses" element={<Addresses />} />
          <Route path="settings" element={<Settings />} />
          <Route path="help-support" element={<HelpSupport />} />
        </Route>
      </Route>

      {/* Role-based Protected Routes (example: only 'admin' role can access) */}
      <Route element={<PrivateRoute allowedRoles={['admin']} />}>
        <Route path="admin" element={<AdminPage />} />
      </Route>

      {/* Catch-all route for 404 Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
