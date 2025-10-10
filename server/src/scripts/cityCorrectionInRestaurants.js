import mongoose from 'mongoose';

const DRY_RUN = true;

// --- Geographic Boundaries for Correction ---
const CITY_BOUNDARIES = [
  {
    name: 'Indore',
    // Base Lat: 22.7196, Base Lon: 75.8577
    // Range: Base +/- 0.01
    bounds: [75.8477, 75.8677, 22.7096, 22.7296],
    cityId: null, // Will be fetched dynamically
  },
  {
    name: 'Ahmedabad',
    // Base Lat: 23.0225, Base Lon: 72.5714
    // Range: Base +/- 0.01
    bounds: [72.5614, 72.5814, 23.0125, 23.0325],
    cityId: null, // Will be fetched dynamically
  },
  // We don't need Bhopal here, as the goal is to move restaurants OUT of Bhopal's ID
];

// --- Model Imports (Adjust paths as necessary) ---
import Restaurant from '../models/restaurant.model.js';
import City from '../models/city.model.js';

// HELPER: Determines the correct City ID based on coordinates

/**
 * Checks if the given coordinates fall within the defined boundaries of any target city.
 * @param {number[]} coordinates - [longitude, latitude] array from the restaurant document.
 * @returns {mongoose.Types.ObjectId | null} The correct City ObjectId or null if not found.
 */

function determineCorrectCityId(coordinates) {
  // GeoJSON stores coordinates as [longitude, latitude]
  const [lon, lat] = coordinates;

  for (const city of CITY_BOUNDARIES) {
    const [minLon, maxLon, minLat, maxLat] = city.bounds;

    // Check if the point is within the bounding box
    if (lon >= minLon && lon <= maxLon && lat >= minLat && lat <= maxLat) {
      return city.cityId;
    }
  }

  return null; // City not found in the defined map
}

// MAIN MIGRATION FUNCTION

async function runCityMigration() {
  console.log('--- Starting Restaurant City Correction Script ---');
  console.log(
    `*** DRY RUN MODE is ${DRY_RUN ? 'ON (NO DB CHANGES WILL BE MADE)' : 'OFF (DATABASE WILL BE MODIFIED)'} ***`
  );

  try {
    // 1. Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected successfully.');

    // 2. Dynamically fetch required City IDs and the incorrect source ID
    const [bhopalCity, indoreCity, ahmedabadCity] = await Promise.all([
      City.findOne({ name: 'Bhopal' }),
      City.findOne({ name: 'Indore' }),
      City.findOne({ name: 'Ahmadabad' }),
    ]);

    if (!bhopalCity || !indoreCity || !ahmedabadCity) {
      throw new Error(
        'Required city documents (Bhopal, Indore, Ahmedabad) not found in the database. Please seed city data first.'
      );
    }

    // Set the dynamically fetched IDs into the BOUNDARIES map
    CITY_BOUNDARIES.find(c => c.name === 'Indore').cityId = indoreCity._id;
    CITY_BOUNDARIES.find(c => c.name === 'Ahmedabad').cityId =
      ahmedabadCity._id;

    const INCORRECT_CITY_ID = bhopalCity._id;
    console.log(`Bhopal ID (Incorrect Source): ${INCORRECT_CITY_ID}`);
    console.log(`Indore ID (Target): ${indoreCity._id}`);
    console.log(`Ahmedabad ID (Target): ${ahmedabadCity._id}`);

    // 3. Find all restaurants that were incorrectly seeded with the Bhopal ID
    const incorrectlySeededRestaurants = await Restaurant.find({
      'address.city': INCORRECT_CITY_ID,
    }).select('name address.location.coordinates');

    console.log(
      `\nFound ${incorrectlySeededRestaurants.length} restaurants currently linked to the INCORRECT City ID (${bhopalCity.name}).`
    );

    if (incorrectlySeededRestaurants.length === 0) {
      console.log(
        'No restaurants found matching the initial wrong city ID. Exiting.'
      );
      return;
    }

    let updatedCount = 0;

    // 4. Process and update each restaurant
    for (const restaurant of incorrectlySeededRestaurants) {
      const coordinates = restaurant.address.location.coordinates;
      const [lon, lat] = coordinates;
      console.log(
        `\nProcessing: ${restaurant.name} (Coords: [${lon.toFixed(4)}, ${lat.toFixed(4)}])`
      );

      const correctCityId = determineCorrectCityId(coordinates);

      if (correctCityId) {
        const correctCityName = CITY_BOUNDARIES.find(
          c => c.cityId.toString() === correctCityId.toString()
        )?.name;

        // Only update if the determined ID is NOT the incorrect source ID (Bhopal)
        if (correctCityId.toString() !== INCORRECT_CITY_ID.toString()) {
          if (!DRY_RUN) {
            // Actual update operation
            await Restaurant.updateOne(
              { _id: restaurant._id },
              { $set: { 'address.city': correctCityId } }
            );
          }

          updatedCount++;
          console.log(
            `  => ACTION: CORRECTED. New City: ${correctCityName} (${correctCityId})`
          );
        } else {
          // The coordinates matched the city that was mistakenly used (i.e., it was a genuinely Bhopal restaurant)
          console.log(
            `  => ACTION: SKIP. Coordinates confirm this restaurant should remain in Bhopal.`
          );
        }
      } else {
        // Safety catch: Coordinates don't match any known boundary
        console.log(
          '  => ACTION: MANUAL CHECK REQUIRED. Coordinates fall outside defined boundaries.'
        );
      }
    }

    console.log(`\n--- Migration Complete! ---`);
    console.log(
      `Total documents analyzed: ${incorrectlySeededRestaurants.length}`
    );
    console.log(`Total documents found to be updated: ${updatedCount}`);
    if (DRY_RUN) {
      console.log(
        '\n*** REMINDER: No changes were made to the database (DRY_RUN=true). ***'
      );
      console.log('Set DRY_RUN to false to commit these changes.');
    }
  } catch (err) {
    console.error('An error occurred during migration:', err.message);
  } finally {
    // 5. Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
}

// Execute the main function
runCityMigration();
