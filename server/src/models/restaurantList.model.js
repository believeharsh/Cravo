import { Schema, model } from 'mongoose';

const RestaurantListSchema = new Schema(
  {
    // A reference to the user who owns this list
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    // The name given by the user, e.g., "My Favorite Spots"
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // An array of restaurant IDs in this list
    restaurants: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant', // This is the key difference, referencing the Restaurant model
      },
    ],

    // A flag to identify the default "favorites" list
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Add a unique compound index to prevent a user from having
// multiple restaurant lists with the same name.
RestaurantListSchema.index({ owner: 1, name: 1 }, { unique: true });

const RestaurantList = model('RestaurantList', RestaurantListSchema);

export default RestaurantList;
