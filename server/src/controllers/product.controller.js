import Category from '../models/category.model.js';
import Product from '../models/product.model.js';
import Restaurant from '../models/restaurant.model.js';
import { asyncHandler } from '../services/asyncHandler.js';
import { apiResponse } from '../services/apiResponse.js';
import { apiError } from '../services/ApiError.js';

const getAllProductByCategory = asyncHandler(async (req, res) => {
  const { categoryName } = req.params; // Get category name from URL parameter

  if (!categoryName || categoryName.trim() === '') {
    throw new apiError(400, 'Category name is required.');
  }

  // Finding the Category document by its name

  const category = await Category.findOne({
    name: { $regex: new RegExp(`^${categoryName}$`, 'i') }, // Using $regex with $options: 'i' for case-insensitive matching
  });

  if (!category) {
    throw new apiError(404, `Category "${categoryName}" not found.`);
  }

  // Using the found category's _id to query for food items
  const foods = await Product.find({ category: category._id });

  if (!foods || foods.length === 0) {
    return res
      .status(200)
      .json(
        new apiResponse(
          200,
          [],
          `No food items found in category "${categoryName}".`
        )
      );
  }

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        foods,
        `Food items fetched for category "${categoryName}" successfully.`
      )
    );
});

const AllProductsOfTheRestaurant = asyncHandler(async (req, res) => {
  try {
    const { restaurantID } = req.params;

    // 1. Validate that a restaurant ID was provided.
    if (!restaurantID) {
      return res.status(400).json({
        success: false,
        message: 'Restaurant ID is required.',
      });
    }

    // 2. Fetch the restaurant details first.
    // We use findById() because we expect a single restaurant.
    const restaurant = await Restaurant.findById(restaurantID);

    // 3. If the restaurant is not found, return a 404 immediately.
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found.',
      });
    }

    // 4. Fetch all products for that specific restaurant.
    const products = await Product.find({ restaurant: restaurantID });

    // 5. Send a single, combined response with both the restaurant and its products.
    res.status(200).json({
      success: true,
      message: `Fetched products and details for restaurant '${restaurant.name}' successfully.`,
      data: products,
      restaurantDetails: restaurant,
    });
  } catch (error) {
    console.error('Error fetching products and restaurant details:', error);
    res.status(500).json({
      success: false,
      message: 'Server error.',
      error: error.message,
    });
  }
});

const getRestaurantsWithNoProducts = asyncHandler(async (req, res) => {
  try {
    // 1. Find all unique restaurant IDs that have at least one product.
    //    The .distinct() method is highly efficient for this.
    const restaurantWithProducts = await Product.distinct('restaurant');

    // 2. Find all restaurants whose IDs are NOT in the list of restaurants that have products.
    //    The $nin (not in) operator is used here to perform the exclusion.
    const restaurants = await Restaurant.find({
      _id: { $nin: restaurantWithProducts },
    });

    // 3. Check if any restaurants were found with empty product lists.
    if (!restaurants || restaurants.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'All restaurants have at least one product.',
      });
    }

    // 4. Send a success response with the list of restaurants with no products.
    res.status(200).json({
      success: true,
      message: `Found ${restaurants.length} restaurants with no products.`,
      data: restaurants,
    });
  } catch (error) {
    // 5. Handle any server-side errors that occur during the process.
    console.error('Error fetching restaurants with no products:', error);
    res.status(500).json({
      success: false,
      message: 'Server error.',
      error: error.message,
    });
  }
});

export {
  getAllProductByCategory,
  AllProductsOfTheRestaurant,
  getRestaurantsWithNoProducts,
};
