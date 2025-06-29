import dotenv from "dotenv";
import fetch from "node-fetch";
import { asyncHandler } from "../services/asyncHandler.js";
import { apiResponse } from "../services/apiResponse.js";
dotenv.config();

const getLandingPageData = asyncHandler(async (req, res) => {
  console.log("getLandingPageData func is being fired now");
  const { longitude, latitude, maxDistanceKm } = req.query;
  try {
    const categoriesUrl = `${process.env.API_BASE_URL}/categories`;
    const restaurantsUrl = `${process.env.API_BASE_URL}/restaurants/location?longitude=${longitude}&latitude=${latitude}&maxDistanceKm=${maxDistanceKm}`; // Assuming this gives all or featured
    const citiesUrl = `${process.env.API_BASE_URL}/cities`;

    // Making concurrent requests to out existing APIs using Promise.all
    const [categoriesRes, restaurantsRes, citiesRes] = await Promise.all([
      fetch(categoriesUrl),
      fetch(restaurantsUrl),
      fetch(citiesUrl),
    ]);

    // Check if all responses were successful
    if (!categoriesRes.ok)
      throw new Error(`Categories API error: ${categoriesRes.statusText}`);
    if (!restaurantsRes.ok)
      throw new Error(`Restaurants API error: ${restaurantsRes.statusText}`);
    if (!citiesRes.ok)
      throw new Error(`Cities API error: ${citiesRes.statusText}`);

    // Parsing the JSON responses
    const categoriesData = await categoriesRes.json();
    const restaurantsData = await restaurantsRes.json();
    const citiesData = await citiesRes.json();

    // I might want to filter or limit the data here if the source APIs return too much
    // For example, if our /api/restaurants returns ALL restaurants,
    // we might want to pick only 'featured' or a 'top N' here.
    // const featuredRestaurants = restaurants.filter(r => r.isFeatured).slice(0, 10);
    // Or if the /restaurants API already has a filter for featured, then we will use that URL.

    // Constructing the single, consolidated response object for the landing page

    const landingPageData = {
      categories: categoriesData, // all categories
      featuredRestaurants: restaurantsData, // all Restaurants 
      citiesWeServe: citiesData, // all cities 
      message: "Aggregated landing page data fetched successfully!", 
    };


    return res
    .status(200)
    .json(
      new apiResponse(
        200, 
        landingPageData, 
        "fetched all the data for the landing page"
      )
    );
  } catch (error) {
    console.error("Error fetching or aggregating landing page data:", error);
    res.status(500).json({
      message: "Failed to load landing page data. Please try again later.",
      error: error.message, // Include error message for debugging (remove in production if sensitive)
    });
  }
});

export { getLandingPageData };
