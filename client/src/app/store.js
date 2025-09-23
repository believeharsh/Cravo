import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import landingPageReducer from '../features/landing/landingSlice';
import locationReducer from '../features/location/locationSlice';
import cartReducer from '../features/cart/cartSlice';
import wishlistReducer from '../features/wishList/wishListSlice';
import uiReducer from '../features/ui/uiSlice';
import addressReducer from '../features/address/addressSlice';
// import userReducer from '../features/user/userSlice';
// import postsReducer from '../features/posts/postsSlice';

const store = configureStore({
  reducer: {
    ui: uiReducer,
    auth: authReducer,
    landingPage: landingPageReducer,
    location: locationReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    address: addressReducer,
    // auth: authReducer,
    // user: userReducer,
    // posts: postsReducer,
  },
  // Optionally add middleware or other enhancers here
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(myCustomMiddleware),
  // devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development
});

export default store;
