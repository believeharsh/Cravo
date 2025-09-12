import { Router } from 'express';
import {
  loginUser,
  registerUser,
  logoutUser,
  getAuthStatus,
  changePassword,
  verifyUserOTP,
  refreshAccessToken,
  googleAuthCallback,
} from '../controllers/auth.controller.js';
import {
  authorizeRoles,
  checkAuth,
  isLoggedIn,
} from '../middlewares/auth.middleware.js';
import passport from 'passport';

const authRoute = Router();

authRoute.post('/login', loginUser);
authRoute.post('/register', registerUser);
authRoute.get('/logout', checkAuth, isLoggedIn, logoutUser);
authRoute.get('/profile', checkAuth, getAuthStatus);
authRoute.post('/verify', verifyUserOTP);
authRoute.post('/refresh', refreshAccessToken);

// ---  Google Login Routes ---
// This route starts the authentication process.
authRoute.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false, // We're using tokens, not sessions
  })
);

// This is the callback route Google sends the user to after a successful login.
authRoute.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: 'http://localhost:5173/login',
    session: false,
  }),
  googleAuthCallback
);

export default authRoute;
