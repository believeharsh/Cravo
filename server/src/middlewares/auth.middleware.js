import { validateToken } from "../services/userTokens.js";
import { asyncHandler } from "../services/asyncHandler.js";
import User from "../models/user.model.js";
import { apiError } from "../services/ApiError.js";

const verifyUserJwtToken = asyncHandler(async (req, res, next) => {
    try {

        const userToken = req.cookies?.accessToken;
        // console.log("This is the User Token", userToken)
        if (!userToken) {
            throw new apiError(401, "Unauthorized request");
        }

        let decodedToken;
        try {
            decodedToken = validateToken(userToken); // Validate token
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                console.log("Access token expired. Requesting refresh...");
                return res.status(401).json(new apiError(401, "Token expired, please refresh"));
            }
            throw new apiError(400, "Invalid token");
        }

        const user = await User.findById(decodedToken._id).select("-password -refreshToken");

        if (!user) {
            throw new apiError(401, "Invalid token");
        }

        req.user = user;
        next();
    } catch (error) {
        throw new apiError(400, error?.message || "Invalid Token");
    }
});

export { verifyUserJwtToken };