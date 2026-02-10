import { Router } from 'express';

import {
  cancelOrder,
  createOrder,
  getAllUserOrders,
  getOrderByOrderId,
} from '../controllers/order.controller.js';
import { checkAuth, isLoggedIn } from '../middlewares/auth.middleware.js';

const orderRoute = Router();

orderRoute.post('/checkout', checkAuth, isLoggedIn, createOrder);

orderRoute.patch('/cancle/:orderId', checkAuth, isLoggedIn, cancelOrder);

orderRoute.get('/', checkAuth, isLoggedIn, getAllUserOrders);

orderRoute.get('/:orderId', checkAuth, isLoggedIn, getOrderByOrderId);

export default orderRoute;
