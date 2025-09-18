import './App.css';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import CategoryResultPage from './pages/categoryResultPage/CategoryResultpage';
import OffersPage from './pages/offersPage/OffersPage';
import AdminPage from './pages/adminPage/AdminPage';
import LandingPage from './pages/landingPage/LandingPage';

import RestaurantsOverviewPage from './pages/restaurant-Overview-Page/RestaurantsOverviewPage';
import CartPage from './pages/cartPage/CartPage';
import Settings from './pages/profilePage/Settings';
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

// modules import
import AuthSidebar from './components/modules/auth/AuthSidebar';
import { closeAuthModal } from './features/authModal/authModelSlice';
import { checkAuthStatus, setAuthState } from './features/auth/authSlice';

import FavoritesPage from './pages/profilePage/favorites/FavoritesPage';
import { fetchAllWishlists } from './features/wishList/wishListSlice';

function AppContent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleMessage = event => {
      console.log('Received message:', event);
      const allowedOrigins = ['http://localhost:5173', 'http://localhost:8000'];
      if (!allowedOrigins.includes(event.origin)) return;

      if (event.data?.type === 'authComplete' && event.data.success) {
        console.log('Auth complete signal received, dispatching setAuthState');
        dispatch(
          setAuthState({
            user: event.data.data.user,
            token: event.data.data.accessToken,
            role: event.data.data.user.role,
          })
        );
        dispatch(closeAuthModal());
        navigate('/restaurants');
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [dispatch, navigate]);

  return (
    <Routes>
      <Route path="restaurants" element={<RestaurantsOverviewPage />} />
      <Route path="/" element={<LandingPage />} />     {' '}
      <Route path="categories/:categorySlug" element={<CategoryResultPage />} />{' '}
      <Route
        path="menu/:restaurantName/:restaurantID"
        element={<RestaurantMenuPage />}
      />
      <Route path="offers" element={<OffersPage />} />
      <Route path="cart" element={<CartPage />} />
      <Route path="corporate" element={<CorporatePage />} />
      <Route path="unauthorized" element={<UnauthorizedPage />} />     {' '}
      <Route element={<PrivateRoute />}>
        {' '}
        <Route path="profile" element={<ProfileLayout />}>
          {' '}
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="payments" element={<Payments />} />
          <Route path="addresses" element={<Addresses />} />
          <Route path="settings" element={<Settings />} />
          <Route path="help-support" element={<HelpSupport />} />{' '}
        </Route>{' '}
      </Route>{' '}
      <Route element={<PrivateRoute allowedRoles={['admin']} />}>
        <Route path="admin" element={<AdminPage />} />     {' '}
      </Route>
      <Route path="*" element={<NotFound />} />   {' '}
    </Routes>
  );
}

function App() {
  const dispatch = useDispatch();

  const hasAppInitializedRef = useRef(false);

  const { appInitError } = useSelector(state => state.landingPage);

  const { isAuthSidebarOpen, showOTPModal, signupEmail } = useSelector(
    state => state.ui.auth
  );

  const { isAuthenticated } = useSelector(state => state.auth); // 1. Initial app data fetch (e.g., categories, global configs)

  useEffect(() => {
    if (!hasAppInitializedRef.current) {
      console.log(
        'App.jsx: Dispatching initializeApplication on initial mount.'
      );
      dispatch(initializeApplication());
      hasAppInitializedRef.current = true;
    }
  }, [dispatch]); // 2. Fetch user-specific data *only after* authentication is confirmed

  useEffect(() => {
    if (isAuthenticated) {
      console.log('User is authenticated, fetching wishlists.');
      dispatch(fetchAllWishlists());
    } else {
      console.log('User is not authenticated, skipping wishlist fetch.'); // Optionally, you could clear wishlist data here if the user logs out
    }
  }, [isAuthenticated, dispatch]);

  if (appInitError) {
    console.error('App Initialization Error:', appInitError);
  }

  return (
    <>
      <AppContent />
      {isAuthSidebarOpen && !showOTPModal && <AuthSidebar isOpen={true} />}
    </>
  );
}

export default App;
