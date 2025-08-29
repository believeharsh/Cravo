import React from 'react';
import Icon from '../../../components/ui/Icon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const OrderSummarySection = ({
  promoCode,
  setPromoCode,
  appliedPromo,
  applyPromoCode,
  removePromoCode,
  promoMessage,
  subtotal,
  itemDiscount,
  promoDiscount,
  deliveryFee,
  serviceFee,
  gst,
  finalTotal,
  handleCheckout,
}) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-4 space-y-4">
      {/* Promo Code Input */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-3">Promo Code</h2>
        <div className="flex space-x-2">
          <input
            type="text"
            className="flex-grow p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
            placeholder="Enter promo code"
            value={promoCode}
            onChange={e => setPromoCode(e.target.value)}
          />
          {appliedPromo ? (
            <button
              onClick={removePromoCode}
              className="px-4 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-colors"
            >
              Remove
            </button>
          ) : (
            <button
              onClick={applyPromoCode}
              className="px-4 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold rounded-xl transition-colors"
            >
              Apply
            </button>
          )}
        </div>
        {promoMessage && (
          <p
            className={`mt-2 text-sm font-medium ${appliedPromo ? 'text-green-600' : 'text-red-500'}`}
          >
            {promoMessage}
          </p>
        )}
      </div>

      {/* Order Summary */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold text-gray-800">Order Summary</h2>
        <div className="space-y-2 text-gray-600 font-medium">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          {itemDiscount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Item Discount</span>
              <span>-${itemDiscount.toFixed(2)}</span>
            </div>
          )}
          {promoDiscount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Promo Discount</span>
              <span>-${promoDiscount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Delivery Fee</span>
            <span>
              {deliveryFee === 0 ? 'Free' : `$${deliveryFee.toFixed(2)}`}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Service Fee</span>
            <span>${serviceFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Taxes & GST</span>
            <span>${gst.toFixed(2)}</span>
          </div>
        </div>
        <div className="h-px bg-gray-200" />
        <div className="flex justify-between text-lg font-bold text-gray-800">
          <span>Final Total</span>
          <span>${finalTotal.toFixed(2)}</span>
        </div>
      </div>

      {/* Checkout Button */}
      <div>
        <button
          onClick={handleCheckout}
          className="w-full flex items-center justify-center px-6 py-4 bg-green-500 hover:bg-green-600 text-white font-bold text-lg rounded-xl shadow-lg transition-colors"
        >
          <Icon name="indian-rupee" className="w-5 h-5 mr-2" />
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default OrderSummarySection;
