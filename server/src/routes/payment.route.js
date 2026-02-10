import { Router } from 'express';

import { verifyPayment } from '../controllers/payment.controller.js';
import { checkAuth, isLoggedIn } from '../middlewares/auth.middleware.js';

const paymentRoute = Router();

paymentRoute.post('/verify', verifyPayment);

export default paymentRoute;
