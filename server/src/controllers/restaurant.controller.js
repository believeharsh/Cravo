import Category from '../models/category.model.js';
import Product from '../models/product.model.js';
import Restaurant from '../models/restaurant.model.js';
import { asyncHandler } from '../services/asyncHandler.js';
import { apiResponse } from '../services/apiResponse.js';
import { apiError } from '../services/ApiError.js';
import mongoose from 'mongoose';

const AllProductsOfTheRestaurant = asyncHandler(async (req, res) => {
  try {
    const { restaurantId } = req.params;

    if (!restaurantId) {
      return res.status(400).json({
        success: false,
        message: 'Restaurant ID is required.',
      });
    }

    const restaurant = await Restaurant.findById(restaurantId);

    // 3. If the restaurant is not found, return a 404 immediately.
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found.',
      });
    }

    const products = await Product.find({ restaurant: restaurantId })
      .populate('category')
      .populate('restaurant');

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

// const getAllRestaurantsByCategory = asyncHandler(async (req, res) => {
//   const { categoryName } = req.query;
//   // Input validation
//   if (!categoryName || categoryName.trim() === '') {
//     throw new apiError(400, 'Category name is required.');
//   }

//   // Finding the Category document by its name

//   const category = await Category.findOne({
//     name: { $regex: new RegExp(`^${categoryName}$`, 'i') }, // Using $regex with ^ and $ for exact match, and 'i' for case-insensitivity.
//   });

//   if (!category) {
//     throw new apiError(404, `Category "${categoryName}" not found.`);
//   }

//   // Finding all Food items that belong to the found category ID

//   const foodItemsInCategoryId = await Product.find({
//     category: category._id,
//   }).distinct('restaurant');

//   // If no food items are found for this category, it means no restaurants offer it
//   if (!foodItemsInCategoryId || foodItemsInCategoryId.length === 0) {
//     return res
//       .status(200) // Return 200 OK with an empty array if no matches
//       .json(
//         new apiResponse(
//           200,
//           [],
//           `No restaurants found offering items in category "${categoryName}".`
//         )
//       );
//   }

//   // Finding the Restaurant documents using the unique restaurant ID
//   const restaurants = await Restaurant.find({
//     _id: { $in: foodItemsInCategoryId },
//   });

//   if (!restaurants || restaurants.length === 0) {
//     throw new apiError(
//       500,
//       'Failed to retrieve restaurant details for the found food items.'
//     );
//   }

//   return res
//     .status(200)
//     .json(
//       new apiResponse(
//         200,
//         restaurants,
//         `Restaurants offering food in category "${categoryName}" fetched successfully.`
//       )
//     );
// });

// const categoryResultForGivenCetgory = asyncHandler(async (req, res) => {
//   const categorySlug = req.query.categorySlug;
//   const userLongitude = parseFloat(req.query.longitude);
//   const userLatitude = parseFloat(req.query.latitude);

//   const limit = parseInt(req.query.limit) || 10;
//   const page = parseInt(req.query.page) || 1;

//   const MAX_DISTANCE_METERS = 10000;

//   // Basic validation for categorySlug
//   if (!categorySlug) {
//     res.status(400);
//     throw new Error(
//       `Category name is required as a query parameter (e.g., /categories?categorySlug=${categorySlug}).`
//     );
//   }

//   // Validation for Latitude and Longitude
//   if (isNaN(userLongitude) || userLongitude < -180 || userLongitude > 180) {
//     res.status(400);
//     throw new Error('Valid longitude (between -180 and 180) is required.');
//   }
//   if (isNaN(userLatitude) || userLatitude < -90 || userLatitude > 90) {
//     res.status(400);
//     throw new Error('Valid latitude (between -90 and 90) is required.');
//   }

//   const skipAmount = (page - 1) * limit;

//   try {
//     // Aggregation pipeline to fetch the paginated restaurants
//     const restaurantsPipeline = [
//       {
//         $geoNear: {
//           near: {
//             type: 'Point',
//             coordinates: [userLongitude, userLatitude],
//           },
//           distanceField: 'distance',
//           spherical: true,
//           maxDistance: MAX_DISTANCE_METERS,
//           query: {
//             cuisine_type: categorySlug,
//           },
//           key: 'address.location',
//         },
//       },
//       {
//         $skip: skipAmount,
//       },
//       {
//         $limit: limit,
//       },
//     ];

//     // Aggregation pipeline to get the total count of documents
//     // This is a separate, more robust way to get the count
//     const countPipeline = [
//       {
//         $geoNear: {
//           near: {
//             type: 'Point',
//             coordinates: [userLongitude, userLatitude],
//           },
//           distanceField: 'distance',
//           spherical: true,
//           maxDistance: MAX_DISTANCE_METERS,
//           query: {
//             cuisine_type: categorySlug,
//           },
//           key: 'address.location',
//         },
//       },
//       {
//         $count: 'totalCount',
//       },
//     ];

//     // Execute both pipelines concurrently for better performance
//     const [restaurants, countResult] = await Promise.all([
//       Restaurant.aggregate(restaurantsPipeline),
//       Restaurant.aggregate(countPipeline),
//     ]);

//     // Extract the total count from the aggregation result
//     const totalCount = countResult.length > 0 ? countResult[0].totalCount : 0;
//     const totalPages = Math.ceil(totalCount / limit);

//     // If no restaurants are found, the aggregation will return an empty array.
//     if (totalCount === 0) {
//       return res.status(200).json({
//         message: `No restaurants found for category "${categorySlug}" in your location.`,
//         data: [],
//         totalResults: 0,
//         currentPage: page,
//         totalPages: 0,
//       });
//     }

//     console.log(
//       `Found a total of ${totalCount} restaurants for category "${categorySlug}".`
//     );

//     res.status(200).json({
//       message: `Successfully fetched restaurants for category "${categorySlug}".`,
//       data: restaurants,
//       totalResults: totalCount,
//       currentPage: page,
//       totalPages: totalPages,
//     });
//   } catch (error) {
//     console.error(
//       `Error fetching restaurants for category "${categorySlug}" and location (${userLatitude}, ${userLongitude}):`,
//       error
//     );

//     // Error handling logic remains the same
//     if (error.code === 16755 || error.code === 2) {
//       res.status(500);
//       throw new Error(
//         'Geospatial query failed. Ensure a 2dsphere index exists on the "address.location" field in your Restaurant model.'
//       );
//     } else {
//       res.status(500);
//       throw new Error(
//         'Server error while fetching restaurants by category and location.'
//       );
//     }
//   }
// });

const getRestaurantsByQuery = asyncHandler(async (req, res) => {
  const { categoryName, longitude, latitude, limit = 10, page = 1 } = req.query;

  const userLongitude = parseFloat(longitude);
  const userLatitude = parseFloat(latitude);

  const MAX_DISTANCE_METERS = 10000;
  const skipAmount = (parseInt(page) - 1) * parseInt(limit);

  let categorySlug = categoryName; // The main filter object for MongoDB queries

  const filterQuery = {};
  let categoryId = null; // Find category by name to get its ID, which is used for the product filter

  if (categoryName) {
    const category = await Category.findOne({
      name: { $regex: new RegExp(`^${categoryName}$`, 'i') },
    });
    if (!category) {
      throw new apiError(404, `Category "${categoryName}" not found.`);
    }
    categoryId = category._id; // Use the category slug for the restaurant's cuisine_type filter
    categorySlug = category.name;
  }

  let restaurants;
  let totalCount = 0; // If both latitude and longitude are provided, use the advanced geo-query pipeline

  if (!isNaN(userLongitude) && !isNaN(userLatitude)) {
    const geoNearQuery = {
      near: {
        type: 'Point',
        coordinates: [userLongitude, userLatitude],
      },
      distanceField: 'distance',
      spherical: true,
      maxDistance: MAX_DISTANCE_METERS,
      key: 'address.location',
      query: {},
    }; // Add category filter to the geo-query if provided

    if (categorySlug) {
      geoNearQuery.query = { cuisine_type: categorySlug };
    }

    const [restaurantsResult, countResult] = await Promise.all([
      Restaurant.aggregate([
        { $geoNear: geoNearQuery },
        { $skip: skipAmount },
        { $limit: parseInt(limit) },
      ]),
      Restaurant.aggregate([
        { $geoNear: geoNearQuery },
        { $count: 'totalCount' },
      ]),
    ]);

    restaurants = restaurantsResult;
    totalCount = countResult.length > 0 ? countResult[0].totalCount : 0;
  } else if (categoryId) {
    // If only category is provided, use a standard find query
    const restaurantWithProducts = await Product.find({
      category: categoryId,
    }).distinct('restaurant');

    if (restaurantWithProducts.length === 0) {
      return res
        .status(200)
        .json(
          new apiResponse(
            200,
            [],
            `No restaurants found for category "${categoryName}".`
          )
        );
    }
    restaurants = await Restaurant.find({
      _id: { $in: restaurantWithProducts },
    })
      .limit(parseInt(limit))
      .skip(skipAmount);

    totalCount = await Restaurant.countDocuments({
      _id: { $in: restaurantWithProducts },
    });
  } else {
    // If no filters, return all restaurants
    restaurants = await Restaurant.find({})
      .limit(parseInt(limit))
      .skip(skipAmount);
    totalCount = await Restaurant.countDocuments({});
  }
  const totalPages = Math.ceil(totalCount / parseInt(limit)); // Final Response

  if (restaurants.length === 0) {
    return res
      .status(200)
      .json(
        new apiResponse(200, [], 'No restaurants found matching the criteria.')
      );
  }

  res
    .status(200)
    .json(
      new apiResponse(200, restaurants, 'Restaurants fetched successfully.', {
        totalResults: totalCount,
        currentPage: page,
        totalPages,
      })
    );
});

const getRestaurantById = asyncHandler(async (req, res) => {
  const { restaurantId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
    throw new apiError(400, 'Invalid restaurant ID format.');
  }

  // Finding the restaurant by its ID
  const restaurant =
    await Restaurant.findById(restaurantId).populate('address.city');

  if (!restaurant) {
    throw new apiError(404, 'Restaurant not found.');
  }

  return res
    .status(200)
    .json(new apiResponse(200, restaurant, 'Restaurant fetched successfully.'));
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
      'Invalid longitude or latitude. Must be valid numerical coordinates.'
    );
  }

  // MongoDB's $nearSphere expects distance in meters.
  const maxDistMeters = maxDistanceKm
    ? parseFloat(maxDistanceKm) * 1000
    : 50000; // Default 50km

  if (isNaN(maxDistMeters) || maxDistMeters < 0) {
    throw new apiError(
      400,
      'Invalid maxDistanceKm. Must be a non-negative number.'
    );
  }

  // Using the Mongoose's geospatial query operators
  // $nearSphere finds documents within a sphere on a curved surface (earth)
  // $geometry specifies the point [longitude, latitude]
  // $maxDistance specifies the maximum distance in meters
  const restaurants = await Restaurant.find({
    'address.location': {
      $nearSphere: {
        $geometry: {
          type: 'Point',
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
          'No restaurants found near the specified location'
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
      'Restaurants fetched successfully by location.'
    )
  );
});

export {
  // getAllRestaurantsByCategory,
  getRestaurantById,
  getRestaurantsByLocation,
  AllProductsOfTheRestaurant,
  getRestaurantsWithNoProducts,
  // categoryResultForGivenCetgory,
  getRestaurantsByQuery,
};
