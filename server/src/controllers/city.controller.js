import City from '../models/city.model.js';
import { apiResponse } from '../services/apiResponse.js';
import { asyncHandler } from '../services/asyncHandler.js';

const getAllCities = asyncHandler(async (req, res) => {
  const cities = await City.find({})
    .select('name is_serviceable location')
    .sort('name'); // Sort by name alphabetically

  if (!cities || cities.length === 0) {
    return res.status(404).json({
      message: 'No cities found.',
      cities: [],
    });
  }

  return res
    .status(200)
    .json(
      new apiResponse(200, { cities: cities }, 'Cities fetched successfully.')
    );
});

export { getAllCities };
