import {Schema, model} from "mongoose" ; 

const AddressSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // The user this address belongs to
    
    addressLine1: { type: String, required: true },
    addressLine2: { type: String }, // Apt, suite, etc.
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true },
    
    addressType: { type: String, enum: ['Home', 'Work', 'Other'], default: 'Home' },
    isDefault: { type: Boolean, default: false }, // For a user's default shipping address
    
    // Optional: Latitude and Longitude for delivery calculations
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            index: '2dsphere' // GeoJSON index for spatial queries
        }
    }

}, { timestamps: true });

const Address = model("Address", AddressSchema) ; 

export default Address ; 

