// import { Router } from 'express';
// import {
//   getRestaurantsByQuery,
//   getRestaurantById,
//   getRestaurantsByLocation,
//   AllProductsOfTheRestaurant,
//   getRestaurantsWithNoProducts,
//   getTopRatedRestuarantsOfTheCity,
// } from '../controllers/restaurant.controller.js';
// import { checkAuth, isLoggedIn } from '../middlewares/auth.middleware.js';
// const restaurantRoute = Router();

// restaurantRoute.use(checkAuth); // Running checkAuth on every incoming request to check the auth status of the user

// restaurantRoute.get('/', getRestaurantsByQuery);

// restaurantRoute.get('/location', getRestaurantsByLocation);

// restaurantRoute.get('/no-products', getRestaurantsWithNoProducts);

// restaurantRoute.get('/:restaurantId', getRestaurantById);

// restaurantRoute.get('/:restaurantId/products', AllProductsOfTheRestaurant);

// restaurantRoute.get('/top-rated', getTopRatedRestuarantsOfTheCity) ;

// export default restaurantRoute;

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

// --- 1. GENERAL LISTS & SPECIFIC HARDCODED ROUTES (Place these FIRST) ---

// Base route for general search/list (e.g., /restaurants?city=Indore)
restaurantRoute.get('/', getRestaurantsByQuery);

// TOP RATED (Must be placed before the generic ID route)
restaurantRoute.get('/top-rated', getTopRatedRestuarantsOfTheCity);

// Other specific routes
restaurantRoute.get('/location', getRestaurantsByLocation);
restaurantRoute.get('/no-products', getRestaurantsWithNoProducts);

// --- 2. PARAMETERIZED ROUTES (Place these LAST) ---

// Route for all products belonging to a specific restaurant
restaurantRoute.get('/:restaurantId/products', AllProductsOfTheRestaurant);

// GET BY ID (The most generic route, placed last)
restaurantRoute.get('/:restaurantId', getRestaurantById);

export default restaurantRoute;
