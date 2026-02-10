import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios';

import {
  clearAuthError,
  loginUser,
  setAuthState,
} from '../../features/auth/authSlice';

// Set up axios to send cookies with every request
axios.defaults.withCredentials = true;

const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="text-medium-gray h-5 w-5"
  >
    <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.62 5.29a3 3 0 01-3.46 0L1.5 8.67z" />
    <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.743 5.975a1.5 1.5 0 001.514 0L22.5 6.908z" />
  </svg>
);

const LockClosedIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="text-medium-gray h-5 w-5"
  >
    <path
      fillRule="evenodd"
      d="M12 1.5a5.25 5.25 0 00-5.25 5.25v2.25H4.875a3 3 0 00-3 3v6A3 3 0 004.875 21h14.25a3 3 0 003-3v-6a3 3 0 00-3-3H17.25V6.75A5.25 5.25 0 0012 1.5zm6 9H6v6a1.5 1.5 0 001.5 1.5h9a1.5 1.5 0 001.5-1.5v-6zm-3 0V6.75a3.75 3.75 0 10-7.5 0V10.5h7.5z"
      clipRule="evenodd"
    />
  </svg>
);

const EyeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="text-medium-gray h-5 w-5"
  >
    <path d="M12 9a3 3 0 100 6 3 3 0 000-6z" />
    <path
      fillRule="evenodd"
      d="M1.643 11.071A11.493 11.493 0 0112 3.75c4.279 0 8.28 1.13 11.357 7.321-.373.916-.628 1.933-.787 3.256-.474 3.284-1.25 6.691-10.57 6.691-9.321 0-10.096-3.407-10.57-6.691a34.735 34.735 0 01-.787-3.256zM12 18.75a7.5 7.5 0 100-15 7.5 7.5 0 000 15z"
      clipRule="evenodd"
    />
  </svg>
);

const EyeOffIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="text-medium-gray h-5 w-5"
  >
    <path d="M3.528 2.653a.75.75 0 10-.943 1.144l4.316 3.551A.75.75 0 008 7.394V6.75a.75.75 0 011.5 0v.644l.872.639.873-.639v-.644a.75.75 0 011.5 0v.644l2.458 1.796c-.53.53-.997 1.054-1.4 1.547l3.636 2.996a.75.75 0 00.943-1.144L18.42 10.87a12.502 12.502 0 003.543 2.053.75.75 0 00.264-1.458A11.002 11.002 0 0112 3.75c-2.455 0-4.78 1.002-6.528 2.653zM12 18.75a7.5 7.5 0 007.037-5.071c-.26.543-.537 1.077-.828 1.6l1.325 1.09a.75.75 0 01-.943 1.144L18.23 16.4a11.497 11.497 0 01-12.872 0l-1.325 1.09a.75.75 0 11-.943-1.144L5.77 14.805c-.29-.523-.568-1.057-.828-1.6A7.501 7.501 0 0012 18.75z" />
    <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-4 w-4"
  >
    <path
      fillRule="evenodd"
      d="M16.72 7.72a.75.75 0 011.06 0l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 11-1.06-1.06l2.47-2.47H3a.75.75 0 010-1.5h16.19l-2.47-2.47a.75.75 0 010-1.06z"
      clipRule="evenodd"
    />
  </svg>
);

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, isLoading, error } = useSelector(
    state => state.auth
  );

  // Redirect authenticated users
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/restaurants');
    }
  }, [isAuthenticated, navigate]);

  // Clear previous errors when the component mounts or when navigating away
  useEffect(() => {
    return () => {
      dispatch(clearAuthError());
    };
  }, [dispatch]);

  const handleInputChange = e =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleLogin = async e => {
    e.preventDefault();
    dispatch(clearAuthError());
    if (!formData.email.trim() || !formData.password.trim()) {
      // Let the thunk's rejection handle the error display
      return;
    }

    const resultAction = await dispatch(loginUser(formData));

    if (loginUser.fulfilled.match(resultAction)) {
      if (rememberMe && resultAction.payload?.role) {
        localStorage.setItem('role', resultAction.payload.role);
        // If your API sends an accessToken that needs to be persisted here, do it:
        // localStorage.setItem("accessToken", resultAction.payload.token);
      }
      // Navigation is now handled by the `useEffect` hook watching `isAuthenticated`.
    }
  };

  const handleGoogleLogin = () => {
    // The global listener in App.jsx will handle the post-login logic.
    // This function's only job is to open the popup.
    window.open(
      'http://localhost:8000/api/v1/auth/google',
      'google-login',
      'width=500,height=600'
    );
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side — hero image & copy */}
      <div className="relative hidden lg:flex lg:w-1/2">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=2070&q=80')",
          }}
        >
          <div className="bg-opacity-40 absolute inset-0 bg-black" />
          <div className="relative z-10 flex flex-col items-start justify-center p-12 text-white">
            <h1 className="mb-4 text-4xl font-bold">Welcome Back to</h1>
            <h2 className="mb-6 text-5xl font-bold text-yellow-400">
              FoodieHub
            </h2>
            <p className="max-w-md text-xl leading-relaxed text-gray-200">
              Discover amazing recipes, connect with fellow food lovers, and
              embark on your culinary journey.
            </p>
            <div className="mt-8 flex items-center space-x-4">
              <div className="bg-primary flex h-12 w-12 items-center justify-center rounded-full">
                <span className="text-2xl">🍳</span>
              </div>
              <div className="bg-mint-green flex h-12 w-12 items-center justify-center rounded-full">
                <span className="text-2xl">🥗</span>
              </div>
              <div className="bg-coffee flex h-12 w-12 items-center justify-center rounded-full">
                <span className="text-2xl">☕</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side — form */}
      <div className="to-cream flex w-full items-center justify-center bg-gradient-to-br from-yellow-50 px-4 sm:px-6 lg:w-1/2 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          {/* Heading */}
          <div className="text-center">
            <div className="bg-primary mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full shadow-lg">
              <span className="text-2xl">🍽️</span>
            </div>
            <h2 className="text-charcoal text-3xl font-bold">Welcome Back</h2>
            <p className="text-medium-gray mt-2">
              Sign in to continue your culinary adventure
            </p>
          </div>

          {/* Card */}
          <div className="border-cream rounded-2xl border bg-white p-8 shadow-xl backdrop-blur-sm">
            {error && (
              <p className="mb-4 text-center text-sm font-medium text-red-500">
                {error}
              </p>
            )}

            <form className="space-y-6" onSubmit={handleLogin}>
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="text-coffee mb-2 block text-sm font-medium"
                >
                  Email Address
                </label>
                <div className="relative">
                  <MailIcon className="text-medium-gray pointer-events-none absolute inset-y-0 top-1/2 left-0 h-5 w-5 -translate-y-1/2 pl-3" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="border-cream text-charcoal placeholder-medium-gray block w-full rounded-lg border py-3 pr-3 pl-10 transition-all duration-200 focus:ring-yellow-400 focus:outline-none"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="text-coffee mb-2 block text-sm font-medium"
                >
                  Password
                </label>
                <div className="relative">
                  <LockClosedIcon className="text-medium-gray pointer-events-none absolute inset-y-0 top-1/2 left-0 h-5 w-5 -translate-y-1/2 pl-3" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="border-cream text-charcoal placeholder-medium-gray block w-full rounded-lg border py-3 pr-10 pl-10 transition-all duration-200 focus:ring-yellow-400 focus:outline-none"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOffIcon className="text-medium-gray hover:text-charcoal h-5 w-5 transition-colors duration-200" />
                    ) : (
                      <EyeIcon className="text-medium-gray hover:text-charcoal h-5 w-5 transition-colors duration-200" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember me & forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                    className="border-cream h-4 w-4 rounded-2xl text-yellow-400"
                  />
                  <span className="text-medium-gray ml-2 text-sm">
                    Remember me
                  </span>
                </label>
                <a
                  href="#"
                  className="text-sm font-medium text-yellow-600 transition-colors duration-200 hover:text-yellow-700"
                >
                  Forgot password?
                </a>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="group bg-primary hover:bg-primary-hover relative flex w-full transform cursor-pointer justify-center rounded-lg px-4 py-3 text-sm font-medium text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl focus:ring-yellow-400 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white" />
                ) : (
                  <>
                    Sign In
                    <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative mt-6">
              <div className="absolute inset-0 flex items-center">
                <div className="border-cream w-full border-t" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="text-medium-gray bg-white px-2 font-semibold">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google Login Button */}
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="border-coffee text-coffee hover:bg-cream inline-flex transform items-center justify-center rounded-lg border bg-white px-4 py-3 text-sm font-medium shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg focus:ring-offset-2 focus:outline-none"
              >
                <img
                  src="https://img.icons8.com/color/48/000000/google-logo.png"
                  alt="Google"
                  className="mr-3 h-5 w-5"
                />
                Sign in with Google
              </button>
            </div>

            <div className="mt-6 text-center">
              <div className="relative flex justify-center text-sm">
                <span className="text-medium-gray bg-white px-2">
                  New to our community?
                </span>
              </div>
              <a
                href="#"
                className="border-border-focus inline-flex justify-center rounded-lg border bg-yellow-50 px-4 py-3 text-sm font-medium text-yellow-600 transition-all duration-200 hover:bg-yellow-100 focus:ring-offset-2 focus:outline-none"
              >
                Create New Account
              </a>
            </div>
          </div>

          {/* Branding on small screens */}
          <div className="text-center lg:hidden">
            <h3 className="text-charcoal mb-2 text-xl font-bold">
              🍽️ FoodieHub
            </h3>
            <p className="text-medium-gray text-sm">
              Your culinary journey starts here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
