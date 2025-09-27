import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import landingPageReducer from '../features/landing/landingSlice';
import locationReducer from '../features/location/locationSlice';
import cartReducer from '../features/cart/cartSlice';
import wishlistReducer from '../features/wishList/wishListSlice';
import uiReducer from '../features/ui/uiSlice';
import addressReducer from '../features/address/addressSlice';
import categoryResultReducer from '../features/categoryResult/categoryResultSlice';
import restaurantMenuReducer from '../features/restaurantMenu/restaurantMenuSlice';

import axiosInstance from '../api/axiosInstance';

const store = configureStore({
  reducer: {
    ui: uiReducer,
    auth: authReducer,
    landingPage: landingPageReducer,
    location: locationReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    address: addressReducer,
    categoryResult: categoryResultReducer,
    restaurantMenu: restaurantMenuReducer,
  },
});

export default store;
// Exporting the instance as a named export for convenience
export { axiosInstance };
