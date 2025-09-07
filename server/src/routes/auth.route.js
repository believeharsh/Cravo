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
// import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import jwt from 'jsonwebtoken';
// import User from '../models/user.model.js';
// import { apiResponse } from '../services/apiResponse.js';
// import { apiError } from '../services/ApiError.js';
// import { asyncHandler } from '../services/asyncHandler.js';

const authRoute = Router();

// --- Passport Configuration for Google OAuth ---
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: 'http://localhost:8000/api/v1/auth/google/callback',
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       console.log('Google Profile Data:', profile);
//       try {
//         // Step 1: Check if the user has already signed up with Google
//         const existingUser = await User.findOne({ googleId: profile.id });

//         if (existingUser) {
//           // User exists with a Google account, we're done
//           return done(null, existingUser);
//         }

//         // Step 2: If not found by Google ID, check if a user exists with the same email
//         const userByEmail = await User.findOne({
//           email: profile.emails[0].value,
//         });

//         if (userByEmail) {
//           // User exists with this email, so we link their Google account
//           userByEmail.googleId = profile.id;
//           await userByEmail.save();
//           return done(null, userByEmail);
//         }

//         // Step 3: If no user is found with Google ID or email, create a new one
//         const newUser = await new User({
//           googleId: profile.id,
//           name: profile.displayName,
//           email: profile.emails[0].value,
//           isVerified: true,
//         }).save();

//         done(null, newUser);
//       } catch (error) {
//         done(error, null);
//       }
//     }
//   )
// );

// We need a way for Passport to handle users.
// With JWTs, we don't need sessions, so we can use these simple functions.
// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   const user = await User.findById(id);
//   done(null, user);
// });

// --- Existing Routes ---
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
  // asyncHandler(async (req, res) => {
  //   // 1. Fetch a fresh, clean user object from the database
  //   const user = await User.findById(req.user._id).select('-password');
  //   if (!user) {
  //     throw new apiError(404, 'User not found');
  //   }

  //   // 2. Generate the tokens using the user's model methods
  //   // NOTE: This should use the fresh user object you just fetched.
  //   const { accessToken, refreshToken } =
  //     await user.generateAccessAndRefreshToken();

  //   // 3. Set cookie for the refresh token (already correct)
  //   const options = {
  //     httpOnly: true,
  //     secure: process.env.NODE_ENV === 'production',
  //     sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
  //     path: '/',
  //   };
  //   res.cookie('refreshToken', refreshToken, options);

  //   // 4. Send a structured payload to the frontend via postMessage
  //   const payload = {
  //     type: 'authComplete',
  //     success: true,
  //     data: {
  //       accessToken: accessToken,
  //       user: user,
  //     },
  //   };

  //   // 5. Embed the payload directly into the HTML script
  //   // Note: JSON.stringify() is used to convert the JavaScript object to a JSON string
  //   res.send(`
  //     <!DOCTYPE html>
  //     <html>
  //       <head>
  //         <title>Authentication Complete</title>
  //       </head>
  //       <body>
  //         <script>
  //           (function() {
  //             if (window.opener) {
  //               window.opener.postMessage(${JSON.stringify(payload)}, "http://localhost:5173");
  //               window.close();
  //             }
  //           })();
  //         </script>
  //       </body>
  //     </html>
  //   `);
  // })
);

export default authRoute;
