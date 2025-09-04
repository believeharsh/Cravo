import User from '../models/user.model.js';
import { asyncHandler } from '../services/asyncHandler.js';
import { apiResponse } from '../services/apiResponse.js';
import { generateUsername } from '../services/generateUserName.js';
import { apiError } from '../services/ApiError.js';
import JWT from 'jsonwebtoken';
import { sendVerificationOTP } from '../services/emailService.js';
import {
  createAccessToken,
  createRefreshToken,
} from '../services/userTokens.js';

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new apiError(400, 'Email and password are required');
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new apiError(404, 'User not found with this email');
  }

  // Checking if user is verified or not
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

  // generating the tokens as the user is authenticated and verified
  const { accessToken, refreshToken } = await User.matchPassAndGenTokens(
    email,
    password
  );

  // Save refresh token in DB (replace old one for simplicity)
  user.refreshTokens = [{ token: refreshToken }];
  await user.save({ validateBeforeSave: false });

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
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

const getAuthStatus = asyncHandler(async (req, res) => {
  // Check if req.user exists. If it does, the user is authenticated.
  if (req.user) {
    return res.status(200).json(
      new apiResponse(
        200,
        {
          isAuthenticated: true,
          user: {
            id: req.user._id,
            email: req.user.email,
            role: req.user.role,
            name: req.user.name,
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
    secure: process.env.NODE_ENV === 'production',
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
  if (!refreshToken) throw new apiError(401, 'No refresh token provided');

  let decoded;
  try {
    decoded = JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  } catch (err) {
    throw new apiError(403, 'Invalid or expired refresh token');
  }

  // Finding the user and the specific refresh token in a single operation
  const user = await User.findOne({
    _id: decoded.userId,
    'refreshTokens.token': refreshToken,
  });

  if (!user) {
    throw new apiError(
      403,
      'Refresh token not recognized. Please log in again.'
    );
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
    email: user.email,
    name: user.name,
    role: user.role,
    isVerified: user.isVerified,
  };

  res.cookie('refreshToken', newRefreshToken, {
    httpOnly: true,
    sameSite: 'Lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000,
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
  loginUser,
  registerUser,
  logoutUser,
  getAuthStatus,
  changePassword,
  verifyUserOTP,
  refreshAccessToken,
};
