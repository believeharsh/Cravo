import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';
import { API } from '../../config/api';

// --- Initial State ---
const initialState = {
  // State for the checkout process (Phase 1: Creating the Order)
  razorpayOrderData: null,
  isOrderCreationLoading: false,
  orderCreationError: null,

  // State for the payment verification process (Phase 2: Verifying Payment)
  isPaymentVerificationLoading: false,
  paymentVerificationError: null,
  paymentStatus: 'idle', // 'idle', 'success', 'failed'
};

// --- Async Thunks ---

/**
 * Thunk to initiate the order on the backend.
 * This function calls the backend API which, in turn, calls the Razorpay API
 * to generate a secure Order ID.
 * The fulfilled payload should contain the necessary data to open the Razorpay modal.
 * * @param {object} orderPayload - Contains required data like delivery address,
 * payment method choice, and user details (optional if inferred on backend).
 * @returns {object} The response data, e.g., { razorpayOrderId, keyId, amount, name, email }
 */
export const createOrderThunk = createAsyncThunk(
  'order/createOrder',
  async (orderPayload, { rejectWithValue }) => {
    try {
      // IMPORTANT: Replace this with your actual API call (e.g., axios.post)
      // The payload for the API call is what your backend needs.
      const response = await axiosInstance.post(
        API.ORDERS.CHECKOUT,
        orderPayload
      );

      // The backend should return the Razorpay Order details
      return response.data;
    } catch (error) {
      // Use rejectWithValue to handle API errors cleanly
      // e.g., if the cart is empty or address is invalid
      const message =
        error.response?.data?.message || 'Failed to create order.';
      return rejectWithValue(message);
    }
  }
);

/**
 * Thunk to verify the payment signature after the Razorpay modal is successful.
 * * NOTE: You will implement this logic in Phase 3 (Backend Verification).
 * We are adding the thunk placeholder now for structure.
 */
export const verifyPaymentThunk = createAsyncThunk(
  'order/verifyPayment',
  async (verificationPayload, { rejectWithValue }) => {
    try {
      // The payload contains data from the Razorpay handler:
      // { razorpay_payment_id, razorpay_order_id, razorpay_signature }
      // IMPORTANT: Replace this with your actual API call for verification
      const response = await axiosInstance.post(
        API.PAYMENTS.VERIFY_PAYMENT,
        verificationPayload
      );

      // The backend should return the updated order status
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || 'Payment verification failed.';
      return rejectWithValue(message);
    }
  }
);

// --- Order Slice Definition ---
const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    // Synchronous reducers go here if needed (e.g., clearPaymentStatus)
    clearOrderState: state => {
      state.razorpayOrderData = null;
      state.isOrderCreationLoading = false;
      state.orderCreationError = null;
      state.paymentStatus = 'idle';
    },
  },
  extraReducers: builder => {
    // --- Handlers for createOrderThunk ---
    builder
      .addCase(createOrderThunk.pending, state => {
        state.isOrderCreationLoading = true;
        state.orderCreationError = null;
        state.razorpayOrderData = null; // Clear previous data
        state.paymentStatus = 'idle';
      })
      .addCase(createOrderThunk.fulfilled, (state, action) => {
        state.isOrderCreationLoading = false;
        // Store the Razorpay Order ID and other necessary data
        state.razorpayOrderData = action.payload;
        state.orderCreationError = null;
      })
      .addCase(createOrderThunk.rejected, (state, action) => {
        state.isOrderCreationLoading = false;
        state.razorpayOrderData = null;
        state.orderCreationError = action.payload || action.error.message;
        state.paymentStatus = 'failed';
      })
      // --- Handlers for verifyPaymentThunk (Future Phase) ---
      .addCase(verifyPaymentThunk.pending, state => {
        state.isPaymentVerificationLoading = true;
        state.paymentVerificationError = null;
      })
      .addCase(verifyPaymentThunk.fulfilled, (state, action) => {
        state.isPaymentVerificationLoading = false;
        // Typically, you might reset the cart here, but the main goal is status update
        state.paymentStatus = 'success';
        state.paymentVerificationError = null;
        // Optionally store the final verified order details
      })
      .addCase(verifyPaymentThunk.rejected, (state, action) => {
        state.isPaymentVerificationLoading = false;
        state.paymentStatus = 'failed';
        state.paymentVerificationError = action.payload || action.error.message;
      });
  },
});

export const { clearOrderState } = orderSlice.actions;
export default orderSlice.reducer;
