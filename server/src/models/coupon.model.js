import { Schema, model } from 'mongoose';

const CouponSchema = new Schema(
  {
    code: { type: String, required: true, unique: true, uppercase: true },
    type: { type: String, enum: ['percentage', 'fixed'], required: true }, // e.g., 'percentage' or 'fixed' amount
    value: { type: Number, required: true, min: 0 }, // 10 for 10%, or 5 for $5 off

    // Conditions for coupon application
    minimumOrderValue: { type: Number, default: 0 },
    appliesTo: {
      // Which products/categories this coupon applies to
      type: String,
      enum: ['all', 'specific_products', 'specific_categories'],
      default: 'all',
    },
    productIds: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    categoryIds: [{ type: Schema.Types.ObjectId, ref: 'Category' }],

    // Validity period
    expiryDate: { type: Date, required: true },
    startDate: { type: Date, default: Date.now },

    usageLimit: { type: Number, default: 0 }, // 0 means unlimited
    timesUsed: { type: Number, default: 0 },

    isActive: { type: Boolean, default: true },
    description: { type: String }, // e.g., "10% off your first order"
  },
  { timestamps: true }
);

const Coupon = model('Coupon', CouponSchema);

export default Coupon;
