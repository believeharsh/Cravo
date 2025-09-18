import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, setAuthState } from '../../../features/auth/authSlice';
import { API } from '../../../config/api';
import axiosInstance from '../../../api/axiosInstance';
import { closeAuthSidebar, setAuthMode } from '../../../features/ui/uiSlice';
import Icon from '../../ui/Icon';

const AuthModal = () => {
  const { isAuthSidebarOpen: isOpen, mode } = useSelector(
    state => state.ui.auth
  );
  const { error } = useSelector(state => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // OTP State
  const [otp, setOtp] = useState('');
  const [isOTPLoading, setIsOTPLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(60);
  const [isResending, setIsResending] = useState(false);
  const [otpError, setOTPError] = useState(null);

  const dispatch = useDispatch();

  // OTP Resend Cooldown Timer
  useEffect(() => {
    if (mode === 'otp' && resendCooldown > 0) {
      const timer = setTimeout(() => {
        setResendCooldown(resendCooldown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown, mode]);

  const handleInputChange = e =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleLogin = async e => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await dispatch(loginUser(formData)).unwrap();
      dispatch(closeAuthSidebar());
    } catch (err) {
      console.error('Login failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async e => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axiosInstance.post(API.AUTH.SIGNUP, formData, {
        withCredentials: true,
      });
      if (res.data && res.data.success) {
        dispatch(setAuthMode('otp'));
      }
    } catch (err) {
      console.error('Signup failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async e => {
    e.preventDefault();
    setIsOTPLoading(true);
    setOTPError(null);
    try {
      const res = await axiosInstance.post(API.AUTH.VERIFY_OTP, {
        email: formData.email,
        otp,
      });
      if (res.data.success) {
        const { user, accessToken } = res.data.data;
        dispatch(
          setAuthState({ user: user, token: accessToken, role: user.role })
        );
        dispatch(closeAuthSidebar());
      } else {
        setOTPError(
          res.data.message || 'OTP verification failed. Please try again.'
        );
      }
    } catch (err) {
      setOTPError(
        err.response?.data?.message || 'Something went wrong. Please try again.'
      );
    } finally {
      setIsOTPLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (resendCooldown > 0 || isResending) return;
    setIsResending(true);
    setOTPError(null);
    try {
      await axiosInstance.post(API.AUTH.RESEND_OTP, { email: formData.email });
      setResendCooldown(60);
    } catch (err) {
      setOTPError(
        err.response?.data?.message || 'Failed to resend OTP. Please try again.'
      );
    } finally {
      setIsResending(false);
    }
  };

  const handleGoogleLogin = () => {
    dispatch(closeAuthSidebar());
    window.open(
      `${import.meta.env.VITE_API_URL}${API.AUTH.GOOGLE}`,
      'google-login',
      'width=500,height=600'
    );
  };

  const renderFormContent = () => {
    if (mode === 'otp') {
      return (
        <div className="flex flex-col flex-1 justify-between">
          <div>
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-800">
                Verify Your Email
              </h2>
              <p className="mt-2 text-gray-500 text-sm">
                A 6-digit code has been sent to **{formData.email}**.
              </p>
            </div>
            {otpError && (
              <p className="text-red-500 text-sm text-center mb-4">
                {otpError}
              </p>
            )}
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
              <button
                type="submit"
                disabled={isOTPLoading}
                className="w-full bg-yellow-500 text-white font-semibold py-3 rounded-xl shadow-lg hover:bg-yellow-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isOTPLoading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </form>
          </div>
          <div className="text-center mt-auto">
            <p className="text-gray-500 text-sm">
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
        </div>
      );
    }

    // Default rendering for login and signup modes
    return (
      <div className="flex flex-col flex-1 justify-between">
        <div>
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-800">
              {mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="mt-2 text-gray-500 text-sm">
              {mode === 'login'
                ? 'Sign in to continue your journey.'
                : 'Join us and discover more.'}
            </p>
          </div>

          {error && (
            <div className="text-red-500 text-center mb-4 p-2 rounded-md bg-red-100 border border-red-200">
              {error}
            </div>
          )}

          <form
            onSubmit={mode === 'login' ? handleLogin : handleSignup}
            className="space-y-4"
          >
            {mode === 'signup' && (
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-200"
              />
            )}
            <input
              type="email"
              name="email"
              placeholder="Email address"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-200"
            />
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-gray-500 hover:text-gray-700 transition-colors"
              >
                <Icon
                  name={showPassword ? 'eye-off' : 'eye'}
                  className="w-5 h-5"
                />
              </button>
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-yellow-500 text-white font-semibold py-3 rounded-xl shadow-lg hover:bg-yellow-600 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <>{mode === 'login' ? 'Sign In' : 'Sign Up'}</>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-auto pt-6">
          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-200" />
            <span className="mx-4 text-gray-400 text-sm">or</span>
            <hr className="flex-grow border-gray-200" />
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-xl hover:bg-gray-50 transition-colors duration-200"
          >
            <img
              src="https://img.icons8.com/color/48/000000/google-logo.png"
              alt="Google"
              className="w-6 h-6"
            />
            <span className="text-gray-700 font-medium cursor-pointer">
              Continue with Google
            </span>
          </button>

          <p className="mt-4 text-sm text-gray-500">
            {mode === 'login'
              ? "Don't have an account?"
              : 'Already have an account?'}
            <button
              onClick={() => {
                if (mode === 'login') {
                  dispatch(setAuthMode('signup'));
                } else {
                  dispatch(setAuthMode('login'));
                }
              }}
              className="text-yellow-600 font-semibold ml-1 hover:underline"
            >
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-start p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-gray-200 opacity-20"
            onClick={() => dispatch(closeAuthSidebar())}
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.4 }}
            className="relative h-full w-full max-w-sm bg-white rounded-3xl shadow-2xl flex flex-col p-8 md:p-10"
          >
            <button
              onClick={() => dispatch(closeAuthSidebar())}
              className="absolute cursor-pointer top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors duration-200"
              aria-label="Close"
            >
              <Icon name="x-circle" className="w-6 h-6" />
            </button>
            {renderFormContent()}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
