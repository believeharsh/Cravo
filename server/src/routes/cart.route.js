import { Router } from 'express';

import {
  addItemToTheCart,
  clearTheEntireCart,
  getAllCartItems,
  removeItemFromCart,
  updateItemQuantityInCart,
} from '../controllers/cart.controller.js';
import { checkAuth, isLoggedIn } from '../middlewares/auth.middleware.js';

const cartRoute = Router();

cartRoute.get('/', checkAuth, isLoggedIn, getAllCartItems);

cartRoute.delete('/', checkAuth, isLoggedIn, clearTheEntireCart);

cartRoute.post('/items', checkAuth, isLoggedIn, addItemToTheCart);

cartRoute.patch(
  '/items/:itemId',
  checkAuth,
  isLoggedIn,
  updateItemQuantityInCart
);

cartRoute.delete('/items/:itemId', checkAuth, isLoggedIn, removeItemFromCart);

export default cartRoute;
