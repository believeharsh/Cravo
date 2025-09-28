import Restaurant from '../../models/restaurant.model.js';
import mongoose from 'mongoose';
import { asyncHandler } from '../../services/asyncHandler.js';
import { apiResponse } from '../../services/apiResponse.js';
import { apiError } from '../../services/apiError.js';

// 1. For Getting total count of all restaurants (for the super admin dashboard total)
// GET /api/super-admin/restaurants/count

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

// 2. For Getting all restaurants in a specific city
// GET /api/super-admin/restaurants/city/:cityId

export const getRestaurantsByCity = asyncHandler(async (req, res) => {
  const { cityId } = req.params;

  // Input Validation using apiError
  if (!cityId || !mongoose.Types.ObjectId.isValid(cityId)) {
    throw new apiError(400, 'Invalid or missing city ID.');
  }

  // Find restaurants and count them concurrently
  const [restaurants, totalRestaurants] = await Promise.all([
    Restaurant.find({ 'address.city': cityId })
      // Select only necessary fields for the admin list view
      .select(
        'name address.street address.city contact.phone rating is_active createdAt'
      )
      // Populate city name for display in the admin panel
      .populate('address.city', 'name'),
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

// 3. For Deleting a restaurant by its ID
// DELETE /api/super-admin/restaurants/:restaurantId

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
  return res.status(200).json(
    new apiResponse(
      200,
      null, // No data needed on successful deletion
      `Restaurant "${restaurant.name}" successfully deleted.`
    )
  );
});
