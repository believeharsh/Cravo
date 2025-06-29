import { Schema, model } from 'mongoose';

const RestaurantSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true // Remove whitespace from both ends of a string
    },
    description: {
        type: String,
        trim: true
    },
    address: {
        street: { type: String, required: true, trim: true },
        city: { type: String, required: true, trim: true },
        state: { type: String, required: true, trim: true },
        zip_code: { type: String, required: true, trim: true },
        // GeoJSON Point for geospatial queries (longitude, latitude)
        // This is crucial for "restaurants near me" functionality
        location: {
            type: {
                type: String, // Don't do `{ location: { type: String } }`
                enum: ['Point'], // 'location.type' must be 'Point'
                required: true
            },
            coordinates: {
                type: [Number], // Array of [longitude, latitude]
                required: true,
                // index: '2dsphere' // Create a geospatial index
            }
        }
    },
    contact: {
        phone: { type: String, trim: true },
        email: { type: String, trim: true, lowercase: true }
    },
    cuisine_type: [{ // An array to hold multiple cuisine types
        type: String,
        trim: true
    }],
    rating: { // Aggregated average rating
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    numberOfReviews: { // Count of reviews
        type: Number,
        min: 0,
        default: 0
    },
    opening_hours: [{ // Array of embedded documents for daily opening hours
        day: {
            type: String,
            enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            required: true
        },
        open: { // Time in HH:MM format
            type: String,
            required: true,
            match: /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/ // Regex for HH:MM format
        },
        close: { // Time in HH:MM format
            type: String,
            required: true,
            match: /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/
        },
        is_closed: { // Flag for days the restaurant is completely closed
            type: Boolean,
            default: false
        }
    }],
    is_active: { // Whether the restaurant is currently operational on the platform
        type: Boolean,
        default: true
    },
    min_order_value: {
        type: Number,
        min: 0,
        default: 0
    },
    delivery_radius_km: { // Maximum delivery distance from the restaurant
        type: Number,
        min: 0
    },
    // Optional: Add an array for restaurant-specific images (e.g., facade, interior)
    images: [{
        type: String // URLs to restaurant images
    }],
    // Add any other restaurant-specific flags/data here
    // e.g., 'has_delivery', 'has_pickup', 'pre_order_enabled'

}, { timestamps: true }); // Mongoose adds createdAt and updatedAt fields automatically

// Create text index for searchability by name, description, and cuisine type
RestaurantSchema.index({ 'address.location': '2dsphere' });
RestaurantSchema.index({
    name: 'text',
    description: 'text',
    cuisine_type: 'text'
});

const Restaurant = model('Restaurant', RestaurantSchema);

export default Restaurant;