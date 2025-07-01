import { configureStore } from '@reduxjs/toolkit';
// Import your slice reducers here as you create them
import authReducer from '../features/auth/authSlice';
// import userReducer from '../features/user/userSlice';
// import postsReducer from '../features/posts/postsSlice';

const store = configureStore({
    reducer: {
        auth: authReducer, // Add your auth slice here
        // auth: authReducer,
        // user: userReducer,
        // posts: postsReducer,
    },
    // Optionally add middleware or other enhancers here
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(myCustomMiddleware),
    // devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development
});

export default store;