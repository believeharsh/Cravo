import { Router } from 'express';
import {
  categoryResultForGivenCetgory,
  getAllCategories,
} from '../controllers/category.controller.js';

const categoryRoute = Router();

categoryRoute.get('/get-All-Categories', getAllCategories);
categoryRoute.get('/category-result', categoryResultForGivenCetgory);

export default categoryRoute;
