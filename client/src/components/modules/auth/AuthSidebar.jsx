import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, setAuthState } from '../../../features/auth/authSlice';
import { closeAuthSidebar, setAuthMode } from '../../../features/ui/uiSlice';
import { useAuthForm } from '../../../hooks/useAuthForm';
import { useOTPVerification } from '../../../hooks/useOTPVerification';
import Icon from '../../ui/Icon';

import LoginForm from './forms/LoginForm';
import SignupForm from './forms/SignupForm';
import OTPVerificationForm from './forms/OTPVerificationForm';

const AuthModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthSidebarOpen: isOpen, mode } = useSelector(
    state => state.ui.auth
  );
  const { error } = useSelector(state => state.auth);

  useEffect(() => {
    if (!isOpen) return;

    const handleOAuthMessage = event => {
      // Extracting base origin from API URL (remove /api/v1, /api, etc.)
      const getServerOrigin = apiUrl => {
        if (!apiUrl) return '';
        try {
          const url = new URL(apiUrl);
          return url.origin; // Returns just http://localhost:8000 in devlopment
        } catch {
          // Fallback: manually remove path
          return apiUrl.replace(/\/api.*$/, '').replace(/\/$/, '');
        }
      };

      const allowedOrigins = [
        import.meta.env.VITE_CLIENT_URL || 'http://localhost:5173',
        import.meta.env.VITE_SERVER_ORIGIN ||
          getServerOrigin(import.meta.env.VITE_API_URL) ||
          'http://localhost:8000',
      ];

      // console.log('📨 Received message from:', event.origin);
      // console.log('✅ Allowed origins:', allowedOrigins);

      // Security: Validate origin
      if (!allowedOrigins.includes(event.origin)) {
        console.warn('🚨 Unauthorized OAuth message origin:', event.origin);
        console.warn('Expected one of:', allowedOrigins);
        return;
      }

      // Validate message structure
      if (event.data?.type !== 'authComplete' || !event.data?.success) {
        return;
      }

      // Validate required data
      const { user, accessToken } = event.data.data || {};
      if (!user || !accessToken) {
        console.error('❌ Invalid OAuth data received');
        return;
      }

      // console.log('✅ OAuth authentication successful');

      // Update auth state
      dispatch(
        setAuthState({
          user,
          token: accessToken,
          role: user.role,
        })
      );

      // Close sidebar and navigate
      dispatch(closeAuthSidebar());
      navigate('/restaurants');
    };

    window.addEventListener('message', handleOAuthMessage);

    return () => {
      window.removeEventListener('message', handleOAuthMessage);
    };
  }, [isOpen, dispatch, navigate]);

  // Custom hooks for form logic
  const authForm = useAuthForm();
  const otpVerification = useOTPVerification(authForm.formData.email);

  const handleClose = () => {
    dispatch(closeAuthSidebar());
    authForm.resetForm();
    otpVerification.resetOTP();
  };

  const handleGoogleLogin = () => {
    const currentOrigin = window.location.origin;
    const width = 500;
    const height = 600;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    // passing the current origin to backend
    window.open(
      `${import.meta.env.VITE_API_URL}/auth/google?origin=${encodeURIComponent(currentOrigin)}`,
      'google-login',
      `width=${width},height=${height},left=${left},top=${top}`
    );
  };

  const renderFormContent = () => {
    switch (mode) {
      case 'otp':
        return (
          <OTPVerificationForm
            email={authForm.formData.email}
            otpVerification={otpVerification}
            onSuccess={() => dispatch(closeAuthSidebar())}
          />
        );

      case 'signup':
        return (
          <SignupForm
            formData={authForm.formData}
            onChange={authForm.handleInputChange}
            onSubmit={authForm.handleSignup}
            isLoading={authForm.isLoading}
            error={error}
            onGoogleLogin={handleGoogleLogin}
            onSwitchMode={() => dispatch(setAuthMode('login'))}
          />
        );

      case 'login':
      default:
        return (
          <LoginForm
            formData={authForm.formData}
            onChange={authForm.handleInputChange}
            onSubmit={authForm.handleLogin}
            isLoading={authForm.isLoading}
            error={error}
            onGoogleLogin={handleGoogleLogin}
            onSwitchMode={() => dispatch(setAuthMode('signup'))}
          />
        );
    }
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
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-gray-200 opacity-20"
            onClick={handleClose}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="relative h-full w-full max-w-sm bg-white rounded-3xl shadow-2xl flex flex-col p-8 md:p-10"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute cursor-pointer top-4 right-4 text-gray-400 hover:text-text-main transition-colors duration-200"
              aria-label="Close authentication modal"
            >
              <Icon name="x-circle" className="w-6 h-6" />
            </button>

            {/* Form Content */}
            {renderFormContent()}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
