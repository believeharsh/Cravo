// import dotenv from 'dotenv';
// dotenv.config();

// import mongoose from 'mongoose';
// import cloudinary from 'cloudinary';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import crypto from 'crypto';

// // Models
// import Category from '../models/category.model.js';
// import Restaurant from '../models/restaurant.model.js';
// import Product from '../models/product.model.js';
// import City from '../models/city.model.js';

// // Sample Data
// import { bhopalRestaurants } from '../sample-Data/Restaurants-Data/BhopalRestaurant.js';
// import { IndoreRestaurants } from '../sample-Data/Restaurants-Data/IndoreRestaurant.js';
// import { productPools } from '../sample-Data/ProductPool/ProductPool.js';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const MONGODB_URI =
//   'mongodb+srv://cravobelieveharsh:cravobelieveharsh11@cravingcartcluster.jbwz5cy.mongodb.net/?retryWrites=true&w=majority&appName=CravingCartCluster';

// cloudinary.config({
//   cloud_name: 'dd5elqfus',
//   api_key: '985926514817166',
//   api_secret: 'G0HTWbGFp1OJIDSHCW0Zh81ysOs',
// });

// const uploadedImagesCache = {};

// function getPublicIdFromUrl(url, folder) {
//   const hash = crypto.createHash('md5').update(url).digest('hex').slice(0, 12);
//   return `${folder}/${hash}`;
// }

// async function uploadImageOnce(url, folder, width = 400, height = 400) {
//   if (!url) {
//     console.log('    ⚠️ Skipping image upload: URL is null or undefined.');
//     return null;
//   }
//   const publicId = getPublicIdFromUrl(url, folder);
//   if (uploadedImagesCache[url]) {
//     console.log(
//       `    ✅ Found image in cache. Returning cached URL for ${publicId}.`
//     );
//     return uploadedImagesCache[url];
//   }
//   try {
//     console.log(
//       `    🚀 Attempting to upload image to folder '${folder}': ${url}`
//     );
//     const result = await cloudinary.uploader.upload(url, {
//       folder: 'cravingcart/restaurants',
//       public_id: publicId,
//       overwrite: false,
//       quality: 'auto:low',
//       fetch_format: 'auto',
//       width,
//       height,
//       crop: 'fill',
//       gravity: 'auto',
//     });
//     uploadedImagesCache[url] = result.secure_url;
//     console.log(`    🎉 Uploaded successfully! Public ID: ${publicId}`);
//     return result.secure_url;
//   } catch (err) {
//     if (err.http_code === 409) {
//       const existingUrl = cloudinary.url(publicId, {
//         secure: true,
//         quality: 'auto:low',
//         fetch_format: 'auto',
//         width,
//         height,
//         crop: 'fill',
//         gravity: 'auto',
//       });
//       uploadedImagesCache[url] = existingUrl;
//       console.log(
//         `    ℹ️ Image with public ID ${publicId} already exists. Using existing URL.`
//       );
//       return existingUrl;
//     }
//     console.error(
//       `❌ Failed to upload image ${url}: ${err.message}. Providing placeholder.`
//     );
//     return `https://placehold.co/${width}x${height}/cccccc/ffffff?text=${encodeURIComponent(
//       publicId
//     )}`;
//   }
// }
// const randomFloat = (min, max) =>
//   +(Math.random() * (max - min) + min).toFixed(1);
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1)) + min;
// const randomOffset = () => (Math.random() - 0.5) * 0.02;
// const getRandomSubset = (arr, count) => {
//   const shuffled = arr.sort(() => 0.5 - Math.random());
//   return shuffled.slice(0, count);
// };
// const getBarCode = () => {
//   const timestamp = Date.now().toString().slice(-8);
//   const random = Math.floor(100000 + Math.random() * 900000).toString();
//   return (timestamp + random).slice(0, 13);
// };
// const seedDatabase = async () => {
//   try {
//     console.log('=================================================');
//     console.log('          🚀 Starting Database Seeder 🚀');
//     console.log('=================================================');
//     console.log('\n🔌 Connecting to MongoDB...');
//     await mongoose.connect(MONGODB_URI);
//     console.log('✅ MongoDB connected successfully.'); // Step 1: Fetch the cities from the database
//     console.log('\n🏙️ Fetching cities from the database...');
//     const cityforResaurants = await City.findOne({ name: 'Indore' });
//     if (!CicityforResaurantsty) {
//       console.warn(
//         '⚠️ "Indore" city not found in the database. Please create it first.'
//       );
//       return;
//     }
//     console.log(
//       `✅ Found city: ${cityforResaurants.name} (ID: ${cityforResaurants._id})`
//     ); // Step 2: Fetch and log categories from DB
//     console.log('\n🍔 Fetching categories from database...');
//     const categories = await Category.find({});
//     if (!categories.length) {
//       console.warn(
//         '⚠️ No categories found in DB! Seeding products will not work as expected.'
//       );
//       return;
//     } else {
//       console.log(`✅ Fetched ${categories.length} categories.`);
//       console.log('✅ Found the following categories in the database:');
//       categories.forEach(cat => console.log(`    - ${cat.name}`));
//     }
//     const categoryMap = categories.reduce((map, cat) => {
//       map[cat.name.toLowerCase()] = cat;
//       return map;
//     }, {}); // Step 3: Seed restaurants
//     console.log(`\n🏪 Seeding ${IndoreRestaurants.length} restaurants...`);
//     const insertedRestaurants = [];
//     for (const restaurant of IndoreRestaurants) {
//       console.log(
//         `\n  ------------------- Seeding Restaurant: ${restaurant.name} -------------------`
//       );
//       const baseLon = restaurant.address.location.coordinates[0];
//       const baseLat = restaurant.address.location.coordinates[1];
//       const location = {
//         type: 'Point',
//         coordinates: [baseLon + randomOffset(), baseLat + randomOffset()],
//       };
//       console.log(`  🖼️ Processing restaurant image...`);
//       const imgUrl = await uploadImageOnce(
//         restaurant.imagePath,
//         'restaurants',
//         800,
//         600
//       );
//       const doc = await Restaurant.create({
//         ...restaurant,
//         address: {
//           ...restaurant.address,
//           city: cityforResaurants._id,
//           location,
//         },
//         images: imgUrl ? [imgUrl] : [],
//         rating: restaurant.rating || randomFloat(3.5, 5),
//         cost_for_two: restaurant.cost_for_two || randomInt(300, 800),
//         delivery_time_mins: restaurant.delivery_time_mins || randomInt(20, 50),
//         is_veg: restaurant.is_veg ?? Math.random() < 0.5,
//       });
//       insertedRestaurants.push(doc);
//       console.log(`✅ Restaurant seeded: ${doc.name} (ID: ${doc._id})`);
//     } // Step 4: Seed products for each restaurant
//     console.log(`\n------------------- Seeding Products -------------------`);
//     const allProducts = [];
//     for (const restaurant of insertedRestaurants) {
//       console.log(
//         `\n🔹 Processing products for restaurant: ${restaurant.name}`
//       );
//       console.log(
//         `    🔍 Restaurant cuisine types: ${restaurant.cuisine_type.join(', ')}`
//       );
//       const restaurantCategories = restaurant.cuisine_type
//         .map(c => {
//           const category = categoryMap[c.toLowerCase()];
//           if (!category) {
//             console.warn(
//               `    ⚠️ No database category found for cuisine type: '${c}'. Skipping this cuisine.`
//             );
//           }
//           return category;
//         })
//         .filter(Boolean);
//       if (!restaurantCategories.length) {
//         console.warn(
//           `  ⚠️ Final check: No matching categories found for ${restaurant.name}. Skipping product seeding entirely.`
//         );
//         continue;
//       }
//       console.log(
//         `  🗂️ Categories to seed: ${restaurantCategories
//           .map(c => c.name)
//           .join(', ')}`
//       );
//       for (const category of restaurantCategories) {
//         const pool = productPools[category.name.toLowerCase()] || [];
//         if (pool.length === 0) {
//           console.warn(
//             `    ⚠️ No products found in pool for category: ${category.name}.`
//           );
//           continue;
//         }
//         const subset = getRandomSubset(pool, Math.min(3, pool.length));
//         console.log(
//           `    🍽️ Adding ${subset.length} products for category: ${category.name}`
//         );
//         for (let i = 0; i < subset.length; i++) {
//           const poolProduct = subset[i];
//           console.log(`      ➡️ Processing product: ${poolProduct.name}`);
//           const imgUrl = await uploadImageOnce(
//             poolProduct.image,
//             'products',
//             400,
//             400
//           );
//           allProducts.push({
//             ...poolProduct,
//             images: imgUrl ? [imgUrl] : [],
//             restaurant: restaurant._id,
//             category: category._id,
//             sku: `${restaurant.name
//               .replace(/\s+/g, '')
//               .toUpperCase()}-${category.name.toUpperCase()}-${i + 1}`,
//             availabilityStatus: 'In Stock',
//             barcode: getBarCode(),
//           });
//         }
//       }
//     }
//     if (allProducts.length > 0) {
//       console.log(
//         `\n📦 Inserting ${allProducts.length} products into the database...`
//       );
//       await Product.insertMany(allProducts);
//       console.log(`🎉 Total products seeded: ${allProducts.length}`);
//     } else {
//       console.log(`\n🤷‍♂️ No products were seeded.`);
//     }
//     console.log('\n=================================================');
//     console.log('  🎉 Seeding completed successfully!');
//     console.log('=================================================');
//   } catch (err) {
//     console.error('\n❌ An error occurred during seeding:', err);
//   } finally {
//     await mongoose.disconnect();
//     console.log('🔌 MongoDB disconnected.');
//   }
// };
// seedDatabase();

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
import { bhopalRestaurants } from '../sample-Data/Restaurants-Data/BhopalRestaurant.js';
// import { IndoreRestaurants } from '../sample-Data/Restaurants-Data/IndoreRestaurant.js';
import { productPools } from '../sample-Data/ProductPool/ProductPool.js';
import { RestaurantImagePool } from '../sample-Data/Restaurant-Image-Pool/RestaurantImagePool.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MONGODB_URI =
  'mongodb+srv://cravobelieveharsh:cravobelieveharsh11@cravingcartcluster.jbwz5cy.mongodb.net/?retryWrites=true&w=majority&appName=CravingCartCluster';

cloudinary.config({
  cloud_name: 'dd5elqfus',
  api_key: '985926514817166',
  api_secret: 'G0HTWbGFp1OJIDSHCW0Zh81ysOs',
});

const uploadedImagesCache = {};

function getPublicIdFromUrl(url, folder) {
  const hash = crypto.createHash('md5').update(url).digest('hex').slice(0, 12);
  return `${folder}/${hash}`;
}

async function uploadImageOnce(url, folder, width = 400, height = 400) {
  if (!url) {
    console.log('    ⚠️ Skipping image upload: URL is null or undefined.');
    return null;
  }
  const publicId = getPublicIdFromUrl(url, folder);
  if (uploadedImagesCache[url]) {
    console.log(
      `    ✅ Found image in cache. Returning cached URL for ${publicId}.`
    );
    return uploadedImagesCache[url];
  }
  try {
    console.log(
      `    🚀 Attempting to upload image to folder '${folder}': ${url}`
    );
    const result = await cloudinary.uploader.upload(url, {
      folder: `cravingcart/${folder}`,
      public_id: publicId,
      overwrite: false,
      quality: 'auto:low',
      fetch_format: 'auto',
      width,
      height,
      crop: 'fill',
      gravity: 'auto',
    });
    uploadedImagesCache[url] = result.secure_url;
    console.log(`    🎉 Uploaded successfully! Public ID: ${publicId}`);
    return result.secure_url;
  } catch (err) {
    if (err.http_code === 409) {
      const existingUrl = cloudinary.url(publicId, {
        secure: true,
        quality: 'auto:low',
        fetch_format: 'auto',
        width,
        height,
        crop: 'fill',
        gravity: 'auto',
      });
      uploadedImagesCache[url] = existingUrl;
      console.log(
        `    ℹ️ Image with public ID ${publicId} already exists. Using existing URL.`
      );
      return existingUrl;
    }
    console.error(
      `❌ Failed to upload image ${url}: ${err.message}. Providing placeholder.`
    );
    return `https://placehold.co/${width}x${height}/cccccc/ffffff?text=${encodeURIComponent(
      publicId
    )}`;
  }
}

// Helper function to get a random image from the pool
function getRandomImageForRestaurant(cuisineTypes) {
  const normalizedCuisines = cuisineTypes.map(c => c.toLowerCase());
  for (const cuisine of normalizedCuisines) {
    if (RestaurantImagePool[cuisine]) {
      const images = RestaurantImagePool[cuisine];
      return images[Math.floor(Math.random() * images.length)];
    }
  }
  // Fallback to the default image if no specific cuisine match is found
  const defaultImages = RestaurantImagePool.default;
  return defaultImages[Math.floor(Math.random() * defaultImages.length)];
}

const randomFloat = (min, max) =>
  +(Math.random() * (max - min) + min).toFixed(1);
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
const randomOffset = () => (Math.random() - 0.5) * 0.02;
const getRandomSubset = (arr, count) => {
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
const getBarCode = () => {
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.floor(100000 + Math.random() * 900000).toString();
  return (timestamp + random).slice(0, 13);
};

const seedDatabase = async () => {
  try {
    console.log('=================================================');
    console.log('         🚀 Starting Database Seeder 🚀');
    console.log('=================================================');
    console.log('\n🔌 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB connected successfully.');

    // Step 1: Fetch the cities from the database
    console.log('\n🏙️ Fetching cities from the database...');
    const cityForRestaurants = await City.findOne({ name: 'Bhopal' });
    if (!cityForRestaurants) {
      console.warn(
        '⚠️ "Bhopal" city not found in the database. Please create it first.'
      );
      return;
    }
    console.log(
      `✅ Found city: ${cityForRestaurants.name} (ID: ${cityForRestaurants._id})`
    );

    // Step 2: Fetch and log categories from DB
    console.log('\n🍔 Fetching categories from database...');
    const categories = await Category.find({});
    if (!categories.length) {
      console.warn(
        '⚠️ No categories found in DB! Seeding products will not work as expected.'
      );
      return;
    } else {
      console.log(`✅ Fetched ${categories.length} categories.`);
      console.log('✅ Found the following categories in the database:');
      categories.forEach(cat => console.log(`    - ${cat.name}`));
    }
    const categoryMap = categories.reduce((map, cat) => {
      map[cat.name.toLowerCase()] = cat;
      return map;
    }, {});

    // Step 3: Seed restaurants
    console.log(`\n🏪 Seeding ${bhopalRestaurants.length} restaurants...`);
    const insertedRestaurants = [];
    for (const restaurant of bhopalRestaurants) {
      console.log(
        `\n  ------------------- Seeding Restaurant: ${restaurant.name} -------------------`
      );
      const baseLon = restaurant.address.location.coordinates[0];
      const baseLat = restaurant.address.location.coordinates[1];
      const location = {
        type: 'Point',
        coordinates: [baseLon + randomOffset(), baseLat + randomOffset()],
      };

      // Get a random image URL from the pool based on cuisine type
      console.log(`  🖼️ Processing restaurant image...`);
      const restaurantImageUrl = getRandomImageForRestaurant(
        restaurant.cuisine_type
      );
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
      console.log(`✅ Restaurant seeded: ${doc.name} (ID: ${doc._id})`);
    }

    // Step 4: Seed products for each restaurant
    console.log(`\n------------------- Seeding Products -------------------`);
    const allProducts = [];
    for (const restaurant of insertedRestaurants) {
      console.log(
        `\n🔹 Processing products for restaurant: ${restaurant.name}`
      );
      console.log(
        `    🔍 Restaurant cuisine types: ${restaurant.cuisine_type.join(', ')}`
      );
      const restaurantCategories = restaurant.cuisine_type
        .map(c => {
          const category = categoryMap[c.toLowerCase()];
          if (!category) {
            console.warn(
              `    ⚠️ No database category found for cuisine type: '${c}'. Skipping this cuisine.`
            );
          }
          return category;
        })
        .filter(Boolean);
      if (!restaurantCategories.length) {
        console.warn(
          `  ⚠️ Final check: No matching categories found for ${restaurant.name}. Skipping product seeding entirely.`
        );
        continue;
      }
      console.log(
        `  🗂️ Categories to seed: ${restaurantCategories
          .map(c => c.name)
          .join(', ')}`
      );
      for (const category of restaurantCategories) {
        const pool = productPools[category.name.toLowerCase()] || [];
        if (pool.length === 0) {
          console.warn(
            `    ⚠️ No products found in pool for category: ${category.name}.`
          );
          continue;
        }
        const subset = getRandomSubset(pool, Math.min(4, pool.length));
        console.log(
          `    🍽️ Adding ${subset.length} products for category: ${category.name}`
        );
        for (let i = 0; i < subset.length; i++) {
          const poolProduct = subset[i];
          console.log(`      ➡️ Processing product: ${poolProduct.name}`);
          const imgUrl = await uploadImageOnce(
            poolProduct.image,
            'products',
            400,
            400
          );
          const uniqueSku = `${restaurant.name
            .replace(/\s+/g, '')
            .toUpperCase()}-${restaurant._id}-${category.name.toUpperCase()}-${i + 1}`;
          allProducts.push({
            ...poolProduct,
            images: imgUrl ? [imgUrl] : [],
            restaurant: restaurant._id,
            category: category._id,
            // sku: `${restaurant.name
            //   .replace(/\s+/g, '')
            //   .toUpperCase()}-${category.name.toUpperCase()}-${i + 1}`,
            sku: uniqueSku,
            availabilityStatus: 'In Stock',
            barcode: getBarCode(),
          });
        }
      }
    }
    if (allProducts.length > 0) {
      console.log(
        `\n📦 Inserting ${allProducts.length} products into the database...`
      );
      await Product.insertMany(allProducts);
      console.log(`🎉 Total products seeded: ${allProducts.length}`);
    } else {
      console.log(`\n🤷‍♂️ No products were seeded.`);
    }

    console.log('\n=================================================');
    console.log('  🎉 Seeding completed successfully!');
    console.log('=================================================');
  } catch (err) {
    console.error('\n❌ An error occurred during seeding:', err);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 MongoDB disconnected.');
  }
};

seedDatabase();
