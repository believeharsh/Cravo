import React from 'react';
import { useNavigate } from 'react-router-dom';

import Icon from '../../../components/ui/Icon';
import { useCartActions } from '../../../hooks/useCartActions';

const PaymentStatusModal = ({ isOpen, status, orderDetails, onClose }) => {
  const navigate = useNavigate();

  const { handleClearUserCart } = useCartActions();

  if (!isOpen) return null;

  const handleTrackOrder = () => {
    handleClearUserCart();
    navigate(`/profile/orders`);
  };

  const handleViewOrders = () => {
    handleClearUserCart();
    navigate('/profile/orders');
  };

  const handleContinueShopping = () => {
    handleClearUserCart();
    navigate('/restaurants');
  };

  const handleRetryPayment = () => {
    onClose();
    // Payment will be retried when modal closes
  };

  // Success Modal Content
  if (status === 'success') {
    return (
      <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="animate-scale-in w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">
          {/* Success Header with Animation */}
          <div className="relative overflow-hidden bg-gradient-to-br from-green-400 to-green-600 p-8 text-center">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 h-32 w-32 -translate-x-16 -translate-y-16 rounded-full bg-white"></div>
              <div className="absolute right-0 bottom-0 h-40 w-40 translate-x-20 translate-y-20 rounded-full bg-white"></div>
            </div>
            <div className="relative">
              <div className="mx-auto mb-4 flex h-20 w-20 animate-bounce items-center justify-center rounded-full bg-white">
                <Icon name="check" className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="mb-2 text-2xl font-bold text-white">
                Payment Successful! 🎉
              </h2>
              <p className="text-green-50">Your order has been confirmed</p>
            </div>
          </div>

          {/* Order Details */}
          <div className="space-y-4 p-6">
            <div className="bg-bg-subtle space-y-3 rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <span className="text-text-secondary text-sm">Order ID</span>
                <span className="text-text-main font-semibold">
                  #{orderDetails?.orderId || 'N/A'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary text-sm">Amount Paid</span>
                <span className="text-lg font-bold text-green-600">
                  ₹{orderDetails?.amount?.toFixed(2) || '0.00'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary text-sm">
                  Payment Method
                </span>
                <span className="text-text-main font-medium">
                  {orderDetails?.paymentMethod || 'N/A'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary text-sm">
                  Estimated Delivery
                </span>
                <span className="text-text-main font-medium">
                  {orderDetails?.estimatedTime || '30-40 mins'}
                </span>
              </div>
            </div>

            {/* Delivery Address */}
            {orderDetails?.address && (
              <div className="rounded-2xl bg-blue-50 p-4">
                <div className="flex items-start gap-3">
                  <Icon name="map-pin" className="mt-1 h-5 w-5 text-blue-600" />
                  <div className="flex-1">
                    <p className="text-text-main mb-1 text-sm font-medium">
                      Delivering to:
                    </p>
                    <p className="text-text-secondary text-sm">
                      {orderDetails.address}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleTrackOrder}
                className="bg-primary hover:bg-primary-hover text-text-main w-full rounded-full py-3 font-semibold shadow-md transition-all hover:shadow-lg"
              >
                Track Your Order
              </button>
              <div className="flex gap-3">
                <button
                  onClick={handleViewOrders}
                  className="text-text-main flex-1 rounded-full bg-gray-100 py-3 font-medium transition-all hover:bg-gray-200"
                >
                  View Orders
                </button>
                <button
                  onClick={handleContinueShopping}
                  className="text-text-main flex-1 rounded-full bg-gray-100 py-3 font-medium transition-all hover:bg-gray-200"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Failed/Cancelled Modal Content
  if (status === 'failed' || status === 'cancelled') {
    const isCancelled = status === 'cancelled';

    return (
      <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="animate-scale-in w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">
          {/* Error Header */}
          <div
            className={`${isCancelled ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' : 'bg-gradient-to-br from-red-400 to-red-600'} relative overflow-hidden p-8 text-center`}
          >
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 h-32 w-32 -translate-x-16 -translate-y-16 rounded-full bg-white"></div>
              <div className="absolute right-0 bottom-0 h-40 w-40 translate-x-20 translate-y-20 rounded-full bg-white"></div>
            </div>
            <div className="relative">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white">
                <Icon
                  name={isCancelled ? 'x' : 'alert-circle'}
                  className={`h-10 w-10 ${isCancelled ? 'text-yellow-600' : 'text-red-600'}`}
                />
              </div>
              <h2 className="mb-2 text-2xl font-bold text-white">
                {isCancelled ? 'Payment Cancelled' : 'Payment Failed'}
              </h2>
              <p
                className={`${isCancelled ? 'text-yellow-50' : 'text-red-50'}`}
              >
                {isCancelled
                  ? 'You cancelled the payment process'
                  : 'Something went wrong with your payment'}
              </p>
            </div>
          </div>

          {/* Error Details */}
          <div className="space-y-4 p-6">
            <div
              className={`${isCancelled ? 'border border-yellow-200 bg-yellow-50' : 'border border-red-200 bg-red-50'} rounded-2xl p-4`}
            >
              <p className="text-text-secondary text-center text-sm">
                {isCancelled
                  ? "Don't worry! Your items are still in your cart. You can try again whenever you're ready."
                  : orderDetails?.errorMessage ||
                    'The payment could not be processed. Please try again or use a different payment method.'}
              </p>
            </div>

            {/* Order Details if available */}
            {orderDetails?.amount && (
              <div className="bg-bg-subtle space-y-2 rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary text-sm">
                    Order Amount
                  </span>
                  <span className="text-text-main font-bold">
                    ₹{orderDetails.amount.toFixed(2)}
                  </span>
                </div>
                {orderDetails.paymentMethod && (
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary text-sm">
                      Payment Method
                    </span>
                    <span className="text-text-main font-medium">
                      {orderDetails.paymentMethod}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleRetryPayment}
                className="bg-primary hover:bg-primary-hover text-text-main w-full rounded-full py-3 font-semibold shadow-md transition-all hover:shadow-lg"
              >
                {isCancelled ? 'Try Again' : 'Retry Payment'}
              </button>
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="text-text-main flex-1 rounded-full bg-gray-100 py-3 font-medium transition-all hover:bg-gray-200"
                >
                  Change Payment Method
                </button>
                <button
                  onClick={handleContinueShopping}
                  className="text-text-main flex-1 rounded-full bg-gray-100 py-3 font-medium transition-all hover:bg-gray-200"
                >
                  Continue Shopping
                </button>
              </div>
            </div>

            {/* Help Text */}
            <p className="text-text-muted pt-2 text-center text-xs">
              Need help? Contact support at{' '}
              <a
                href="mailto:support@cravo.com"
                className="text-yellow-600 hover:underline"
              >
                support@cravo.com
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default PaymentStatusModal;
