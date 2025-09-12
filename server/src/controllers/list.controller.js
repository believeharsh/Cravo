import { asyncHandler } from '../services/asyncHandler.js';
import { apiResponse } from '../services/apiResponse.js';
import { apiError } from '../services/ApiError.js';

import List from '../models/list.modal.js';
import User from '../models/user.model.js';

const createNewList = asyncHandler(async (req, res) => {
  // 1. Get the list name from the request body
  const { name } = req.body;

  // 2. Get the authenticated user's ID
  const userId = req.user._id; // Assuming the authenticated user's ID is available on req.user

  // 3. Validation
  if (!name || name.trim() === '') {
    throw new apiError(400, 'List name is required');
  }

  // 4. Check if a list with the same name already exists for this user
  const existingList = await List.findOne({ owner: userId, name: name.trim() });
  if (existingList) {
    throw new apiError(409, 'A list with this name already exists');
  }

  // 5. Create the new list document
  const newList = await List.create({
    name: name.trim(),
    owner: userId,
    products: [], // Initialize with an empty array
    isDefault: false, // It's a custom list, not the default
  });

  // 6. Update the user's document to include a reference to the new list
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $push: { lists: newList._id } },
    { new: true } // Return the updated document
  );

  // Optional: Handle case where user document isn't found
  if (!updatedUser) {
    throw new apiError(404, 'User not found');
  }

  // 7. Send a successful response
  res
    .status(201)
    .json(new apiResponse(201, newList, 'List created successfully'));
});

const getAllListOfUser = asyncHandler(async (req, res) => {});
const getListById = asyncHandler(async (req, res) => {});
const addProductToTheList = asyncHandler(async (req, res) => {});
const removeProductFromList = asyncHandler(async (req, res) => {});
const deleteTheList = asyncHandler(async (req, res) => {});

export {
  createNewList,
  getAllListOfUser,
  getListById,
  addProductToTheList,
  removeProductFromList,
  deleteTheList,
};
