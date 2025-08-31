import { Router } from 'express';
import {
  // getAllRestaurantsByCategory,
  getRestaurantsByQuery,
  getRestaurantById,
  getRestaurantsByLocation,
  AllProductsOfTheRestaurant,
  getRestaurantsWithNoProducts,
} from '../controllers/restaurant.controller.js';

const restaurantRoute = Router();

restaurantRoute.get('/', getRestaurantsByQuery);

restaurantRoute.get('/location', getRestaurantsByLocation);

restaurantRoute.get('/no-products', getRestaurantsWithNoProducts);

restaurantRoute.get('/:restaurantId', getRestaurantById);

restaurantRoute.get('/:restaurantId/products', AllProductsOfTheRestaurant);

export default restaurantRoute;
