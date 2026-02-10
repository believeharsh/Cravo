import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

import { EnvConfig } from '../config/env.config.js';
import City from '../models/city.model.js';

dotenv.config();

const MONGO_URI = 'your mongo uri here';

cloudinary.config({
  cloud_name: EnvConfig.CLOUDINARY_CLOUD_NAME,
  api_key: EnvConfig.CLOUDINARY_API_KEY,
  api_secret: EnvConfig.CLOUDINARY_API_SECRET,
});

const citiesData = [
  {
    name: 'Mumbai',
    location: {
      type: 'Point',
      coordinates: [72.8777, 19.076], // Approximate coordinates for Mumbai
    },
    is_serviceable: true,
  },
  {
    name: 'Delhi',
    location: {
      type: 'Point',
      coordinates: [77.209, 28.6139], // Approximate coordinates for Delhi
    },
    is_serviceable: true,
  },
  {
    name: 'Bangalore',
    location: {
      type: 'Point',
      coordinates: [77.5946, 12.9716], // Approximate coordinates for Bangalore
    },
    is_serviceable: true,
  },
  {
    name: 'Hyderabad',
    location: {
      type: 'Point',
      coordinates: [78.4867, 17.385], // Approximate coordinates for Hyderabad
    },
    is_serviceable: true,
  },
  {
    name: 'Chennai',
    location: {
      type: 'Point',
      coordinates: [80.2707, 13.0827], // Approximate coordinates for Chennai
    },
    is_serviceable: true,
  },
  {
    name: 'Calcutta',
    location: {
      type: 'Point',
      coordinates: [88.3639, 22.5726], // Approximate coordinates for Calcutta
    },
    is_serviceable: true,
  },
  {
    name: 'Pune',
    location: {
      type: 'Point',
      coordinates: [73.8567, 18.5204], // Approximate coordinates for Pune
    },
    is_serviceable: true,
  },
  {
    name: 'Ahmadabad',
    location: {
      type: 'Point',
      coordinates: [72.5714, 23.0225], // Approximate coordinates for Ahmedabad
    },
    is_serviceable: true,
  },
  {
    name: 'Jaipur',
    location: {
      type: 'Point',
      coordinates: [75.7873, 26.9124], // Approximate coordinates for Jaipur
    },
    is_serviceable: true,
  },
  {
    name: 'Lucknow',
    location: {
      type: 'Point',
      coordinates: [80.9462, 26.8467], // Approximate coordinates for Lucknow
    },
    is_serviceable: true,
  },
  {
    name: 'Indore', // Your primary city
    location: {
      type: 'Point',
      coordinates: [75.8577, 22.7196], // Approximate coordinates for Indore
    },
    is_serviceable: true,
  },
  {
    name: 'Bhopal',
    location: {
      type: 'Point',
      coordinates: [77.4126, 23.2599], // Approximate coordinates for Bhopal
    },
    is_serviceable: true,
  },
  {
    name: 'Nagpur',
    location: {
      type: 'Point',
      coordinates: [79.0882, 21.1458], // Approximate coordinates for Nagpur
    },
    is_serviceable: true,
  },
  {
    name: 'Surat',
    location: {
      type: 'Point',
      coordinates: [72.8333, 21.1667], // Approximate coordinates for Surat
    },
    is_serviceable: false, // Example: Not yet serviceable
  },
  {
    name: 'Kochi',
    location: {
      type: 'Point',
      coordinates: [76.2673, 9.9312], // Approximate coordinates for Kochi
    },
    is_serviceable: false, // Example: Not yet serviceable
  },
];

async function seedCities() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected for seeding!');

    // Clear existing cities (optional, do with caution in dev only)
    await City.deleteMany({});
    console.log('Existing cities deleted (if any).');

    // Insert new cities
    await City.insertMany(citiesData);
    console.log(`${citiesData.length} cities seeded successfully!`);

    // Ensure indexes are created after seeding (Mongoose usually handles this)
    await City.syncIndexes();
    console.log('City indexes synchronized!');
  } catch (error) {
    console.error('Error seeding cities:', error);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB disconnected.');
  }
}

seedCities();

export default citiesData;
