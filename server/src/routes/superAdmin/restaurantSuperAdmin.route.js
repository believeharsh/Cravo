import { Router } from 'express';

import {
  deleteRestaurant,
  getRestaurantsByCity,
  getTotalRestaurantCount,
} from '../../controllers/superAdmin/restaurantSuperAdmin.controller.js';
import { checkAuth, isLoggedIn } from '../../middlewares/auth.middleware.js';

const restaurantSuperAdminRoute = Router();

restaurantSuperAdminRoute.get(
  '/count',
  checkAuth,
  isLoggedIn,
  getTotalRestaurantCount
);
restaurantSuperAdminRoute.get(
  '/city/:cityId',
  checkAuth,
  isLoggedIn,
  getRestaurantsByCity
);
restaurantSuperAdminRoute.delete(
  '/:restaurantId',
  checkAuth,
  isLoggedIn,
  deleteRestaurant
);

export default restaurantSuperAdminRoute;
