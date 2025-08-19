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

const AllProductsOfTheRestaurant = asyncHandler(async (req, res) => {
  try {
    // 1. Correctly extract the restaurant ID from the request parameters.
    //    Using object destructuring is the standard way to do this.
    const { restaurant_id } = req.query;

    // 2. Validate that a restaurant_id was actually provided in the URL.
    if (!restaurant_id) {
      return res.status(400).json({ 
        success: false, 
        message: 'Restaurant ID is required.' 
      });
    }

    // 3. Find all products that have the matching restaurant_id.
    const products = await Product.find({ restaurant: restaurant_id });

    // 4. Check if any products were found.
    if (!products || products.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'No products found for this restaurant.' 
      });
    }

    // 5. Send a success response with the fetched products.
    res.status(200).json({ 
      success: true, 
      message: `fetched ${products.length} Products successfully for the restaurant_id =  ${restaurant_id}`, 
      data: products 
    });

  } catch (error) {
    // 6. Handle any server-side errors that occur during the process.
    console.error('Error fetching products:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error.', 
      error: error.message 
    });
  }
});


export {
    getAllProductByCategory,
    AllProductsOfTheRestaurant
};
