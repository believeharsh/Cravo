import { Router } from 'express';

import { getUserLocation } from '../controllers/location.controller.js';
import { checkAuth, isLoggedIn } from '../middlewares/auth.middleware.js';

const locationRoute = Router();

locationRoute.get('/user-location', getUserLocation);

export default locationRoute;
