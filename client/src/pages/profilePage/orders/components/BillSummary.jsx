import React from 'react';

const BillSummary = ({
  subtotal,
  deliveryFee,
  tax,
  discount,
  total,
  paymentMethod,
}) => {
  return (
    <div className="bg-white rounded-lg p-4">
      <h4 className="font-semibold text-text-main mb-3">Bill Summary</h4>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-text-secondary">
          <span>Subtotal</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-text-secondary">
          <span>Delivery Fee</span>
          <span>₹{deliveryFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-text-secondary">
          <span>Tax & Charges</span>
          <span>₹{tax.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>-₹{discount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between font-bold text-text-main text-base pt-2 border-t border-border">
          <span>Total Paid</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-text-muted mt-1">
          <span>Payment Method</span>
          <span>{paymentMethod}</span>
        </div>
      </div>
    </div>
  );
};

export default BillSummary;
