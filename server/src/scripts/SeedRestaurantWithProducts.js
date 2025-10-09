import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import cloudinary from 'cloudinary';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

// Models
import Category from '../models/category.model.js';
import Restaurant from '../models/restaurant.model.js';
import Product from '../models/product.model.js';
import City from '../models/city.model.js';

// Sample Data

import { productPools } from '../sample-Data/ProductPool/ProductPool.js';
import { RestaurantImagePool } from '../sample-Data/Restaurant-Image-Pool/RestaurantImagePool.js';
// import jaipurRestaurants from '../sample-Data/Restaurants-Data/HydrabadRestaurants.js';
import nagpurRestaurants from '../sample-Data/Restaurants-Data/NagpurRestaurants.js';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// Use env var for MongoDB URI
// const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_URI =
  'mongodb+srv://cravobelieveharsh:cravobelieveharsh11@cravingcartcluster.jbwz5cy.mongodb.net/?retryWrites=true&w=majority&appName=CravingCartCluster';

cloudinary.config({
  // cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  // api_key: process.env.CLOUDINARY_API_KEY,
  // api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: 'dd5elqfus',
  api_key: '985926514817166',
  api_secret: 'G0HTWbGFp1OJIDSHCW0Zh81ysOs',
});

// In-memory cache for runtime speed (optional)
const uploadedImagesCache = new Map();

// Persistent cache: Mongoose schema to store url -> cloudinary info
const imageCacheSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true, unique: true, index: true },
  publicId: { type: String, required: true },
  secureUrl: { type: String },
  width: { type: Number },
  height: { type: Number },
  uploadedAt: { type: Date, default: Date.now },
});
const ImageCache = mongoose.model('ImageCache', imageCacheSchema);

function getHashFromUrl(url) {
  return crypto.createHash('md5').update(url).digest('hex').slice(0, 12);
}

async function cloudinaryResourceExists(fullPublicId) {
  // returns resource info if exists, otherwise null
  try {
    const res = await new Promise((resolve, reject) => {
      cloudinary.api.resource(fullPublicId, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
    return res;
  } catch (err) {
    // Cloudinary returns a 404-like error if not found. We treat any error as "not found" here.
    return null;
  }
}

async function uploadImageOnce(url, folder, width = 400, height = 400) {
  if (!url) {
    console.log('⚠️ Skipping upload: URL missing');
    return null;
  }

  // 1️⃣ In-memory cache
  if (uploadedImagesCache.has(url)) {
    console.log(`✅ [Memory Cache] Using cached image for ${url}`);
    return uploadedImagesCache.get(url);
  }

  // 2️⃣ Persistent DB cache
  const cached = await ImageCache.findOne({ originalUrl: url }).lean();
  if (cached) {
    console.log(
      `✅ [DB Cache] Using cached image for ${url} → ${cached.secureUrl}`
    );
    uploadedImagesCache.set(url, cached.secureUrl);
    return cached.secureUrl;
  }

  // Compute consistent public ID
  const hash = getHashFromUrl(url);
  const publicId = hash;
  const folderPath = `cravingcart/${folder}`;
  const fullPublicId = `${folderPath}/${publicId}`;

  // 3️⃣ Check Cloudinary if exists
  const existing = await cloudinaryResourceExists(fullPublicId);
  if (existing?.secure_url) {
    console.log(
      `✅ [Cloudinary Exists] Found existing image for ${url} → ${existing.secure_url}`
    );
    const secureUrl = existing.secure_url;
    await ImageCache.create({ originalUrl: url, publicId, secureUrl }).catch(
      () => {}
    );
    uploadedImagesCache.set(url, secureUrl);
    return secureUrl;
  }

  // 4️⃣ Upload if not cached anywhere
  try {
    console.log(`🚀 [Upload] Uploading new image → ${url}`);
    const result = await cloudinary.uploader.upload(url, {
      folder: folderPath,
      public_id: publicId,
      overwrite: false,
      quality: 'auto:good',
      fetch_format: 'auto',
      width,
      height,
      crop: 'fill',
      gravity: 'auto',
    });

    console.log(
      `🎉 [Uploaded] Successfully uploaded ${url} → ${result.secure_url}`
    );

    await ImageCache.create({
      originalUrl: url,
      publicId,
      secureUrl: result.secure_url,
      width: result.width,
      height: result.height,
    }).catch(() => {});

    uploadedImagesCache.set(url, result.secure_url);
    return result.secure_url;
  } catch (err) {
    console.error(`❌ [Upload Failed] ${url}: ${err.message}`);
    return null;
  }
}

// Utility: stable random subset (Fisher-Yates shuffle)
function getRandomSubset(arr, count) {
  const copy = arr.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, Math.min(count, copy.length));
}

const randomFloat = (min, max) =>
  +(Math.random() * (max - min) + min).toFixed(1);
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
const randomOffset = () => (Math.random() - 0.5) * 0.02;
const getBarCode = () => {
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.floor(100000 + Math.random() * 900000).toString();
  return (timestamp + random).slice(0, 13);
};

const seedDatabase = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected.');

    // Ensure indexes on ImageCache
    await ImageCache.init();

    const cityForRestaurants = await City.findOne({ name: 'Nagpur' });
    if (!cityForRestaurants) {
      console.warn('city not found. Create city documents first.');
      return;
    }

    const categories = await Category.find({});
    const categoryMap = categories.reduce((m, c) => {
      m[c.name.toLowerCase()] = c;
      return m;
    }, {});

    const insertedRestaurants = [];
    for (const restaurant of nagpurRestaurants) {
      const baseLon = restaurant.address.location.coordinates[0];
      const baseLat = restaurant.address.location.coordinates[1];
      const location = {
        type: 'Point',
        coordinates: [baseLon + randomOffset(), baseLat + randomOffset()],
      };

      const restaurantImageUrl =
        (restaurant.images && restaurant.images[0]) ||
        getRandomImageForRestaurant(restaurant.cuisine_type || []);
      const imgUrl = await uploadImageOnce(
        restaurantImageUrl,
        'restaurants',
        800,
        600
      );

      const doc = await Restaurant.create({
        ...restaurant,
        address: {
          ...restaurant.address,
          city: cityForRestaurants._id,
          location,
        },
        images: imgUrl ? [imgUrl] : [],
        rating: restaurant.rating || randomFloat(3.5, 5),
        cost_for_two: restaurant.cost_for_two || randomInt(300, 800),
        delivery_time_mins: restaurant.delivery_time_mins || randomInt(20, 50),
        is_veg: restaurant.is_veg ?? Math.random() < 0.5,
      });
      insertedRestaurants.push(doc);
      console.log(`Seeded restaurant: ${doc.name}`);
    }

    const allProducts = [];
    for (const restaurant of insertedRestaurants) {
      const restaurantCategories = (restaurant.cuisine_type || [])
        .map(c => categoryMap[c.toLowerCase()])
        .filter(Boolean);
      if (!restaurantCategories.length) continue;

      for (const category of restaurantCategories) {
        const pool = productPools[category.name.toLowerCase()] || [];
        const subset = getRandomSubset(pool, Math.min(8, pool.length));
        for (let i = 0; i < subset.length; i++) {
          const poolProduct = subset[i];
          const productImageUrl = poolProduct.image;
          const imgUrl = await uploadImageOnce(
            productImageUrl,
            'products',
            400,
            400
          );
          const uniqueSku = `${restaurant.name.replace(/\s+/g, '')}-${restaurant._id}-${category.name.toUpperCase()}-${i + 1}`;
          allProducts.push({
            ...poolProduct,
            images: imgUrl ? [imgUrl] : [],
            restaurant: restaurant._id,
            category: category._id,
            sku: uniqueSku,
            availabilityStatus: 'In Stock',
            barcode: getBarCode(),
          });
        }
      }
    }

    if (allProducts.length) {
      await Product.insertMany(allProducts);
      console.log(`Inserted ${allProducts.length} products.`);
    }

    console.log('Seeding completed.');
  } catch (err) {
    console.error('Error during seeding:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
};

export { uploadImageOnce, seedDatabase };

// If you want to run this file directly with node, uncomment below:

seedDatabase();

// Helper: getRandomImageForRestaurant (moved here so file is self-contained)
function getRandomImageForRestaurant(cuisineTypes) {
  const normalizedCuisines = (cuisineTypes || []).map(c => c.toLowerCase());
  for (const cuisine of normalizedCuisines) {
    if (RestaurantImagePool[cuisine]) {
      const images = RestaurantImagePool[cuisine];
      return images[Math.floor(Math.random() * images.length)];
    }
  }
  const defaultImages = RestaurantImagePool.default || [];
  return defaultImages[Math.floor(Math.random() * defaultImages.length)];
}
