import dotenv from "dotenv";
import fetch from "node-fetch";
import { asyncHandler } from "../services/asyncHandler.js";
import { apiResponse } from "../services/apiResponse.js";
import {apiError} from "../services/apiError.js" ; 
dotenv.config();

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of Earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
}

const getLandingPageData = asyncHandler(async (req, res) => {
  console.log("getLandingPageData func is being fired now");
  // Extract user's current location from query parameters
  const userLongitude = parseFloat(req.query.longitude);
  const userLatitude = parseFloat(req.query.latitude);

  // console statement 
  console.log(userLongitude)
  console.log(userLatitude)

  // Default maxDistanceKm if not provided by frontend or for fallback
  const defaultMaxDistanceKm = 600 ; 
  let maxDistanceKm = parseFloat(req.query.maxDistanceKm) || defaultMaxDistanceKm;

  // Validate coordinates
  if (isNaN(userLongitude) || isNaN(userLatitude)) {
    // If coordinates are missing or invalid, proceed without location-specific restaurants
    // or return an error if location is mandatory for your app.
    console.warn("User location (longitude/latitude) not provided or invalid. Fetching default restaurants.");
    // For this scenario, we'll fetch restaurants without location, or you can set default coords.
    // Let's set default coordinates for restaurant search if user's are missing.
    // You might want to pick a default city's coordinates here.
    // For now, we'll use a placeholder or handle it in the restaurants API call if it supports it.
  }

  try {
    const categoriesUrl = `${process.env.API_BASE_URL}/categories`;
    const citiesUrl = `${process.env.API_BASE_URL}/cities`;

    // Fetch categories and cities concurrently
    const [categoriesRes, citiesRes] = await Promise.all([
      fetch(categoriesUrl),
      fetch(citiesUrl),
    ]);

    if (!categoriesRes.ok)
      throw new apiError(categoriesRes.status, `Categories API error: ${categoriesRes.statusText}`);
    if (!citiesRes.ok)
      throw new apiError(citiesRes.status, `Cities API error: ${citiesRes.statusText}`);

    const categoriesData = await categoriesRes.json();
    const citiesData = await citiesRes.json();

    let restaurantsUrl;
    let selectedCity = null;
    let restaurantFetchLongitude = userLongitude;
    let restaurantFetchLatitude = userLatitude;

    // --- Logic to find the nearest city and use its coordinates ---
    if (!isNaN(userLongitude) && !isNaN(userLatitude) && citiesData && citiesData.length > 0) {
      let minDistance = Infinity;
      
      // Assuming citiesData is an array of city objects with { name, latitude, longitude, defaultRadiusKm }
      citiesData.forEach(city => {
        if (city.latitude && city.longitude) {
          const dist = calculateDistance(userLatitude, userLongitude, city.latitude, city.longitude);
          if (dist < minDistance) {
            minDistance = dist;
            selectedCity = city;
          }
        }
      });

      // If a nearby city is found within a reasonable threshold (e.g., 100km)
      // You might set a threshold here, or always use the nearest one.
      // For simplicity, we'll always use the nearest found city's coordinates if one is found.
      if (selectedCity) {
        // Use the selected city's coordinates for restaurant search
        restaurantFetchLongitude = selectedCity.longitude;
        restaurantFetchLatitude = selectedCity.latitude;
        // Optionally, use the city's default radius if available, otherwise fallback
        maxDistanceKm = selectedCity.defaultRadiusKm || defaultMaxDistanceKm; 
        console.log(`Nearest city found: ${selectedCity.name}, using its coordinates for restaurants.`);
      } else {
        console.log("No nearby city found in database. Using user's provided coordinates for restaurants.");
      }
    } else {
        console.log("No valid user coordinates or cities data. Falling back to default restaurant search parameters.");
        // If no user location or cities, you might fetch restaurants for a default location
        // or a general "featured" list if your API supports it without location.
        // For now, we'll construct the URL with the potentially invalid user coords,
        // assuming the restaurant API handles it gracefully (e.g., returns empty or global list).
    }

    // Construct the restaurants URL using the determined coordinates and maxDistanceKm
    // Ensure your restaurants API can handle missing/invalid coordinates gracefully
    restaurantsUrl = `${process.env.API_BASE_URL}/restaurants/location?longitude=${restaurantFetchLongitude}&latitude=${restaurantFetchLatitude}&maxDistanceKm=${maxDistanceKm}`;
    
    const restaurantsRes = await fetch(restaurantsUrl);

    if (!restaurantsRes.ok)
      throw new apiError(restaurantsRes.status, `Restaurants API error: ${restaurantsRes.statusText}`);
    
    const restaurantsData = await restaurantsRes.json();

    const landingPageData = {
      categories: categoriesData,
      featuredRestaurants: restaurantsData,
      citiesWeServe: citiesData,
      selectedCity: selectedCity ? { name: selectedCity.name, id: selectedCity.id } : null, // Send back selected city info
      message: "Aggregated landing page data fetched successfully!",
    };

    return res
      .status(200)
      .json(
        new apiResponse(
          200,
          landingPageData,
          "Fetched all the data for the landing page"
        )
      );
  } catch (error) {
    console.error("Error fetching or aggregating landing page data:", error);
    // Use apiError for consistent error handling
    if (error instanceof apiError) {
      return res.status(error.statusCode).json(error);
    }
    return res.status(500).json(new apiError(500, "Failed to load landing page data. Please try again later.", error.message));
  }
});

export { getLandingPageData };
