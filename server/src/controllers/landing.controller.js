import dotenv from "dotenv";
import fetch from "node-fetch" ; 
import { asyncHandler } from "../services/asyncHandler.js";
dotenv.config();

const getLandingPageData = asyncHandler(async (req, res) => {
  console.log("getLandingPageData func is being fired now")
    const { longitude, latitude, maxDistanceKm } = req.query;
  try {
    
    const categoriesUrl = `${process.env.API_BASE_URL}/categories`;
    const restaurantsUrl = `${process.env.API_BASE_URL}/restaurants/location?longitude=${longitude}&latitude=${latitude}&maxDistanceKm=${maxDistanceKm}`; // Assuming this gives all or featured
    // const citiesUrl = `${API_BASE_URL}/cities`;
    // Add other API URLs if you have, e.g., promotions, banners etc.
    // const promotionsUrl = `${API_BASE_URL}/promotions`;

    // Make concurrent requests to your existing APIs using Promise.all
    // This is crucial for performance as all requests happen in parallel.
    const [categoriesRes, restaurantsRes] = await Promise.all([
      fetch(categoriesUrl),
      fetch(restaurantsUrl),
    //   fetch(citiesUrl),
      // Add more fetch calls here
    ]);

    // Check if all responses were successful
    if (!categoriesRes.ok)
      throw new Error(`Categories API error: ${categoriesRes.statusText}`);
    if (!restaurantsRes.ok)
      throw new Error(`Restaurants API error: ${restaurantsRes.statusText}`);
    // if (!citiesRes.ok)
      // throw new Error(`Cities API error: ${citiesRes.statusText}`);
    // Add checks for other responses

    // Parse JSON responses
    const categories = await categoriesRes.json();
    const restaurantsData = await restaurantsRes.json();
    if(restaurantsData) console.log(restaurantsData)
    // const cities = await citiesRes.json();
    // Parse other JSON responses

    // const restaurants = restaurantsData.restaurants;

    // You might want to filter or limit the data here if the source APIs return too much
    // For example, if your /api/restaurants returns ALL restaurants,
    // you might want to pick only 'featured' or a 'top N' here.
    // const featuredRestaurants = restaurants.filter(r => r.isFeatured).slice(0, 10);
    // Or if the /restaurants API already has a filter for featured, then use that URL.

    // Construct the single, consolidated response object for the landing page
    const landingPageData = {
      categories: categories,
      // Assuming your /restaurants API might return all restaurants,
      // you might need to select a subset if you only want 'featured' on the landing page.
      // For example, if your restaurants API provides a 'isFeatured' flag:
      // featuredRestaurants: restaurantsData.filter((r) => r.isFeatured).slice(0, 10), // Example filtering
      featuredRestaurants: restaurantsData, 
      // If your /restaurants API already handles this (e.g., /api/restaurants?featured=true),
      // then you can just use 'restaurants' directly.
      // citiesWeServe: cities,
      // promotionalBanners: promotions // If you added promotions API
      message: "Aggregated landing page data fetched successfully!", // Optional
    };

    // Send the consolidated JSON response to the frontend
    res.status(200).json(landingPageData);
  } catch (error) {
    console.error("Error fetching or aggregating landing page data:", error);
    res.status(500).json({
      message: "Failed to load landing page data. Please try again later.",
      error: error.message, // Include error message for debugging (remove in production if sensitive)
    });
  }
});


export {
  getLandingPageData
}