import dotenv from "dotenv";
dotenv.config();

import mongoose from 'mongoose';
import cloudinary from 'cloudinary';
import path from 'path';
import { fileURLToPath } from 'url';

// Import your Mongoose models
import Category from '../models/category.model.js';
import Restaurant from '../models/restaurant.model.js';
import Product from '../models/product.model.js';

// Import the new data
import { restaurants } from '../sample-Data/RestaurantsData.js';
import { products } from '../sample-Data/ProductsData.js';

// Get the current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- ⚠️ IMPORTANT: Add your credentials here ⚠️ ---
const MONGODB_URI = "mongodb+srv://cravobelieveharsh:cravobelieveharsh11@cravingcartcluster.jbwz5cy.mongodb.net/?retryWrites=true&w=majority&appName=CravingCartCluster"; // Replace with your URI

cloudinary.config({
    // cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    // api_key: process.env.CLOUDINARY_API_KEY,
    // api_secret: process.env.CLOUDINARY_API_SECRET
    cloud_name: "dd5elqfus" , 
    api_key: "985926514817166",
    api_secret: "G0HTWbGFp1OJIDSHCW0Zh81ysOs" 

});


const seedDatabase = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ MongoDB connected successfully!');

        // --- 1. Clear existing restaurants and products data ---
        console.log('🔄 Clearing old restaurant and product data...');
        await Restaurant.deleteMany({});
        await Product.deleteMany({});
        console.log('🗑️ Old data cleared.');

        // --- 2. Fetch existing categories from the database ---
        console.log('🍔 Fetching existing categories...');
        const seededCategories = await Category.find({});
        if (seededCategories.length === 0) {
            console.error('❌ No categories found in the database. Please seed categories first!');
            await mongoose.disconnect();
            return;
        }
        console.log(`✅ Fetched ${seededCategories.length} categories from the database.`);
        
        // Create a map for quick lookup
        const categoryMap = seededCategories.reduce((map, cat) => {
            map[cat.name] = cat;
            return map;
        }, {});

        // --- 3. Upload restaurant images to Cloudinary and seed restaurants ---
        console.log('🖼️ Starting Cloudinary image upload and seeding restaurants...');
        const seededRestaurantsData = [];
        for (const restaurant of restaurants) {
            try {
                // The imagePath is now a remote URL
                const imagePath = restaurant.imagePath;
                console.log(`  Uploading image for ${restaurant.name} from ${imagePath}...`);
                
                const uploadResult = await cloudinary.uploader.upload(
                    imagePath,
                    {
                        type: "upload",
                        public_id: `cravo/restaurants/${restaurant.name.toLowerCase().replace(/\s+/g, '_')}_${Date.now()}`,
                        overwrite: true,
                        quality: "auto:low",
                        fetch_format: "auto",
                        width: 800,
                        height: 600,
                        crop: "fill",
                        gravity: "auto"
                    }
                );
               console.log("upload result is this ", uploadResult.secure_url);
                seededRestaurantsData.push({
                    ...restaurant,
                    images: [uploadResult.secure_url] 
                });

                console.log(`   ✅ Uploaded ${restaurant.name}. URL: ${uploadResult.secure_url}`);

            } catch (error) {
                console.error(`   ❌ ERROR uploading ${restaurant.name}:`, error.message);
                seededRestaurantsData.push({
                    ...restaurant,
                   images: [`https://placehold.co/400x400/cccccc/ffffff?text=${encodeURIComponent(restaurant.name)}`]
                });
            }
        }

        const insertedRestaurants = await Restaurant.insertMany(seededRestaurantsData);
        console.log(`✅ Seeded ${insertedRestaurants.length} restaurants.`);

        // Create a map for quick lookup
        const restaurantMap = insertedRestaurants.reduce((map, rest) => {
            map[rest.name] = rest;
            return map;
        }, {});

        // --- 4. Upload product images to Cloudinary and seed products ---
        console.log('🍟 Starting Cloudinary image upload and seeding products...');
        const productsWithImages = [];
        for (const product of products) {
            try {
                // Upload the product image from its remote URL
                const imagePath = product.images;
                console.log(`  Uploading image for product '${product.name}'...`);
                
                const uploadResult = await cloudinary.uploader.upload(
                    imagePath,
                    {
                        type: "upload",
                        public_id: `cravo/products/${product.restaurantName.toLowerCase().replace(/\s+/g, '_')}_${product.name.toLowerCase().replace(/\s+/g, '_')}`,
                        overwrite: true,
                        quality: "auto:low",
                        fetch_format: "auto",
                        width: 400,
                        height: 400,
                        crop: "fill",
                        gravity: "auto"
                    }
                );

                productsWithImages.push({
                    ...product,
                    images: [uploadResult.secure_url] 
                });

                console.log(`   ✅ Uploaded product '${product.name}'. URL: ${uploadResult.secure_url}`);
            } catch (error) {
                console.error(`   ❌ ERROR uploading product '${product.name}':`, error.message);
                productsWithImages.push({
                    ...product,
                      images: [`https://placehold.co/400x400/cccccc/ffffff?text=${encodeURIComponent(product.name)}`]
                });
            }
        }

        // --- 5. Link products to restaurants and categories and insert into DB ---
        console.log('🔗 Linking products to restaurants and categories...');
        const productsWithRefs = productsWithImages.map(product => {
            const restaurant = restaurantMap[product.restaurantName];
            const category = categoryMap[product.categoryName];

            if (!restaurant) {
                console.warn(`  ⚠️ Warning: No restaurant found for product '${product.name}'. Skipping.`);
                return null;
            }
            if (!category) {
                console.warn(`  ⚠️ Warning: No category found for product '${product.name}'. Skipping.`);
                return null;
            }

            return {
                ...product,
                restaurant: restaurant._id,
                category: category._id,
                restaurantName: undefined,
                categoryName: undefined,
            };
        }).filter(Boolean); // Remove any null entries

        await Product.insertMany(productsWithRefs);
        console.log(`✅ Seeded ${productsWithRefs.length} products.`);

        console.log('\n🎉 All data seeded successfully!');

    } catch (error) {
        console.error('An error occurred during seeding:', error);
    } finally {
        if (mongoose.connection.readyState === 1) {
            await mongoose.disconnect();
            console.log('🔌 MongoDB disconnected.');
        }
    }
};

seedDatabase();
