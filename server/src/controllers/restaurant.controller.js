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
    new apiResponse(200, restaurants, 'Restaurants fetched successfully.', {
      totalResults: totalCount,
      currentPage: page,
      totalPages: totalPages,
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
  getRestaurantById,
  getRestaurantsByLocation,
  AllProductsOfTheRestaurant,
  getRestaurantsWithNoProducts,
  getRestaurantsByQuery,
};
