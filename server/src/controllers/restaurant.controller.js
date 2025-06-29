import Category from "../models/category.model.js";
import Product from "../models/product.model.js";
import Restaurant from "../models/restaurant.model.js";
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
    name: { $regex: new RegExp(`^${categoryName}$`, "i") }, // Using $regex with ^ and $ for exact match, and 'i' for case-insensitivity.
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

const getRestaurantsByLocation = asyncHandler(async (req, res) => {

  const { longitude, latitude, maxDistanceKm } = req.query;

  if (!longitude || !latitude) {
    throw new apiError(
      400,
      "Missing location parameters. Please provide 'longitude' and 'latitude'."
    );
  }

  const lon = parseFloat(longitude);
  const lat = parseFloat(latitude);

  if (
    isNaN(lon) ||
    isNaN(lat) ||
    lon < -180 ||
    lon > 180 ||
    lat < -90 ||
    lat > 90
  ) {
    throw new apiError(
      400,
      "Invalid longitude or latitude. Must be valid numerical coordinates."
    );
  }

  // MongoDB's $nearSphere expects distance in meters.
  const maxDistMeters = maxDistanceKm
    ? parseFloat(maxDistanceKm) * 1000
    : 50000; // Default 50km

  if (isNaN(maxDistMeters) || maxDistMeters < 0) {
    throw new apiError(
      400,
      "Invalid maxDistanceKm. Must be a non-negative number."
    );
  }

  // Using the Mongoose's geospatial query operators
  // $nearSphere finds documents within a sphere on a curved surface (earth)
  // $geometry specifies the point [longitude, latitude]
  // $maxDistance specifies the maximum distance in meters
  const restaurants = await Restaurant.find({
    "address.location": {
      $nearSphere: {
        $geometry: {
          type: "Point",
          coordinates: [lon, lat], // [longitude, latitude]
        },
        $maxDistance: maxDistMeters, // Distance in meters
      },
    },
    is_active: true, // Only fetching active restaurants
  }).lean();

  if (restaurants.length === 0) {
    return res
      .status(200)
      .json(
        new apiResponse(
          200,
          [],
          "No restaurants found near the specified location"
        )
      );
  }

  res.status(200).json(
    new apiResponse(
      200,
      {
        count: restaurants.length,
        restaurants: restaurants,
      },
      "Restaurants fetched successfully by location."
    )
  );
});


export {
  getAllRestaurantsByCategory,
  getRestaurantById,
  getRestaurantsByLocation,
};
