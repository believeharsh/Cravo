import { Router } from 'express';

import {
  addRestaurantToTheList,
  createNewRestaurantList,
  deleteTheRestaurantList,
  getAllRestaurantListsOfUser,
  getRestaurantListById,
  removeRestaurantFromList,
} from '../controllers/restaurantList.controller.js';
import { checkAuth, isLoggedIn } from '../middlewares/auth.middleware.js';

const restaurantListRoute = Router();

restaurantListRoute.post('/', checkAuth, isLoggedIn, createNewRestaurantList);
restaurantListRoute.get(
  '/',
  checkAuth,
  isLoggedIn,
  getAllRestaurantListsOfUser
);
restaurantListRoute.get('/:id', checkAuth, isLoggedIn, getRestaurantListById);
restaurantListRoute.post(
  '/:id/add',
  checkAuth,
  isLoggedIn,
  addRestaurantToTheList
);
restaurantListRoute.delete(
  '/:id/remove',
  checkAuth,
  isLoggedIn,
  removeRestaurantFromList
);
restaurantListRoute.delete(
  '/:id',
  checkAuth,
  isLoggedIn,
  deleteTheRestaurantList
);

export default restaurantListRoute;
