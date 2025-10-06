import { asyncHandler } from '../services/asyncHandler.js';
import { apiResponse } from '../services/apiResponse.js';
import { apiError } from '../services/apiError.js';

import List from '../models/list.model.js';
import User from '../models/user.model.js';
import Product from '../models/product.model.js';

const createNewList = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const userId = req.user._id;

  // Validation
  if (!name || name.trim() === '') {
    throw new apiError(400, 'List name is required');
  }

  // Checking if a list with the same name already exists for this user
  const existingList = await List.findOne({ owner: userId, name: name.trim() });
  if (existingList) {
    throw new apiError(409, 'A list with this name already exists');
  }

  // Create the new list document
  const newList = await List.create({
    name: name.trim(),
    owner: userId,
    items: [], // Initialize with an empty array
    isDefault: false, // It's a custom list, not the default
  });

  // Update the user's document to include a reference to the new list
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $push: { lists: newList._id } },
    { new: true } // Return the updated document
  );

  if (!updatedUser) {
    throw new apiError(404, 'User not found');
  }

  // Sending a successful response
  res
    .status(201)
    .json(new apiResponse(201, newList, 'List created successfully'));
});

const getAllListOfUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // Find all lists owned by the user
  const userListsQuery = List.find({ owner: userId });

  // Checking if the client requested populated data
  if (req.query.populate === 'true') {
    // Populate the 'items' array, and then populate the 'restaurant' field within each product
    userListsQuery.populate({
      path: 'items',
      populate: {
        path: 'restaurant',
      },
    });
  }

  // Executing the query
  const userLists = await userListsQuery.exec();

  // If no lists are found, it's a success with an empty array.
  if (!userLists) {
    throw new apiError(404, 'User lists not found');
  }

  res
    .status(200)
    .json(new apiResponse(200, userLists, 'User lists retrieved successfully'));
});

const getListById = asyncHandler(async (req, res) => {
  const listId = req.params.id;
  const userId = req.user._id;

  // Building the query to find the list.
  // We check for both the list ID and the owner ID for security.
  const listQuery = List.findOne({ _id: listId, owner: userId });

  // Check for the optional 'populate' query parameter
  if (req.query.populate === 'true') {
    // Populate the 'items' array and then the 'restaurant' field within each product
    listQuery.populate({
      path: 'items',
      populate: {
        path: 'restaurant',
      },
    });
  }

  // Execute the query
  const list = await listQuery.exec();

  // Handle the case where the list is not found
  if (!list) {
    throw new apiError(
      404,
      'List not found or you do not have permission to access it'
    );
  }

  // Sending a successful response
  res
    .status(200)
    .json(new apiResponse(200, list, 'List retrieved successfully'));
});

const addProductToTheList = asyncHandler(async (req, res) => {
  const listId = req.params.id;

  const { productId } = req.body;

  const userId = req.user._id;

  // Basic validation
  if (!productId) {
    throw new apiError(400, 'Product ID is required');
  }

  // Verify the list exists and belongs to the user
  const list = await List.findOne({ _id: listId, owner: userId });
  if (!list) {
    throw new apiError(
      404,
      'List not found or you do not have permission to access it'
    );
  }

  // Checking if the product is already in the list to prevent duplicates
  if (list.items.includes(productId)) {
    throw new apiError(409, 'Product is already in this list');
  }

  // Verifying that the product ID is valid
  const productExists = await Product.findById(productId);
  if (!productExists) {
    throw new apiError(404, 'Product not found');
  }

  // Adding the product to the list using $push to atomically update the array
  const updatedList = await List.findByIdAndUpdate(
    listId,
    { $push: { items: productId } },
    { new: true, runValidators: true }
  ).populate({
    path: 'items',
    populate: {
      path: 'restaurant',
    },
  });

  // Sending a success response
  res
    .status(200)
    .json(
      new apiResponse(200, updatedList, 'Product added to list successfully')
    );
});

const removeProductFromList = asyncHandler(async (req, res) => {
  const listId = req.params.id;

  const { productId } = req.body;
  const userId = req.user._id;

  // Basic validation
  if (!productId) {
    throw new apiError(400, 'Product ID is required');
  }

  // Finding the list and remove the product from it
  // We use findOneAndUpdate to atomically find and update the document.
  const updatedList = await List.findOneAndUpdate(
    { _id: listId, owner: userId },
    { $pull: { items: productId } }, // Usomg the $pull operator to remove the productId from the array
    { new: true } // Returns the updated document
  ).populate({
    path: 'items',
    populate: {
      path: 'restaurant',
    },
  });

  // Handling the case where the list is not found
  if (!updatedList) {
    throw new apiError(
      404,
      'List not found or you do not have permission to access it'
    );
  }

  //  Send a success response
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
  const listId = req.params.id;
  const userId = req.user._id;

  // Finding the list to be deleted and verify its ownership
  const listToDelete = await List.findOne({ _id: listId, owner: userId });

  // Handling the case where the list is not found
  if (!listToDelete) {
    throw new apiError(
      404,
      'List not found or you do not have permission to access it'
    );
  }

  // IMPORTANT: Prevent deletion of the default list
  if (listToDelete.isDefault) {
    throw new apiError(403, 'Cannot delete the default list');
  }

  // Delete the list document from the database
  await List.deleteOne({ _id: listId });

  // Remove the list reference from the user's document to maintain data integrity
  await User.findByIdAndUpdate(
    userId,
    { $pull: { lists: listId } },
    { new: true }
  );

  // Sending a success response
  res.status(200).json(
    new apiResponse(
      200,
      null, // No data to return, just a confirmation
      'List deleted successfully'
    )
  );
});

const transferProductToList = asyncHandler(async (req, res) => {
  const { productId, sourceListId, destinationListId } = req.body;
  const userId = req.user._id;

  // 2. Validation
  if (!productId || !sourceListId || !destinationListId) {
    throw new apiError(
      400,
      'Product ID, source list ID, and destination list ID are all required.'
    );
  }

  // Finding both the source and destination lists to verify ownership and existence
  const [sourceList, destinationList] = await Promise.all([
    List.findOne({ _id: sourceListId, owner: userId }),
    List.findOne({ _id: destinationListId, owner: userId }),
  ]);

  // Handling  cases where lists are not found or don't belong to the user
  if (!sourceList || !destinationList) {
    throw new apiError(
      404,
      'One or both lists not found or you do not have permission to access them.'
    );
  }

  // Checking if the product is in the source list and not in the destination
  const isProductInSource = sourceList.items.some(
    id => id.toString() === productId
  );
  const isProductInDestination = destinationList.items.some(
    id => id.toString() === productId
  );

  if (!isProductInSource) {
    throw new apiError(404, 'Product not found in the source list.');
  }

  if (isProductInDestination) {
    throw new apiError(409, 'Product is already in the destination list.');
  }

  // Performing the atomic updates to transfer the product concurrently
  await Promise.all([
    List.findByIdAndUpdate(sourceListId, { $pull: { items: productId } }),
    List.findByIdAndUpdate(destinationListId, {
      $push: { items: productId },
    }),
  ]);

  // Re-fetching all user lists to ensure a complete, updated state is returned
  const userLists = await List.find({ owner: userId }).populate({
    path: 'items',
    populate: {
      path: 'restaurant',
    },
  });

  // Sending the successful response with the updated lists
  res
    .status(200)
    .json(new apiResponse(200, userLists, 'Product transferred successfully.'));
});

export {
  createNewList,
  getAllListOfUser,
  getListById,
  addProductToTheList,
  removeProductFromList,
  deleteTheList,
  transferProductToList,
};
