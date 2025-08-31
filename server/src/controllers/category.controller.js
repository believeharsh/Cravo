import Category from '../models/category.model.js';
import { asyncHandler } from '../services/asyncHandler.js';
import { apiResponse } from '../services/apiResponse.js';
import Restaurant from '../models/restaurant.model.js';

const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({ isVisible: true })
    .sort({ displayOrder: 1 })
    .select('name image slug displayOrder')
    .lean();
  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        { categories: categories },
        'all categories fetched succussfully'
      )
    );
});

export { getAllCategories };
