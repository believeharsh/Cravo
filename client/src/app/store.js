import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import landingPageReducer from '../features/landing/landingSlice';
import locationReducer from '../features/location/locationSlice';
// import userReducer from '../features/user/userSlice';
// import postsReducer from '../features/posts/postsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer, // Add your auth slice here
    landingPage: landingPageReducer,
    location: locationReducer,
    // auth: authReducer,
    // user: userReducer,
    // posts: postsReducer,
  },
  // Optionally add middleware or other enhancers here
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(myCustomMiddleware),
  // devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development
});

export default store;
