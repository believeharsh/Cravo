import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
import path from 'path';
import { fileURLToPath } from 'url';

// Import your Mongoose models
import Category from "../models/category.model.js";
import Restaurant from '../models/restaurant.model.js';
import Product from '../models/product.model.js';

// Get __dirname equivalent for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables (assuming .env is in the parent directory)
// dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Configure Cloudinary
cloudinary.config({
    cloud_name: "Your_Cloud_Name",
    api_key: "Your_Api_Key",
    api_secret: "Your_Api_Secret"
});

const MONGO_URI = "Add Your Mongo URI Here";

const baseLat = 22.7196;
const baseLon = 75.8577;

// --- Initial restaurants Data 
const initialSampleRestaurants = [
    {
        name: 'Maame Da Dhaba',
        description: 'Authentic North Indian cuisine with a modern twist.',
        address: {
            street: '10 AB Road', city: 'Indore', state: 'Madhya Pradesh', zip_code: '452001',
            location: { type: 'Point', coordinates: [baseLon - 0.02, baseLat + 0.01] } // West-North
        },
        contact: { phone: '9876543210', email: 'spiceroute@example.com' },
        cuisine_type: ['Indian', 'North Indian'], rating: 4.5, numberOfReviews: 1500,
        opening_hours: [{ day: 'Monday', open: '11:00', close: '23:00' }], is_active: true, min_order_value: 200, delivery_radius_km: 5,
        localImagePath: path.resolve(__dirname, '../../images/restaurants/Indian_North_Indian.jpg')
    },
    {
        name: 'SK Pizza Wala',
        description: 'Freshly baked Neapolitan pizzas and Italian pasta.',
        address: {
            street: '25 Palasia Road', city: 'Indore', state: 'Madhya Pradesh', zip_code: '452001',
            location: { type: 'Point', coordinates: [baseLon + 0.03, baseLat - 0.01] } // East-South
        },
        contact: { phone: '9988776655', email: 'fresca@example.com' },
        cuisine_type: ['Italian', 'Pizza'], rating: 4.8, numberOfReviews: 2000,
        opening_hours: [{ day: 'Tuesday', open: '12:00', close: '22:00' }], is_active: true, min_order_value: 180, delivery_radius_km: 7,
        localImagePath: path.resolve(__dirname, '../../images/restaurants/Pizza_two.jpg')
    },
    {
        name: 'The Burger Hub',
        description: 'Gourmet burgers and shakes for every craving.',
        address: {
            street: 'Bhawarkua Main Road', city: 'Indore', state: 'Madhya Pradesh', zip_code: '452001',
            location: { type: 'Point', coordinates: [baseLon + 0.01, baseLat - 0.03] } // South-East
        },
        contact: { phone: '9123456789', email: 'burgerhub@example.com' },
        cuisine_type: ['Fast Food', 'Burgers'], rating: 4.2, numberOfReviews: 800,
        opening_hours: [{ day: 'Wednesday', open: '10:00', close: '22:00' }], is_active: true, min_order_value: 150, delivery_radius_km: 6,
        localImagePath: path.resolve(__dirname, '../../images/restaurants/Burger_One.jpg')
    },
    {
        name: 'Chopstix Express',
        description: 'Quick and delicious Chinese stir-fries and noodles.',
        address: {
            street: 'Rajendra Nagar', city: 'Indore', state: 'Madhya Pradesh', zip_code: '452001',
            location: { type: 'Point', coordinates: [baseLon - 0.03, baseLat - 0.01] } // West-South
        },
        contact: { phone: '9765432109', email: 'chopstix@example.com' },
        cuisine_type: ['Chinese', 'Asian'], rating: 4.0, numberOfReviews: 600,
        opening_hours: [{ day: 'Thursday', open: '11:30', close: '22:30' }], is_active: true, min_order_value: 220, delivery_radius_km: 4,
        localImagePath: path.resolve(__dirname, '../../images/restaurants/Noodels.jpg')
    },
    {
        name: 'Sweet Tooth Cafe',
        description: 'Delightful desserts, pastries, and coffee.',
        address: {
            street: 'Vijay Nagar Square', city: 'Indore', state: 'Madhya Pradesh', zip_code: '452001',
            location: { type: 'Point', coordinates: [baseLon + 0.04, baseLat + 0.02] } // Far East-North
        },
        contact: { phone: '9654321098', email: 'sweettooth@example.com' },
        cuisine_type: ['Desserts', 'Cafe'], rating: 4.7, numberOfReviews: 1200,
        opening_hours: [{ day: 'Friday', open: '09:00', close: '21:00' }], is_active: true, min_order_value: 100, delivery_radius_km: 8,
        localImagePath: path.resolve(__dirname, '../../images/restaurants/Chai_one.jpg')
    },
    {
        name: 'Healthy Bites',
        description: 'Fresh salads, healthy wraps, and smoothies.',
        address: {
            street: 'Silicon City', city: 'Indore', state: 'Madhya Pradesh', zip_code: '452001',
            location: { type: 'Point', coordinates: [baseLon - 0.04, baseLat - 0.02] } // Far West-South
        },
        contact: { phone: '9543210987', email: 'healthybites@example.com' },
        cuisine_type: ['Healthy', 'Salads'], rating: 4.4, numberOfReviews: 750,
        opening_hours: [{ day: 'Saturday', open: '09:30', close: '20:30' }], is_active: true, min_order_value: 170, delivery_radius_km: 7,
        localImagePath: path.resolve(__dirname, '../../images/restaurants/Healthy_Salad.jpeg')
    },
    {
        name: 'Grill & Chill',
        description: 'Delicious grilled sandwiches and refreshing beverages.',
        address: {
            street: 'L.I.G. Colony', city: 'Indore', state: 'Madhya Pradesh', zip_code: '452001',
            location: { type: 'Point', coordinates: [baseLon + 0.02, baseLat + 0.03] } // East-North
        },
        contact: { phone: '9432109876', email: 'grillnchill@example.com' },
        cuisine_type: ['Sandwiches', 'Beverages'], rating: 4.1, numberOfReviews: 400,
        opening_hours: [{ day: 'Sunday', open: '10:30', close: '21:30' }], is_active: true, min_order_value: 120, delivery_radius_km: 6,
        localImagePath: path.resolve(__dirname, '../../images/restaurants/Grill_Chicken.jpg')
    },
    {
        name: 'Coffee & Books',
        description: 'Cozy cafe with great coffee and light bites.',
        address: {
            street: 'Sapna Sangeeta Road', city: 'Indore', state: 'Madhya Pradesh', zip_code: '452001',
            location: { type: 'Point', coordinates: [baseLon - 0.01, baseLat + 0.04] } // North-West
        },
        contact: { phone: '9321098765', email: 'coffeeandbooks@example.com' },
        cuisine_type: ['Cafe', 'Breakfast'], rating: 4.6, numberOfReviews: 1000,
        opening_hours: [{ day: 'Monday', open: '08:00', close: '20:00' }], is_active: true, min_order_value: 80, delivery_radius_km: 5,
        localImagePath: path.resolve(__dirname, '../../images/restaurants/Coffee.jpg')
    },
    {
        name: 'Biryani Palace',
        description: 'Exquisite biryanis and kebabs.',
        address: {
            street: 'Geeta Bhawan', city: 'Indore', state: 'Madhya Pradesh', zip_code: '452001',
            location: { type: 'Point', coordinates: [baseLon + 0.005, baseLat + 0.005] } // Near center
        },
        contact: { phone: '9210987654', email: 'biryanipalace@example.com' },
        cuisine_type: ['Indian', 'Biryani'], rating: 4.3, numberOfReviews: 900,
        opening_hours: [{ day: 'Tuesday', open: '12:00', close: '23:00' }], is_active: true, min_order_value: 250, delivery_radius_km: 6,
        localImagePath: path.resolve(__dirname, '../../images/restaurants/Biryani_One.jpg')
    },
    {
        name: 'Dosa Hut',
        description: 'Crispy dosas and South Indian specialties.',
        address: {
            street: 'Scheme No. 54', city: 'Indore', state: 'Madhya Pradesh', zip_code: '452001',
            location: { type: 'Point', coordinates: [baseLon - 0.015, baseLat - 0.015] } // South-West
        },
        contact: { phone: '9109876543', email: 'dosahut@example.com' },
        cuisine_type: ['Indian', 'South Indian'], rating: 4.0, numberOfReviews: 500,
        opening_hours: [{ day: 'Wednesday', open: '09:00', close: '22:00' }], is_active: true, min_order_value: 100, delivery_radius_km: 4,
        localImagePath: path.resolve(__dirname, '../../images/restaurants/Dosa_One.jpg')
    }
];

const initialSampleProducts = [
    {
        name: 'Butter Chicken Deluxe',
        description: 'Rich & creamy Butter Chicken.',
        restaurantName: 'Maame Da Dhaba',
        categorySlug: 'indian',
        ingredients: ['Chicken', 'Cream', 'Tomatoes'],
        calorieInformation: 750,
        availabilityStatus: 'In Stock',
        price: 450.00,
        sku: 'GCDX-BC-001',
        isBestseller: true,
        isTrending: true,
        localImagePath: path.resolve(__dirname, '../../images/products/Butter_chicken.jpg')
    },
    {
        name: 'Chicken Tikka Masala',
        description: 'Classic chicken tikka in a spiced creamy tomato sauce.',
        restaurantName: 'Maame Da Dhaba',
        categorySlug: 'indian',
        ingredients: ['Chicken', 'Tomato', 'Cream'],
        calorieInformation: 700,
        availabilityStatus: 'In Stock',
        price: 380,
        sku: 'SRB-CTM-001',
        isBestseller: true,
        isTrending: true,
        localImagePath: path.resolve(__dirname, '../../images/products/Chiken_Tikka_masala.jpeg')
    },
    {
        name: 'Dal Makhani',
        description: 'Black lentils cooked slowly with butter and cream.',
        restaurantName: 'Maame Da Dhaba',
        categorySlug: 'indian',
        ingredients: ['Lentils', 'Butter', 'Cream'],
        calorieInformation: 550,
        availabilityStatus: 'In Stock',
        price: 250,
        sku: 'SRB-DM-002',
        isBestseller: true,
        isTrending: true,
        localImagePath: path.resolve(__dirname, '../../images/products/Dal_Makhni.jpg')
    },
    {
        name: 'Pepperoni Pizza',
        description: 'Classic pepperoni pizza with gooey cheese.',
        restaurantName: 'SK Pizza Wala',
        categorySlug: 'pizza',
        ingredients: ['Dough', 'Pepperoni', 'Mozzarella'],
        calorieInformation: 900,
        availabilityStatus: 'In Stock',
        price: 250,
        sku: 'PF-PP-001',
        isBestseller: true,
        isTrending: false,
        localImagePath: path.resolve(__dirname, '../../images/products/Pizza_one.jpg')
    },
    {
        name: 'Fettuccine Alfredo',
        description: 'Creamy pasta with parmesan cheese.',
        restaurantName: 'SK Pizza Wala',
        categorySlug: 'italian',
        ingredients: ['Fettuccine', 'Cream', 'Parmesan'],
        calorieInformation: 750,
        availabilityStatus: 'In Stock',
        price: 420,
        sku: 'PF-FA-002',
        isBestseller: false,
        isTrending: false,
        localImagePath: path.resolve(__dirname, '../../images/products/Pasta_one.jpg')
    },
    {
        name: 'Cheesy Classic Burger',
        description: 'A juicy beef patty with melted cheddar.',
        restaurantName: 'The Burger Hub',
        categorySlug: 'burgers',
        ingredients: ['Beef Patty', 'Cheese', 'Lettuce', 'Tomato'],
        calorieInformation: 850,
        availabilityStatus: 'In Stock',
        price: 280,
        sku: 'TBH-CCB-001',
        isBestseller: false,
        isTrending: true,
        localImagePath: path.resolve(__dirname, '../../images/products/Burger_one.jpg')
    },
    {
        name: 'Crispy Chicken Burger',
        description: 'Crispy fried chicken fillet in a bun.',
        restaurantName: 'The Burger Hub',
        categorySlug: 'burgers',
        ingredients: ['Chicken Fillet', 'Bun', 'Mayo'],
        calorieInformation: 700,
        availabilityStatus: 'In Stock',
        price: 260,
        sku: 'TBH-CCB-002',
        isBestseller: false,
        isTrending: false,
        localImagePath: path.resolve(__dirname, '../../images/products/Burger_two.jpg')
    },
    {
        name: 'Veg Hakka Noodles',
        description: 'Stir-fried noodles with mixed vegetables.',
        restaurantName: 'Chopstix Express',
        categorySlug: 'fast-food',
        ingredients: ['Noodles', 'Veggies', 'Soy Sauce'],
        calorieInformation: 450,
        availabilityStatus: 'In Stock',
        price: 200,
        sku: 'CE-VHN-001',
        isBestseller: false,
        isTrending: false,
        localImagePath: path.resolve(__dirname, '../../images/products/Noodels_onw.jpg')
    },
    {
        name: 'Chicken Manchurian',
        description: 'Fried chicken balls in a spicy, tangy gravy.',
        restaurantName: 'Chopstix Express',
        categorySlug: 'fast-food',
        ingredients: ['Chicken', 'Ginger', 'Garlic', 'Soy Sauce'],
        calorieInformation: 600,
        availabilityStatus: 'In Stock',
        price: 320,
        sku: 'CE-CM-002',
        isBestseller: false,
        isTrending: false,
        localImagePath: path.resolve(__dirname, '../../images/products/Manchurian_onw.jpg')
    },
    {
        name: 'Chocolate Lava Cake',
        description: 'Warm chocolate cake with a molten center.',
        restaurantName: 'Sweet Tooth Cafe',
        categorySlug: 'desserts',
        ingredients: ['Chocolate', 'Flour', 'Butter'],
        calorieInformation: 500,
        availabilityStatus: 'In Stock',
        price: 180,
        sku: 'STC-CLC-001',
        isBestseller: true,
        isTrending: false,
        localImagePath: path.resolve(__dirname, '../../images/products/Cake_one.jpg')
    },
    {
        name: 'Cappuccino',
        description: 'Espresso with steamed milk and foam.',
        restaurantName: 'Sweet Tooth Cafe',
        categorySlug: 'beverages',
        ingredients: ['Coffee', 'Milk'],
        calorieInformation: 150,
        availabilityStatus: 'In Stock',
        price: 120,
        sku: 'STC-CAP-002',
        isBestseller: false,
        isTrending: false,
        localImagePath: path.resolve(__dirname, '../../images/products/cappuccino_one.jpg')
    },
    {
        name: 'Quinoa Salad',
        description: 'Fresh quinoa salad with roasted vegetables.',
        restaurantName: 'Healthy Bites',
        categorySlug: 'healthy',
        ingredients: ['Quinoa', 'Veggies', 'Vinaigrette'],
        calorieInformation: 350,
        availabilityStatus: 'In Stock',
        price: 280,
        sku: 'HB-QS-001',
        isBestseller: true,
        isTrending: false,
        localImagePath: path.resolve(__dirname, '../../images/products/Salad_one.jpg')
    },
    {
        name: 'Green Smoothie',
        description: 'Spinach, banana, and apple blended for energy.',
        restaurantName: 'Healthy Bites',
        categorySlug: 'beverages',
        ingredients: ['Spinach', 'Banana', 'Apple'],
        calorieInformation: 200,
        availabilityStatus: 'In Stock',
        price: 150,
        sku: 'HB-GS-002',
        isBestseller: false,
        isTrending: false,
        localImagePath: path.resolve(__dirname, '../../images/products/Smmothie_one.jpg')
    },
    {
        name: 'Club Sandwich',
        description: 'Triple-decker sandwich with chicken, egg, and veggies.',
        restaurantName: 'Grill & Chill',
        categorySlug: 'sandwiches',
        ingredients: ['Bread', 'Chicken', 'Egg', 'Veggies'],
        calorieInformation: 500,
        availabilityStatus: 'In Stock',
        price: 220,
        sku: 'GC-CS-001',
        isBestseller: false,
        isTrending: true,
        localImagePath: path.resolve(__dirname, '../../images/products/Sandwhich_two.jpg')
    },
    {
        name: 'Fresh Lime Soda',
        description: 'Refreshing lime soda.',
        restaurantName: 'Grill & Chill',
        categorySlug: 'beverages',
        ingredients: ['Lime', 'Soda', 'Sugar'],
        calorieInformation: 120,
        availabilityStatus: 'In Stock',
        price: 80,
        sku: 'GC-FLS-002',
        isBestseller: false,
        isTrending: false,
        localImagePath: path.resolve(__dirname, '../../images/products/Soda_two.jpg')
    },
    {
        name: 'Breakfast Burrito',
        description: 'Scrambled eggs, cheese, and veggies in a tortilla.',
        restaurantName: 'Coffee & Books',
        categorySlug: 'breakfast',
        ingredients: ['Eggs', 'Cheese', 'Veggies', 'Tortilla'],
        calorieInformation: 450,
        availabilityStatus: 'In Stock',
        price: 180,
        sku: 'CB-BB-001',
        isBestseller: true,
        isTrending: false,
        localImagePath: path.resolve(__dirname, '../../images/products/Burreto_one.jpg')
    },
    {
        name: 'Latte',
        description: 'Espresso with steamed milk.',
        restaurantName: 'Coffee & Books',
        categorySlug: 'beverages',
        ingredients: ['Coffee', 'Milk'],
        calorieInformation: 180,
        availabilityStatus: 'In Stock',
        price: 130,
        sku: 'CB-L-002',
        isBestseller: false,
        isTrending: false,
        localImagePath: path.resolve(__dirname, '../../images/products/cappuccino_one.jpg')
    },
    {
        name: 'Chicken Biryani',
        description: 'Classic Hyderabadi chicken biryani.',
        restaurantName: 'Biryani Palace',
        categorySlug: 'indian',
        ingredients: ['Chicken', 'Basmati Rice', 'Spices'],
        calorieInformation: 800,
        availabilityStatus: 'In Stock',
        price: 400,
        sku: 'BP-CB-001',
        isBestseller: true,
        isTrending: true,
        localImagePath: path.resolve(__dirname, '../../images/products/Biryani_two.jpg')
    },
    {
        name: 'Mutton Biryani',
        description: 'Rich and aromatic mutton biryani.',
        restaurantName: 'Biryani Palace',
        categorySlug: 'indian',
        ingredients: ['Mutton', 'Basmati Rice', 'Spices'],
        calorieInformation: 900,
        availabilityStatus: 'In Stock',
        price: 500,
        sku: 'BP-MB-002',
        isBestseller: false,
        isTrending: false,
        localImagePath: path.resolve(__dirname, '../../images/products/Biryani_one.jpeg')
    },
    {
        name: 'Masala Dosa',
        description: 'Crispy crepe filled with spiced potato masala.',
        restaurantName: 'Dosa Hut',
        categorySlug: 'indian',
        ingredients: ['Rice', 'Lentils', 'Potatoes'],
        calorieInformation: 350,
        availabilityStatus: 'In Stock',
        price: 120,
        sku: 'DH-MD-001',
        isBestseller: true,
        isTrending: false,
        localImagePath: path.resolve(__dirname, '../../images/products/Dosa_one.jpg')
    },
    {
        name: 'Plain Dosa',
        description: 'Thin and crispy plain rice crepe.',
        restaurantName: 'Dosa Hut',
        categorySlug: 'indian',
        ingredients: ['Rice', 'Lentils'],
        calorieInformation: 280,
        availabilityStatus: 'In Stock',
        price: 90,
        sku: 'DH-PD-002',
        isBestseller: false,
        isTrending: false,
        localImagePath: path.resolve(__dirname, '../../images/products/Dosa.jpg')
    }
];

// --- Utility function for Cloudinary Upload ---
const uploadImageToCloudinary = async (localImagePath, publicIdPrefix, assetName) => {
    try {
        console.log(`Uploading ${assetName} from ${localImagePath}...`);
        const result = await cloudinary.uploader.upload(localImagePath, {
            folder: `cravingcart/${publicIdPrefix}`, // e.g., 'cravingcart/restaurants' or 'cravingcart/products'
            public_id: assetName.toLowerCase().replace(/\s/g, '_'), // Generate slug-like public_id
            overwrite: true,
            quality: "auto:low",
            fetch_format: "auto",
            width: 800, // Reasonable width for restaurants
            height: 600, // Reasonable height for restaurants
            crop: "fill",
            gravity: "auto"
        });
        console.log(`Successfully uploaded ${assetName}. URL: ${result.secure_url}`);
        return result.secure_url;
    } catch (error) {
        console.error(`Failed to upload ${assetName}:`, error.message);
        return `https://placehold.co/${publicIdPrefix === 'restaurants' ? '800x600' : '400x400'}/cccccc/ffffff?text=${encodeURIComponent(assetName + ' Failed')}`;
    }
};

// --- Main Seeding Function ---
const seedAllData = async () => {
    try {
        await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB connected for seeding!');

        // --- 1. Clear existing data ---
        console.log('Clearing old Restaurant and Product data...');
        await Restaurant.deleteMany({});
        await Product.deleteMany({});
        console.log('Old data cleared.');

        // --- 2. Fetch Category IDs (needed for products) ---
        console.log('Fetching category IDs...');
        const categories = await Category.find({ isVisible: true }).lean();
        if (categories.length === 0) {
            console.error('No visible categories found. Please run the category seeding script first!');
            await mongoose.disconnect();
            return;
        }
        const categoryMap = new Map(categories.map(cat => [cat.slug, cat._id]));
        console.log(`Fetched ${categories.length} categories.`);

        // --- Step 1 (User's Step): Upload Restaurant Images & Prepare Data ---
        console.log('\n--- Uploading Restaurant Images to Cloudinary ---');
        const restaurantsWithCloudinaryUrls = [];
        for (const restaurant of initialSampleRestaurants) {
            const imageUrl = await uploadImageToCloudinary(restaurant.localImagePath, 'restaurants', restaurant.name);
            restaurantsWithCloudinaryUrls.push({
                ...restaurant,
                images: [imageUrl], // Replace localPath with Cloudinary URL
                localImagePath: undefined // Remove local path property
            });
        }
        console.log('Restaurant images processed.');

        // --- Step 2 (User's Step): Insert Restaurants into MongoDB ---
        console.log('\n--- Inserting Restaurants into MongoDB ---');
        const insertedRestaurants = await Restaurant.insertMany(restaurantsWithCloudinaryUrls);
        console.log(`Seeded ${insertedRestaurants.length} restaurants.`);

        // Create a map from restaurant name to its MongoDB _id for product linking
        const restaurantIdMap = new Map(insertedRestaurants.map(rest => [rest.name, rest._id]));

        // --- Step 3 (User's Step): Upload Product Images & Prepare Data ---
        console.log('\n--- Uploading Product Images to Cloudinary ---');
        const productsWithCloudinaryUrls = [];
        for (const product of initialSampleProducts) {
            const imageUrl = await uploadImageToCloudinary(product.localImagePath, 'products', product.name);
            productsWithCloudinaryUrls.push({
                ...product,
                images: [imageUrl], // Replace localPath with Cloudinary URL
                restaurant: restaurantIdMap.get(product.restaurantName), // Link product to restaurant _id
                category: categoryMap.get(product.categorySlug),     // Link product to category _id
                localImagePath: undefined, // Remove temporary local path
                restaurantName: undefined,   // Remove temporary name link
                categorySlug: undefined      // Remove temporary slug link
            });
        }
        console.log('Product images processed.');

        // --- Step 4 (User's Step): Insert Products into MongoDB ---
        console.log('\n--- Inserting Products into MongoDB ---');
        const insertedProducts = await Product.insertMany(productsWithCloudinaryUrls);
        console.log(`Seeded ${insertedProducts.length} products.`);

        console.log('\n--- All Data (Restaurants & Products) Seeded Successfully! ---');

    } catch (error) {
        console.error('Error during full seeding process:', error);
    } finally {
        if (mongoose.connection.readyState === 1) {
            await mongoose.disconnect();
            console.log('MongoDB disconnected.');
        }
    }
};

seedAllData();
