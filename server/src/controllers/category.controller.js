import Category from "../models/category.model.js"
import { asyncHandler } from "../services/asyncHandler.js";
import { apiResponse } from "../services/apiResponse.js"

const getAllCategories = asyncHandler(async (req, res) => {
    console.log("fetaching all categories ...... ");

    const categories = await Category.find({ isVisible: true })
        .sort({ displayOrder: 1 })
        .select('name image slug displayOrder')
        .lean();
    return res.status(201)
        .json(
            new apiResponse(
                201,
                { categories: categories },
                "all categories fetched succussfully"
            )
        );

})

export {
    getAllCategories
}