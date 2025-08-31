import { Router } from 'express';
import {
  loginUser,
  registerUser,
  logoutUser,
  getAuthStatus,
  changePassword,
  verifyUser,
} from '../controllers/auth.controller.js';
import {
  authorizeRoles,
  checkAuth,
  isLoggedIn,
} from '../middlewares/auth.middleware.js';

const authRoute = Router();

authRoute.post('/login', loginUser);

authRoute.post('/register', registerUser);

authRoute.get('/logout', checkAuth, isLoggedIn, logoutUser);

authRoute.get('/profile', checkAuth, getAuthStatus);

authRoute.get('/verify', verifyUser);

export default authRoute;
