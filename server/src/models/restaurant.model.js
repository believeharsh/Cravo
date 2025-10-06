import { Schema, model } from 'mongoose';

const RestaurantSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    address: {
      street: { type: String, required: true, trim: true },
      city: {
        type: Schema.Types.ObjectId,
        ref: 'City',
        required: true,
      },
      state: { type: String, required: true, trim: true },
      zip_code: { type: String, required: true, trim: true },
      // GeoJSON Point for geospatial queries (longitude, latitude)
      location: {
        type: {
          type: String,
          enum: ['Point'],
          required: true,
        },
        coordinates: {
          type: [Number],
          required: true,
        },
      },
    },
    contact: {
      phone: { type: String, trim: true },
      email: { type: String, trim: true, lowercase: true },
    },
    cuisine_type: [
      {
        type: String,
        trim: true,
      },
    ],
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    numberOfReviews: {
      type: Number,
      min: 0,
      default: 0,
    },
    cost_for_two: {
      type: Number,
      min: 0,
      default: 0,
    },

    delivery_time_mins: {
      type: Number,
      min: 0,
      default: 0,
    },
    is_10_min_delivery: {
      type: Boolean,
      default: false,
    },
    is_veg: {
      type: Boolean,
      default: false,
    },
    opening_hours: [
      {
        day: {
          type: String,
          enum: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
          ],
          required: true,
        },
        open: {
          type: String,
          required: true,
          match: /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
        },
        close: {
          type: String,
          required: true,
          match: /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
        },
        is_closed: {
          type: Boolean,
          default: false,
        },
      },
    ],
    is_active: {
      type: Boolean,
      default: true,
    },
    min_order_value: {
      type: Number,
      min: 0,
      default: 0,
    },
    delivery_radius_km: {
      type: Number,
      min: 0,
    },
    images: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

// INDEXES FOR EFFICIENT FILTERING AND SORTING

// 1. Primary Compound Index for filtering by city/cuisine and sorting by rating/cost
// This index follows the ESR (Equality, Sort, Range) rule.
RestaurantSchema.index({
  'address.city': 1,
  cuisine_type: 1,
  is_veg: 1,
  rating: -1, // -1 for descending sort (highest rating first)
  cost_for_two: 1,
});

// 2. Compound Index for sorting by delivery time
RestaurantSchema.index({
  'address.city': 1,
  cuisine_type: 1,
  is_veg: 1,
  delivery_time_mins: 1, // 1 for ascending sort (fastest delivery first)
});

// 3. Geospatial Index for 'restaurants near me'
RestaurantSchema.index({ 'address.location': '2dsphere' });

// 4. Text Index for general keyword search on name and description
RestaurantSchema.index({
  name: 'text',
  description: 'text',
  cuisine_type: 'text',
});

const Restaurant = model('Restaurant', RestaurantSchema);
export default Restaurant;
