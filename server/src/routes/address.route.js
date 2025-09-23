import { Router } from 'express';
import {
  authorizeRoles,
  checkAuth,
  isLoggedIn,
} from '../middlewares/auth.middleware.js';
import {
  createAddress,
  getAllAddresses,
  getAddressById,
  updateAddress,
  deleteAddress,
} from '../controllers/address.controller.js';

const addressRoute = Router();

addressRoute.post('/', checkAuth, isLoggedIn, createAddress);
addressRoute.get('/', checkAuth, isLoggedIn, getAllAddresses);
addressRoute.get('/:addressId', checkAuth, isLoggedIn, getAddressById);
addressRoute.patch('/:addressId', checkAuth, isLoggedIn, updateAddress);
addressRoute.delete('/:addressId', checkAuth, isLoggedIn, deleteAddress);

export default addressRoute;
