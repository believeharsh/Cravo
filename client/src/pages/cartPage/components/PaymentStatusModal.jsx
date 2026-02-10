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
      <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-scale-in">
          {/* Success Header with Animation */}
          <div className="bg-gradient-to-br from-green-400 to-green-600 p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full translate-x-20 translate-y-20"></div>
            </div>
            <div className="relative">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <Icon name="check" className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Payment Successful! 🎉
              </h2>
              <p className="text-green-50">Your order has been confirmed</p>
            </div>
          </div>

          {/* Order Details */}
          <div className="p-6 space-y-4">
            <div className="bg-bg-subtle rounded-2xl p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-text-secondary text-sm">Order ID</span>
                <span className="font-semibold text-text-main">
                  #{orderDetails?.orderId || 'N/A'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary text-sm">Amount Paid</span>
                <span className="font-bold text-green-600 text-lg">
                  ₹{orderDetails?.amount?.toFixed(2) || '0.00'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary text-sm">Payment Method</span>
                <span className="font-medium text-text-main">
                  {orderDetails?.paymentMethod || 'N/A'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary text-sm">
                  Estimated Delivery
                </span>
                <span className="font-medium text-text-main">
                  {orderDetails?.estimatedTime || '30-40 mins'}
                </span>
              </div>
            </div>

            {/* Delivery Address */}
            {orderDetails?.address && (
              <div className="bg-blue-50 rounded-2xl p-4">
                <div className="flex items-start gap-3">
                  <Icon name="map-pin" className="w-5 h-5 text-blue-600 mt-1" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-text-main mb-1">
                      Delivering to:
                    </p>
                    <p className="text-sm text-text-secondary">
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
                className="w-full bg-primary hover:bg-primary-hover text-text-main font-semibold py-3 rounded-full transition-all shadow-md hover:shadow-lg"
              >
                Track Your Order
              </button>
              <div className="flex gap-3">
                <button
                  onClick={handleViewOrders}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-text-main font-medium py-3 rounded-full transition-all"
                >
                  View Orders
                </button>
                <button
                  onClick={handleContinueShopping}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-text-main font-medium py-3 rounded-full transition-all"
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
      <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-scale-in">
          {/* Error Header */}
          <div
            className={`${isCancelled ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' : 'bg-gradient-to-br from-red-400 to-red-600'} p-8 text-center relative overflow-hidden`}
          >
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full translate-x-20 translate-y-20"></div>
            </div>
            <div className="relative">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon
                  name={isCancelled ? 'x' : 'alert-circle'}
                  className={`w-10 h-10 ${isCancelled ? 'text-yellow-600' : 'text-red-600'}`}
                />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
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
          <div className="p-6 space-y-4">
            <div
              className={`${isCancelled ? 'bg-yellow-50 border border-yellow-200' : 'bg-red-50 border border-red-200'} rounded-2xl p-4`}
            >
              <p className="text-sm text-text-secondary text-center">
                {isCancelled
                  ? "Don't worry! Your items are still in your cart. You can try again whenever you're ready."
                  : orderDetails?.errorMessage ||
                    'The payment could not be processed. Please try again or use a different payment method.'}
              </p>
            </div>

            {/* Order Details if available */}
            {orderDetails?.amount && (
              <div className="bg-bg-subtle rounded-2xl p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary text-sm">Order Amount</span>
                  <span className="font-bold text-text-main">
                    ₹{orderDetails.amount.toFixed(2)}
                  </span>
                </div>
                {orderDetails.paymentMethod && (
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary text-sm">
                      Payment Method
                    </span>
                    <span className="font-medium text-text-main">
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
                className="w-full bg-primary hover:bg-primary-hover text-text-main font-semibold py-3 rounded-full transition-all shadow-md hover:shadow-lg"
              >
                {isCancelled ? 'Try Again' : 'Retry Payment'}
              </button>
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-text-main font-medium py-3 rounded-full transition-all"
                >
                  Change Payment Method
                </button>
                <button
                  onClick={handleContinueShopping}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-text-main font-medium py-3 rounded-full transition-all"
                >
                  Continue Shopping
                </button>
              </div>
            </div>

            {/* Help Text */}
            <p className="text-center text-xs text-text-muted pt-2">
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
