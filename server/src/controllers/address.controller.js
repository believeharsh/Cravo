import mongoose from 'mongoose';

import Address from '../models/address.model.js';
import { apiError } from '../services/apiError.js';
import { apiResponse } from '../services/apiResponse.js';
import { asyncHandler } from '../services/asyncHandler.js';

// for getting all the save address of the user
// GET : /api/v1/address

const getAllAddresses = asyncHandler(async (req, res) => {
  // 1. Get user ID from the request object
  const userId = req.user._id;

  // 2. Find all addresses associated with the user ID
  const addresses = await Address.find({ user: userId }).sort({
    isDefault: -1,
    createdAt: -1,
  });

  // 3. Send successful response with the list of addresses
  return res
    .status(200)
    .json(new apiResponse(200, addresses, 'Addresses retrieved successfully'));
});

// for getting the specific adderess details by it's id
// GET : /api/v1/address/:addressId

const getAddressById = asyncHandler(async (req, res) => {
  // 1. Get address ID from the request parameters and user ID from the request object
  const { addressId } = req.params;
  const userId = req.user._id;

  // 2. Validate address ID
  if (!mongoose.Types.ObjectId.isValid(addressId)) {
    throw new apiError(400, 'Invalid address ID');
  }

  // 3. Find the address by ID and user ID
  const address = await Address.findOne({ _id: addressId, user: userId });

  // 4. Check if address was found
  if (!address) {
    throw new apiError(
      404,
      'Address not found or you are not authorized to access it'
    );
  }

  // 5. Send successful response with the address document
  return res
    .status(200)
    .json(new apiResponse(200, address, 'Address retrieved successfully'));
});

// for creating the new address for the user
// POST : /api/v1/address

const createAddress = asyncHandler(async (req, res) => {
  // 1. Get user and address data
  const userId = req.user._id;
  const {
    addressLine1,
    addressLine2,
    city,
    state,
    zipCode,
    country,
    addressType,
    isDefault,
  } = req.body;

  // 2. Validate required fields
  if (!addressLine1 || !city || !state || !zipCode || !country) {
    throw new apiError(
      400,
      'All address fields (addressLine1, city, state, zipCode, country) are required'
    );
  }

  // 3. Handle default address logic
  if (isDefault) {
    // Find and update the old default address for this user to be not default
    await Address.findOneAndUpdate(
      { user: userId, isDefault: true },
      { $set: { isDefault: false } }
    );
  }

  // 4. Create the new address document
  const newAddress = await Address.create({
    user: userId,
    addressLine1,
    addressLine2,
    city,
    state,
    zipCode,
    country,
    addressType,
    isDefault: isDefault || false,
  });

  const updatedAddresses = await Address.find({ user: userId }).sort({
    isDefault: -1,
    createdAt: -1,
  });

  // 5. Send successful response
  return res
    .status(201)
    .json(
      new apiResponse(201, updatedAddresses, 'Address created successfully')
    );
});

// for editing the already saved address
// PATCH : /api/v1/address/:addressId

const updateAddress = asyncHandler(async (req, res) => {
  // 1. Get user, address ID, and update data
  const { addressId } = req.params;
  const userId = req.user._id;
  const updates = req.body;

  // 2. Validate address ID
  if (!mongoose.Types.ObjectId.isValid(addressId)) {
    throw new apiError(400, 'Invalid address ID');
  }

  // 3. Handle default address logic if isDefault is being set to true
  if (updates.isDefault) {
    // Find and update the old default address to be not default
    await Address.findOneAndUpdate(
      { user: userId, isDefault: true },
      { $set: { isDefault: false } }
    );
  }

  // 4. Find and update the address document
  const updatedAddress = await Address.findOneAndUpdate(
    { _id: addressId, user: userId },
    { $set: updates },
    { new: true, runValidators: true } // Return the updated document and run schema validators
  );

  // 5. Check if address was found and updated
  if (!updatedAddress) {
    throw new apiError(
      404,
      'Address not found or you are not authorized to update it'
    );
  }

  const updatedAddresses = await Address.find({ user: userId }).sort({
    isDefault: -1,
    createdAt: -1,
  });

  // 6. Send successful response
  return res
    .status(200)
    .json(
      new apiResponse(200, updatedAddresses, 'Address updated successfully')
    );
});

// for deleting the saved address
// DELETE : /api/v1/address/:addressId

const deleteAddress = asyncHandler(async (req, res) => {
  // 1. Get user and address ID
  const { addressId } = req.params;
  const userId = req.user._id;

  // 2. Validate address ID
  if (!mongoose.Types.ObjectId.isValid(addressId)) {
    throw new apiError(400, 'Invalid address ID');
  }

  // 3. Find and delete the address document
  const deletedAddress = await Address.findOneAndDelete({
    _id: addressId,
    user: userId,
  });

  // 4. Check if address was found and deleted
  if (!deletedAddress) {
    throw new apiError(
      404,
      'Address not found or you are not authorized to delete it'
    );
  }

  const remainingAddresses = await Address.find({ user: userId }).sort({
    isDefault: -1,
    createdAt: -1,
  });

  // 5. Send successful response
  return res
    .status(200)
    .json(
      new apiResponse(200, remainingAddresses, 'Address deleted successfully')
    );
});

export {
  createAddress,
  getAllAddresses,
  getAddressById,
  updateAddress,
  deleteAddress,
};
