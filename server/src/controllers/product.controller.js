import Category from '../models/category.model.js';
import Product from '../models/product.model.js';
import Restaurant from '../models/restaurant.model.js';
import { asyncHandler } from '../services/asyncHandler.js';
import { apiResponse } from '../services/apiResponse.js';
import { apiError } from '../services/ApiError.js';
import City from '../models/city.model.js';

/**
 * @description Get products based on optional query filters (category, city, etc.)
 * @route GET /api/v1/products
 * @access Public
 */
const getProductsByQuery = asyncHandler(async (req, res) => {
  const { categoryName, cityName } = req.query;
  let filter = {};

  // Category filter
  if (categoryName) {
    const category = await Category.findOne({
      name: { $regex: new RegExp(categoryName, 'i') }, // partial match
    });
    console.log(category);

    if (!category) {
      return res
        .status(404)
        .json(
          new apiResponse(404, [], `Category "${categoryName}" not found.`)
        );
    }
    filter.category = category._id;
  }

  // City filter
  if (cityName) {
    const city = await City.findOne({
      name: { $regex: new RegExp(cityName, 'i') },
    });

    if (!city) {
      return res
        .status(404)
        .json(new apiResponse(404, [], `City "${cityName}" not found.`));
    }

    const restaurantsInCity = await Restaurant.find({
      'address.city': city._id,
    });
    if (restaurantsInCity.length === 0) {
      return res
        .status(200)
        .json(
          new apiResponse(200, [], `No restaurants found in "${cityName}".`)
        );
    }

    const restaurantIds = restaurantsInCity.map(r => r._id);
    filter.restaurant = { $in: restaurantIds };
  }

  // Fetch products
  const products = await Product.find(filter)
    .populate('category')
    .populate('restaurant');

  if (!products || products.length === 0) {
    return res
      .status(200)
      .json(
        new apiResponse(
          200,
          [],
          'No products found matching the specified criteria.'
        )
      );
  }

  return res
    .status(200)
    .json(new apiResponse(200, products, 'Products fetched successfully.'));
});

export { getProductsByQuery };
