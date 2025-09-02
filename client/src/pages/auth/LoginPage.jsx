import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  loginUser,
  clearAuthError,
  setAuthState,
} from '../../features/auth/authSlice';

// Set up axios to send cookies with every request
axios.defaults.withCredentials = true;

const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-5 w-5 text-medium-gray"
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
    className="h-5 w-5 text-medium-gray"
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
    className="h-5 w-5 text-medium-gray"
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
    className="h-5 w-5 text-medium-gray"
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
    <div className="min-h-screen flex">
      {/* Left side — hero image & copy */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=2070&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40" />
          <div className="relative z-10 flex flex-col justify-center items-start p-12 text-white">
            <h1 className="text-4xl font-bold mb-4">Welcome Back to</h1>
            <h2 className="text-5xl font-bold text-yellow-400 mb-6">
              FoodieHub
            </h2>
            <p className="text-xl text-gray-200 max-w-md leading-relaxed">
              Discover amazing recipes, connect with fellow food lovers, and
              embark on your culinary journey.
            </p>
            <div className="mt-8 flex items-center space-x-4">
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-2xl">🍳</span>
              </div>
              <div className="w-12 h-12 bg-mint-green rounded-full flex items-center justify-center">
                <span className="text-2xl">🥗</span>
              </div>
              <div className="w-12 h-12 bg-coffee rounded-full flex items-center justify-center">
                <span className="text-2xl">☕</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side — form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-yellow-50 to-cream">
        <div className="max-w-md w-full space-y-8">
          {/* Heading */}
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-yellow-400 rounded-full flex items-center justify-center mb-6 shadow-lg">
              <span className="text-2xl">🍽️</span>
            </div>
            <h2 className="text-3xl font-bold text-charcoal">Welcome Back</h2>
            <p className="mt-2 text-medium-gray">
              Sign in to continue your culinary adventure
            </p>
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-cream backdrop-blur-sm">
            {error && (
              <p className="mb-4 text-sm text-red-500 text-center font-medium">
                {error}
              </p>
            )}

            <form className="space-y-6" onSubmit={handleLogin}>
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-coffee mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <MailIcon className="absolute inset-y-0 left-0 pl-3 top-1/2 -translate-y-1/2 h-5 w-5 text-medium-gray pointer-events-none" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-3 border border-cream rounded-lg focus:outline-none focus:ring-yellow-400 text-charcoal placeholder-medium-gray transition-all duration-200"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-coffee mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <LockClosedIcon className="absolute inset-y-0 left-0 pl-3 top-1/2 -translate-y-1/2 h-5 w-5 text-medium-gray pointer-events-none" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-10 py-3 border border-cream rounded-lg focus:outline-none focus:ring-yellow-400 text-charcoal placeholder-medium-gray transition-all duration-200"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-5 w-5 text-medium-gray hover:text-charcoal transition-colors duration-200" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-medium-gray hover:text-charcoal transition-colors duration-200" />
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
                    className="h-4 w-4 text-yellow-400 border-cream rounded-2xl"
                  />
                  <span className="ml-2 text-sm text-medium-gray">
                    Remember me
                  </span>
                </label>
                <a
                  href="#"
                  className="text-sm text-yellow-600 hover:text-yellow-700 font-medium transition-colors duration-200"
                >
                  Forgot password?
                </a>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3 px-4 text-sm font-medium rounded-lg text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-offset-2 focus:ring-yellow-400 disabled:opacity-50 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                ) : (
                  <>
                    Sign In
                    <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="mt-6 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-cream" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-medium-gray font-semibold">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google Login Button */}
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="inline-flex items-center justify-center py-3 px-4 border border-coffee text-sm font-medium rounded-lg text-coffee bg-white hover:bg-cream focus:outline-none focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <img
                  src="https://img.icons8.com/color/48/000000/google-logo.png"
                  alt="Google"
                  className="w-5 h-5 mr-3"
                />
                Sign in with Google
              </button>
            </div>

            <div className="mt-6 text-center">
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-medium-gray">
                  New to our community?
                </span>
              </div>
              <a
                href="#"
                className="inline-flex justify-center py-3 px-4 border border-yellow-400 text-sm font-medium rounded-lg text-yellow-600 bg-yellow-50 hover:bg-yellow-100 focus:outline-none focus:ring-offset-2 transition-all duration-200"
              >
                Create New Account
              </a>
            </div>
          </div>

          {/* Branding on small screens */}
          <div className="text-center lg:hidden">
            <h3 className="text-xl font-bold text-charcoal mb-2">
              🍽️ FoodieHub
            </h3>
            <p className="text-sm text-medium-gray">
              Your culinary journey starts here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
