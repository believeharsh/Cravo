import { Schema, model } from 'mongoose';

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    images: [{ type: String }], // URLs to high-quality images
    price: { type: Number, required: true, min: 0 },

    restaurant: {
      type: Schema.Types.ObjectId,
      ref: 'Restaurant', // This should match the name of your Restaurant model
      required: true, // A product must belong to a restaurant
    },

    // Categorization
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    ingredients: [{ type: String }],
    calorieInformation: { type: Number }, // In Kcal

    // Customization Options
    customizationOptions: [
      {
        name: { type: String, required: false }, // e.g., 'Toppings', 'Spice Level', 'Add-ons'
        type: {
          type: String,
          enum: ['single-select', 'multi-select', 'text'],
          required: false,
        },
        options: [
          {
            // For single-select/multi-select
            itemName: { type: String, required: false },
            priceImpact: { type: Number, default: 0 }, // Additional cost for this option
          },
        ],
        isRequired: { type: Boolean, default: false }, // Is this customization mandatory?
      },
    ],

    // Inventory & Availability
    availabilityStatus: {
      type: String,
      enum: ['In Stock', 'Out of Stock', 'Pre-order'],
      default: 'In Stock',
    },
    sku: { type: String, unique: true, required: true }, // Stock Keeping Unit
    barcode: { type: String, unique: true, sparse: true }, // Optional barcode support

    // Marketing & Discovery
    isBestseller: { type: Boolean, default: false },
    isTrending: { type: Boolean, default: false },
    promotionalDiscount: {
      // Current active discount for this product
      type: { type: String, enum: ['percentage', 'fixed'] },
      value: { type: Number, default: 0 },
    },

    // Reviews & Ratings (Aggregated)
    averageRating: { type: Number, default: 0, min: 0, max: 5 },
    numberOfReviews: { type: Number, default: 0, min: 0 },

    // Recommendations
    relatedMeals: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  },
  { timestamps: true }
);

ProductSchema.index({ name: 'text', description: 'text' });

const Product = model('product', ProductSchema);

export default Product;
