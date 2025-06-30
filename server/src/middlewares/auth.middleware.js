import { validateToken } from "../services/userTokens.js";
import { asyncHandler } from "../services/asyncHandler.js";
import User from "../models/user.model.js";
import { apiError } from "../services/ApiError.js";
import jwt from "jsonwebtoken"

const verifyUserJwtToken = asyncHandler(async (req, res, next) => {
  try {
   
    const userToken =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!userToken) {
      throw new apiError(401, "Unauthorized request: Access token missing.");
    }

    let decodedToken;
    try {

      decodedToken = validateToken(userToken);
    } catch (jwtError) {
     
      if (jwtError instanceof jwt.TokenExpiredError) {
        console.log("Access token expired. User needs to refresh.");
        throw new apiError(401, "Access token expired, please refresh.");
      } else if (jwtError instanceof jwt.JsonWebTokenError) {
        console.log("Invalid access token:", jwtError.message);
        throw new apiError(401, "Invalid access token.");
      } else {
        console.error("Unexpected JWT error:", jwtError);
        throw new apiError(
          500,
          "Authentication failed due to token processing error."
        );
      }
    }

    // Token is valid, so finding the user in db 
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      // User from token not found in DB 
      throw new apiError(
        401,
        "Invalid access token: User not found in database."
      );
    }

    req.user = user;

    next(); 
  } catch (error) {
    console.error("Error in verifyUserJwtToken middleware:", error.message);
    throw error; 
  }
});

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

export { verifyUserJwtToken, authorizeRoles };
