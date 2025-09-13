import { Router } from 'express';
import { checkAuth, isLoggedIn } from '../middlewares/auth.middleware.js';
import {
  createOrder,
  getAllUserOrders,
  cancelOrder,
  getOrderByOrderId,
} from '../controllers/order.controller.js';

const orderRoute = Router();

// Endpoint for the checkout process
orderRoute.post('/checkout', checkAuth, isLoggedIn, createOrder);

// Endpoint for the cancling the order
orderRoute.patch('/cancle/:orderId', checkAuth, isLoggedIn, cancelOrder);

// Endpoints for retrieving a user's orders
orderRoute.get('/', checkAuth, isLoggedIn, getAllUserOrders);
orderRoute.get('/:orderId', checkAuth, isLoggedIn, getOrderByOrderId);

export default orderRoute;
