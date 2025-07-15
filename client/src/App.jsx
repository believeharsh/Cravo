import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate, 
} from "react-router-dom";

import CategoryResultPage from "./pages/categoryResultPage/CategoryResultpage";
import OffersPage from "./pages/offersPage/OffersPage";
import AdminPage from "./pages/adminPage/AdminPage";
import LandingPage from "./pages/landingPage/LandingPage"; 


import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";

import RestaurantsOverviewPage from "./pages/restaurant-Overview-Page/RestaurantsOverviewPage"; 
import CartPage from "./pages/cartPage/CartPage";
import Settings from "./pages/profilePage/Settings";
import Favorites from "./pages/profilePage/Favorites";
import HelpSupport from "./pages/profilePage/Help-Support";
import Orders from "./pages/profilePage/Orders";
import Payments from "./pages/profilePage/Payment";
import Addresses from "./pages/profilePage/Address";
import Dashboard from "./pages/profilePage/Dashboard";

import ProfileLayout from "./components/ProfileLayout";
import NotFound from "./components/NotFound";
import CorporatePage from "./pages/corporatePage/CorporatePage";
import PrivateRoute from './components/PrivateRoute';

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthStatus } from "./features/auth/authSlice";
import UnauthorizedPage from "./components/UnAuthorizedPage";
import { fetchLandingPageData } from "./features/landing/landingSlice";

function App() {
  const dispatch = useDispatch();

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
      <Route path="restaurants" element={<RestaurantsOverviewPage />} />
      <Route path="categories" element={<CategoryResultPage />} />
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