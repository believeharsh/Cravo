// Import necessary modules
import { asyncHandler } from '../services/asyncHandler.js';
import { apiResponse } from '../services/apiResponse.js';
import { apiError } from '../services/apiError.js';
import Cart from '../models/cart.model.js';
import Order from '../models/order.model.js';
import Product from '../models/product.model.js';
import crypto from 'crypto';
import mongoose from 'mongoose';

/**
 * @desc Verifies the Razorpay payment signature and updates the order status.
 * @route POST /api/payments/verify
 * @access Public (or protected if you ensure the order ID belongs to the current user)
 *
 * NOTE: The Razorpay secret key MUST ONLY be used on the server-side.
 * It is used here to securely compute and verify the signature.
 */
export const verifyPayment = asyncHandler(async (req, res) => {
  // 1. Extract the payment verification payload from the frontend response
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  // 2. Critical Input Validation
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    throw new apiError(400, 'Missing required payment verification details.');
  }

  // 3. Signature Verification (CRITICAL SECURITY STEP)
  // The signature is calculated using the secret key (MUST be server-side only).
  const body = razorpay_order_id + '|' + razorpay_payment_id;

  // Ensure RAZORPAY_KEY_SECRET is available
  if (!process.env.RAZORPAY_KEY_SECRET_ID) {
    console.error(
      'CRITICAL: RAZORPAY_KEY_SECRET is not set in environment variables.'
    );
    throw new apiError(
      500,
      'Server configuration error: Payment secret missing.'
    );
  }

  // Create an HMAC (Hash-based Message Authentication Code)
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET_ID)
    .update(body.toString())
    .digest('hex');

  // Compare the computed signature with the received one
  const isAuthentic = expectedSignature === razorpay_signature;

  if (!isAuthentic) {
    // Log the failure attempt for audit purposes
    console.error('Payment Signature Mismatch:', {
      razorpay_order_id,
      razorpay_payment_id,
    });
    throw new apiError(403, 'Payment verification failed: Invalid signature.');
  }

  // --- Signature is Verified: Proceed to DB Update ---

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // 4. Find the pending order using the Razorpay Order ID
    const order = await Order.findOne({
      razorpayOrderId: razorpay_order_id,
      paymentStatus: 'Pending', // Only update orders still awaiting payment confirmation
    }).session(session);

    if (!order) {
      // Check if it was already processed to return a success status to prevent user frustration
      const processedOrder = await Order.findOne({
        razorpayOrderId: razorpay_order_id,
        paymentStatus: 'Paid',
      });
      if (processedOrder) {
        await session.commitTransaction(); // Nothing to rollback, but good practice
        session.endSession();
        return res
          .status(200)
          .json(
            new apiResponse(
              200,
              { orderId: processedOrder._id },
              'Payment already verified and order confirmed.'
            )
          );
      }
      throw new apiError(404, 'Order not found or not in a pending state.');
    }

    // 5. Update the Order status and payment details (Adhering to Schema Enums)

    // FIX: Using 'Paid' as per your schema enum
    order.paymentStatus = 'Paid';

    // FIX: Using 'Confirmed' as per your schema enum
    order.orderStatus = 'Confirmed';

    // FIX: Using razorpayPaymentId as per your schema
    order.razorpayPaymentId = razorpay_payment_id;

    // Note: The schema does not include razorpaySignature, so we skip saving it.
    order.paidAt = Date.now();

    await order.save({ session });

    // 6. Clear the user's cart
    const userId = order.user;
    if (userId) {
      await Cart.findOneAndUpdate(
        { user: userId },
        { items: [], subTotal: 0, totalQuantity: 0 },
        { session }
      );
    }

    // 7. Commit the transaction
    await session.commitTransaction();
    session.endSession();

    // 8. Success Response
    return res.status(200).json(
      new apiResponse(
        200,
        { orderId: order._id }, // Return your internal DB Order ID
        'Payment successfully verified and order confirmed.'
      )
    );
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    // Detailed logging for debugging the 500 error
    console.error('TRANSACTION FAILED during payment verification:', error);

    if (error instanceof apiError) {
      throw error;
    }

    throw new apiError(
      500,
      'Order confirmation failed due to a server error. Please contact support.'
    );
  }
});
