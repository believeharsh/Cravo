import { validateToken } from '../services/userTokens.js';
import { asyncHandler } from '../services/asyncHandler.js';
import User from '../models/user.model.js';
import { apiError } from '../services/ApiError.js';

const checkAuth = asyncHandler(async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  console.log('Token is coming', token);
  if (!token) {
    // No token, so the user is a guest.
    return next();
  }
  try {
    const decodedToken = validateToken(token);
    const user = await User.findById(decodedToken?._id).select(
      '-password -refreshToken'
    );

    // If a user is found, attach them to the request object.
    if (user) {
      req.user = user;
    }

    // Continue to the next middleware.
    next();
  } catch (error) {
    // If the token is invalid or expired, log the error but still proceed.
    // This allows public routes to function correctly.
    console.error('Error validating token:', error.message);
    next();
  }
});

// Middleware to enforce login for a route
const isLoggedIn = (req, res, next) => {
  if (!req.user) {
    // If req.user doesn't exist, it means checkAuth failed to validate a token.
    throw new apiError(401, 'Unauthorized request: You must be logged in.');
  }
  next();
};

const authorizeRoles = (...roles) => {
  // ... (Your authorizeRoles middleware is already correct)
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      throw new apiError(
        403,
        'Access Denied: User authentication or role information missing.'
      );
    }
    if (!roles.includes(req.user.role)) {
      throw new apiError(
        403,
        `Access Denied: You do not have the required permission (${req.user.role}).`
      );
    }
    next();
  };
};

export { authorizeRoles, checkAuth, isLoggedIn };
