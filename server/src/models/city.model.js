import { Schema, model } from 'mongoose';

const CitySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true, // Each city name must be unique (e.g., "Indore", "Mumbai")
        trim: true,
        text: true // Enables full-text search on city names if needed later
    },
    // The geographical center of the city (longitude, latitude)
    // This is for finding the "nearest *serviceable city*" to a user's location,
    // distinct from a specific restaurant or user delivery address.
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
            default: 'Point'
        },
        coordinates: { // [longitude, latitude] - MongoDB's standard GeoJSON order
            type: [Number],
            required: true,
        }
    },
    is_serviceable: { // A simple flag: Is this city currently active for deliveries on your platform?
        type: Boolean,
        default: true
    }
}, { timestamps: true }); // Mongoose adds createdAt and updatedAt fields

// Essential for efficient geospatial queries like finding the nearest city
CitySchema.index({ 'location': '2dsphere' });

const City = model('City', CitySchema);

export default City;