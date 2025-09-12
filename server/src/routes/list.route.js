import { Router } from 'express';
import { checkAuth, isLoggedIn } from '../middlewares/auth.middleware.js';
import {
  createNewList,
  getAllListOfUser,
  getListById,
  addProductToTheList,
  removeProductFromList,
  deleteTheList,
} from '../controllers/list.controller.js';

const listRoute = Router();

listRoute.post('/', checkAuth, isLoggedIn, createNewList); // for Creating a new list for the user

listRoute.get('/', checkAuth, isLoggedIn, getAllListOfUser); // for Getting all lists for the user

listRoute.get('/:id', checkAuth, isLoggedIn, getListById); // for Getting a specific list by its ID

listRoute.post('/:id/add', checkAuth, isLoggedIn, addProductToTheList); // for Adding a product to a specific list

listRoute.delete('/:id/remove', checkAuth, isLoggedIn, removeProductFromList); // for Removing a product from a specific list

listRoute.delete('/:id', checkAuth, isLoggedIn, deleteTheList); // for Deleting an entire list

export default listRoute;
