import { asyncHandler } from '../services/asyncHandler.js';
import { apiResponse } from '../services/apiResponse.js';
import { apiError } from '../services/ApiError.js';

import List from '../models/list.modal.js';
import User from '../models/user.model.js';
import Product from '../models/product.model.js';

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

const getAllListOfUser = asyncHandler(async (req, res) => {
  // Get the authenticated user's ID from the request object
  const userId = req.user._id;

  // Find all lists owned by the user
  const userListsQuery = List.find({ owner: userId });

  // Check if the client requested populated data
  if (req.query.populate === 'true') {
    // Populate the 'products' array, and then populate the 'restaurant' field within each product
    userListsQuery.populate({
      path: 'products',
      populate: {
        path: 'restaurant',
      },
    });
  }

  // Execute the query
  const userLists = await userListsQuery.exec();

  // If no lists are found, it's a success with an empty array.
  // No need to throw an error here.
  if (!userLists) {
    throw new apiError(404, 'User lists not found');
  }

  // Send a successful response with the retrieved lists
  res
    .status(200)
    .json(new apiResponse(200, userLists, 'User lists retrieved successfully'));
});

const getListById = asyncHandler(async (req, res) => {
  // 1. Get the list ID from the request parameters and the user ID from the request object
  const listId = req.params.id;
  const userId = req.user._id;

  // 2. Build the query to find the list.
  // We check for both the list ID and the owner ID for security.
  const listQuery = List.findOne({ _id: listId, owner: userId });

  // 3. Check for the optional 'populate' query parameter
  if (req.query.populate === 'true') {
    // Populate the 'products' array and then the 'restaurant' field within each product
    listQuery.populate({
      path: 'products',
      populate: {
        path: 'restaurant',
      },
    });
  }

  // 4. Execute the query
  const list = await listQuery.exec();

  // 5. Handle the case where the list is not found
  if (!list) {
    throw new apiError(
      404,
      'List not found or you do not have permission to access it'
    );
  }

  // 6. Send a successful response
  res
    .status(200)
    .json(new apiResponse(200, list, 'List retrieved successfully'));
});

const addProductToTheList = asyncHandler(async (req, res) => {
  // 1. Get the list ID from the URL parameters
  const listId = req.params.id;
  // 2. Get the product ID from the request body
  const { productId } = req.body;
  // 3. Get the authenticated user's ID for security
  const userId = req.user._id;

  // 4. Basic validation
  if (!productId) {
    throw new apiError(400, 'Product ID is required');
  }

  // 5. Verify the list exists and belongs to the user
  const list = await List.findOne({ _id: listId, owner: userId });
  if (!list) {
    throw new apiError(
      404,
      'List not found or you do not have permission to access it'
    );
  }

  // 6. Check if the product is already in the list to prevent duplicates
  if (list.products.includes(productId)) {
    throw new apiError(409, 'Product is already in this list');
  }

  // 7. (Optional but recommended) Verify that the product ID is valid
  const productExists = await Product.findById(productId);
  if (!productExists) {
    throw new apiError(404, 'Product not found');
  }

  // 8. Add the product to the list using $push to atomically update the array
  const updatedList = await List.findByIdAndUpdate(
    listId,
    { $push: { products: productId } },
    { new: true, runValidators: true } // 'new: true' returns the updated document
  );

  // 9. Send a success response
  res
    .status(200)
    .json(
      new apiResponse(200, updatedList, 'Product added to list successfully')
    );
});

const removeProductFromList = asyncHandler(async (req, res) => {
  // 1. Get the list ID from the URL parameters
  const listId = req.params.id;
  // 2. Get the product ID to remove from the request body
  const { productId } = req.body;
  // 3. Get the authenticated user's ID for a security check
  const userId = req.user._id;

  // 4. Basic validation
  if (!productId) {
    throw new apiError(400, 'Product ID is required');
  }

  // 5. Find the list and remove the product from it
  // We use findOneAndUpdate to atomically find and update the document.
  const updatedList = await List.findOneAndUpdate(
    { _id: listId, owner: userId }, // Find the list by its ID and verify ownership
    { $pull: { products: productId } }, // Use the $pull operator to remove the productId from the array
    { new: true } // Returns the updated document
  );

  // 6. Handle the case where the list is not found
  if (!updatedList) {
    throw new apiError(
      404,
      'List not found or you do not have permission to access it'
    );
  }

  // 7. Send a success response
  res
    .status(200)
    .json(
      new apiResponse(
        200,
        updatedList,
        'Product removed from list successfully'
      )
    );
});

const deleteTheList = asyncHandler(async (req, res) => {
  // 1. Get the list ID from the URL parameters
  const listId = req.params.id;
  // 2. Get the authenticated user's ID for a security check
  const userId = req.user._id;

  // 3. Find the list to be deleted and verify its ownership
  const listToDelete = await List.findOne({ _id: listId, owner: userId });

  // 4. Handle the case where the list is not found
  if (!listToDelete) {
    throw new apiError(
      404,
      'List not found or you do not have permission to access it'
    );
  }

  // 5. IMPORTANT: Prevent deletion of the default list
  if (listToDelete.isDefault) {
    throw new apiError(403, 'Cannot delete the default list');
  }

  // 6. Delete the list document from the database
  await List.deleteOne({ _id: listId });

  // 7. Remove the list reference from the user's document to maintain data integrity
  await User.findByIdAndUpdate(
    userId,
    { $pull: { lists: listId } },
    { new: true }
  );

  // 8. Send a success response
  res.status(200).json(
    new apiResponse(
      200,
      null, // No data to return, just a confirmation
      'List deleted successfully'
    )
  );
});

export {
  createNewList,
  getAllListOfUser,
  getListById,
  addProductToTheList,
  removeProductFromList,
  deleteTheList,
};
