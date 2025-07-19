import React, { useState } from "react";
import Icon from '../../components/ui/Icon'; 
import Button from '../../components/ui/Button'; 
import CartNavigation from "./sections/CartNavigation";

// Import the new section components
import CartItemsSection from "./sections/CartItemsSection";
import DeliveryAddressSection from "./sections/DeliveryAddressSection";
import PaymentMethodSection from "./sections/PaymentMethodSection";
import DeliveryInstructionsSection from "./sections/DeliveryInstructionsSection";
import OrderSummarySection from "./sections/OrderSummarySection";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Margherita Pizza",
      restaurant: "Tony's Italian Kitchen",
      price: 18.99,
      originalPrice: 22.99,
      quantity: 2,
      image: "/api/placeholder/80/80",
      customizations: ["Extra cheese", "Thin crust"],
      isVeg: true,
      rating: 4.8,
      description: "Fresh mozzarella, tomato sauce, basil",
    },
    {
      id: 2,
      name: "Chicken Tikka Masala",
      restaurant: "Spice Garden",
      price: 16.5,
      originalPrice: 16.5,
      quantity: 1,
      image: "/api/placeholder/80/80",
      customizations: ["Medium spice", "Extra rice"],
      isVeg: false,
      rating: 4.7,
      description: "Tender chicken in creamy tomato curry",
    },
    {
      id: 3,
      name: "Caesar Salad",
      restaurant: "Green Bowl",
      price: 12.99,
      originalPrice: 15.99,
      quantity: 1,
      image: "/api/placeholder/80/80",
      customizations: ["No croutons", "Extra dressing"],
      isVeg: true,
      rating: 4.6,
      description: "Crisp romaine lettuce, parmesan, caesar dressing",
    },
  ]);

  const addresses = [
    {
      id: 1,
      type: "Home",
      icon: "home",
      address: "123 Main Street, Apt 4B",
      city: "New York, NY 10001",
      landmark: "Near Central Park",
      isDefault: true,
    },
    {
      id: 2,
      type: "Work",
      icon: "building",
      address: "456 Business Ave, Floor 12",
      city: "New York, NY 10005",
      landmark: "Manhattan Financial District",
      isDefault: false,
    },
  ];

  const [selectedAddress, setSelectedAddress] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState(0);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [deliveryInstructions, setDeliveryInstructions] = useState("");

  const paymentMethods = [
    {
      id: 1,
      type: "Credit Card",
      details: "Visa ending in 4242",
      icon: "credit-card",
      isDefault: true,
    },
    {
      id: 2,
      type: "PayPal",
      details: "john.doe@email.com",
      icon: "credit-card",
      isDefault: false,
    },
  ];

  const promoCodes = [
    {
      code: "SAVE20",
      discount: 20,
      type: "percentage",
      minOrder: 25,
      description: "20% off on orders above $25",
    },
    {
      code: "FLAT10",
      discount: 10,
      type: "fixed",
      minOrder: 30,
      description: "$10 off on orders above $30",
    },
  ];

  // Calculations for order summary (these remain in CartPage as they depend on multiple states)
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
    if (appliedPromo.type === "percentage") {
      promoDiscount = (subtotal * appliedPromo.discount) / 100;
    } else {
      promoDiscount = appliedPromo.discount;
    }
  }

  const finalTotal = subtotal + deliveryFee + serviceFee + gst - promoDiscount;

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== itemId));
    } else {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeItem = (itemId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const applyPromoCode = () => {
    const promo = promoCodes.find((p) => p.code === promoCode.toUpperCase());
    if (promo && subtotal >= promo.minOrder) {
      setAppliedPromo(promo);
      setPromoCode("");
    } else {
      alert("Invalid promo code or minimum order not met");
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
  };

  const handleCheckout = () => {
    console.log("Proceeding to checkout...");
    // In a real app, this would dispatch an action or navigate to a payment gateway
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-cream">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto text-center">
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="shopping-cart" className="w-16 h-16 text-medium-gray" />
            </div>
            <h2 className="text-2xl font-bold text-charcoal mb-4">
              Your cart is empty
            </h2>
            <p className="text-medium-gray mb-8">
              Add some delicious items to get started!
            </p>
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all">
              Browse Restaurants
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <CartNavigation />
      <div className="min-h-screen bg-cream">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-charcoal mb-2">Your Cart</h1>
            <p className="text-medium-gray">
              {cartItems.length} items in your cart
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column (Address, Payment, Instructions) */}
            <div className="lg:col-span-1 space-y-6">
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

            {/* Right Column (Order Items, Summary) */}
            <div className="lg:col-span-2 space-y-6">
              <CartItemsSection
                cartItems={cartItems}
                updateQuantity={updateQuantity}
                removeItem={removeItem}
              />

              <OrderSummarySection
                promoCode={promoCode}
                setPromoCode={setPromoCode}
                appliedPromo={appliedPromo}
                applyPromoCode={applyPromoCode}
                removePromoCode={removePromoCode}
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
    </>
  );
};

export default CartPage;