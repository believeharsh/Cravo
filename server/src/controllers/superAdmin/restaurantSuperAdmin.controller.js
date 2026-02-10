import mongoose from 'mongoose';

import Restaurant from '../../models/restaurant.model.js';
import { apiError } from '../../services/apiError.js';
import { apiResponse } from '../../services/apiResponse.js';
import { asyncHandler } from '../../services/asyncHandler.js';

export const getTotalRestaurantCount = asyncHandler(async (req, res) => {
  const totalCount = await Restaurant.countDocuments({});

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        { total: totalCount },
        'Successfully fetched total restaurant count.'
      )
    );
});

export const getRestaurantsByCity = asyncHandler(async (req, res) => {
  const { cityId } = req.params;

  // Input Validation using apiError
  if (!cityId || !mongoose.Types.ObjectId.isValid(cityId)) {
    throw new apiError(400, 'Invalid or missing city ID.');
  }

  // Finding restaurants and count them concurrently
  const [restaurants, totalRestaurants] = await Promise.all([
    Restaurant.find({ 'address.city': cityId }).populate(
      'address.city',
      'name'
    ),
    Restaurant.countDocuments({ 'address.city': cityId }),
  ]);

  if (restaurants.length === 0) {
    return res
      .status(200)
      .json(
        new apiResponse(
          200,
          { restaurants: [], total: 0 },
          'No restaurants found in this city.'
        )
      );
  }

  // Return the list and the total count
  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        { restaurants, total: totalRestaurants },
        `Successfully fetched ${restaurants.length} restaurants for the city.`
      )
    );
});

export const deleteRestaurant = asyncHandler(async (req, res) => {
  const { restaurantId } = req.params;

  // Input Validation using apiError
  if (!restaurantId || !mongoose.Types.ObjectId.isValid(restaurantId)) {
    throw new apiError(400, 'Invalid or missing restaurant ID.');
  }

  // Attempt to delete the restaurant
  const restaurant = await Restaurant.findByIdAndDelete(restaurantId);

  if (!restaurant) {
    // Restaurant not found
    throw new apiError(404, 'Restaurant not found.');
  }

  // Successful deletion response
  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        null,
        `Restaurant "${restaurant.name}" successfully deleted.`
      )
    );
});
