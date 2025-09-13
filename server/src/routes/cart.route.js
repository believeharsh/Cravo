import { Router } from 'express';
import { checkAuth, isLoggedIn } from '../middlewares/auth.middleware.js';
import {
  addItemToTheCart,
  getAllCartItems,
  updateItemQuantityInCart,
  removeItemFromCart,
  clearTheEntireCart,
} from '../controllers/cart.controller.js';

const cartRoute = Router();

cartRoute.get('/', checkAuth, isLoggedIn, getAllCartItems); // GET : for getting the entire cart resource

cartRoute.delete('/', checkAuth, isLoggedIn, clearTheEntireCart); // DELETE : for getting the entire cart resource

cartRoute.post('/items', checkAuth, isLoggedIn, addItemToTheCart); // POST for adding an item

cartRoute.patch(
  '/items/:itemId',
  checkAuth,
  isLoggedIn,
  updateItemQuantityInCart
); // PATCH : for updating the quantity of the items int the cart ;

cartRoute.delete('/items/:itemId', checkAuth, isLoggedIn, removeItemFromCart); // DELETE: deleting a specific item resource

export default cartRoute;
