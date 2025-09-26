// import { configureStore } from '@reduxjs/toolkit';
// import authReducer from '../features/auth/authSlice';
// import landingPageReducer from '../features/landing/landingSlice';
// import locationReducer from '../features/location/locationSlice';
// import cartReducer from '../features/cart/cartSlice';
// import wishlistReducer from '../features/wishList/wishListSlice';
// import uiReducer from '../features/ui/uiSlice';
// import addressReducer from '../features/address/addressSlice';
// import categoryResultReducer from "../features/categoryResult/categoryResultSlice" ;

// const store = configureStore({
//   reducer: {
//     ui: uiReducer,
//     auth: authReducer,
//     landingPage: landingPageReducer,
//     location: locationReducer,
//     cart: cartReducer,
//     wishlist: wishlistReducer,
//     address: addressReducer,
//     categoryResult: categoryResultReducer,
//   },
//   // Optionally add middleware or other enhancers here
//   // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(myCustomMiddleware),
//   // devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development
// });

// export default store;

// src/app/store.js (Cleaned Up)

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

// Import the default axiosInstance (which no longer imports the store)
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
// Export the instance as a named export for convenience
export { axiosInstance };
