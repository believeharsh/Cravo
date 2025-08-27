import { Router } from 'express';
import {
  getAllProductByCategory,
  AllProductsOfTheRestaurant,
  getRestaurantsWithNoProducts,
} from '../controllers/product.controller.js';
const productRoute = Router();

productRoute.get('/RestaurantWithNoProducts', getRestaurantsWithNoProducts);

productRoute.get(
  '/restaurantProducts/:restaurantID',
  AllProductsOfTheRestaurant
);

productRoute.get('/:categoryName', getAllProductByCategory);

export default productRoute;
