import { Schema, model } from 'mongoose';

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true, // Category names should be unique (e.g., "Pizza", "Burgers")
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    image: { // URL for the category image/icon, typically from Cloudinary
        type: String,
        required: true, // An image is essential for UI
        trim: true
    },
    slug: { // For SEO-friendly URLs, e.g., /category/pizza
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    displayOrder: { // To control the order of categories on the homepage
        type: Number,
        default: 0
    },
    isVisible: { // Flag to control if category appears on homepage/in listings
        type: Boolean,
        default: true
    }
}, { timestamps: true }); // Mongoose adds createdAt and updatedAt fields automatically

// Create an index on the name for faster lookups and potentially text search
CategorySchema.index({ name: 1 });
CategorySchema.index({ slug: 1 }); // Index for fast slug lookups

const Category = model('Category', CategorySchema);

export default Category;

