import React, { useState } from "react";
import {
  ShoppingCart,
  MapPin,
  CreditCard,
  Truck,
  Plus,
  Minus,
  Trash2,
  Edit3,
  Clock,
  Star,
  Tag,
  Gift,
  Info,
  ChevronRight,
  Home,
  Building,
  User,
  Phone,
  CheckCircle,
  AlertCircle,
  Percent,
  Receipt,
  ArrowRight,
  Heart,
  RotateCcw,
} from "lucide-react";
import CartNavigation from "../components/CartPage/CartNavigation";

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

  const [selectedAddress, setSelectedAddress] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState(0);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [deliveryInstructions, setDeliveryInstructions] = useState("");

  const addresses = [
    {
      id: 1,
      type: "Home",
      icon: Home,
      address: "123 Main Street, Apt 4B",
      city: "New York, NY 10001",
      landmark: "Near Central Park",
      isDefault: true,
    },
    {
      id: 2,
      type: "Work",
      icon: Building,
      address: "456 Business Ave, Floor 12",
      city: "New York, NY 10005",
      landmark: "Manhattan Financial District",
      isDefault: false,
    },
  ];

  const paymentMethods = [
    {
      id: 1,
      type: "Credit Card",
      details: "Visa ending in 4242",
      icon: CreditCard,
      isDefault: true,
    },
    {
      id: 2,
      type: "PayPal",
      details: "john.doe@email.com",
      icon: CreditCard,
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

  // Calculate totals
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
  const gst = subtotal * 0.08; // 8% GST

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
    // Checkout logic here
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-cream">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto text-center">
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-16 h-16 text-medium-gray" />
            </div>
            <h2 className="text-2xl font-bold text-charcoal mb-4">
              Your cart is empty
            </h2>
            <p className="text-medium-gray mb-8">
              Add some delicious items to get started!
            </p>
            <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all">
              Browse Restaurants
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
    <CartNavigation/>
      <div className="min-h-screen bg-cream">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-charcoal mb-2">Your Cart</h1>
            <p className="text-medium-gray">
              {cartItems.length} items in your cart
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* ───────── LEFT COLUMN ───────── */}
            <div className="lg:col-span-1 space-y-6">
              {/* Delivery Address */}
              <div className="bg-white rounded-2xl shadow-lg border border-cream p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-yellow-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-charcoal">
                    Delivery Address
                  </h3>
                </div>

                <div className="space-y-3">
                  {addresses.map((a, i) => (
                    <div
                      key={a.id}
                      onClick={() => setSelectedAddress(i)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        selectedAddress === i
                          ? "border-yellow-400 bg-yellow-50"
                          : "border-cream hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            selectedAddress === i
                              ? "bg-yellow-400"
                              : "bg-gray-100"
                          }`}
                        >
                          <a.icon
                            className={`w-4 h-4 ${
                              selectedAddress === i
                                ? "text-white"
                                : "text-medium-gray"
                            }`}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-charcoal">
                              {a.type}
                            </span>
                            {a.isDefault && (
                              <span className="px-2 py-0.5 bg-mint-green text-white text-xs rounded-full">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-charcoal">{a.address}</p>
                          <p className="text-sm text-medium-gray">{a.city}</p>
                          {a.landmark && (
                            <p className="text-xs text-medium-gray mt-1">
                              {a.landmark}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  <button className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl text-medium-gray hover:border-yellow-400 hover:text-yellow-600 transition-colors flex items-center justify-center gap-2">
                    <Plus className="w-4 h-4" />
                    Add New Address
                  </button>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-2xl shadow-lg border border-cream p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-yellow-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-charcoal">
                    Payment Method
                  </h3>
                </div>

                <div className="space-y-3">
                  {paymentMethods.map((m, i) => (
                    <div
                      key={m.id}
                      onClick={() => setSelectedPayment(i)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        selectedPayment === i
                          ? "border-yellow-400 bg-yellow-50"
                          : "border-cream hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            selectedPayment === i
                              ? "bg-yellow-400"
                              : "bg-gray-100"
                          }`}
                        >
                          <m.icon
                            className={`w-4 h-4 ${
                              selectedPayment === i
                                ? "text-white"
                                : "text-medium-gray"
                            }`}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-charcoal">
                              {m.type}
                            </span>
                            {m.isDefault && (
                              <span className="px-2 py-0.5 bg-mint-green text-white text-xs rounded-full">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-medium-gray">
                            {m.details}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                  <button className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl text-medium-gray hover:border-yellow-400 hover:text-yellow-600 transition-colors flex items-center justify-center gap-2">
                    <Plus className="w-4 h-4" />
                    Add Payment Method
                  </button>
                </div>
              </div>

              {/* Delivery Instructions */}
              <div className="bg-white rounded-2xl shadow-lg border border-cream p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Truck className="w-5 h-5 text-yellow-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-charcoal">
                    Delivery Instructions
                  </h3>
                </div>

                <textarea
                  value={deliveryInstructions}
                  onChange={(e) => setDeliveryInstructions(e.target.value)}
                  placeholder="Add delivery instructions (optional)"
                  rows={3}
                  className="w-full p-3 border border-cream rounded-lg focus:ring-2 focus:ring-yellow-400 resize-none"
                />

                <div className="mt-3 flex items-center gap-2 text-sm text-medium-gray">
                  <Info className="w-4 h-4" />
                  e.g., "Leave at door", "Ring bell", "Call when arrived"
                </div>
              </div>
            </div>

            {/* ───────── RIGHT COLUMN ───────── */}
            <div className="lg:col-span-2 space-y-6">
              {/* Cart Items */}
              <div className="bg-white rounded-2xl shadow-lg border border-cream p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-charcoal">
                    Order Items
                  </h3>
                  <span className="text-medium-gray">
                    {cartItems.length} items
                  </span>
                </div>

                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 p-4 border border-cream rounded-xl hover:border-gray-300 transition-colors"
                    >
                      {/* Image */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 rounded-lg object-cover bg-gray-200 flex-shrink-0"
                      />

                      {/* Details */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-charcoal">
                              {item.name}
                            </h4>
                            <p className="text-sm text-medium-gray">
                              {item.restaurant}
                            </p>
                            {item.customizations.length > 0 && (
                              <p className="text-xs text-medium-gray mt-1">
                                {item.customizations.join(", ")}
                              </p>
                            )}
                          </div>

                          {/* Remove */}
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>

                        {/* Price & Quantity */}
                        <div className="flex items-end justify-between mt-4">
                          <div className="flex items-baseline gap-2">
                            <span className="text-lg font-bold text-charcoal">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                            {item.price < item.originalPrice && (
                              <span className="text-sm line-through text-medium-gray">
                                $
                                {(item.originalPrice * item.quantity).toFixed(
                                  2
                                )}
                              </span>
                            )}
                          </div>

                          {/* Quantity controls */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="p-2 bg-gray-100 hover:bg-gray-200 text-medium-gray rounded-lg"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="font-medium text-charcoal w-8 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="p-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Promo + Summary */}
              <div className="bg-white rounded-2xl shadow-lg border border-cream p-6 space-y-6">
                {/* Promo Code */}
                <div>
                  <h3 className="text-lg font-semibold text-charcoal mb-3 flex items-center gap-2">
                    <Tag className="w-5 h-5 text-yellow-600" /> Promo Code
                  </h3>
                  {appliedPromo ? (
                    <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                      <div>
                        <p className="font-semibold text-charcoal">
                          {appliedPromo.code}
                        </p>
                        <p className="text-sm text-medium-gray">
                          {appliedPromo.description}
                        </p>
                      </div>
                      <button
                        onClick={removePromoCode}
                        className="text-red-500 hover:text-red-600 flex items-center gap-1"
                      >
                        <RotateCcw className="w-4 h-4" /> Remove
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Enter promo code"
                        className="flex-1 px-4 py-3 border border-cream rounded-lg focus:ring-2 focus:ring-yellow-400"
                      />
                      <button
                        onClick={applyPromoCode}
                        className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-lg"
                      >
                        Apply
                      </button>
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
                      {deliveryFee === 0
                        ? "Free"
                        : `$${deliveryFee.toFixed(2)}`}
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

                {/* Checkout */}
                <button
                  onClick={handleCheckout}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all text-lg"
                >
                  Checkout <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      );
    </>
  );
};

export default CartPage;
