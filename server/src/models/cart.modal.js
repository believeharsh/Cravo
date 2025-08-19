import { Schema, model } from 'mongoose';

const CartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      unique: true,
      sparse: true,
    }, // Linked to a user, can be null for guests (session ID will manage guest carts)
    sessionId: { type: String, unique: true, sparse: true }, // For guest carts, store a session ID

    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true, min: 0 }, // Price at the time it was added to cart
        customizations: [
          {
            // Specific customizations for this item in the cart
            optionName: { type: String },
            selectedItems: [{ type: String }],
          },
        ],
        addedAt: { type: Date, default: Date.now }, // When the item was added
      },
    ],

    // Aggregated totals
    totalPrice: { type: Number, default: 0 },
    totalQuantity: { type: Number, default: 0 },
  },
  { timestamps: true }
); // Updates 'updatedAt' every time an item is added/removed

const Cart = model('Cart', CartSchema);

export default Cart;
