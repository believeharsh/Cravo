import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axiosInstance from '../api/axiosInstance';
import { API } from '../config/api';
import { setAuthState } from '../features/auth/authSlice';

export const useOTPVerification = email => {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resendCooldown, setResendCooldown] = useState(60);
  const [isResending, setIsResending] = useState(false);

  // Cooldown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => {
        setResendCooldown(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const resetOTP = () => {
    setOtp('');
    setError(null);
    setResendCooldown(60);
  };

  const verifyOTP = async e => {
    e?.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await axiosInstance.post(API.AUTH.VERIFY_OTP, {
        email,
        otp,
      });

      if (res.data.success) {
        const { user, accessToken } = res.data.data;
        dispatch(
          setAuthState({
            user,
            token: accessToken,
            role: user.role,
          })
        );
        return { success: true };
      } else {
        setError(res.data.message || 'OTP verification failed');
        return { success: false };
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Verification failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const resendOTP = async () => {
    if (resendCooldown > 0 || isResending) return;

    setIsResending(true);
    setError(null);

    try {
      await axiosInstance.post(API.AUTH.RESEND_OTP, { email });
      setResendCooldown(60);
      return { success: true };
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || 'Failed to resend OTP';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsResending(false);
    }
  };

  return {
    otp,
    setOtp,
    isLoading,
    error,
    resendCooldown,
    isResending,
    verifyOTP,
    resendOTP,
    resetOTP,
  };
};
