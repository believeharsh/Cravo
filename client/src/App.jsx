import './App.css'
import CategorySearch from './pages/CategoryResultPage'
import OffersPage from "./pages/OffersPage"
import AdminPage from "./pages/AdminPage"
import LandingPage from './pages/LandingPage'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Import Navigate

import LoginPage from './pages/auth/LoginPage'
import SignupPage from './pages/auth/SignupPage'

import RestaurantPage from './pages/RestaurantsPage'
import CartPage from './pages/CartPage'
import Settings from "./pages/profile/Settings"
import Favorites from "./pages/profile/Favorites"
import HelpSupport from "./pages/profile/Help-Support"
import Orders from "./pages/profile/Orders"
import Payments from "./pages/profile/Payment"
import Addresses from "./pages/profile/Address"
import Dashboard from "./pages/profile/Dashboard"

import ProfileLayout from './components/ProfileLayout'
import NotFound from './components/NotFound'
import CorporatePage from './pages/CorporatePage'
import CheckApi from './components/checkApi'



function App() {
  return (
    <>
      <Routes>
        <Route index element={<LandingPage />} /> {/* Renders at "/" */}
        <Route path="restaurants" element={<RestaurantPage />} />
        <Route path="categories" element={<CategorySearch />} />
        <Route path="offers" element={<OffersPage />} />
        <Route path="admin" element={<AdminPage />} />
        <Route path="login" element={<LoginPage/>} />
        <Route path="signup" element={<SignupPage/>} />
        <Route path="cart" element={<CartPage/>} />
        <Route path="corporate" element={<CorporatePage/>} />
        <Route path="checkapi" element={<CheckApi/>} />

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


        {/* Catch-all route for 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>

    </>

  )
}

export default App
