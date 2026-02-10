import { Router } from 'express';
import passport from 'passport';

import {
  changePassword,
  getUserProfileData,
  googleAuthCallback,
  initiateGoogleAuth,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  verifyUserOTP,
} from '../controllers/auth.controller.js';
import {
  authorizeRoles,
  checkAuth,
  isLoggedIn,
} from '../middlewares/auth.middleware.js';

const authRoute = Router();

authRoute.post('/login', loginUser);
authRoute.post('/register', registerUser);
authRoute.post('/logout', checkAuth, isLoggedIn, logoutUser);
authRoute.get('/profile', checkAuth, getUserProfileData);
authRoute.post('/verify', verifyUserOTP);
authRoute.post('/refresh', refreshAccessToken);

// ---  Google Login Routes ---
// This route starts the authentication process.
authRoute.get(
  '/google',
  initiateGoogleAuth,
  // passport.authenticate('google', {
  //   scope: ['profile', 'email'],
  //   session: true,
  // })
  (req, res, next) => {
    // Pass the client origin forward using the OAuth state
    const clientOrigin = req.query.origin || req.get('origin');
    const state = Buffer.from(
      JSON.stringify({ origin: clientOrigin })
    ).toString('base64');

    passport.authenticate('google', {
      scope: ['profile', 'email'],
      session: false,
      state, // ✅ attach origin here
    })(req, res, next);
  }
);

// This is the callback route Google sends the user to after a successful login.
authRoute.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
    session: false,
  }),
  googleAuthCallback
);

export default authRoute;
