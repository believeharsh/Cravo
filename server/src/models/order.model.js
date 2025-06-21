import { Schema , model } from 'mongoose';


const OrderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', default: null }, // Null for guest checkout
    
    // Guest Information (if user is not logged in)
    guestInfo: {
        name: { type: String },
        email: { type: String },
        phone: { type: String }
    },

    orderItems: [{ // Embedded document for specific items in THIS order
        product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        name: { type: String, required: true }, // Snapshot of product name
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true, min: 0 }, // Price at time of order
        customizations: [{ // Snapshot of customizations selected for this item
            optionName: { type: String },
            selectedItems: [{ type: String }] // e.g., ['Extra Cheese', 'Jalapenos']
        }]
    }],

    totalAmount: { type: Number, required: true, min: 0 },
    discountApplied: { type: Number, default: 0 }, // Total discount amount
    couponUsed: { type: Schema.Types.ObjectId, ref: 'Coupon' }, // Reference to a coupon if used

    paymentMethod: { type: String, enum: ['Credit/Debit Card', 'PayPal', 'UPI', 'Wallet', 'COD'], required: true },
    paymentStatus: { type: String, enum: ['Pending', 'Paid', 'Failed', 'Refunded'], default: 'Pending' },
    transactionId: { type: String }, // ID from payment gateway

    orderStatus: { 
        type: String, 
        enum: ['Pending', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled', 'Refunded'], 
        default: 'Pending' 
    },
    deliveryAddress: { // Embedded copy of the address at time of order
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: { type: String, required: true },
        country: { type: String, required: true },
        addressType: { type: String }
    },
    
    deliveryMethod: { type: String, enum: ['Standard', 'Express', 'Scheduled Delivery', 'Pickup'], required: true },
    estimatedDeliveryTime: { type: Date },
    actualDeliveryTime: { type: Date },
    trackingNumber: { type: String },
    pickupStore: { type: String }, // Name/ID of the store if pickup

    // Customer support related
    cancellationReason: { type: String },
    refundStatus: { type: String, enum: ['None', 'Initiated', 'Completed'] },

}, { timestamps: true });

const Order = model("Order", OrderSchema) ; 

export default Order ; 
