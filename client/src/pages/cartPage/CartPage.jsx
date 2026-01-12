import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCartTotalValue } from '../../features/cart/cartSelectors';
import Icon from '../../components/ui/Icon';

import CartNavigation from './sections/CartNavigation';
import CartItemsSection from './sections/CartItemsSection';
import DeliveryAddressSection from './sections/DeliveryAddressSection';
import PaymentMethodSection from './sections/PaymentMethodSection';
import DeliveryInstructionsSection from './sections/DeliveryInstructionsSection';
import OrderSummarySection from './sections/OrderSummarySection';
import ItemDeleteConfirmation from '../../components/modules/cart/ItemDeleteConfirmModal';
import PaymentStatusModal from './components/PaymentStatusModal';

import { Link } from 'react-router-dom';
import { useOrderActions } from '../../hooks/userOrdersActions';

const CartPage = () => {
  const cart = useSelector(state => state.cart);
  const cartItems = cart.items;

  // Check authentication status
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  // addresses of the user
  const userAddresses = useSelector(state => state.address);

  const { isDeleteModalOpen, modalProps } = useSelector(state => state.ui.cart);

  const addresses = userAddresses.list;
  // 'Debit Card', 'Credit Card', 'UPI', 'Wallet', 'COD'
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
      type: 'COD',
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
    addresses.find(addr => addr.isDefault)?._id || null
  );

  const [selectedPayment, setSelectedPayment] = useState(
    paymentMethods.find(pm => pm.isDefault)?.id || null
  );

  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoMessage, setPromoMessage] = useState('');
  const [deliveryInstructions, setDeliveryInstructions] = useState('');
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

  // Payment Status Modal State
  const [paymentModalState, setPaymentModalState] = useState({
    isOpen: false,
    status: null, // 'success', 'failed', 'cancelled'
    orderDetails: null,
  });

  // Use selectors to get the subtotal and total value from the cart items
  const subtotal = useSelector(selectCartTotalValue);

  // Calculations for order summary
  const originalTotal = cartItems.reduce(
    (sum, item) =>
      sum + (item.product.originalPrice || item.product.price) * item.quantity,
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

  const applyPromoCode = () => {
    const promo = promoCodes.find(p => p.code === promoCode.toUpperCase());
    setPromoMessage('');
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

  const { handleClearOrderState, handleCreateOrder, handleVerifyPayment } =
    useOrderActions();

  const selectedAddressDetails =
    addresses.find(addr => addr._id === selectedAddress) || null;

  console.log('selectedaddress', selectedAddressDetails);

  const selectedPaymentDetails =
    paymentMethods.find(pm => pm.id === selectedPayment) || null;

  const handleRazorpaySuccess = async response => {
    const verificationPayload = {
      razorpay_payment_id: response.razorpay_payment_id,
      razorpay_order_id: response.razorpay_order_id,
      razorpay_signature: response.razorpay_signature,
    };

    try {
      const verifyPayment = await handleVerifyPayment(verificationPayload);
      console.log('verifyPayment Result', verifyPayment);
      console.log(
        'Payment successful. Verification payload:',
        verificationPayload
      );

      setIsCheckoutLoading(false);

      setPaymentModalState({
        isOpen: true,
        status: 'success',
        orderDetails: {
          orderId: response.razorpay_order_id,
          amount: finalTotal,
          paymentMethod: selectedPaymentDetails?.type,
          estimatedTime: '30-40 mins',
          address: `${selectedAddressDetails?.addressLine1}, ${selectedAddressDetails?.city}, ${selectedAddressDetails?.state}`,
        },
      });
      // await handleClearUserCart() ;
    } catch (error) {
      console.error('Payment verification failed:', error);
      setIsCheckoutLoading(false);

      setPaymentModalState({
        isOpen: true,
        status: 'failed',
        orderDetails: {
          amount: finalTotal,
          paymentMethod: selectedPaymentDetails?.type,
          errorMessage: 'Payment verification failed. Please contact support.',
        },
      });
    }
  };

  const displayRazorpay = razorpayDetails => {
    const { amount, razorpayOrderId, keyId } = razorpayDetails;

    const options = {
      key: keyId,
      amount: amount,
      currency: razorpayDetails.currency || 'INR',
      name: 'Cravo India Limited',
      order_id: razorpayOrderId,
      handler: handleRazorpaySuccess,
      prefill: {
        /* ... user details ... */
      },
      theme: { color: '#FBBF24' },
      modal: {
        ondismiss: function () {
          console.log('Payment modal closed by user');
          setIsCheckoutLoading(false);

          setPaymentModalState({
            isOpen: true,
            status: 'cancelled',
            orderDetails: {
              amount: finalTotal,
              paymentMethod: selectedPaymentDetails?.type,
            },
          });
        },
      },
    };

    if (window.Razorpay) {
      const rzp1 = new window.Razorpay(options);
      rzp1.on('payment.failed', function (response) {
        console.error('Razorpay Error:', response.error);
        setIsCheckoutLoading(false);

        setPaymentModalState({
          isOpen: true,
          status: 'failed',
          orderDetails: {
            amount: finalTotal,
            paymentMethod: selectedPaymentDetails?.type,
            errorMessage:
              response.error.description ||
              'Payment processing failed. Please try again.',
          },
        });

        handleClearOrderState();
      });
      rzp1.open();
    } else {
      alert('Payment gateway failed to load.');
      handleClearOrderState();
      setIsCheckoutLoading(false);
    }
  };

  const loadRazorpayScript = () => {
    return new Promise(resolve => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleCheckout = async () => {
    setIsCheckoutLoading(true);
    handleClearOrderState();

    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      alert('Payment script could not load. Check your internet connection.');
      setIsCheckoutLoading(false);
      return;
    }

    const orderPayload = {
      deliveryAddress: {
        street: `${selectedAddressDetails?.addressLine1}${selectedAddressDetails?.addressLine2}`,
        city: selectedAddressDetails.city,
        state: selectedAddressDetails.state,
        zipCode: selectedAddressDetails.zipCode,
        country: selectedAddressDetails.country,
      },
      paymentMethod: selectedPaymentDetails.type,
      deliveryMethod: 'Standard',
      promoCode: 'SAVE50',
      guestInfo: {
        name: 'my guest',
        email: 'myguest@gmail.com',
      },
    };

    try {
      const result = await handleCreateOrder(orderPayload).unwrap();
      console.log('result is this', result);
      let razorpayDetails = result;
      displayRazorpay(razorpayDetails);
    } catch (error) {
      console.error('Order Creation Failed:', error);
      setIsCheckoutLoading(false);
      setPaymentModalState({
        isOpen: true,
        status: 'failed',
        orderDetails: {
          amount: finalTotal,
          paymentMethod: selectedPaymentDetails?.type,
          errorMessage: 'Failed to create order. Please try again.',
        },
      });
    }
  };

  const closePaymentModal = () => {
    setPaymentModalState({
      isOpen: false,
      status: null,
      orderDetails: null,
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center font-sans">
        <div className="max-w-md mx-auto text-center p-8 bg-white rounded-3xl shadow-lg">
          <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="user" className="w-12 h-12 text-yellow-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Login Required
          </h2>
          <p className="text-gray-600 mb-8">
            We are working on guest checkout. Please login to order food!
          </p>
          <Link to={'/login'}>
            <button className="cursor-pointer bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold px-8 py-3 rounded-full shadow-lg transition-all">
              Login to Continue
            </button>
          </Link>
        </div>
      </div>
    );
  }

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
          <Link to={'/restaurants'}>
            <button className="cursor-pointer bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold px-8 py-3 rounded-full shadow-lg transition-all">
              Browse Restaurants
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 font-sans">
        <CartNavigation />
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column (Items, Delivery & Payment) */}
            <div className="lg:col-span-2 space-y-4">
              <CartItemsSection cartItems={cartItems} />
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
                isCheckoutLoading={isCheckoutLoading}
              />
            </div>
          </div>
        </div>
      </div>

      {isDeleteModalOpen && <ItemDeleteConfirmation />}

      {/* Payment Status Modal */}
      <PaymentStatusModal
        isOpen={paymentModalState.isOpen}
        status={paymentModalState.status}
        orderDetails={paymentModalState.orderDetails}
        onClose={closePaymentModal}
      />

      {/* Loading Overlay */}
      {isCheckoutLoading && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 shadow-2xl text-center">
            <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Processing Payment
            </h3>
            <p className="text-gray-600">
              Please wait while we prepare your order...
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default CartPage;
