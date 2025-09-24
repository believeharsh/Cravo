import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/user.model.js';
import { createRefreshToken } from '../services/userTokens.js';
import { createDefaultLists } from '../services/user.service.js';

const configurePassport = () => {
  // --- Passport Configuration for Google OAuth ---
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:8000/api/v1/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const existingUser = await User.findOne({ googleId: profile.id });
          if (existingUser) {
            return done(null, existingUser);
          }

          const userByEmail = await User.findOne({
            email: profile.emails[0].value,
          });
          if (userByEmail) {
            userByEmail.googleId = profile.id;
            await userByEmail.save();
            return done(null, userByEmail);
          }

          const newUser = await new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            isVerified: true,
          }).save();

          const listResult = await createDefaultLists(newUser._id);
          newUser.isNewUser = true;
          console.log(listResult);

          done(null, newUser);
        } catch (error) {
          done(error, null);
        }
      }
    )
  );

  // We need a way for Passport to handle users.
  // With JWTs, we don't need sessions, so we can use these simple functions.
  // NOTE: Even with `session: false`, these are often required by Passport.
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
  });
};

export default configurePassport;
