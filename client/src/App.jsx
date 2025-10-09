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
import Orders from './pages/profilePage/orders/Orders';
import Payments from './pages/profilePage/Payment';
import AddressPage from './pages/profilePage/Address/Address';
import AccountPage from './pages/profilePage/Account/AccountPage';

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
import WishlistModal from './components/modules/wishList/WishListSelectionModal';

import FavoritesPage from './pages/profilePage/favorites/FavoritesPage';
import { fetchAllWishlists } from './features/wishList/wishListSlice';
import { fetchUserCart } from './features/cart/cartSlice';
import { closeAuthSidebar } from './features/ui/uiSlice';
import { fetchAllAddresses } from './features/address/addressSlice';
import CravoGetTheAPP from './pages/Get_the_App/GetTheAppPage';
import DineoutRestaurantPage from './pages/dineOut-Restaurants-Page/DineOutRestaurantPage';
import { AllUserOrdersThunk } from './features/orders/ordersSlice';
import { getUserProfileData } from './features/auth/authSlice';

function AppContent() {
  return (
    <Routes>
      <Route path="restaurants" element={<RestaurantsOverviewPage />} />
      <Route path="restaurants/dine-out" element={<DineoutRestaurantPage />} />
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
      <Route path="get-the-app" element={<CravoGetTheAPP />} />
      <Route element={<PrivateRoute />}>
        <Route path="profile" element={<ProfileLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="account" element={<AccountPage />} />
          <Route path="orders" element={<Orders />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="payments" element={<Payments />} />
          <Route path="addresses" element={<AddressPage />} />
          <Route path="settings" element={<Settings />} />
          <Route path="help-support" element={<HelpSupport />} />
        </Route>
      </Route>
      <Route element={<PrivateRoute allowedRoles={['admin']} />}>
        <Route path="admin" element={<AdminPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  const dispatch = useDispatch();
  const hasAppInitializedRef = useRef(false);
  const { appInitError, isAppInitializing } = useSelector(
    state => state.landingPage
  );
  const { isAuthSidebarOpen } = useSelector(state => state.ui.auth);
  const { isWishlistModalOpen } = useSelector(state => state.ui.wishlist);
  const { isAuthenticated, isInitialized, isAuthChecking } = useSelector(
    state => state.auth
  );

  useEffect(() => {
    if (!hasAppInitializedRef.current) {
      console.log(
        'Cravo : Dispatching initializeApplication on initial mount.'
      );
      dispatch(initializeApplication());
      hasAppInitializedRef.current = true;
    }
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated && isInitialized) {
      const fetches = [
        dispatch(fetchAllWishlists()),
        dispatch(fetchUserCart()),
        dispatch(fetchAllAddresses()),
        dispatch(AllUserOrdersThunk()),
        dispatch(getUserProfileData()),
      ];

      Promise.all(fetches)
        .then(() => {
          console.log('All initial data fetched successfully!');
        })
        .catch(error => {
          console.error('Failed to fetch some initial data:', error);
        });
    } else {
      console.log('User is not authenticated, skipping data fetch.');
    }
  }, [isAuthenticated, dispatch, isInitialized]);

  // Show error state if app initialization failed
  if (appInitError) {
    return (
      <div className="error-container">
        <h2>Something went wrong</h2>
        <p>{appInitError}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <>
      <AppContent />
      {isAuthSidebarOpen && <AuthSidebar isOpen={true} />}
      {isWishlistModalOpen && <WishlistModal />}
    </>
  );
}

export default App;
