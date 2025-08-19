import React from 'react';
import Icon from '../../../components/ui/Icon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

/**
 * Renders the order summary section, including promo code application and total calculations.
 *
 * @param {object} props - Component props.
 * @param {string} props.promoCode - The current value of the promo code input.
 * @param {function(React.ChangeEvent<HTMLInputElement>): void} props.setPromoCode - Function to update promo code input.
 * @param {object | null} props.appliedPromo - The currently applied promo object, or null.
 * @param {function(): void} props.applyPromoCode - Function to apply the promo code.
 * @param {function(): void} props.removePromoCode - Function to remove the applied promo code.
 * @param {number} props.subtotal - The sum of all item prices.
 * @param {number} props.itemDiscount - Total discount from individual item price differences.
 * @param {number} props.promoDiscount - Discount applied by the promo code.
 * @param {number} props.deliveryFee - The delivery fee.
 * @param {number} props.serviceFee - The service fee.
 * @param {number} props.gst - The GST/tax amount.
 * @param {number} props.finalTotal - The final calculated total.
 * @param {function(): void} props.handleCheckout - Function to call on checkout.
 * @returns {JSX.Element} The OrderSummarySection component.
 */

const OrderSummarySection = ({
  promoCode,
  setPromoCode,
  appliedPromo,
  applyPromoCode,
  removePromoCode,
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
    <div className="bg-white rounded-2xl shadow-lg border border-cream p-6 space-y-6">
      {/* Promo Code Section */}
      <div>
        <h3 className="text-lg font-semibold text-charcoal mb-3 flex items-center gap-2">
          <Icon name="tag" className="w-5 h-5 text-yellow-600" /> Promo Code
        </h3>
        {appliedPromo ? (
          <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
            <div>
              <p className="font-semibold text-charcoal">{appliedPromo.code}</p>
              <p className="text-sm text-medium-gray">
                {appliedPromo.description}
              </p>
            </div>
            <Button
              onClick={removePromoCode}
              className="text-red-500 hover:text-red-600 flex items-center gap-1"
              type="button" // Important: Ensure this is a button type
            >
              <Icon name="rotate-ccw" className="w-4 h-4" /> Remove
            </Button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Input
              id="promo-code-input" // Add an ID for accessibility
              value={promoCode}
              onChange={e => setPromoCode(e.target.value)}
              placeholder="Enter promo code"
              className="flex-1 px-4 py-3 border border-cream rounded-lg " // Specific styling for this input
            />
            <Button
              onClick={applyPromoCode}
              className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-lg"
              type="button" // Important: Ensure this is a button type
            >
              Apply
            </Button>
          </div>
        )}
      </div>

      {/* Price Breakdown */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        {itemDiscount > 0 && (
          <div className="flex justify-between text-mint-green">
            <span>Item Discounts</span>
            <span>- ${itemDiscount.toFixed(2)}</span>
          </div>
        )}
        {promoDiscount > 0 && (
          <div className="flex justify-between text-mint-green">
            <span>Promo Discount</span>
            <span>- ${promoDiscount.toFixed(2)}</span>
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
          <span>GST (8%)</span>
          <span>${gst.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-charcoal border-t border-cream pt-3">
          <span>Total</span>
          <span>${finalTotal.toFixed(2)}</span>
        </div>
      </div>

      {/* Checkout Button */}
      <Button
        onClick={handleCheckout}
        className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all text-lg"
        type="button" // Important: Ensure this is a button type
      >
        Checkout <Icon name="arrow-right" className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default OrderSummarySection;
