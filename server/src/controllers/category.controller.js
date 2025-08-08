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

  const categorySlug = req.query.categorySlug;
  const userLongitude = parseFloat(req.query.longitude);
  const userLatitude = parseFloat(req.query.latitude);

  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;

  const MAX_DISTANCE_METERS = 10000;

  // Basic validation for categorySlug
  if (!categorySlug) {
    res.status(400);
    throw new Error(
      `Category name is required as a query parameter (e.g., /categories?categorySlug=${categorySlug}).`
    );
  }

  // Validation for Latitude and Longitude
  if (isNaN(userLongitude) || userLongitude < -180 || userLongitude > 180) {
    res.status(400);
    throw new Error("Valid longitude (between -180 and 180) is required.");
  }
  if (isNaN(userLatitude) || userLatitude < -90 || userLatitude > 90) {
    res.status(400);
    throw new Error("Valid latitude (between -90 and 90) is required.");
  }

  const skipAmount = (page - 1) * limit;

  try {
    // Aggregation pipeline to fetch the paginated restaurants
    const restaurantsPipeline = [
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [userLongitude, userLatitude],
          },
          distanceField: "distance",
          spherical: true,
          maxDistance: MAX_DISTANCE_METERS,
          query: {
            cuisine_type: categorySlug,
          },
          key: "address.location",
        },
      },
      {
        $skip: skipAmount,
      },
      {
        $limit: limit,
      },
    ];

    // Aggregation pipeline to get the total count of documents
    // This is a separate, more robust way to get the count
    const countPipeline = [
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [userLongitude, userLatitude],
          },
          distanceField: "distance",
          spherical: true,
          maxDistance: MAX_DISTANCE_METERS,
          query: {
            cuisine_type: categorySlug,
          },
          key: "address.location",
        },
      },
      {
        $count: "totalCount"
      }
    ];

    // Execute both pipelines concurrently for better performance
    const [restaurants, countResult] = await Promise.all([
      Restaurant.aggregate(restaurantsPipeline),
      Restaurant.aggregate(countPipeline),
    ]);

    // Extract the total count from the aggregation result
    const totalCount = countResult.length > 0 ? countResult[0].totalCount : 0;
    const totalPages = Math.ceil(totalCount / limit);

    // If no restaurants are found, the aggregation will return an empty array.
    if (totalCount === 0) {
      return res.status(200).json({
        message: `No restaurants found for category "${categorySlug}" in your location.`,
        data: [],
        totalResults: 0,
        currentPage: page,
        totalPages: 0,
      });
    }

    console.log(`Found a total of ${totalCount} restaurants for category "${categorySlug}".`);

    res.status(200).json({
      message: `Successfully fetched restaurants for category "${categorySlug}".`,
      data: restaurants,
      totalResults: totalCount,
      currentPage: page,
      totalPages: totalPages
    });

  } catch (error) {
    console.error(
      `Error fetching restaurants for category "${categorySlug}" and location (${userLatitude}, ${userLongitude}):`,
      error
    );

    // Error handling logic remains the same
    if (error.code === 16755 || error.code === 2) {
      res.status(500);
      throw new Error(
        'Geospatial query failed. Ensure a 2dsphere index exists on the "address.location" field in your Restaurant model.'
      );
    } else {
      res.status(500);
      throw new Error(
        "Server error while fetching restaurants by category and location."
      );
    }
  }
});


export { getAllCategories, categoryResultForGivenCetgory };
