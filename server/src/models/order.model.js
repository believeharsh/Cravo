import { Schema, model } from 'mongoose';

const OrderSchema = new Schema(
  {
    // --- 1. User/Guest Identification ---
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null, // Allows for guest checkout
      index: true, // Indexing this field for quick lookups
    },

    // Guest Information (if user is not logged in)
    guestInfo: {
      name: { type: String, trim: true },
      email: { type: String, trim: true },
      phone: { type: String, trim: true },
    },

    // --- 2. Item Details (Snapshot) ---
    orderItems: [
      {
        // Reference to the current product (for easy lookup/admin)
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        // SNAPPED data: Price and details at the time of order
        name: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true, min: 0 },

        // Snapshot of customizations selected for this item
        customizations: [
          {
            optionName: { type: String },
            selectedItems: [{ type: String }],
          },
        ],
      },
    ],

    // --- 3. Financials and Totals ---
    subTotal: { type: Number, required: true, min: 0 }, // Total of all item prices
    shippingCost: { type: Number, default: 0 },
    taxAmount: { type: Number, default: 0 },
    discountApplied: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true, min: 0 }, // Final amount charged

    couponUsed: { type: Schema.Types.ObjectId, ref: 'Coupon' },

    // --- 4. Payment and Transaction Details ---
    paymentMethod: {
      type: String,
      enum: ['Debit Card', 'Credit Cart', 'UPI', 'Wallet', 'COD'],
      required: true,
    },
    paymentStatus: {
      type: String,
      // 'Authorized' is a key status for gateways like Razorpay/Stripe
      enum: ['Pending', 'Authorized', 'Paid', 'Failed', 'Refunded'],
      default: 'Pending',
      index: true,
    },

    // Razorpay-specific IDs for verification and lookup
    razorpayOrderId: { type: String }, // ID from Razorpay when order is created (e.g., order_xxxx)
    razorpayPaymentId: { type: String }, // ID from Razorpay after successful payment (e.g., pay_xxxx)
    // razorpaySignature is often only used during the verification API call and not stored long-term,
    // but you can add it if you need it for audit logs:
    // razorpaySignature: { type: String },

    // --- 5. Fulfillment and Shipping ---
    orderStatus: {
      type: String,
      enum: [
        'Pending', // Waiting for payment verification
        'Confirmed', // Payment verified, order accepted
        'Preparing',
        'Out for Delivery',
        'Delivered',
        'Cancelled',
        'Refunded',
      ],
      default: 'Pending',
      index: true,
    },

    // Embedded copy of the address at time of order
    deliveryAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true },
      addressType: { type: String },
    },

    deliveryMethod: {
      type: String,
      enum: ['Standard', 'Express', 'Scheduled Delivery', 'Pickup'],
      required: true,
    },
    estimatedDeliveryTime: { type: Date },
    actualDeliveryTime: { type: Date },
    trackingNumber: { type: String },
    pickupStore: { type: String },

    // --- 6. Cancellation/Refund ---
    cancellationReason: { type: String },
    refundStatus: {
      type: String,
      enum: ['None', 'Initiated', 'Completed', 'Failed'],
      default: 'None',
    },
    refundAmount: { type: Number, default: 0 }, // Tracks the total amount refunded
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

const Order = model('Order', OrderSchema);

export default Order;
