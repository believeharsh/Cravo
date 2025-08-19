import { Schema, model } from 'mongoose';

const ReviewSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, maxlength: 500 },
    // A 'verified buyer' badge could be set true if an order exists from this user for this product
    isVerifiedBuyer: { type: Boolean, default: false },

    // For Q&A functionality
    questions: [
      {
        questionText: { type: String, required: true },
        answerText: { type: String },
      },
    ],
  },
  { timestamps: true }
);

// Compound index to ensure one review per user per product
ReviewSchema.index({ user: 1, product: 1 }, { unique: true });

const Review = model('Review', ReviewSchema);

export default Review;
