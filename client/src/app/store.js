import { configureStore } from '@reduxjs/toolkit';

import axiosInstance from '../api/axiosInstance';
import searchContextReducer from '../features/SearchContext/searchContaxtSlice';
import addressReducer from '../features/address/addressSlice';
import authReducer from '../features/auth/authSlice';
import cartReducer from '../features/cart/cartSlice';
import categoryResultReducer from '../features/categoryResult/categoryResultSlice';
import landingPageReducer from '../features/landing/landingSlice';
import locationReducer from '../features/location/locationSlice';
import ordersReducer from '../features/orders/ordersSlice';
import restaurantMenuReducer from '../features/restaurantMenu/restaurantMenuSlice';
import uiReducer from '../features/ui/uiSlice';
import wishlistReducer from '../features/wishList/wishListSlice';

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
    searchContext: searchContextReducer,
    orders: ordersReducer,
  },
});

export default store;
export { axiosInstance };
