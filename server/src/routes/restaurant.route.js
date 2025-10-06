import { Router } from 'express';
import {
  getRestaurantsByQuery,
  getRestaurantById,
  getRestaurantsByLocation,
  AllProductsOfTheRestaurant,
  getRestaurantsWithNoProducts,
  getTopRatedRestuarantsOfTheCity,
} from '../controllers/restaurant.controller.js';
import { checkAuth, isLoggedIn } from '../middlewares/auth.middleware.js';
const restaurantRoute = Router();

restaurantRoute.use(checkAuth);

restaurantRoute.get('/', getRestaurantsByQuery);

restaurantRoute.get('/top-rated', getTopRatedRestuarantsOfTheCity);

restaurantRoute.get('/location', getRestaurantsByLocation);

restaurantRoute.get('/no-products', getRestaurantsWithNoProducts);

restaurantRoute.get('/:restaurantId/products', AllProductsOfTheRestaurant);

restaurantRoute.get('/:restaurantId', getRestaurantById);

export default restaurantRoute;
