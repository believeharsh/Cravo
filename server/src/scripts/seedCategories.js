import { v2 as cloudinary } from 'cloudinary';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import Category from '../models/category.model.js';


const MONGO_URI = "Add Your Mongo URI Here";


// Get __dirname equivalent for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


cloudinary.config({
    cloud_name: "Your_Cloud_Name",
    api_key: "Your_Api_Key",
    api_secret: "Your_Api_Secret"
});

// Define your categories with their local image paths
// IMPORTANT: Adjust 'imagePath' to correctly point to your local image files
// Example: if uploadCategories.js is in 'server/src' and images are in 'server/images/categories',
// the path from this script's perspective is '../../images/categories/'.
// I've used path.resolve for robustness.

const categoriesToUpload = [
    { name: 'Pizza', slug: 'pizza', description: 'Delicious Italian pizzas.', imagePath: path.resolve(__dirname, '../../images/categories/pizza-categories.webp') },

    { name: 'Burgers', slug: 'burgers', description: 'Gourmet and classic burgers.', imagePath: path.resolve(__dirname, '../../images/categories/burger_categories.jpg') },

    { name: 'Indian', slug: 'indian', description: 'Authentic Indian cuisine.', imagePath: path.resolve(__dirname, '../../images/categories/Indian_categories.webp') },

    { name: 'Italian', slug: 'italian', description: 'Pasta, risotto, and more.', imagePath: path.resolve(__dirname, '../../images/categories/Itilian_categories.jpg') },

    { name: 'Desserts', slug: 'desserts', description: 'Sweet treats and pastries.', imagePath: path.resolve(__dirname, '../../images/categories/desserts_categories.jpg') },

    { name: 'Beverages', slug: 'beverages', description: 'Refreshing drinks and shakes.', imagePath: path.resolve(__dirname, '../../images/categories/beverages_categories.webp') },

    { name: 'Breakfast', slug: 'breakfast', description: 'Start your day right.', imagePath: path.resolve(__dirname, '../../images/categories/breakfast_categories.jpg') },

    { name: 'Healthy', slug: 'healthy', description: 'Nutritious and light meals.', imagePath: path.resolve(__dirname, '../../images/categories/healthy_categories.jpg') },

    { name: 'Fast Food', slug: 'fast-food', description: 'Quick and tasty options.', imagePath: path.resolve(__dirname, '../../images/categories/fastfood_categories.jpg') },

    { name: 'Chinese', slug: 'chinese', description: 'Oriental flavors and noodles.', imagePath: path.resolve(__dirname, '../../images/categories/chinese_categories.jpg') },

    { name: 'Mexican', slug: 'mexican', description: 'Spicy tacos and burritos.', imagePath: path.resolve(__dirname, '../../images/categories/mexican_categories.jpg') },

    { name: 'Vegan', slug: 'vegan', description: 'Plant-based goodness.', imagePath: path.resolve(__dirname, '../../images/categories/vegan_categories.jpg') },

    { name: 'Sushi', slug: 'sushi', description: 'Fresh Japanese sushi rolls.', imagePath: path.resolve(__dirname, '../../images/categories/sushi_categories.jpg') },

    { name: 'Sandwiches', slug: 'sandwiches', description: 'Hearty and delicious sandwiches.', imagePath: path.resolve(__dirname, '../../images/categories/sandwiches_categories.jpg') },

    { name: 'Salads', slug: 'salads', description: 'Crisp and fresh salads.', imagePath: path.resolve(__dirname, '../../images/categories/salad_categories.jpeg') },

    { name: 'Soups', slug: 'soups', description: 'Comforting and warm soups.', imagePath: path.resolve(__dirname, '../../images/categories/soupe_categories.jpg') },

    { name: 'BBQ', slug: 'bbq', description: 'Smoky and savory BBQ dishes.', imagePath: path.resolve(__dirname, '../../images/categories/bbq_categories.jpg') },

    { name: 'Dinner', slug: 'dinner', description: 'Tipical indian dinner.', imagePath: path.resolve(__dirname, '../../images/categories/dinner_categories.avif') },

    { name: 'Lunch', slug: 'lunch', description: 'Indian thali perfect for lunch. ', imagePath: path.resolve(__dirname, '../../images/categories/lunch_categories.jpeg') },


];


(async function () {
    const uploadedCategoriesData = [];
    let displayOrderCounter = 1;

    console.log("Starting Cloudinary image upload for categories...");

    for (const category of categoriesToUpload) {
        try {
            console.log(`Attempting to upload image for: ${category.name} from ${category.imagePath}`);

            const uploadResult = await cloudinary.uploader.upload(
                category.imagePath,
                {
                    folder: 'cravingcart/categories', // Cloudinary folder to store your category images
                    public_id: category.slug, // Use slug as public_id for easy identification
                    overwrite: true, // Overwrite if an image with the same public_id exists
                    // Apply common optimizations for web delivery
                    quality: "auto:low", // Auto quality with a slight bias towards smaller file size
                    fetch_format: "auto", // Automatically convert to optimal format (e.g., webp)
                    width: 400, // Recommend a reasonable width for category icons/previews
                    height: 400, // Recommend a reasonable height
                    crop: "fill", // Crop to fill the dimensions without stretching
                    gravity: "auto" // Auto-detect the most interesting part of the image
                }
            );

            console.log(`  Uploaded ${category.name}. URL: ${uploadResult.secure_url}`);

            uploadedCategoriesData.push({
                name: category.name,
                description: category.description,
                image: uploadResult.secure_url,
                slug: category.slug,
                displayOrder: displayOrderCounter++,
                isVisible: true
            });

        } catch (error) {
            console.error(`  ERROR uploading ${category.name}:`, error.message);
            // Push a placeholder or log a warning if upload fails for a category
            uploadedCategoriesData.push({
                name: category.name,
                description: category.description,
                image: `https://placehold.co/400x400/cccccc/ffffff?text=${encodeURIComponent(category.name)}`, // Placeholder
                slug: category.slug,
                displayOrder: displayOrderCounter++,
                isVisible: false // Mark as not visible if image upload failed
            });
        }
    }

    console.log("\n--- Cloudinary Upload Process Complete ---");
    console.log("Please copy the following JSON array and paste it into your `seedCategories.js` file:\n");
    console.log(JSON.stringify(uploadedCategoriesData, null, 2)); // Pretty print the JSON output
    console.log("\n------------------------------------------------\n");


    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // Remove useCreateIndex and useFindAndModify as they are deprecated in Mongoose 6+
        });
        console.log('MongoDB connected for seeding!');

        for (const categoryData of  uploadedCategoriesData ) {
            // Find one document with the same name. If it exists, update it, otherwise insert a new one.
            // This prevents duplicates if you run the script multiple times.
            await Category.findOneAndUpdate(
                { name: categoryData.name }, // Find by name
                categoryData, // Data to update/insert
                { upsert: true, new: true, setDefaultsOnInsert: true } // Options: insert if not found, return new doc, apply defaults on insert
            );
            console.log(`Category "${categoryData.name}" upserted.`);
        }

        console.log('All categories seeded successfully!');
    } catch (error) {
        console.error('Error seeding categories:', error);
    } finally {
        await mongoose.disconnect();
        console.log('MongoDB disconnected.');
    }



})();
