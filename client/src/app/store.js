import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import landingPageReducer from '../features/landing/landingSlice';
import locationReducer from '../features/location/locationSlice';
import cartReducer from '../features/cart/cartSlice';

// import userReducer from '../features/user/userSlice';
// import postsReducer from '../features/posts/postsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    landingPage: landingPageReducer,
    location: locationReducer,
    cart: cartReducer,
    // auth: authReducer,
    // user: userReducer,
    // posts: postsReducer,
  },
  // Optionally add middleware or other enhancers here
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(myCustomMiddleware),
  // devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development
});

export default store;
