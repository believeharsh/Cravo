import { validateToken } from "../services/userTokens.js";
import { asyncHandler } from "../services/asyncHandler.js";
import User from "../models/user.model.js";
import { apiError } from "../services/ApiError.js";
import jwt from "jsonwebtoken"

const checkAuth = asyncHandler(async (req, res, next) => {
  try {
    const userToken = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    if (!userToken) {
      // No token found, so the user is a guest. We don't throw an error; we just proceed.
      return next();
    }

    let decodedToken;
    try {
      decodedToken = validateToken(userToken);
    } catch (jwtError) {
      // Invalid token, but we still treat them as a guest.
      console.log("Invalid access token:", jwtError.message);
      return next();
    }

    // Token is valid, so find the user in the database.
    const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

    if (user) {
      // User found, attaching the user object to the request.
      req.user = user;
    }
    
    // User not found in DB or other issue, so treating as a guest and proceed.
    next();
  } catch (error) {
    console.error("Error in checkAuth middleware:", error.message);
    next();
  }
});

const isLoggedIn = (req, res, next) => {
  if (!req.user) {
    throw new apiError(401, "Unauthorized request: You must be logged in.");
  }
  next();
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      throw new apiError(
        403,
        "Access Denied: User authentication or role information missing."
      );
    }

    if (!roles.includes(req.user.role)) {
      // User's role is not in the list of allowed roles for this route
      throw new apiError(
        403,
        `Access Denied: You do not have the required permission (${req.user.role}).`
      );
    }

    next(); // User has an allowed role, proceed to the next middleware or controller
  };
};

export { authorizeRoles, checkAuth, isLoggedIn };
