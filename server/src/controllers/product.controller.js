import Category from "../models/category.model.js";
import Product from "../models/product.model.js";
import { asyncHandler } from "../services/asyncHandler.js";
import { apiResponse } from "../services/apiResponse.js";
import { apiError } from "../services/ApiError.js";

const getAllProductByCategory = asyncHandler(async (req, res) => {
  const { categoryName } = req.params; // Get category name from URL parameter

  if (!categoryName || categoryName.trim() === "") {
    throw new apiError(400, "Category name is required.");
  }

  // Finding the Category document by its name
  
  const category = await Category.findOne({
    name: { $regex: new RegExp(`^${categoryName}$`, "i") }, // Using $regex with $options: 'i' for case-insensitive matching
  });

  if (!category) {
    throw new apiError(404, `Category "${categoryName}" not found.`);
  }

  // Using the found category's _id to query for food items
  const foods = await Product.find({ category: category._id });

  if (!foods || foods.length === 0) {
    return res
      .status(200) 
      .json(
        new apiResponse(
          200,
          [],
          `No food items found in category "${categoryName}".`
        )
      );
  }

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        foods,
        `Food items fetched for category "${categoryName}" successfully.`
      )
    );
});

export {
    getAllProductByCategory
};
