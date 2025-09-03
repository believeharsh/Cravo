import { Router } from 'express';
import {
  // getAllRestaurantsByCategory,
  getRestaurantsByQuery,
  getRestaurantById,
  getRestaurantsByLocation,
  AllProductsOfTheRestaurant,
  getRestaurantsWithNoProducts,
} from '../controllers/restaurant.controller.js';
import { isLoggedIn } from '../middlewares/auth.middleware.js';
const restaurantRoute = Router();

restaurantRoute.get('/', getRestaurantsByQuery);

restaurantRoute.get('/location', getRestaurantsByLocation);

restaurantRoute.get('/no-products', getRestaurantsWithNoProducts);

restaurantRoute.get('/:restaurantId', getRestaurantById);

restaurantRoute.get(
  '/:restaurantId/products',
  isLoggedIn,
  AllProductsOfTheRestaurant
);

export default restaurantRoute;
