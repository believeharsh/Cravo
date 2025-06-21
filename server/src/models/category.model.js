import { Schema, model } from 'mongoose';

const CategorySchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    image: { type: String }, // URL to category icon/image
    parentCategory: { type: Schema.Types.ObjectId, ref: 'Category', default: null }, // For subcategories
    
    // For SEO purposes
    slug: { type: String, unique: true, lowercase: true } 

}, { timestamps: true });

const Category = model("Category", CategorySchema) ; 
export default Category ; 
