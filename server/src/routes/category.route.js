import { Router } from 'express';
import {
  //   categoryResultForGivenCetgory,
  getAllCategories,
} from '../controllers/category.controller.js';

const categoryRoute = Router();

categoryRoute.get('/', getAllCategories);

// categoryRoute.get('/:categoryName', categoryResultForGivenCetgory);

export default categoryRoute;
