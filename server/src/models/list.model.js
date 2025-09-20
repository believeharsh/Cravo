import { Schema, model } from 'mongoose';

const ListSchema = new Schema(
  {
    // A reference to the user who owns this list
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true, // Index for fast lookups by user
    },
    list_type: {
      type: String,
      default: 'productList',
      immutable: true, // Prevents it from being changed later
    },
    // The name given by the user, e.g., "Lunch Items"
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // An array of product IDs in this list
    items: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],

    // A flag to identify the default, un-named "favorites" list
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt
);

// Optional: Add a unique compound index to prevent a user from having
// multiple lists with the same name. You can remove this if you want to allow it.
ListSchema.index({ owner: 1, name: 1 }, { unique: true });

const List = model('List', ListSchema);

export default List;
