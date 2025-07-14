import "./App.css";
import CategorySearch from "./pages/CategoryResultPage";
import OffersPage from "./pages/OffersPage";
import AdminPage from "./pages/AdminPage";
import LandingPage from "./pages/LandingPage"; // Your primary guest landing page
import {
  BrowserRouter as Router, // You're importing BrowserRouter as Router, ensure you wrap App in it somewhere higher up if not here
  Routes,
  Route,
  Navigate, // Import Navigate
} from "react-router-dom";

import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";

import RestaurantPage from "./pages/RestaurantsPage"; // Make sure this path is correct
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
import PrivateRoute from './components/PrivateRoute'; // Assuming PrivateRoute works as expected

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthStatus } from "./features/auth/authSlice";
import UnauthorizedPage from "./components/UnAuthorizedPage";
import { fetchLandingPageData } from "./features/landing/landingSlice";

function App() {
  const dispatch = useDispatch();
  // Destructure `isAuthenticated` along with `isInitialized`
  const { isAuthChecking, isAuthenticated, isInitialized } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  useEffect(() => {
    // Get user's geolocation and then dispatch the data fetch
    const getUserLocationAndFetchData = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          // Success callback
          (position) => {
            const { latitude, longitude } = position.coords;
            dispatch(
              fetchLandingPageData({ longitude, latitude, maxDistanceKm: 500 })
            );
          },
          // Error callback - fallback to default data
          (geoError) => {
            console.warn("Geolocation error:", geoError.message);
            dispatch(fetchLandingPageData({}));
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          }
        );
      } else {
        console.warn(
          "Geolocation is not supported by this browser. Fetching default content."
        );
        dispatch(fetchLandingPageData({}));
      }
    };

    getUserLocationAndFetchData();
  }, [dispatch]);

  // Show a loading screen while the initial authentication status is being determined
  // This is crucial to avoid flickering or incorrect redirects before auth status is known.
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
      {/* Handle the root path '/' based on authentication status:
        If authenticated, redirect to /restaurants.
        Otherwise, show the LandingPage.
      */}
      <Route
        index
        element={isAuthenticated ? <Navigate to="/restaurants" replace /> : <LandingPage />}
      />

      {/* Public Routes (accessible to both guests and authenticated users) */}
      {/* Note: The '/restaurants' route is directly accessible here for both,
         but authenticated users are redirected to it from '/' automatically. */}
      <Route path="restaurants" element={<RestaurantPage />} />
      <Route path="categories" element={<CategorySearch />} />
      <Route path="offers" element={<OffersPage />} />
      <Route path="cart" element={<CartPage />} />
      <Route path="corporate" element={<CorporatePage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<SignupPage />} />
      <Route path="unauthorized" element={<UnauthorizedPage />} />

      {/* Protected Routes (require authentication) */}
      <Route element={<PrivateRoute />}>
        <Route path="profile" element={<ProfileLayout />}>
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