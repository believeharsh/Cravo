import { Router } from 'express';
import { checkAuth, isLoggedIn } from '../middlewares/auth.middleware.js';
import {
  createNewList,
  getAllListOfUser,
  getListById,
  addProductToTheList,
  removeProductFromList,
  deleteTheList,
  transferProductToList,
} from '../controllers/list.controller.js';

const listRoute = Router();

listRoute.post('/', checkAuth, isLoggedIn, createNewList);

listRoute.get('/', checkAuth, isLoggedIn, getAllListOfUser);

listRoute.get('/:id', checkAuth, isLoggedIn, getListById);

listRoute.post('/:id/add', checkAuth, isLoggedIn, addProductToTheList);

listRoute.delete('/:id/remove', checkAuth, isLoggedIn, removeProductFromList);

listRoute.delete('/:id', checkAuth, isLoggedIn, deleteTheList);

listRoute.post('/transfer', checkAuth, isLoggedIn, transferProductToList);

export default listRoute;
