import { Router } from 'express';
import { checkAuth, isLoggedIn } from '../middlewares/auth.middleware.js';
import { getUserLocation } from '../controllers/location.controller.js';

const locationRoute = Router();

locationRoute.get('/user-location', getUserLocation);

export default locationRoute;
