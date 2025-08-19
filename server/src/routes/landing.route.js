import { Router } from 'express';
import { getLandingPageData } from '../controllers/landing.controller.js';

const landingRoute = Router();

landingRoute.get('/', getLandingPageData);

export default landingRoute;
