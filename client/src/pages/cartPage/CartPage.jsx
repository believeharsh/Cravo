import React, { useState } from 'react';
import Icon from '../../components/ui/Icon';

import CartNavigation from './sections/CartNavigation';
import CartItemsSection from './sections/CartItemsSection';
import DeliveryAddressSection from './sections/DeliveryAddressSection';
import PaymentMethodSection from './sections/PaymentMethodSection';
import DeliveryInstructionsSection from './sections/DeliveryInstructionsSection';
import OrderSummarySection from './sections/OrderSummarySection';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Margherita Pizza',
      restaurant: "Tony's Italian Kitchen",
      price: 18.99,
      originalPrice: 22.99,
      quantity: 2,
      image: 'https://placehold.co/80x80/ffe5e5/cc5252?text=Pizza',
      customizations: ['Extra cheese', 'Thin crust'],
      isVeg: true,
      rating: 4.8,
      description: 'Fresh mozzarella, tomato sauce, basil',
    },
    {
      id: 2,
      name: 'Chicken Tikka Masala',
      restaurant: 'Spice Garden',
      price: 16.5,
      originalPrice: 16.5,
      quantity: 1,
      image: 'https://placehold.co/80x80/e5fff0/52cc52?text=Curry',
      customizations: ['Medium spice', 'Extra rice'],
      isVeg: false,
      rating: 4.7,
      description: 'Tender chicken in creamy tomato curry',
    },
    {
      id: 3,
      name: 'Caesar Salad',
      restaurant: 'Green Bowl',
      price: 12.99,
      originalPrice: 15.99,
      quantity: 1,
      image: 'https://placehold.co/80x80/e5f0ff/5280cc?text=Salad',
      customizations: ['No croutons', 'Extra dressing'],
      isVeg: true,
      rating: 4.6,
      description: 'Crisp romaine lettuce, parmesan, caesar dressing',
    },
  ]);

  const addresses = [
    {
      id: 1,
      type: 'Home',
      icon: 'home',
      address: '123 Main Street, Apt 4B',
      city: 'New York, NY 10001',
      landmark: 'Near Central Park',
      isDefault: true,
    },
    {
      id: 2,
      type: 'Work',
      icon: 'building',
      address: '456 Business Ave, Floor 12',
      city: 'New York, NY 10005',
      landmark: 'Manhattan Financial District',
      isDefault: false,
    },
  ];

  const paymentMethods = [
    {
      id: 1,
      type: 'Credit Card',
      details: 'Visa ending in 4242',
      icon: 'credit-card',
      isDefault: false,
    },
    {
      id: 2,
      type: 'UPI',
      details: 'Visa ending in 4242',
      icon: 'bank-note',
      isDefault: true,
    },
    {
      id: 3,
      type: 'Debit Card',
      details: 'john.doe@email.com',
      icon: 'credit-card',
      isDefault: false,
    },
    {
      id: 4,
      type: 'Cash On Delivery',
      details: 'john.doe@email.com',
      icon: 'bank-note',
      isDefault: false,
    },
    {
      id: 5,
      type: 'Wallet',
      details: 'john.doe@email.com',
      icon: 'wallet',
      isDefault: false,
    },
  ];

  const promoCodes = [
    {
      code: 'SAVE20',
      discount: 20,
      type: 'percentage',
      minOrder: 25,
      description: '20% off on orders above $25',
    },
    {
      code: 'FLAT10',
      discount: 10,
      type: 'fixed',
      minOrder: 30,
      description: '$10 off on orders above $30',
    },
  ];

  const [selectedAddress, setSelectedAddress] = useState(
    addresses[0]?.id || null
  );
  const [selectedPayment, setSelectedPayment] = useState(
    paymentMethods[0]?.id || null
  );
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoMessage, setPromoMessage] = useState('');
  const [deliveryInstructions, setDeliveryInstructions] = useState('');

  // Calculations for order summary
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const originalTotal = cartItems.reduce(
    (sum, item) => sum + item.originalPrice * item.quantity,
    0
  );
  const itemDiscount = originalTotal - subtotal;
  const deliveryFee = subtotal >= 35 ? 0 : 3.99;
  const serviceFee = 2.5;
  const gst = subtotal * 0.08;

  let promoDiscount = 0;
  if (appliedPromo) {
    if (appliedPromo.type === 'percentage') {
      promoDiscount = (subtotal * appliedPromo.discount) / 100;
    } else {
      promoDiscount = appliedPromo.discount;
    }
  }

  const finalTotal = subtotal + deliveryFee + serviceFee + gst - promoDiscount;

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      setCartItems(prev => prev.filter(item => item.id !== itemId));
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeItem = itemId => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const applyPromoCode = () => {
    const promo = promoCodes.find(p => p.code === promoCode.toUpperCase());
    setPromoMessage(''); // Clear previous message
    if (promo) {
      if (subtotal >= promo.minOrder) {
        setAppliedPromo(promo);
        setPromoCode('');
        setPromoMessage('Promo code applied successfully!');
      } else {
        setPromoMessage(`Minimum order of $${promo.minOrder} required.`);
      }
    } else {
      setPromoMessage('Invalid promo code.');
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    setPromoMessage('');
  };

  const handleCheckout = () => {
    console.log('Proceeding to checkout...');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center font-sans">
        <div className="max-w-md mx-auto text-center p-8 bg-white rounded-3xl shadow-lg">
          <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="shopping-cart" className="w-12 h-12 text-yellow-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-8">
            Start adding delicious items to your order!
          </p>
          <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold px-8 py-3 rounded-full shadow-lg transition-all">
            Browse Restaurants
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <CartNavigation />
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Cart Header */}
        {/* <div className="mb-6">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-1">Your Cart</h1>
          <p className="text-base text-gray-500">
            {cartItems.length} items from {new Set(cartItems.map(item => item.restaurant)).size} restaurant{new Set(cartItems.map(item => item.restaurant)).size > 1 ? 's' : ''}
          </p>
        </div> */}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column (Items, Delivery & Payment) */}
          <div className="lg:col-span-2 space-y-4">
            <CartItemsSection
              cartItems={cartItems}
              updateQuantity={updateQuantity}
              removeItem={removeItem}
            />
            <DeliveryAddressSection
              addresses={addresses}
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
            />
            <PaymentMethodSection
              paymentMethods={paymentMethods}
              selectedPayment={selectedPayment}
              setSelectedPayment={setSelectedPayment}
            />
            <DeliveryInstructionsSection
              deliveryInstructions={deliveryInstructions}
              setDeliveryInstructions={setDeliveryInstructions}
            />
          </div>

          {/* Right Column (Order Summary) */}
          <div className="lg:col-span-1">
            <OrderSummarySection
              promoCode={promoCode}
              setPromoCode={setPromoCode}
              appliedPromo={appliedPromo}
              applyPromoCode={applyPromoCode}
              removePromoCode={removePromoCode}
              promoMessage={promoMessage}
              subtotal={subtotal}
              itemDiscount={itemDiscount}
              promoDiscount={promoDiscount}
              deliveryFee={deliveryFee}
              serviceFee={serviceFee}
              gst={gst}
              finalTotal={finalTotal}
              handleCheckout={handleCheckout}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
