import Category from "../models/category.model.js";
import { asyncHandler } from "../services/asyncHandler.js";
import { apiResponse } from "../services/apiResponse.js";
import Restaurant from "../models/restaurant.model.js";

const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({ isVisible: true })
    .sort({ displayOrder: 1 })
    .select("name image slug displayOrder")
    .lean();
  return res
    .status(201)
    .json(
      new apiResponse(
        201,
        { categories: categories },
        "all categories fetched succussfully"
      )
    );
});

const categoryResultForGivenCetgory = asyncHandler(async (req, res) => {
  const CategoryName = req.query.CategoryName;
  const userLongitude = parseFloat(req.query.longitude);
  const userLatitude = parseFloat(req.query.latitude);

  // Define a maximum search distance in meters.
  // You can make this configurable or pass it as another query parameter.
  // For example, 10000 meters = 10 kilometers.
  const MAX_DISTANCE_METERS = 10000;

  // Basic validation for CategoryName
  if (!CategoryName) {
    res.status(400);
    throw new Error(
      "Category name is required as a query parameter (e.g., /categories?CategoryName=Pizza)."
    );
  }

  // Validation for Latitude and Longitude
  // Check if they are valid numbers and within standard ranges
  if (isNaN(userLongitude) || userLongitude < -180 || userLongitude > 180) {
    res.status(400);
    throw new Error("Valid longitude (between -180 and 180) is required.");
  }
  if (isNaN(userLatitude) || userLatitude < -90 || userLatitude > 90) {
    res.status(400);
    throw new Error("Valid latitude (between -90 and 90) is required.");
  }

  try {
    const query = {
      cuisine_type: CategoryName,
      "address.location": {
        $nearSphere: {
          $geometry: {
            type: "Point",
            coordinates: [userLongitude, userLatitude],
          },
          // $maxDistance: MAX_DISTANCE_METERS // Distance in meters
        },
      },
    };

    // Execute the query
    // $nearSphere implicitly sorts results by distance from the nearest point.
    const restaurants = await Restaurant.find(query);

    console.log("Found restaurants:", restaurants.length); // Log the number of found restaurants

    // Check if any restaurants were found
    if (restaurants.length === 0) {
      return res.status(404).json({
        message: `No restaurants found for category "${CategoryName}"`,
      });
    }

    // Return the found restaurants as a JSON response.
    res.status(200).json(restaurants);
  } catch (error) {
    console.error(
      `Error fetching restaurants for category "${CategoryName}" and location (${userLatitude}, ${userLongitude}):`,
      error
    );

    // Check for specific geospatial errors (e.g., if index is missing)
    if (error.code === 16755 || error.code === 2) {
      res.status(500);
      // Updated error message to reflect the correct path for the index
      throw new Error(
        'Geospatial query failed. Ensure a 2dsphere index exists on the "address.location.coordinates" field in your Restaurant model.'
      );
    } else {
      res.status(500); // Internal Server Error
      throw new Error(
        "Server error while fetching restaurants by category and location."
      );
    }
  }
});

export { getAllCategories, categoryResultForGivenCetgory };
