import { v2 as cloudinary } from 'cloudinary';
// import path from "path";
// import { fileURLToPath } from "url";
import mongoose from 'mongoose';

import { EnvConfig } from '../config/env.config.js';
import Category from '../models/category.model.js';
import { categoriesToUpload } from '../sample-Data/Categories-Data/Categories.js';

const MONGODB_URI = EnvConfig.MONGODB_URI;

// Get __dirname equivalent for ES Modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

cloudinary.config({
  cloud_name: EnvConfig.CLOUDINARY_CLOUD_NAME,
  api_key: EnvConfig.CLOUDINARY_API_KEY,
  api_secret: EnvConfig.CLOUDINARY_API_SECRET,
});

(async function () {
  const uploadedCategoriesData = [];
  let displayOrderCounter = 1;

  console.log('Starting Cloudinary image upload for categories...');

  for (const category of categoriesToUpload) {
    try {
      console.log(
        `Attempting to upload image for: ${category.name} from ${category.imagePath}`
      );

      const uploadResult = await cloudinary.uploader.upload(
        category.imagePath,
        {
          folder: 'cravingcart/categories',
          public_id: category.slug,
          overwrite: true,
          quality: 'auto:low',
          fetch_format: 'auto',
          width: 400,
          height: 400,
          crop: 'fill',
          gravity: 'auto',
        }
      );

      console.log(
        `  Uploaded ${category.name}. URL: ${uploadResult.secure_url}`
      );

      uploadedCategoriesData.push({
        name: category.name,
        description: category.description,
        image: uploadResult.secure_url,
        slug: category.slug,
        displayOrder: displayOrderCounter++,
        isVisible: true,
      });
    } catch (error) {
      console.error(`  ERROR uploading ${category.name}:`, error.message);
      // Push a placeholder or log a warning if upload fails for a category
      uploadedCategoriesData.push({
        name: category.name,
        description: category.description,
        image: `https://placehold.co/400x400/cccccc/ffffff?text=${encodeURIComponent(
          category.name
        )}`, // Placeholder
        slug: category.slug,
        displayOrder: displayOrderCounter++,
        isVisible: false, // Mark as not visible if image upload failed
      });
    }
  }

  console.log('\n--- Cloudinary Upload Process Complete ---');
  console.log(
    'Please copy the following JSON array and paste it into your `seedCategories.js` file:\n'
  );
  console.log(JSON.stringify(uploadedCategoriesData, null, 2)); // Pretty print the JSON output
  console.log('\n------------------------------------------------\n');

  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Remove useCreateIndex and useFindAndModify as they are deprecated in Mongoose 6+
    });
    console.log('MongoDB connected for seeding!');

    for (const categoryData of uploadedCategoriesData) {
      // Find one document with the same name. If it exists, update it, otherwise insert a new one.
      // This prevents duplicates if you run the script multiple times.
      await Category.findOneAndUpdate(
        { name: categoryData.name }, // Find by name
        categoryData, // Data to update/insert
        { upsert: true, new: true, setDefaultsOnInsert: true } // Options: insert if not found, return new doc, apply defaults on insert
      );
      console.log(`Category "${categoryData.name}" upserted.`);
    }

    console.log('All categories seeded successfully!');
  } catch (error) {
    console.error('Error seeding categories:', error);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB disconnected.');
  }
})();
