import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { closeAuthModal } from '../../features/authModal/authModelSlice';
import { setAuthState } from '../../features/auth/authSlice';
import { API } from '../../config/api';
import axiosInstance from '../../api/axiosInstance';

const OTPVerificationModal = ({ isOpen, email, onVerificationSuccess }) => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(60);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => {
        setResendCooldown(resendCooldown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleVerifyOTP = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.post(API.AUTH.VERIFY_OTP, { email, otp });
      console.log('res after otp verification', res);
      if (res.data.success) {
        // Assuming your backend sends back user data on successful verification
        dispatch(
          setAuthState({ user: res.data.data.user, token: res.data.data.token })
        );
        onVerificationSuccess(); // Callback to handle closing modals or navigation
      } else {
        setError(
          res.data.message || 'OTP verification failed. Please try again.'
        );
      }
    } catch (err) {
      console.error('OTP verification failed:', err);
      setError(
        err.response?.data?.message || 'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (resendCooldown > 0 || isResending) return;
    setIsResending(true);
    setError(null);
    try {
      await axiosInstance.post(API.AUTH.RESEND_OTP, { email });
      setResendCooldown(60); // Reset the timer
    } catch (err) {
      console.error('Resend OTP failed:', err);
      setError(
        err.response?.data?.message || 'Failed to resend OTP. Please try again.'
      );
    } finally {
      setIsResending(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[100]"
        >
          <motion.div
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: -50 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-8 rounded-xl shadow-2xl max-w-sm w-full mx-4"
          >
            <button
              onClick={() => dispatch(closeAuthModal())}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors text-3xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
              Verify Your Email
            </h2>
            <p className="text-center text-gray-500 mb-6">
              A 6-digit code has been sent to **{email}**.
            </p>

            <form onSubmit={handleVerifyOTP} className="space-y-6">
              <input
                type="text"
                value={otp}
                onChange={e => setOtp(e.target.value)}
                placeholder="Enter OTP"
                required
                maxLength="6"
                className="w-full text-center text-xl tracking-widest border border-gray-300 rounded-xl px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
              />

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-yellow-500 text-white font-semibold py-3 rounded-xl shadow-lg hover:bg-yellow-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </form>

            <div className="text-center mt-4 text-sm">
              <p className="text-gray-500">
                Didn't receive the code?
                <button
                  onClick={handleResendOTP}
                  disabled={resendCooldown > 0 || isResending}
                  className="text-yellow-600 font-semibold ml-1 hover:underline disabled:text-gray-400 disabled:no-underline"
                >
                  {isResending
                    ? 'Sending...'
                    : `Resend OTP${resendCooldown > 0 ? ` (${resendCooldown}s)` : ''}`}
                </button>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OTPVerificationModal;
