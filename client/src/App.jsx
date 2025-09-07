import './App.css';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import CategoryResultPage from './pages/categoryResultPage/CategoryResultpage';
import OffersPage from './pages/offersPage/OffersPage';
import AdminPage from './pages/adminPage/AdminPage';
import LandingPage from './pages/landingPage/LandingPage';

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
import RestaurantMenuPage from './pages/Restaurant-Details/RestaurantMenu';
import AuthSidebar from './components/auth/AuthSidebar';
import { closeAuthModal } from './features/authModal/authModelSlice';
import { checkAuthStatus, setAuthState } from './features/auth/authSlice';
import OTPVerificationModal from './components/auth/OTPVerificationModal';

function AppContent() {
  const { isAuthenticated } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleMessage = async event => {
      console.log('Received message:', event);
      const allowedOrigins = ['http://localhost:5173', 'http://localhost:8000'];
      if (!allowedOrigins.includes(event.origin)) return;

      if (event.data?.type === 'authComplete' && event.data.success) {
        console.log(
          'Auth complete signal received, dispatching checkAuthStatus'
        );

        dispatch(
          setAuthState({
            user: event.data.data.user,
            token: event.data.data.accessToken,
            role: event.data.data.user.role,
          })
        );
        // Close the modal and navigate
        dispatch(closeAuthModal());
        navigate('/restaurants');
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [dispatch, navigate]);

  return (
    <Routes>
      {/* Public Routes (accessible to both guests and authenticated users) */}
      <Route path="restaurants" element={<RestaurantsOverviewPage />} />
      <Route path="/" element={<LandingPage />} />
      <Route path="categories/:categorySlug" element={<CategoryResultPage />} />
      <Route
        path="menu/:restaurantName/:restaurantID"
        element={<RestaurantMenuPage />}
      />
      <Route path="offers" element={<OffersPage />} />
      <Route path="cart" element={<CartPage />} />
      <Route path="corporate" element={<CorporatePage />} />
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

function App() {
  const dispatch = useDispatch();
  const hasAppInitializedRef = useRef(false);
  const { isLoading, appInitError } = useSelector(state => state.landingPage);
  const { isOpen, showOTPModal, signupEmail } = useSelector(
    state => state.authModal
  );
  const { user, isAuthenticated, role, token } = useSelector(
    state => state.auth
  );

  console.log('user state log', user);
  console.log('isAuthenticated', isAuthenticated);
  console.log('role', role);
  console.log('usertoken', token);

  useEffect(() => {
    if (!hasAppInitializedRef.current) {
      console.log(
        'App.jsx: Dispatching initializeApplication on initial mount.'
      );
      dispatch(initializeApplication());
      hasAppInitializedRef.current = true;
    } else {
      console.log(
        'App.jsx: initializeApplication has already been dispatched.'
      );
    }
  }, [dispatch]); // Dependency array: run once on mount

  if (appInitError) {
    console.error('App Initialization Error:', appInitError);
  }

  // Once authentication status is initialized, render the appropriate routes
  return (
    <>
      <AppContent />
      {isOpen && !showOTPModal && <AuthSidebar isOpen={true} />}
      {showOTPModal && (
        <OTPVerificationModal
          isOpen={true}
          email={signupEmail}
          onVerificationSuccess={() => dispatch(closeAuthModal())}
        />
      )}
    </>
  );
}

export default App;
