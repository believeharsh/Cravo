import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import landingPageReducer from '../features/landing/landingSlice';
import locationReducer from '../features/location/locationSlice';
import cartReducer from '../features/cart/cartSlice';
import authModalReducer from '../features/authModal/authModelSlice';
import wishlistReducer from '../features/wishList/wishListSlice';

// import userReducer from '../features/user/userSlice';
// import postsReducer from '../features/posts/postsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    landingPage: landingPageReducer,
    location: locationReducer,
    cart: cartReducer,
    authModal: authModalReducer,
    wishlist: wishlistReducer,
    // auth: authReducer,
    // user: userReducer,
    // posts: postsReducer,
  },
  // Optionally add middleware or other enhancers here
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(myCustomMiddleware),
  // devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development
});

export default store;
