import { Router } from 'express';

import {
  addProductToTheList,
  createNewList,
  deleteTheList,
  getAllListOfUser,
  getListById,
  removeProductFromList,
  transferProductToList,
} from '../controllers/list.controller.js';
import { checkAuth, isLoggedIn } from '../middlewares/auth.middleware.js';

const listRoute = Router();

listRoute.post('/', checkAuth, isLoggedIn, createNewList);

listRoute.get('/', checkAuth, isLoggedIn, getAllListOfUser);

listRoute.get('/:id', checkAuth, isLoggedIn, getListById);

listRoute.post('/:id/add', checkAuth, isLoggedIn, addProductToTheList);

listRoute.delete('/:id/remove', checkAuth, isLoggedIn, removeProductFromList);

listRoute.delete('/:id', checkAuth, isLoggedIn, deleteTheList);

listRoute.post('/transfer', checkAuth, isLoggedIn, transferProductToList);

export default listRoute;
