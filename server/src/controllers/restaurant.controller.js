import Category from '../models/category.model.js';
import Product from '../models/product.model.js';
import Restaurant from '../models/restaurant.model.js';
import { asyncHandler } from '../services/asyncHandler.js';
import { apiResponse } from '../services/apiResponse.js';
import { apiError } from '../services/apiError.js';
import mongoose from 'mongoose';
import City from '../models/city.model.js';

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

const getRestaurantsWithNoProducts = asyncHandler(async (req, res) => {
  // Find all unique restaurant IDs that have at least one product.
  const restaurantWithProducts = await Product.distinct('restaurant');

  // Find all restaurants whose IDs are NOT in the list of restaurants that have products.
  const restaurants = await Restaurant.find({
    _id: { $nin: restaurantWithProducts },
  });

  // If the list is empty, it's a successful request that just happens to have no data.
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

// const getRestaurantsByQuery = asyncHandler(async (req, res) => {
//   console.log('restaurant with query is being fired');
//   const {
//     categoryName,
//     longitude,
//     latitude,
//     cityName,
//     limit = 10,
//     page = 1,
//   } = req.query;

//   const userLongitude = parseFloat(longitude);
//   const userLatitude = parseFloat(latitude);

//   const MAX_DISTANCE_METERS = 50000 * 10;
//   const skipAmount = (parseInt(page) - 1) * parseInt(limit);
//   const parsedLimit = parseInt(limit);

//   const isLocationBasedQuery = !isNaN(userLongitude) && !isNaN(userLatitude);

//   let finalPipeline = [];
//   let isFallback = false;
//   let fallbackCityName = "Mumbai";
//   let initialMessage = 'Restaurants fetched successfully.';

//   // --- 1. Utility function to build the core aggregation stages ---
//   const getCorePipeline = (matchConditions = {}) => {
//     const pipeline = [];

//     if (Object.keys(matchConditions).length > 0) {
//       pipeline.push({ $match: matchConditions });
//     }

//     if (categoryName) {
//       pipeline.push({
//         $match: {
//           cuisine_type: { $regex: new RegExp(`^${categoryName}$`, 'i') },
//         },
//       });
//     }

//     // Add $lookup and $unwind to populate city details
//     pipeline.push({
//       $lookup: {
//         from: 'cities',
//         localField: 'address.city',
//         foreignField: '_id',
//         as: 'address.cityDetails',
//       },
//     });

//     pipeline.push({
//       $unwind: {
//         path: '$address.cityDetails',
//         preserveNullAndEmptyArrays: true,
//       },
//     });

//     // Use $facet for pagination + count
//     pipeline.push({
//       $facet: {
//         restaurants: [{ $skip: skipAmount }, { $limit: parsedLimit }],
//         totalCount: [{ $count: 'total' }],
//       },
//     });

//     return pipeline;
//   };

//   // A. Explicit City Search (Highest Priority)
//   if (cityName) {
//     // Finding the City ID based on the user-provided name (case-insensitive)
//     const cityDoc = await City.findOne(
//       {
//         name: { $regex: new RegExp(`^${cityName}$`, 'i') },
//       },
//       { _id: 1, name: 1 }
//     );

//     if (cityDoc) {
//       const cityId = cityDoc._id;
//       initialMessage = `Restaurants in ${cityDoc.name} fetched successfully.`;

//       // Build pipeline using direct city ID match
//       finalPipeline = getCorePipeline({
//         'address.city': cityId,
//       });
//     } else {
//       // City not found, proceed to next priority (or return empty)
//       initialMessage = `City "${cityName}" not found in supported areas.`;

//       // We exit the main search flow and will execute the empty pipeline later.
//     }

//     // B. Location-Based Initial Load (Second Priority)
//   } else if (isLocationBasedQuery) {
//     // --- 1. Attempt the strict local search ($geoNear) ---
//     finalPipeline.push({
//       $geoNear: {
//         near: { type: 'Point', coordinates: [userLongitude, userLatitude] },
//         distanceField: 'distance',
//         spherical: true,
//         maxDistance: MAX_DISTANCE_METERS,
//         key: 'address.location',
//         query: categoryName
//           ? { cuisine_type: { $regex: new RegExp(`^${categoryName}$`, 'i') } }
//           : {},
//       },
//     });

//     finalPipeline.push(...getCorePipeline());
//   } else {
//     // C. Generic Search (Lowest Priority - No City, No Coordinates)
//     finalPipeline = getCorePipeline();
//     initialMessage = 'Generic restaurant list fetched.';
//   }

//   // --- 2. Execute the constructed pipeline ---
//   let result =
//     finalPipeline.length > 0 ? await Restaurant.aggregate(finalPipeline) : [{}];

//   let restaurants = result[0]?.restaurants || [];
//   let totalCount = result[0]?.totalCount[0]?.total || 0;

//   // --- 3. Check for Fallback Condition (ONLY if it was a failed Location Search) ---
//   if (totalCount === 0 && !cityName && isLocationBasedQuery) {
//     // Find the nearest supported city (NO maxDistance)
//     const nearestCityResult = await City.aggregate([
//       {
//         $geoNear: {
//           near: { type: 'Point', coordinates: [userLongitude, userLatitude] },
//           distanceField: 'distance',
//           spherical: true,
//           key: 'location',
//           // REMOVE: limit: 1,  <-- This is causing the error
//           query: { is_serviceable: true },
//         },
//       },
//       { $limit: 1 }, // ADD: Use $limit as a separate stage instead
//       { $project: { _id: 1, name: 1 } },
//     ]);

//     if (nearestCityResult.length > 0) {
//       isFallback = true;
//       const nearestCityId = nearestCityResult[0]._id;
//       fallbackCityName = nearestCityResult[0].name;

//       // Re-run the aggregation query, matching by the nearest city ID
//       const fallbackPipeline = getCorePipeline({
//         'address.city': nearestCityId,
//       });

//       result = await Restaurant.aggregate(fallbackPipeline);

//       restaurants = result[0]?.restaurants || [];
//       totalCount = result[0]?.totalCount[0]?.total || 0;
//     }
//   }

//   // --- 4. Final Response Construction ---
//   const totalPages = Math.ceil(totalCount / parsedLimit);

//   let message = initialMessage;
//   if (isFallback && totalCount > 0) {
//     // Override message if fallback was used
//     message = `No restaurants found nearby. Displaying data for the nearest supported city: ${fallbackCityName}.`;
//   } else if (totalCount === 0) {
//     // Override message if no restaurants were found in the selected/queried area
//     message = `No restaurants found matching the criteria in the selected area.`;
//   }

//   res.status(200).json(
//     new apiResponse(
//       200,
//       {
//         restaurants,
//         totalResults: totalCount,
//         currentPage: page,
//         totalPages: totalPages,
//       },
//       message
//     )
//   );
// });

const getRestaurantsByQuery = asyncHandler(async (req, res) => {
  console.log('Restaurant query fired ✅');

  const {
    categoryName,
    longitude,
    latitude,
    cityName,
    limit = 10,
    page = 1,
  } = req.query;

  const userLongitude = parseFloat(longitude);
  const userLatitude = parseFloat(latitude);

  const MAX_DISTANCE_METERS = 50000 * 10;
  const skipAmount = (parseInt(page) - 1) * parseInt(limit);
  const parsedLimit = parseInt(limit);

  const isLocationBasedQuery = !isNaN(userLongitude) && !isNaN(userLatitude);

  let finalPipeline = [];
  let isFallback = false;
  let fallbackCityName = null;
  let resolvedCity = null;
  let initialMessage = 'Restaurants fetched successfully.';

  // --- 1. Core reusable aggregation pipeline ---
  const getCorePipeline = (matchConditions = {}) => {
    const pipeline = [];

    if (Object.keys(matchConditions).length > 0) {
      pipeline.push({ $match: matchConditions });
    }

    if (categoryName) {
      pipeline.push({
        $match: {
          cuisine_type: { $regex: new RegExp(`^${categoryName}$`, 'i') },
        },
      });
    }

    // Populate city details
    pipeline.push({
      $lookup: {
        from: 'cities',
        localField: 'address.city',
        foreignField: '_id',
        as: 'address.cityDetails',
      },
    });

    pipeline.push({
      $unwind: {
        path: '$address.cityDetails',
        preserveNullAndEmptyArrays: true,
      },
    });

    // Pagination
    pipeline.push({
      $facet: {
        restaurants: [{ $skip: skipAmount }, { $limit: parsedLimit }],
        totalCount: [{ $count: 'total' }],
      },
    });

    return pipeline;
  };

  // --- 2. Main logic branches ---

  // (A) City-based query (highest priority)
  if (cityName) {
    console.log('cityName is coming this', cityName);
    const cityDoc = await City.findOne(
      { name: { $regex: new RegExp(`^${cityName}$`, 'i') } },
      { _id: 1, name: 1 }
    );
    console.log('cityDoc is this : ', cityDoc);
    if (cityDoc) {
      const cityId = cityDoc._id;
      resolvedCity = cityDoc.name;
      initialMessage = `Restaurants in ${cityDoc.name} fetched successfully.`;

      finalPipeline = getCorePipeline({ 'address.city': cityId });
    } else {
      initialMessage = `City "${cityName}" not found in supported areas.`;
    }

    // (B) Location-based query (for IP location or coords)
  } else if (isLocationBasedQuery) {
    finalPipeline.push({
      $geoNear: {
        near: { type: 'Point', coordinates: [userLongitude, userLatitude] },
        distanceField: 'distance',
        spherical: true,
        maxDistance: MAX_DISTANCE_METERS,
        key: 'address.location',
        query: categoryName
          ? { cuisine_type: { $regex: new RegExp(`^${categoryName}$`, 'i') } }
          : {},
      },
    });

    finalPipeline.push(...getCorePipeline());

    // (C) Generic fallback (no city or coords)
  } else {
    finalPipeline = getCorePipeline();
    initialMessage = 'Generic restaurant list fetched.';
  }

  // --- 3. Execute query ---
  let result =
    finalPipeline.length > 0 ? await Restaurant.aggregate(finalPipeline) : [{}];

  let restaurants = result[0]?.restaurants || [];
  let totalCount = result[0]?.totalCount[0]?.total || 0;

  // --- 4. Fallback to nearest city (only if needed) ---
  if (totalCount === 0 && !cityName && isLocationBasedQuery) {
    const nearestCityResult = await City.aggregate([
      {
        $geoNear: {
          near: { type: 'Point', coordinates: [userLongitude, userLatitude] },
          distanceField: 'distance',
          spherical: true,
          key: 'location',
          query: { is_serviceable: true },
        },
      },
      { $limit: 1 },
      { $project: { _id: 1, name: 1 } },
    ]);

    if (nearestCityResult.length > 0) {
      isFallback = true;
      const nearestCityId = nearestCityResult[0]._id;
      fallbackCityName = nearestCityResult[0].name;
      resolvedCity = fallbackCityName;

      const fallbackPipeline = getCorePipeline({
        'address.city': nearestCityId,
      });

      result = await Restaurant.aggregate(fallbackPipeline);
      restaurants = result[0]?.restaurants || [];
      totalCount = result[0]?.totalCount[0]?.total || 0;
    }
  }

  // --- 5. Final response ---
  const totalPages = Math.ceil(totalCount / parsedLimit);

  let message = initialMessage;
  if (isFallback && totalCount > 0) {
    message = `No restaurants found nearby. Displaying data for the nearest supported city: ${fallbackCityName}.`;
  } else if (totalCount === 0) {
    message = `No restaurants found matching the criteria in the selected area.`;
  }

  return res.status(200).json(
    new apiResponse(
      200,
      {
        restaurants,
        totalResults: totalCount,
        currentPage: page,
        totalPages,
        resolvedCity: resolvedCity || cityName || null,
      },
      message
    )
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

const getTopRatedRestuarantsOfTheCity = asyncHandler(async (req, res) => {
  // Extract Query Parameters
  const { cityName, latitude, longitude } = req.query;

  const query = {};
  const MAX_DISTANCE_METERS = 10000; // 10km radius for geo-search

  // Build Location Query (Prioritizing City Name)
  if (cityName) {
    // --- STEP A: RESOLVE CITY NAME TO CITY ID ---

    // Find the City ID based on the user-provided name (case-insensitive)
    const cityDoc = await City.findOne(
      {
        name: { $regex: new RegExp(`^${cityName}$`, 'i') },
      },
      { _id: 1, name: 1 }
    );

    if (cityDoc) {
      const cityId = cityDoc._id;
      // Option A: City ID Match (USING DOT NOTATION FOR NESTED FIELD)
      query['address.city'] = cityId;
    } else {
      // If cityName was provided but couldn't be resolved
      return res
        .status(404)
        .json(
          new apiResponse(
            404,
            null,
            `City '${cityName}' not found in supported areas for filtering.`
          )
        );
    }
  } else if (latitude && longitude) {
    // Option B: Geo-spatial Search (USING DOT NOTATION FOR LOCATION FIELD)
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);

    if (!isNaN(lat) && !isNaN(lng)) {
      // Note: The location field is at the root of the Restaurant document based on our schema sample
      query.location = {
        $geoWithin: {
          // Using $geoWithin instead of $near for simple find queries
          $centerSphere: [
            [lng, lat],
            MAX_DISTANCE_METERS / 6378100, // Convert distance to radians (Earth radius in meters)
          ],
        },
      };
      // NOTE: Alternatively, if we need distance sorting (like in $geoNear), you must use aggregation.
      // Sticking to .find() here for simplicity and efficiency for a top 10 list.
    }
  } else {
    // Handle case where no location data is provided
    return res
      .status(400)
      .json(
        new apiResponse(
          400,
          null,
          'Location (city name or coordinates) is required to find top rated restaurants.'
        )
      );
  }

  // 3. Execute Database Query
  try {
    const restaurants = await Restaurant.find(query)
      .sort({ rating: -1, numberOfReviews: -1 }) // Sort by rating, then by reviews as tie-breaker
      .limit(10);

    // 4. Send Final Response (Consistent with apiResponse wrapper)
    res.status(200).json(
      new apiResponse(
        200,
        {
          restaurants,
          totalResults: restaurants.length,
        },
        'Top 10 rated restaurants fetched successfully.'
      )
    );
  } catch (err) {
    // Log the error and return a generic 500 response
    console.error('DB Error in getTopRatedRestaurants:', err);
    res
      .status(500)
      .json(
        new apiResponse(
          500,
          null,
          'Internal server error while querying top restaurants.'
        )
      );
  }
});

export {
  getRestaurantById,
  getRestaurantsByLocation,
  AllProductsOfTheRestaurant,
  getRestaurantsWithNoProducts,
  getRestaurantsByQuery,
  getTopRatedRestuarantsOfTheCity,
};
