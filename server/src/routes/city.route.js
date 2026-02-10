import { Router } from 'express';

import { getAllCities } from '../controllers/city.controller.js';

const cityRoute = Router();

cityRoute.get('/', getAllCities);

export default cityRoute;
