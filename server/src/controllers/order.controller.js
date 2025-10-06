import { asyncHandler } from '../services/asyncHandler.js';
import { apiResponse } from '../services/apiResponse.js';
import { apiError } from '../services/apiError.js';
import Cart from '../models/cart.model.js';
import Order from '../models/order.model.js';
import Product from '../models/product.model.js';
import mongoose from 'mongoose';

import razorpayInstance from '../config/razorPayConfig.js';

// Helper function to handle price and stock checks during checkout
/**
 * Validates cart items against product database, calculates final totals,
 * and prepares the snapshot for the Order document.
 * * @param {Array} cartItems - Array of items from the user's cart (product ID, quantity, customizations).
 * @returns {Object} { orderItems, subTotal, taxAmount, shippingCost, totalAmount }
 */

const validateAndPrepareOrderItems = async items => {
  let subTotal = 0;
  let taxAmount = 0;
  let discountAmount = 0; // Placeholder for future discount logic
  const SHIPPING_FLAT_RATE = 50; // Example flat rate
  const TAX_RATE = 0.18; // 18% GST

  const orderItems = [];
  const productIds = items.map(item => item.product);

  //  Fetching all product data in a single query for efficiency (less MongoDB round trips)
  const products = await Product.find({ _id: { $in: productIds } });
  const productMap = products.reduce((acc, product) => {
    acc[product._id.toString()] = product;
    return acc;
  }, {});

  // Looping through cart items for validation and calculation
  for (const cartItem of items) {
    const product = productMap[cartItem.product.toString()];

    // A. Check if the product still exists
    if (!product) {
      throw new apiError(
        404,
        `One or more products in your cart were not found.`
      );
    }

    // B. Security: Use the price from the database (SNAPSHOT IT)
    // IMPORTANT: We DO NOT check cartItem.price vs product.price.
    // We trust the database price (product.price) and use it.
    const itemPrice = product.price;
    const itemTotal = itemPrice * cartItem.quantity;

    // C. Stock Check (Uncomment and implement stock logic when ready)
    // if (product.stock < cartItem.quantity) {
    //   throw new apiError(400, `Not enough stock for '${product.name}'. Available: ${product.stock}`);
    // }

    // D. Prepare the snapshot for the Order document
    orderItems.push({
      product: product._id,
      name: product.name,
      quantity: cartItem.quantity,
      price: itemPrice, // Snapped price from DB
      customizations: cartItem.customizations || [],
    });

    // E. Calculate running subtotal
    subTotal += itemTotal;
  }

  // Final Financial Calculations

  // Tax is calculated on the subTotal after discounts (if discounts applied here)
  const taxableAmount = subTotal - discountAmount;
  taxAmount = taxableAmount * TAX_RATE;

  // Shipping cost (Can be zero or calculated based on weight/location later)
  const shippingCost = SHIPPING_FLAT_RATE;

  // Final total amount to be charged
  const totalAmount = subTotal - discountAmount + taxAmount + shippingCost;

  //  Return the full financial breakdown
  return {
    orderItems,
    subTotal,
    taxAmount,
    shippingCost,
    totalAmount,
    discountApplied: discountAmount,
  };
};

const createOrder = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  // For production, we will be handle guest info separately if userId is null

  const { deliveryAddress, paymentMethod, deliveryMethod, guestInfo } =
    req.body;

  // Initial Validation
  if (!deliveryAddress || !paymentMethod || !deliveryMethod) {
    throw new apiError(
      400,
      'Delivery address, payment method, and delivery method are required.'
    );
  }

  // Finding the user's cart
  const cart = await Cart.findOne({ user: userId });
  if (!cart || cart.items.length === 0) {
    throw new apiError(400, 'Your cart is empty.');
  }

  // Validate, Price, and Calculate Financials (MOST CRITICAL STEP)
  const { orderItems, subTotal, taxAmount, shippingCost, totalAmount } =
    await validateAndPrepareOrderItems(cart.items); // Must be an async function

  // Razorpay requires amount in the smallest currency unit (e.g., paise for INR)
  const amountInPaise = totalAmount * 100;

  // Razorpay Order Creation (Server-to-Server)
  const razorpayOrder = await razorpayInstance.orders.create({
    amount: amountInPaise,
    currency: 'INR',
    receipt: `receipt_order_${Date.now()}`, // Unique receipt for your records
  });

  // Create a new Order document in an atomic transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const newOrder = await Order.create(
      [
        {
          user: userId,
          guestInfo: guestInfo,
          orderItems,
          // Financials breakdown
          subTotal,
          taxAmount,
          shippingCost,
          totalAmount,
          // Payment details
          paymentMethod,
          paymentStatus: 'Pending', // Order is created, but payment is not confirmed yet
          razorpayOrderId: razorpayOrder.id, // Storing the ID from Razorpay
          // Fulfillment details
          orderStatus: 'Pending',
          deliveryAddress,
          deliveryMethod,
        },
      ],
      { session }
    );

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    // Respond with the data needed by the frontend to open the Razorpay modal
    res.status(201).json(
      new apiResponse(
        201,
        {
          orderId: newOrder[0]._id,
          razorpayOrderId: razorpayOrder.id,
          amount: totalAmount, // Total amount
          keyId: process.env.RAZORPAY_KEY_ID, // Public key ID for the frontend
          currency: 'INR',
          // Passing user/guest contact details for the payment modal options
          name: userId ? req.user.fullName : guestInfo?.name,
          email: userId ? req.user.email : guestInfo?.email,
        },
        'Order initiated successfully. Proceed to payment.'
      )
    );
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    // Log the error for debugging
    console.error('Order creation failed during transaction:', error);
    throw new apiError(500, 'Order initiation failed. Please try again.');
  }
});

const getAllUserOrders = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // Finding all orders for the user and sort by most recent
  const orders = await Order.find({ user: userId })
    .sort({ createdAt: -1 })
    .populate({
      path: 'orderItems.product',
      select: 'name price images',
    });

  // 3. Send response
  res
    .status(200)
    .json(new apiResponse(200, orders, 'User orders retrieved successfully'));
});

const getOrderByOrderId = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const userId = req.user._id;

  // Finding the specific order, ensuring it belongs to the user
  const order = await Order.findOne({ _id: orderId, user: userId }).populate({
    path: 'orderItems.product',
    select: 'name price images',
  });

  // Handling case where order is not found
  if (!order) {
    throw new apiError(
      404,
      'Order not found or you do not have permission to access it'
    );
  }

  // Sending response
  res
    .status(200)
    .json(new apiResponse(200, order, 'Order retrieved successfully'));
});

const cancelOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const userId = req.user._id;

  // Finding the order by ID and user, ensuring ownership
  const order = await Order.findOne({ _id: orderId, user: userId });

  // Handling case where order is not found
  if (!order) {
    throw new apiError(
      404,
      'Order not found or you do not have permission to access it'
    );
  }

  // Validating if the order can be cancelled
  const canBeCancelled = ['Pending', 'Confirmed', 'Preparing'];
  if (!canBeCancelled.includes(order.orderStatus)) {
    throw new apiError(
      400,
      `Order cannot be cancelled. Current status is '${order.orderStatus}'.`
    );
  }

  // Update the order status and save
  order.orderStatus = 'Cancelled';
  order.cancellationReason = req.body?.reason || 'Cancelled by user';

  order.paymentStatus = 'Refunded';

  await order.save();

  // Send a success response with the updated order
  res
    .status(200)
    .json(new apiResponse(200, order, 'Order cancelled successfully'));
});

export { createOrder, getAllUserOrders, cancelOrder, getOrderByOrderId };
