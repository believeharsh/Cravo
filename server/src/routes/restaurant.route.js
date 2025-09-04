import { Router } from 'express';
import {
  getRestaurantsByQuery,
  getRestaurantById,
  getRestaurantsByLocation,
  AllProductsOfTheRestaurant,
  getRestaurantsWithNoProducts,
} from '../controllers/restaurant.controller.js';
import { checkAuth, isLoggedIn } from '../middlewares/auth.middleware.js';
const restaurantRoute = Router();

restaurantRoute.use(checkAuth); // Running checkAuth on every incoming request to check the auth status of the user

restaurantRoute.get('/', getRestaurantsByQuery);

restaurantRoute.get('/location', getRestaurantsByLocation);

restaurantRoute.get('/no-products', getRestaurantsWithNoProducts);

restaurantRoute.get('/:restaurantId', getRestaurantById);

restaurantRoute.get('/:restaurantId/products', AllProductsOfTheRestaurant);

export default restaurantRoute;
