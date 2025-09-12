import { asyncHandler } from '../services/asyncHandler.js';
import { apiResponse } from '../services/apiResponse.js';
import { apiError } from '../services/ApiError.js';

import RestaurantList from '../models/restaurantList.model.js';
import User from '../models/user.model.js';
import Restaurant from '../models/restaurant.model.js';

const createNewRestaurantList = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const userId = req.user._id;

  if (!name || name.trim() === '') {
    throw new apiError(400, 'Restaurant list name is required');
  }

  const existingList = await RestaurantList.findOne({
    owner: userId,
    name: name.trim(),
  });
  if (existingList) {
    throw new apiError(409, 'A restaurant list with this name already exists');
  }

  const newList = await RestaurantList.create({
    name: name.trim(),
    owner: userId,
    restaurants: [],
    isDefault: false,
  });

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $push: { restaurantLists: newList._id } },
    { new: true }
  );

  if (!updatedUser) {
    throw new apiError(404, 'User not found');
  }

  res
    .status(201)
    .json(
      new apiResponse(201, newList, 'Restaurant list created successfully')
    );
});

const getAllRestaurantListsOfUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const userListsQuery = RestaurantList.find({ owner: userId });

  if (req.query.populate === 'true') {
    // We only need to populate the 'restaurants' field
    userListsQuery.populate({
      path: 'restaurants',
    });
  }

  const userLists = await userListsQuery.exec();

  if (!userLists) {
    throw new apiError(404, 'User restaurant lists not found');
  }

  res
    .status(200)
    .json(
      new apiResponse(
        200,
        userLists,
        'User restaurant lists retrieved successfully'
      )
    );
});

const getRestaurantListById = asyncHandler(async (req, res) => {
  const listId = req.params.id;
  const userId = req.user._id;

  const listQuery = RestaurantList.findOne({ _id: listId, owner: userId });

  if (req.query.populate === 'true') {
    listQuery.populate({
      path: 'restaurants',
    });
  }

  const list = await listQuery.exec();

  if (!list) {
    throw new apiError(
      404,
      'Restaurant list not found or you do not have permission to access it'
    );
  }

  res
    .status(200)
    .json(new apiResponse(200, list, 'Restaurant list retrieved successfully'));
});

const addRestaurantToTheList = asyncHandler(async (req, res) => {
  const listId = req.params.id;
  const { restaurantId } = req.body;
  const userId = req.user._id;

  if (!restaurantId) {
    throw new apiError(400, 'Restaurant ID is required');
  }

  const list = await RestaurantList.findOne({ _id: listId, owner: userId });
  if (!list) {
    throw new apiError(
      404,
      'Restaurant list not found or you do not have permission to access it'
    );
  }

  if (list.restaurants.includes(restaurantId)) {
    throw new apiError(409, 'Restaurant is already in this list');
  }

  const restaurantExists = await Restaurant.findById(restaurantId);
  if (!restaurantExists) {
    throw new apiError(404, 'Restaurant not found');
  }

  const updatedList = await RestaurantList.findByIdAndUpdate(
    listId,
    { $push: { restaurants: restaurantId } },
    { new: true, runValidators: true }
  );

  res
    .status(200)
    .json(
      new apiResponse(200, updatedList, 'Restaurant added to list successfully')
    );
});

const removeRestaurantFromList = asyncHandler(async (req, res) => {
  const listId = req.params.id;
  const { restaurantId } = req.body;
  const userId = req.user._id;

  if (!restaurantId) {
    throw new apiError(400, 'Restaurant ID is required');
  }

  const updatedList = await RestaurantList.findOneAndUpdate(
    { _id: listId, owner: userId },
    { $pull: { restaurants: restaurantId } },
    { new: true }
  );

  if (!updatedList) {
    throw new apiError(
      404,
      'Restaurant list not found or you do not have permission to access it'
    );
  }

  res
    .status(200)
    .json(
      new apiResponse(
        200,
        updatedList,
        'Restaurant removed from list successfully'
      )
    );
});

const deleteTheRestaurantList = asyncHandler(async (req, res) => {
  const listId = req.params.id;
  const userId = req.user._id;

  const listToDelete = await RestaurantList.findOne({
    _id: listId,
    owner: userId,
  });

  if (!listToDelete) {
    throw new apiError(
      404,
      'Restaurant list not found or you do not have permission to access it'
    );
  }

  if (listToDelete.isDefault) {
    throw new apiError(403, 'Cannot delete the default restaurant list');
  }

  await RestaurantList.deleteOne({ _id: listId });

  await User.findByIdAndUpdate(
    userId,
    { $pull: { restaurantLists: listId } },
    { new: true }
  );

  res
    .status(200)
    .json(new apiResponse(200, null, 'Restaurant list deleted successfully'));
});

export {
  createNewRestaurantList,
  getAllRestaurantListsOfUser,
  getRestaurantListById,
  addRestaurantToTheList,
  removeRestaurantFromList,
  deleteTheRestaurantList,
};
