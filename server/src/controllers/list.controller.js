import { asyncHandler } from '../services/asyncHandler.js';
import { apiResponse } from '../services/apiResponse.js';
import { apiError } from '../services/ApiError.js';

import List from '../models/list.modal.js';
import User from '../models/user.model.js';

const createNewList = asyncHandler(async (req, res) => {});
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
