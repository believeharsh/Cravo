import { Router } from 'express';
import { checkAuth, isLoggedIn } from '../middlewares/auth.middleware.js';
import { verifyPayment } from '../controllers/payment.controller.js';

const paymentRoute = Router();

paymentRoute.post('/verify', verifyPayment);

export default paymentRoute;
