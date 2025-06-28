import Category from "../models/category.model.js";
import Product from "../models/product.model.js";
import Restaurant from "../models/restaurant.model.js"
import { asyncHandler } from "../services/asyncHandler.js";
import { apiResponse } from "../services/apiResponse.js";
import { apiError } from "../services/ApiError.js";
import mongoose from "mongoose";

const getAllRestaurantsByCategory = asyncHandler(async (req, res) => {
  const { categoryName } = req.query; 
  // Input validation
  if (!categoryName || categoryName.trim() === "") {
    throw new apiError(400, "Category name is required.");
  }

  // Finding the Category document by its name

  const category = await Category.findOne({
    name: { $regex: new RegExp(`^${categoryName}$`, "i") },   // Using $regex with ^ and $ for exact match, and 'i' for case-insensitivity.
  });

  if (!category) {
    throw new apiError(404, `Category "${categoryName}" not found.`);
  }

  // Finding all Food items that belong to the found category ID

  const foodItemsInCategoryId = await Product.find({
    category: category._id,
  }).distinct("restaurant");

  // If no food items are found for this category, it means no restaurants offer it
  if (!foodItemsInCategoryId || foodItemsInCategoryId.length === 0) {
    return res
      .status(200) // Return 200 OK with an empty array if no matches
      .json(
        new apiResponse(
          200,
          [],
          `No restaurants found offering items in category "${categoryName}".`
        )
      );
  }

  // Finding the Restaurant documents using the unique restaurant ID
  const restaurants = await Restaurant.find({
    _id: { $in: foodItemsInCategoryId },
  });

  if (!restaurants || restaurants.length === 0) {
    throw new apiError(
      500,
      "Failed to retrieve restaurant details for the found food items."
    );
  }

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        restaurants,
        `Restaurants offering food in category "${categoryName}" fetched successfully.`
      )
    );
});

const getRestaurantById = asyncHandler(async (req, res) => {
    const { restaurantId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
       throw new apiError(400, "Invalid restaurant ID format.");
    }

    // Finding the restaurant by its ID 
    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
        throw new apiError(404, "Restaurant not found.");
    }

    return res
        .status(200)
        .json(new apiResponse(200, restaurant, "Restaurant fetched successfully."));
});


export { 
    getAllRestaurantsByCategory,
    getRestaurantById
};
