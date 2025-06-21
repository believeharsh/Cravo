import { Router } from "express"
import {
    loginUser, 
    registerUser,
    logoutUser, 
    changePassword
} from "../controllers/auth.controller.js"
import { verifyUserJwtToken } from "../middlewares/auth.middleware.js";

// import { upload } from "../middlewares/multer.middleware.js"


const authRoute = Router();

authRoute.post("/signin", loginUser)
authRoute.post("/signup", registerUser)
authRoute.get('/logout', verifyUserJwtToken, logoutUser)
// authRoute.get("/profile", verifyUserJwtToken,  getCurrentUser)
// authRoute.get("/checkAuth", verifyUserJwtToken, checkAuth )
// authRoute.post("/refresh-token", refreshAccessToken)
// authRoute.post("/edit-user-profile", verifyUserJwtToken, editUserProfile)


export default authRoute