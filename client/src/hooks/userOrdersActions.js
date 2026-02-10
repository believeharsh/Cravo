import { useDispatch } from 'react-redux';

import CustomToast from '../components/CustomToast';
import {
  cancelOrderThunk,
  clearOrderState,
  createOrderThunk,
  verifyPaymentThunk,
} from '../features/orders/ordersSlice';
import { useToastStack } from './useStackToasts';

/**
 * Custom hook for dispatching order-related actions and handling side effects
 * like notifications for the checkout and payment process.
 */
export const useOrderActions = () => {
  const dispatch = useDispatch();
  const { showStackedToast } = useToastStack();

  /**
   * Dispatches the thunk to create a new order on the backend (which generates the Razorpay Order ID).
   * This function returns the Promise so the calling component can use .unwrap()
   * and access the Razorpay details to open the payment modal.
   * @param {object} orderPayload - The order details (cart items, address, total).
   * @returns {Promise<object>} The promise containing the fulfilled data (Razorpay Order details).
   */
  const handleCreateOrder = orderPayload => {
    return dispatch(createOrderThunk(orderPayload));
  };

  /**
   * Dispatches the thunk to verify the payment signature after the Razorpay modal is successful.
   * Also handles the UI feedback (toast/notification).
   * @param {object} verificationPayload - Contains Razorpay IDs and signature.
   */
  const handleVerifyPayment = async verificationPayload => {
    try {
      await dispatch(verifyPaymentThunk(verificationPayload)).unwrap();

      // On successful server verification:
      showStackedToast(
        CustomToast,
        {
          message: 'Payment successfully verified! Your order is confirmed.',
          actionText: 'View Order',
          onActionClick: () => {
            /* Logic to navigate to order details */
          },
        },
        { duration: 5000, type: 'success' } // Assuming 'type' exists for styling
      );
    } catch (error) {
      // On failed server verification:
      showStackedToast(
        CustomToast,
        {
          message:
            'Order placed, but payment verification failed. Contact support.',
          actionText: '',
          onActionClick: () => {},
        },
        { duration: 3000, type: 'error' }
      );
      console.error('Payment Verification Failed:', error);
    }
  };

  /**
   * Resets the order processing state in Redux.
   */
  const handleClearOrderState = () => {
    return dispatch(clearOrderState());
  };

  const handleCancleOrder = async id => {
    try {
      await dispatch(cancelOrderThunk(id)).unwrap();

      // On successful order Canclelation:
      showStackedToast(
        CustomToast,
        {
          message: 'Your Order has Cancelled Succussfully.',
          actionText: 'View Order',
          onActionClick: () => {
            /* Logic to navigate to order details */
          },
        },
        { duration: 3000, type: 'success' }
      );
    } catch (error) {}
  };

  return {
    handleCreateOrder,
    handleVerifyPayment,
    handleClearOrderState,
    handleCancleOrder,
  };
};
