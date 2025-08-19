import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import CategoryResultPage from './pages/categoryResultPage/CategoryResultpage';
import OffersPage from './pages/offersPage/OffersPage';
import AdminPage from './pages/adminPage/AdminPage';
import LandingPage from './pages/landingPage/LandingPage';

import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';

import RestaurantsOverviewPage from './pages/restaurant-Overview-Page/RestaurantsOverviewPage';
import CartPage from './pages/cartPage/CartPage';
import Settings from './pages/profilePage/Settings';
import Favorites from './pages/profilePage/Favorites';
import HelpSupport from './pages/profilePage/Help-Support';
import Orders from './pages/profilePage/Orders';
import Payments from './pages/profilePage/Payment';
import Addresses from './pages/profilePage/Address';
import Dashboard from './pages/profilePage/Dashboard';

import ProfileLayout from './components/ProfileLayout';
import NotFound from './components/NotFound';
import CorporatePage from './pages/corporatePage/CorporatePage';
import PrivateRoute from './components/PrivateRoute';

import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UnauthorizedPage from './components/UnAuthorizedPage';
import { initializeApplication } from './features/landing/landingSlice';
import DeliveryLoader from './components/DeliveryLoader';

function App() {
  const dispatch = useDispatch();
  const hasAppInitializedRef = useRef(false);
  const { isAuthenticated } = useSelector(state => state.auth);
  const { isAppFullyInitialized, appInitError } = useSelector(
    state => state.landingPage
  );

  console.log(isAuthenticated);

  useEffect(() => {
    // The `hasAppInitializedRef.current` ensures it runs once even with StrictMode.
    if (!hasAppInitializedRef.current) {
      console.log(
        'App.jsx: Dispatching initializeApplication on initial mount (first time, controlled by ref).'
      );
      dispatch(initializeApplication());
      hasAppInitializedRef.current = true;
    } else {
      console.log(
        'App.jsx: initializeApplication has already been dispatched or is in progress (due to StrictMode re-run).'
      );
    }
  }, [dispatch]); // Dependency array: run once on mount

  // Show a loading screen while the entire application initialization is pending
  if (!isAppFullyInitialized) {
    // console.log("App: Showing DeliveryLoader - App not fully initialized.");
    return <DeliveryLoader />;
  }

  if (appInitError) {
    console.error('App Initialization Error:', appInitError);
  }

  // Once authentication status is initialized, render the appropriate routes
  return (
    <Routes>
      <Route
        index
        element={
          isAuthenticated ? (
            <Navigate to="/restaurants" replace />
          ) : (
            <LandingPage />
          )
        }
      />

      {/* Public Routes (accessible to both guests and authenticated users) */}
      <Route path="restaurants" element={<RestaurantsOverviewPage />} />
      <Route path="categories/:categorySlug" element={<CategoryResultPage />} />
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
