import { Router } from "express"
import {
    loginUser, 
    registerUser,
    logoutUser,
    getAuthStatus, 
    changePassword,
    verifyUser
} from "../controllers/auth.controller.js"
import {authorizeRoles, checkAuth, isLoggedIn} from "../middlewares/auth.middleware.js"

const authRoute = Router()

authRoute.post("/signin", loginUser)
authRoute.post("/signup", registerUser)
authRoute.get("/verify-auth", checkAuth, getAuthStatus)
authRoute.get("/logout", checkAuth, isLoggedIn, logoutUser)
authRoute.get("/verify-account", verifyUser)

export default authRoute