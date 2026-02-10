import { Router } from 'express';

import { getProductsByQuery } from '../controllers/product.controller.js';

const productRoute = Router();

productRoute.get('/', getProductsByQuery);

export default productRoute;
