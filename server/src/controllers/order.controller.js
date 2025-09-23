import { asyncHandler } from '../services/asyncHandler.js';
import { apiResponse } from '../services/apiResponse.js';
import { apiError } from '../services/apiError.js';
import Cart from '../models/cart.model.js';
import Order from '../models/order.model.js';
import Product from '../models/product.model.js';
import mongoose from 'mongoose';

// Helper function to handle price and stock checks during checkout
const validateAndPrepareOrderItems = async items => {
  let totalAmount = 0;
  const orderItems = [];

  for (const cartItem of items) {
    const product = await Product.findById(cartItem.product);

    // Check if the product still exists
    if (!product) {
      throw new apiError(404, `Product with ID ${cartItem.product} not found`);
    }

    // Check for a price change to prevent manipulation
    if (product.price !== cartItem.price) {
      throw new apiError(
        400,
        `Price for product '${product.name}' has changed. Please update your cart.`
      );
    }

    // Check for stock (assuming you'll add a stock field to the Product model)
    // if (product.stock < cartItem.quantity) {
    //     throw new apiError(400, `Not enough stock for product '${product.name}'`);
    // }

    // Prepare the item for the order document (taking a snapshot)
    orderItems.push({
      product: product._id,
      name: product.name,
      quantity: cartItem.quantity,
      price: product.price,
      customizations: cartItem.customizations,
    });

    totalAmount += product.price * cartItem.quantity;
  }

  return { orderItems, totalAmount };
};

const createOrder = asyncHandler(async (req, res) => {
  // 1. Get user ID and delivery/payment details from request
  const userId = req.user._id;
  const { deliveryAddress, paymentMethod, deliveryMethod } = req.body;

  // 2. Validate required details
  if (!deliveryAddress || !paymentMethod || !deliveryMethod) {
    throw new apiError(
      400,
      'Delivery address, payment method, and delivery method are required.'
    );
  }

  // 3. Find the user's cart and check if it's empty
  const cart = await Cart.findOne({ user: userId });
  if (!cart || cart.items.length === 0) {
    throw new apiError(400, 'Your cart is empty.');
  }

  // 4. Validate and prepare order items (with price and stock check)
  const { orderItems, totalAmount } = await validateAndPrepareOrderItems(
    cart.items
  );

  // 5. Create a new Order document in an atomic transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const newOrder = await Order.create(
      [
        {
          user: userId,
          orderItems,
          totalAmount,
          paymentMethod,
          paymentStatus: 'Paid', // Assuming success for now. This would integrate with a payment gateway.
          orderStatus: 'Confirmed',
          deliveryAddress,
          deliveryMethod,
        },
      ],
      { session }
    );

    // 6. Clear the user's cart
    await Cart.findByIdAndUpdate(
      cart._id,
      { $set: { items: [], totalPrice: 0, totalQuantity: 0 } },
      { new: true, session }
    );

    // 7. Commit the transaction
    await session.commitTransaction();
    session.endSession();

    // 8. Respond with the new order
    res
      .status(201)
      .json(new apiResponse(201, newOrder[0], 'Order created successfully'));
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new apiError(500, 'Order creation failed. Please try again.');
  }
});

const getAllUserOrders = asyncHandler(async (req, res) => {
  // 1. Get user ID
  const userId = req.user._id;

  // 2. Find all orders for the user and sort by most recent
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
  // 1. Get order and user IDs
  const { orderId } = req.params;
  const userId = req.user._id;

  // 2. Find the specific order, ensuring it belongs to the user
  const order = await Order.findOne({ _id: orderId, user: userId }).populate({
    path: 'orderItems.product',
    select: 'name price images',
  });

  // 3. Handle case where order is not found
  if (!order) {
    throw new apiError(
      404,
      'Order not found or you do not have permission to access it'
    );
  }

  // 4. Send response
  res
    .status(200)
    .json(new apiResponse(200, order, 'Order retrieved successfully'));
});

const cancelOrder = asyncHandler(async (req, res) => {
  // 1. Get order ID from parameters and user ID from the request
  const { orderId } = req.params;
  const userId = req.user._id;

  // 2. Find the order by ID and user, ensuring ownership
  const order = await Order.findOne({ _id: orderId, user: userId });

  // 3. Handle case where order is not found
  if (!order) {
    throw new apiError(
      404,
      'Order not found or you do not have permission to access it'
    );
  }

  // 4. Validate if the order can be cancelled
  const canBeCancelled = ['Pending', 'Confirmed', 'Preparing'];
  if (!canBeCancelled.includes(order.orderStatus)) {
    throw new apiError(
      400,
      `Order cannot be cancelled. Current status is '${order.orderStatus}'.`
    );
  }

  // 5. Update the order status and save
  order.orderStatus = 'Cancelled';
  order.cancellationReason = req.body.reason || 'Cancelled by user';
  // You might also want to set paymentStatus to 'Refunded' here,
  // depending on your business logic.
  order.paymentStatus = 'Refunded';

  await order.save();

  // 6. Send a success response with the updated order
  res
    .status(200)
    .json(new apiResponse(200, order, 'Order cancelled successfully'));
});

export { createOrder, getAllUserOrders, cancelOrder, getOrderByOrderId };
