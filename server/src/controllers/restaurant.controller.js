import Category from '../models/category.model.js';
import Product from '../models/product.model.js';
import Restaurant from '../models/restaurant.model.js';
import { asyncHandler } from '../services/asyncHandler.js';
import { apiResponse } from '../services/apiResponse.js';
import { apiError } from '../services/ApiError.js';
import mongoose from 'mongoose';

// const AllProductsOfTheRestaurant = asyncHandler(async (req, res) => {
//   try {
//     const { restaurantId } = req.params;

//     if (!restaurantId) {
//       return res.status(400).json({
//         success: false,
//         message: 'Restaurant ID is required.',
//       });
//     }

//     const restaurant = await Restaurant.findById(restaurantId);

//     // 3. If the restaurant is not found, return a 404 immediately.
//     if (!restaurant) {
//       return res.status(404).json({
//         success: false,
//         message: 'Restaurant not found.',
//       });
//     }

//     const products = await Product.find({ restaurant: restaurantId })
//       .populate('category')
//       .populate('restaurant');

//     res.status(200).json({
//       success: true,
//       message: `Fetched products and details for restaurant '${restaurant.name}' successfully.`,
//       data: products,
//       restaurantDetails: restaurant,
//     });
//   } catch (error) {
//     console.error('Error fetching products and restaurant details:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error.',
//       error: error.message,
//     });
//   }
// });

const AllProductsOfTheRestaurant = asyncHandler(async (req, res) => {
  const { restaurantId } = req.params;

  if (!restaurantId) {
    throw new apiError(400, 'Restaurant ID is required.');
  }

  const restaurant = await Restaurant.findById(restaurantId);

  // If the restaurant is not found, throw a 404 error
  if (!restaurant) {
    throw new apiError(404, 'Restaurant not found.');
  }

  const products = await Product.find({ restaurant: restaurantId })
    .populate('category')
    .populate('restaurant');

  // Combine products and restaurant details into a single data object
  const dataPayload = {
    products: products,
    restaurantDetails: restaurant,
  };

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        dataPayload,
        `Fetched products and details for restaurant '${restaurant.name}' successfully.`
      )
    );
});

// const getRestaurantsWithNoProducts = asyncHandler(async (req, res) => {
//   try {
//     // 1. Find all unique restaurant IDs that have at least one product.
//     //    The .distinct() method is highly efficient for this.
//     const restaurantWithProducts = await Product.distinct('restaurant');

//     // 2. Find all restaurants whose IDs are NOT in the list of restaurants that have products.
//     //    The $nin (not in) operator is used here to perform the exclusion.
//     const restaurants = await Restaurant.find({
//       _id: { $nin: restaurantWithProducts },
//     });

//     // 3. Check if any restaurants were found with empty product lists.
//     if (!restaurants || restaurants.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: 'All restaurants have at least one product.',
//       });
//     }

//     // 4. Send a success response with the list of restaurants with no products.
//     res.status(200).json({
//       success: true,
//       message: `Found ${restaurants.length} restaurants with no products.`,
//       data: restaurants,
//     });
//   } catch (error) {
//     // 5. Handle any server-side errors that occur during the process.
//     console.error('Error fetching restaurants with no products:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error.',
//       error: error.message,
//     });
//   }
// });

const getRestaurantsWithNoProducts = asyncHandler(async (req, res) => {
  // 1. Find all unique restaurant IDs that have at least one product.
  const restaurantWithProducts = await Product.distinct('restaurant');

  // 2. Find all restaurants whose IDs are NOT in the list of restaurants that have products.
  const restaurants = await Restaurant.find({
    _id: { $nin: restaurantWithProducts },
  });

  // 3. If the list is empty, it's a successful request that just happens to have no data.
  if (!restaurants || restaurants.length === 0) {
    return res
      .status(200)
      .json(
        new apiResponse(200, [], 'All restaurants have at least one product.')
      );
  }

  // 4. Send a success response with the list of restaurants.
  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        restaurants,
        `Found ${restaurants.length} restaurants with no products.`
      )
    );
});

const getRestaurantsByQuery = asyncHandler(async (req, res) => {
  const { categoryName, longitude, latitude, limit = 10, page = 1 } = req.query;

  const userLongitude = parseFloat(longitude);
  const userLatitude = parseFloat(latitude);

  const MAX_DISTANCE_METERS = 10000;
  const skipAmount = (parseInt(page) - 1) * parseInt(limit);
  const parsedLimit = parseInt(limit);

  const isLocationBasedQuery = !isNaN(userLongitude) && !isNaN(userLatitude);

  // Start building the pipeline
  const pipeline = [];

  // 1. $geoNear must be the first stage if location provided
  if (isLocationBasedQuery) {
    pipeline.push({
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [userLongitude, userLatitude],
        },
        distanceField: 'distance',
        spherical: true,
        maxDistance: MAX_DISTANCE_METERS,
        key: 'address.location',
      },
    });
  }

  // 2. Match by cuisine type (case-insensitive)
  if (categoryName) {
    pipeline.push({
      $match: {
        cuisine_type: {
          $regex: new RegExp(`^${categoryName}$`, 'i'), // matches ignoring case
        },
      },
    });
  }

  // 3. Use $facet for pagination + count
  pipeline.push({
    $facet: {
      restaurants: [{ $skip: skipAmount }, { $limit: parsedLimit }],
      totalCount: [{ $count: 'total' }],
    },
  });

  const result = await Restaurant.aggregate(pipeline);

  const restaurants = result[0].restaurants;
  const totalCount =
    result[0].totalCount.length > 0 ? result[0].totalCount[0].total : 0;
  const totalPages = Math.ceil(totalCount / parsedLimit);

  if (totalCount === 0) {
    return res
      .status(200)
      .json(
        new apiResponse(200, [], 'No restaurants found matching the criteria.')
      );
  }

  res.status(200).json(
    new apiResponse(
      200,
      {
        restaurants,
        totalResults: totalCount,
        currentPage: page,
        totalPages: totalPages,
      },
      'Restaurants fetched successfully.'
    )
  );

  //         new apiResponse(
  //             200,
  //             {
  //                 restaurants,
  //                 totalResults: totalCount,
  //                 currentPage: page,
  //                 totalPages: totalPages,
  //             },
  //             'Restaurants fetched successfully.'
  //         )
});

// const getRestaurantsByQuery = asyncHandler(async (req, res) => {
//     const { categoryName, longitude, latitude, limit = 10, page = 1 } = req.query;

//     const userLongitude = parseFloat(longitude);
//     const userLatitude = parseFloat(latitude);

//     const MAX_DISTANCE_METERS = 10000;
//     const skipAmount = (parseInt(page) - 1) * parseInt(limit);
//     const parsedLimit = parseInt(limit);

//     const isLocationBasedQuery = !isNaN(userLongitude) && !isNaN(userLatitude);

//     const pipeline = [];
//     const mainMatch = {};

//     // 1. Find category and add it to the $match stage
//     if (categoryName) {
//         const category = await Category.findOne({
//             name: { $regex: new RegExp(categoryName, 'i') }
//         });

//         if (!category) {
//             return res.status(404).json(
//                 new apiResponse(404, [], `Category "${categoryName}" not found.`)
//             );
//         }
//         mainMatch.category = category._id;
//     }

//     // 2. Add the $geoNear stage only if a location is provided.
//     // This stage MUST be the first in the entire pipeline.
//     if (isLocationBasedQuery) {
//         pipeline.push({
//             $geoNear: {
//                 near: {
//                     type: 'Point',
//                     coordinates: [userLongitude, userLatitude],
//                 },
//                 distanceField: 'distance',
//                 spherical: true,
//                 maxDistance: MAX_DISTANCE_METERS,
//                 key: 'address.location',
//                 query: mainMatch // Pass other match criteria to the query field
//             },
//         });
//     } else if (Object.keys(mainMatch).length > 0) {
//         // If there's no location query but other filters exist, add a $match stage first
//         pipeline.push({ $match: mainMatch });
//     }

//     // 3. Add the $facet stage for pagination and counting
//     pipeline.push({
//         $facet: {
//             restaurants: [
//                 { $skip: skipAmount },
//                 { $limit: parsedLimit }
//             ],
//             totalCount: [
//                 { $count: 'total' }
//             ],
//         },
//     });

//     const result = await Restaurant.aggregate(pipeline);

//     const restaurants = result[0].restaurants;
//     const totalCount =
//         result[0].totalCount.length > 0 ? result[0].totalCount[0].total : 0;
//     const totalPages = Math.ceil(totalCount / parsedLimit);

//     if (totalCount === 0) {
//         return res.status(200).json(
//             new apiResponse(200, [], 'No restaurants found matching the criteria.')
//         );
//     }

//     return res.status(200).json(
//         new apiResponse(
//             200,
//             {
//                 restaurants,
//                 totalResults: totalCount,
//                 currentPage: page,
//                 totalPages: totalPages,
//             },
//             'Restaurants fetched successfully.'
//         )
//     );
// });

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
  getRestaurantById,
  getRestaurantsByLocation,
  AllProductsOfTheRestaurant,
  getRestaurantsWithNoProducts,
  getRestaurantsByQuery,
};
