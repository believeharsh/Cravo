import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import cloudinary from "cloudinary";
import path from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";

// Models
import Category from "../models/category.model.js";
import Restaurant from "../models/restaurant.model.js";
import Product from "../models/product.model.js";

// Sample Data
import { restaurants } from "../sample-Data/RestaurantsData.js";
import { productPools } from "../sample-Data/ProductPool/ProductPool.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MONGODB_URI =
  "mongodb+srv://cravobelieveharsh:cravobelieveharsh11@cravingcartcluster.jbwz5cy.mongodb.net/?retryWrites=true&w=majority&appName=CravingCartCluster";

cloudinary.config({
  cloud_name: "dd5elqfus",
  api_key: "985926514817166",
  api_secret: "G0HTWbGFp1OJIDSHCW0Zh81ysOs",
});

// Cache to avoid uploading same image multiple times per run
const uploadedImagesCache = {};

// Generate deterministic public_id from URL
function getPublicIdFromUrl(url, prefix = "images") {
  const hash = crypto.createHash("md5").update(url).digest("hex").slice(0, 12);
  return `${prefix}/${hash}`;
}

async function uploadImageOnce(url, width = 400, height = 400) {
  if (!url) return null;

  // If already uploaded in this run, return cached result
  if (uploadedImagesCache[url]) return uploadedImagesCache[url];

  const publicId = getPublicIdFromUrl(url);

  try {
    const result = await cloudinary.uploader.upload(url, {
      public_id: publicId,
      overwrite: true,
      quality: "auto:low",
      fetch_format: "auto",
      width,
      height,
      crop: "fill",
      gravity: "auto",
    });

    uploadedImagesCache[url] = result.secure_url;
    console.log(`✅ Uploaded image once: ${publicId}`);
    return result.secure_url;
  } catch (err) {
    console.error(`❌ Failed to upload image ${url}: ${err.message}`);
    return `https://placehold.co/${width}x${height}/cccccc/ffffff?text=${encodeURIComponent(
      publicId
    )}`;
  }
}

// Utility functions
const randomFloat = (min, max) =>
  +(Math.random() * (max - min) + min).toFixed(1);
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
const randomOffset = () => (Math.random() - 0.5) * 0.02; // small lat/lon offset

const getRandomSubset = (arr, count) => {
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const getBarCode = () => {
  const timestamp = Date.now().toString().slice(-8); // last 8 digits of timestamp
  const random = Math.floor(100000 + Math.random() * 900000).toString(); // 6 random digits
  return (timestamp + random).slice(0, 13); // ensure 13 digits
};

const seedDatabase = async () => {
  try {
    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected.");

    // Fetch categories
    console.log("🍔 Fetching categories from database...");
    const categories = await Category.find({});
    if (!categories.length) {
      console.warn("⚠️ No categories found in DB! Seeding will fail.");
    } else {
      console.log(`✅ Fetched ${categories.length} categories.`);
    }
    const categoryMap = categories.reduce((map, cat) => {
      map[cat.name.toLowerCase()] = cat;
      return map;
    }, {});

    // Seed restaurants
    console.log(`🏪 Seeding ${restaurants.length} restaurants...`);
    const insertedRestaurants = [];
    for (const restaurant of restaurants) {
      const baseLon = restaurant.address.location.coordinates[0];
      const baseLat = restaurant.address.location.coordinates[1];
      const location = {
        type: "Point",
        coordinates: [baseLon + randomOffset(), baseLat + randomOffset()],
      };

      const imgUrl = await uploadImageOnce(
        restaurant.imagePath,
        800,
        600
      );

      const doc = await Restaurant.create({
        ...restaurant,
        address: { ...restaurant.address, location },
        images: imgUrl ? [imgUrl] : [],
        rating: restaurant.rating || randomFloat(3.5, 5),
        cost_for_two: restaurant.cost_for_two || randomInt(300, 800),
        delivery_time_mins: restaurant.delivery_time_mins || randomInt(20, 50),
        is_veg: restaurant.is_veg ?? Math.random() < 0.5,
      });

      insertedRestaurants.push(doc);
      console.log(`🏬 Restaurant seeded: ${doc.name}`);
    }

    // Seed products for each restaurant
    console.log(`🍟 Seeding products for each restaurant...`);
    const allProducts = [];
    for (const restaurant of insertedRestaurants) {
      console.log(`\n🔹 Processing restaurant: ${restaurant.name}`);
      const restaurantCategories = restaurant.cuisine_type
        .map((c) => categoryMap[c.toLowerCase()])
        .filter(Boolean);

      console.log(
        `  🗂️ Categories found: ${restaurantCategories
          .map((c) => c.name)
          .join(", ")}`
      );

      for (const category of restaurantCategories) {
        const pool = productPools[category.name.toLowerCase()] || [];
        const subset = getRandomSubset(pool, Math.min(6, pool.length)); // max 6 products per category

        console.log(
          `    🍽️ Adding ${subset.length} products for category: ${category.name}`
        );

        for (let i = 0; i < subset.length; i++) {
          const poolProduct = subset[i];
          const imgUrl = await uploadImageOnce(poolProduct.image, 400, 400);

          allProducts.push({
            ...poolProduct,
            images: imgUrl ? [imgUrl] : [],
            restaurant: restaurant._id,
            category: category._id,
            sku: `${restaurant.name
              .replace(/\s+/g, "")
              .toUpperCase()}-${category.name.toUpperCase()}-${i + 1}`,
            availabilityStatus: "In Stock",
            barcode: getBarCode(),
          });
        }
      }

      console.log(
        `  ✅ Total products for ${restaurant.name}: ${
          allProducts.filter(
            (p) => p.restaurant.toString() === restaurant._id.toString()
          ).length
        }`
      );
    }

    await Product.insertMany(allProducts);
    console.log(`\n🎉 Total products seeded: ${allProducts.length}`);

    console.log("🎉 Seeding completed successfully!");
  } catch (err) {
    console.error("❌ Error during seeding:", err);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 MongoDB disconnected.");
  }
};

seedDatabase();
