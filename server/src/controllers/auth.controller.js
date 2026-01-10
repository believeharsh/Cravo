import User from '../models/user.model.js';
import { asyncHandler } from '../services/asyncHandler.js';
import { apiResponse } from '../services/apiResponse.js';
import { apiError } from '../services/apiError.js';
import { generateUsername } from '../services/generateUserName.js';
import JWT from 'jsonwebtoken';
import { sendVerificationOTP } from '../services/emailService.js';
import {
  createAccessToken,
  createRefreshToken,
} from '../services/userTokens.js';
import { config } from '../config/app.config.js';

import { createDefaultLists } from '../services/user.service.js';
import { formatJoinDate } from '../utils/UserInfomationUtils.js';
import { EnvConfig } from '../config/env.config.js';

const initiateGoogleAuth = asyncHandler(async (req, res, next) => {
  // Get client origin from query or header
  const clientOrigin =
    req.query.origin || req.get('origin') || config.clientUrl;

  // Validate against allowed origins
  if (!config.allowedOrigins.includes(clientOrigin)) {
    console.log('Invalid origin blocked:', clientOrigin);
    throw new apiError(403, 'Invalid origin');
  }

  req.clientOrigin = clientOrigin;

  // Move to next middleware (passport.authenticate)
  next();
});

const googleAuthCallback = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  if (!user) {
    throw new apiError(404, 'User not found');
  }

  const { accessToken, refreshToken } =
    await user.generateAccessAndRefreshToken();
  user.refreshTokens = [{ token: refreshToken }];
  await user.save({ validateBeforeSave: false });

  res.cookie('refreshToken', refreshToken, config.cookie);

  // Retrieving client origin from session
  let clientUrl = config.clientUrl;

  try {
    const state = JSON.parse(Buffer.from(req.query.state, 'base64').toString());
    if (state.origin && config.allowedOrigins.includes(state.origin)) {
      clientUrl = state.origin;
    }
  } catch (err) {
    console.warn('Failed to decode OAuth state:', err.message);
  }

  const payload = {
    type: 'authComplete',
    success: true,
    data: { accessToken, user },
  };

  res.send(`
    <!DOCTYPE html>
    <html>
      <head><title>Authentication Complete</title></head>
      <body>
        <script>
          (function() {
            const payload = ${JSON.stringify(payload)};
            const targetOrigin = "${clientUrl}";
            
            if (window.opener) {
              window.opener.postMessage(payload, targetOrigin);
              setTimeout(() => window.close(), 500);
            }
          })();
        </script>
      </body>
    </html>
  `);
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new apiError(400, 'Email and password are required');
  }

  const user = await User.findOne({ email });
  // console.log('user', user);
  if (!user) {
    throw new apiError(404, 'User not found with this email');
  }

  if (user.googleId) {
    throw new apiError(
      401,
      'This account was created with Google. Please log in with your Google account.'
    );
  }

  if (!user.isVerified) {
    throw new apiError(
      403,
      'Account not verified. Please check your email for the verification OTP.'
    );
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    throw new apiError(401, 'Invalid credentials');
  }

  // Corrected: Generating the tokens using instance methods
  const { accessToken, refreshToken } =
    await user.generateAccessAndRefreshToken();

  // The rest of the code is fine, but double-check your field name.
  // It's `user.refreshToken` in a previous example, but here it's `user.refreshTokens`.
  // Ensure your Mongoose schema is consistent.
  // For a single token, `user.refreshToken = refreshToken;` is simpler.
  // user.refreshToken = refreshToken;
  user.refreshTokens = [{ token: refreshToken }];
  await user.save({ validateBeforeSave: false });

  const options = {
    httpOnly: true,
    secure: EnvConfig.NODE_ENV === 'production',
    sameSite: EnvConfig.NODE_ENV === 'production' ? 'None' : 'Lax',
    path: '/',
  };

  return res
    .status(200)
    .cookie('refreshToken', refreshToken, options)
    .json(
      new apiResponse(
        200,
        {
          user: {
            _id: user._id,
            username: user.username,
            name: user.name,
            email: user.email,
            isVerified: user.isVerified,
            role: user.role,
          },
          accessToken: accessToken,
        },
        'User logged in successfully'
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  const options = {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    path: '/',
  };

  res
    .status(200)
    .cookie('accessToken', '', { ...options, expires: new Date(0) })
    .cookie('refreshToken', '', { ...options, expires: new Date(0) })
    .json(new apiResponse(200, {}, 'User is logged out now'));
});

const getUserProfileData = asyncHandler(async (req, res) => {
  // Check if req.user exists. If it does, the user is authenticated.
  if (req.user) {
    const user = req.user;
    const joinedAt = formatJoinDate(user.createdAt);
    return res.status(200).json(
      new apiResponse(
        200,
        {
          isAuthenticated: true,
          user: {
            _id: user._id,
            username: user.username,
            name: user.name,
            email: user.email,
            isVerified: user.isVerified,
            role: user.role,
            joinedAt: joinedAt,
          },
        },
        'User is authenticated.'
      )
    );
  } else {
    // If req.user doesn't exist, the user is not authenticated (guest access).
    return res.status(200).json(
      new apiResponse(
        200,
        {
          isAuthenticated: false,
          user: null,
        },
        'User is not authenticated.'
      )
    );
  }
});

const changePassword = () => {};

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if ([name, email, password].some(f => f?.trim() === '')) {
    throw new apiError(400, 'All fields are required');
  }

  const existingUser = await User.findOne({ email });
  if (existingUser && existingUser.isVerified) {
    throw new apiError(409, 'User already exists. Please login.');
  }

  if (existingUser && !existingUser.isVerified) {
    if (existingUser.verificationOTPExpires < Date.now()) {
      await User.deleteOne({ _id: existingUser._id });
    } else {
      throw new apiError(409, 'OTP already sent. Please check your email.');
    }
  }

  const generatedUsername = generateUsername(email);

  // Generating the OTP (6-digit numeric)
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  const newUser = await User.create({
    username: generatedUsername,
    name,
    email,
    password,
    isVerified: false,
    verificationOTP: otp,
    verificationOTPExpires: otpExpires,
  });

  createDefaultLists(newUser._id);

  await sendVerificationOTP(email, `Your verification code is ${otp}`);

  return res
    .status(201)
    .json(
      new apiResponse(
        201,
        { email },
        'User registered successfully. Please check your email for the OTP.'
      )
    );
});

const verifyUserOTP = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email, verificationOTP: otp });

  if (!user) {
    throw new apiError(400, 'Invalid OTP');
  }

  if (user.verificationOTPExpires < Date.now()) {
    throw new apiError(400, 'OTP expired. Please request a new one.');
  }

  // Mark as verified
  user.isVerified = true;
  user.verificationOTP = undefined;
  user.verificationOTPExpires = undefined;

  // Issue tokens (auto login)
  const accessToken = createAccessToken(user);
  const refreshToken = createRefreshToken(user._id);

  user.refreshTokens.push({ token: refreshToken });
  await user.save({ validateBeforeSave: false });

  const safeUser = await User.findById(user._id).select(
    '-password -verificationOTP -verificationOTPExpires -__v -refreshTokens'
  );

  // Set refresh token in HttpOnly cookie
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: EnvConfig.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        { user: safeUser, accessToken },
        'OTP verified successfully! You are now logged in.'
      )
    );
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies?.refreshToken || req.body?.refreshToken;
  if (!refreshToken)
    throw new apiError(401, 'Session expired. Please log in again.');

  let decoded;
  try {
    decoded = JWT.verify(refreshToken, EnvConfig.REFRESH_TOKEN_SECRET);
  } catch (err) {
    throw new apiError(403, 'Invalid or expired refresh token');
  }

  // Finding the user and the specific refresh token in a single operation
  const user = await User.findOne({
    _id: decoded.userId,
    'refreshTokens.token': refreshToken,
  });

  if (!user) {
    throw new apiError(401, 'Session expired. Please log in again.');
  }

  // Generating new tokens here
  const newRefreshToken = createRefreshToken(user._id);
  const accessToken = createAccessToken(user);

  // Step 1: Atomically removing the old refresh token
  await User.updateOne(
    { _id: user._id },
    { $pull: { refreshTokens: { token: refreshToken } } }
  );

  // Step 2: Atomically adding the new refresh token
  await User.updateOne(
    { _id: user._id },
    {
      $push: {
        refreshTokens: {
          token: newRefreshToken,
          createdAt: new Date(),
        },
      },
    }
  );

  // Creating a safe and sanitized user object
  const safeUser = {
    _id: user._id,
    username: user.username,
    email: user.email,
    name: user.name,
    role: user.role,
    isVerified: user.isVerified,
  };

  const isProduction = EnvConfig.NODE_ENV === 'production';

  res.cookie('refreshToken', newRefreshToken, {
    httpOnly: true,
    secure: isProduction, // HTTPS only in production
    sameSite: isProduction ? 'None' : 'Lax', // Lax works locally
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return res.status(200).json(
    new apiResponse(
      200,
      {
        accessToken,
        user: safeUser,
      },
      'New access token issued'
    )
  );
});

export {
  initiateGoogleAuth,
  googleAuthCallback,
  loginUser,
  registerUser,
  logoutUser,
  getUserProfileData,
  changePassword,
  verifyUserOTP,
  refreshAccessToken,
};
