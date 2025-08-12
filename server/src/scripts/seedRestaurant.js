import mongoose from 'mongoose';
import Category from '../models/category.model.js';
import Restaurant from '../models/restaurant.model.js';
import Product from '../models/product.model.js';

import path from 'path';
import { fileURLToPath } from 'url';

const MONGODB_URI = "Add Your Mongo URI Here"

cloudinary.config({
    cloud_name: "Your_Cloud_Name",
    api_key: "Your_Api_Key",
    api_secret: "Your_Api_Secret"
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const sampleRestaurants = [
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
        imagePath: path.resolve(__dirname, '../../images/restaurants/Indian_North_Indian.jpg')
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
        imagePath: path.resolve(__dirname, '../../images/restaurants/Pizza_two.jpg')
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
        imagePath: path.resolve(__dirname, '../../images/restaurants/Burger_One.jpg')
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
        imagePath: path.resolve(__dirname, '../../images/restaurants/Noodels.jpg')
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
        imagePath: path.resolve(__dirname, '../../images/restaurants/Chai_one.jpg')
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
        imagePath: path.resolve(__dirname, '../../images/restaurants/Healthy_Salad.jpeg')
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
        imagePath: path.resolve(__dirname, '../../images/restaurants/Grill-Chicken.jpg')
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
        imagePath: path.resolve(__dirname, '../../images/restaurants/Coffee.jpg')
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
        imagePath: path.resolve(__dirname, '../../images/restaurants/Biryani_One.jpg')
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
        imagePath: path.resolve(__dirname, '../../images/restaurants/Dosa_One.jpg')
    }
];

(async function () {
    const uploadedCategoriesData = [];
    let displayOrderCounter = 1;

    console.log("Starting Cloudinary image upload for categories...");

    for (const restaurant of sampleRestaurants) {
        try {
            console.log(`Attempting to upload image for: ${restaurant.name} from ${restaurant.imagePath}`);

            const uploadResult = await cloudinary.uploader.upload(
                restaurant.imagePath,
                {
                    folder: 'cravingcart/restaurant', // Cloudinary folder to store your category images
                    public_id: restaurnat.name, // Use slug as public_id for easy identification
                    overwrite: true, // Overwrite if an image with the same public_id exists
                    // Apply common optimizations for web delivery
                    quality: "auto:low", // Auto quality with a slight bias towards smaller file size
                    fetch_format: "auto", // Automatically convert to optimal format (e.g., webp)
                    width: 500, // reasonable width for category icons/previews
                    height: 500, // a reasonable height
                    crop: "fill", // Crop to fill the dimensions without stretching
                    gravity: "auto" // Auto-detect the most interesting part of the image
                }
            );

            console.log(`  Uploaded ${restaurant.name}. URL: ${uploadResult.secure_url}`);

            uploadedCategoriesData.push({

                name: restaurant.name,
                description: restaurant.description,
                address: restaurant.address,
                contact: restaurant.contact,
                cuisine_type: restaurant.cuisine_type,
                opening_hours: restaurant.opening_hours,
                imagePath: uploadResult.secure_url,

            });

        } catch (error) {
            console.error(`  ERROR uploading ${restaurant.name}:`, error.message);
            // Push a placeholder or log a warning if upload fails for a category
            uploadedCategoriesData.push({
                name: restaurant.name,
                description: restaurant.description,
                address: restaurant.address,
                contact: restaurant.contact,
                cuisine_type: restaurant.cuisine_type,
                opening_hours: restaurant.opening_hours,
                imagePath: `https://placehold.co/400x400/cccccc/ffffff?text=${encodeURIComponent(restaurant.name)}`,

            });
        }
    }

    console.log("\n--- Cloudinary Upload Process Complete ---");
    console.log("Please copy the following JSON array and paste it into your `seedCategories.js` file:\n");
    console.log(JSON.stringify(uploadedCategoriesData, null, 2)); // Pretty print the JSON output
    console.log("\n------------------------------------------------\n");

    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected for seeding!');

        // --- 1. Clear existing data (optional, but good for fresh seeds) ---
        console.log('Clearing old Restaurant and Product data...');
        await Restaurant.deleteMany({});
        await Product.deleteMany({}); // Clear products too if you're re-running
        console.log('Old data cleared.');

        // --- 2. Fetch Category IDs ---
        console.log('Fetching category IDs...');
        const categories = await Category.find({ isVisible: true }).lean();
        if (categories.length === 0) {
            console.error('No visible categories found. Please run the category seeding script first!');
            // Exit if no categories, as products/restaurants might depend on them
            await mongoose.disconnect();
            return;
        }
        const categoryMap = new Map(categories.map(cat => [cat.slug, cat._id]));
        console.log(`Fetched ${categories.length} categories.`);

        // --- 3. Define Sample Restaurants (10 in Indore, different locations) ---
        // Base coordinates for Indore (approximate center)
        const baseLat = 22.7196;
        const baseLon = 75.8577;



        const insertedRestaurants = await Restaurant.insertMany(sampleRestaurants);
        console.log(`Seeded ${insertedRestaurants.length} restaurants.`);

        // --- 4. Define Sample Products (linking to these new restaurants and categories) ---
        // This part needs to be filled with products for each of the 10 restaurants.
        // For now, I'll add a few generic ones and link them.
        const sampleProducts = [];

        // Example: Products for Spice Route Bistro
        sampleProducts.push({
            name: 'Chicken Tikka Masala', description: 'Classic chicken tikka in a spiced creamy tomato sauce.',
            images: ['https://placehold.co/400x400/FFA07A/000000?text=Chicken+Tikka'],
            price: 380,
            restaurant: insertedRestaurants.find(r => r.name === 'Spice Route Bistro')._id,
            category: categoryMap.get('indian'),
            ingredients: ['Chicken', 'Tomato', 'Cream'],
            calorieInformation: 700,
            availabilityStatus: 'In Stock',
            sku: 'SRB-CTM-001',
            isBestseller: true
        });
        sampleProducts.push({
            name: 'Dal Makhani', description: 'Black lentils cooked slowly with butter and cream.',
            images: ['https://placehold.co/400x400/808000/FFFFFF?text=Dal+Makhani'], price: 250,
            restaurant: insertedRestaurants.find(r => r.name === 'Spice Route Bistro')._id,
            category: categoryMap.get('indian'), ingredients: ['Lentils', 'Butter', 'Cream'],
            calorieInformation: 550, availabilityStatus: 'In Stock', sku: 'SRB-DM-002'
        });
        sampleProducts.push({
            name: 'Veg Biryani', description: 'Fragrant basmati rice cooked with mixed vegetables and spices.',
            images: ['https://placehold.co/400x400/BDB76B/000000?text=Veg+Biryani'], price: 300,
            restaurant: insertedRestaurants.find(r => r.name === 'Spice Route Bistro')._id,
            category: categoryMap.get('indian'), ingredients: ['Rice', 'Vegetables', 'Spices'],
            calorieInformation: 600, availabilityStatus: 'In Stock', sku: 'SRB-VB-003'
        });


        // Example: Products for Pizzeria Fresca
        sampleProducts.push({
            name: 'Pepperoni Pizza', description: 'Classic pepperoni pizza with gooey cheese.',
            images: ['https://placehold.co/400x400/FFDDC1/000000?text=Pepperoni+Pizza'], price: 500,
            restaurant: insertedRestaurants.find(r => r.name === 'Pizzeria Fresca')._id,
            category: categoryMap.get('pizza'), ingredients: ['Dough', 'Pepperoni', 'Mozzarella'],
            calorieInformation: 900, availabilityStatus: 'In Stock', sku: 'PF-PP-001', isBestseller: true
        });
        sampleProducts.push({
            name: 'Fettuccine Alfredo', description: 'Creamy pasta with parmesan cheese.',
            images: ['https://placehold.co/400x400/F0E68C/000000?text=Fettuccine+Alfredo'], price: 420,
            restaurant: insertedRestaurants.find(r => r.name === 'Pizzeria Fresca')._id,
            category: categoryMap.get('italian'), ingredients: ['Fettuccine', 'Cream', 'Parmesan'],
            calorieInformation: 750, availabilityStatus: 'In Stock', sku: 'PF-FA-002'
        });

        // Example: Products for The Burger Hub
        sampleProducts.push({
            name: 'Cheesy Classic Burger', description: 'A juicy beef patty with melted cheddar.',
            images: ['https://placehold.co/400x400/A0522D/FFFFFF?text=Cheesy+Burger'], price: 280,
            restaurant: insertedRestaurants.find(r => r.name === 'The Burger Hub')._id,
            category: categoryMap.get('burgers'), ingredients: ['Beef Patty', 'Cheese', 'Lettuce', 'Tomato'],
            calorieInformation: 850, availabilityStatus: 'In Stock', sku: 'TBH-CCB-001', isTrending: true
        });
        sampleProducts.push({
            name: 'Crispy Chicken Burger', description: 'Crispy fried chicken fillet in a bun.',
            images: ['https://placehold.co/400x400/DAA520/000000?text=Chicken+Burger'], price: 260,
            restaurant: insertedRestaurants.find(r => r.name === 'The Burger Hub')._id,
            category: categoryMap.get('burgers'), ingredients: ['Chicken Fillet', 'Bun', 'Mayo'],
            calorieInformation: 700, availabilityStatus: 'In Stock', sku: 'TBH-CCB-002'
        });


        // Example: Products for Chopstix Express
        sampleProducts.push({
            name: 'Veg Hakka Noodles', description: 'Stir-fried noodles with mixed vegetables.',
            images: ['https://placehold.co/400x400/87CEEB/000000?text=Hakka+Noodles'], price: 200,
            restaurant: insertedRestaurants.find(r => r.name === 'Chopstix Express')._id,
            category: categoryMap.get('chinese'), ingredients: ['Noodles', 'Veggies', 'Soy Sauce'],
            calorieInformation: 450, availabilityStatus: 'In Stock', sku: 'CE-VHN-001'
        });
        sampleProducts.push({
            name: 'Chicken Manchurian', description: 'Fried chicken balls in a spicy, tangy gravy.',
            images: ['https://placehold.co/400x400/FFDEAD/000000?text=Manchurian'], price: 320,
            restaurant: insertedRestaurants.find(r => r.name === 'Chopstix Express')._id,
            category: categoryMap.get('chinese'), ingredients: ['Chicken', 'Ginger', 'Garlic', 'Soy Sauce'],
            calorieInformation: 600, availabilityStatus: 'In Stock', sku: 'CE-CM-002'
        });

        // Example: Products for Sweet Tooth Cafe
        sampleProducts.push({
            name: 'Chocolate Lava Cake', description: 'Warm chocolate cake with a molten center.',
            images: ['https://placehold.co/400x400/D2691E/FFFFFF?text=Lava+Cake'], price: 180,
            restaurant: insertedRestaurants.find(r => r.name === 'Sweet Tooth Cafe')._id,
            category: categoryMap.get('desserts'), ingredients: ['Chocolate', 'Flour', 'Butter'],
            calorieInformation: 500, availabilityStatus: 'In Stock', sku: 'STC-CLC-001', isBestseller: true
        });
        sampleProducts.push({
            name: 'Cappuccino', description: 'Espresso with steamed milk and foam.',
            images: ['https://placehold.co/400x400/BC8F8F/FFFFFF?text=Cappuccino'], price: 120,
            restaurant: insertedRestaurants.find(r => r.name === 'Sweet Tooth Cafe')._id,
            category: categoryMap.get('beverages'), ingredients: ['Coffee', 'Milk'],
            calorieInformation: 150, availabilityStatus: 'In Stock', sku: 'STC-CAP-002'
        });

        // Example: Products for Healthy Bites
        sampleProducts.push({
            name: 'Quinoa Salad', description: 'Fresh quinoa salad with roasted vegetables.',
            images: ['https://placehold.co/400x400/228B22/FFFFFF?text=Quinoa+Salad'], price: 280,
            restaurant: insertedRestaurants.find(r => r.name === 'Healthy Bites')._id,
            category: categoryMap.get('healthy'), ingredients: ['Quinoa', 'Veggies', 'Vinaigrette'],
            calorieInformation: 350, availabilityStatus: 'In Stock', sku: 'HB-QS-001', isBestseller: true
        });
        sampleProducts.push({
            name: 'Green Smoothie', description: 'Spinach, banana, and apple blended for energy.',
            images: ['https://placehold.co/400x400/9ACD32/000000?text=Green+Smoothie'], price: 150,
            restaurant: insertedRestaurants.find(r => r.name === 'Healthy Bites')._id,
            category: categoryMap.get('beverages'), ingredients: ['Spinach', 'Banana', 'Apple'],
            calorieInformation: 200, availabilityStatus: 'In Stock', sku: 'HB-GS-002'
        });

        // Example: Products for Grill & Chill
        sampleProducts.push({
            name: 'Club Sandwich', description: 'Triple-decker sandwich with chicken, egg, and veggies.',
            images: ['https://placehold.co/400x400/F4A460/000000?text=Club+Sandwich'], price: 220,
            restaurant: insertedRestaurants.find(r => r.name === 'Grill & Chill')._id,
            category: categoryMap.get('sandwiches'), ingredients: ['Bread', 'Chicken', 'Egg', 'Veggies'],
            calorieInformation: 500, availabilityStatus: 'In Stock', sku: 'GC-CS-001', isTrending: true
        });
        sampleProducts.push({
            name: 'Fresh Lime Soda', description: 'Refreshing lime soda.',
            images: ['https://placehold.co/400x400/E0FFFF/000000?text=Lime+Soda'], price: 80,
            restaurant: insertedRestaurants.find(r => r.name === 'Grill & Chill')._id,
            category: categoryMap.get('beverages'), ingredients: ['Lime', 'Soda', 'Sugar'],
            calorieInformation: 120, availabilityStatus: 'In Stock', sku: 'GC-FLS-002'
        });

        // Example: Products for Coffee & Books
        sampleProducts.push({
            name: 'Breakfast Burrito', description: 'Scrambled eggs, cheese, and veggies in a tortilla.',
            images: ['https://placehold.co/400x400/D2B48C/000000?text=Breakfast+Burrito'], price: 180,
            restaurant: insertedRestaurants.find(r => r.name === 'Coffee & Books')._id,
            category: categoryMap.get('breakfast'), ingredients: ['Eggs', 'Cheese', 'Veggies', 'Tortilla'],
            calorieInformation: 450, availabilityStatus: 'In Stock', sku: 'CB-BB-001', isBestseller: true
        });
        sampleProducts.push({
            name: 'Latte', description: 'Espresso with steamed milk.',
            images: ['https://placehold.co/400x400/A9A9A9/000000?text=Latte'], price: 130,
            restaurant: insertedRestaurants.find(r => r.name === 'Coffee & Books')._id,
            category: categoryMap.get('beverages'), ingredients: ['Coffee', 'Milk'],
            calorieInformation: 180, availabilityStatus: 'In Stock', sku: 'CB-L-002'
        });

        // Example: Products for Biryani Palace
        sampleProducts.push({
            name: 'Chicken Biryani', description: 'Classic Hyderabadi chicken biryani.',
            images: ['https://placehold.co/400x400/9ACD32/000000?text=Chicken+Biryani'], price: 400,
            restaurant: insertedRestaurants.find(r => r.name === 'Biryani Palace')._id,
            category: categoryMap.get('indian'), ingredients: ['Chicken', 'Basmati Rice', 'Spices'],
            calorieInformation: 800, availabilityStatus: 'In Stock', sku: 'BP-CB-001', isBestseller: true, isTrending: true
        });
        sampleProducts.push({
            name: 'Mutton Biryani', description: 'Rich and aromatic mutton biryani.',
            images: ['https://placehold.co/400x400/B22222/FFFFFF?text=Mutton+Biryani'], price: 500,
            restaurant: insertedRestaurants.find(r => r.name === 'Biryani Palace')._id,
            category: categoryMap.get('indian'), ingredients: ['Mutton', 'Basmati Rice', 'Spices'],
            calorieInformation: 900, availabilityStatus: 'In Stock', sku: 'BP-MB-002'
        });

        // Example: Products for Dosa Hut
        sampleProducts.push({
            name: 'Masala Dosa', description: 'Crispy crepe filled with spiced potato masala.',
            images: ['https://placehold.co/400x400/FF4500/FFFFFF?text=Masala+Dosa'], price: 120,
            restaurant: insertedRestaurants.find(r => r.name === 'Dosa Hut')._id,
            category: categoryMap.get('indian'), ingredients: ['Rice', 'Lentils', 'Potatoes'],
            calorieInformation: 350, availabilityStatus: 'In Stock', sku: 'DH-MD-001', isBestseller: true
        });
        sampleProducts.push({
            name: 'Plain Dosa', description: 'Thin and crispy plain rice crepe.',
            images: ['https://placehold.co/400x400/ADD8E6/000000?text=Plain+Dosa'], price: 90,
            restaurant: insertedRestaurants.find(r => r.name === 'Dosa Hut')._id,
            category: categoryMap.get('indian'), ingredients: ['Rice', 'Lentils'],
            calorieInformation: 280, availabilityStatus: 'In Stock', sku: 'DH-PD-002'
        });


        const insertedProducts = await Product.insertMany(sampleProducts);
        console.log(`Seeded ${insertedProducts.length} products.`);

        console.log('\n--- All Data Seeded Successfully! ---');

    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        if (mongoose.connection.readyState === 1) {
            await mongoose.disconnect();
            console.log('MongoDB disconnected.');
        }
    }
})(); 
