import { Schema, model } from 'mongoose';

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true, // here mongo automatically creates a unique index on 'name'
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    image: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        unique: true, // here mongo automatically creates a unique index on 'slug'
        lowercase: true,
        trim: true
    },
    displayOrder: {
        type: Number,
        default: 0
    },
    isVisible: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const Category = model('Category', CategorySchema);

export default Category;