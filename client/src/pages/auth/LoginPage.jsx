import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearAuthError } from '../../features/auth/authSlice';

import Icon from "../../components/ui/Icon"; 

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authState = useSelector((state) => state.auth);
  const currentUser = useSelector((state) => state.auth.user);
  console.log(currentUser);
  const { isLoading, error, isAuthenticated, role } = authState;

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleInputChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearAuthError());

    // IMPORTANT: Replace alert() with a custom message box UI for better UX
    // Alerts are blocking and not user-friendly in React apps.
    if (!formData.email.trim() || !formData.password.trim()) {
      // You could set an error state in Redux or local component state here
      // For example: setLocalError("Email and password are required.");
      console.error("Email and password are required."); // Log for now
      return;
    }

    const resultAction = await dispatch(loginUser(formData));
    console.log(resultAction);

    if (loginUser.fulfilled.match(resultAction)) {
      if (rememberMe && resultAction.payload?.role) {
        localStorage.setItem("role", resultAction.payload.role);
        // If your API sends an accessToken that needs to be persisted here, do it:
        // localStorage.setItem("accessToken", resultAction.payload.token);
      }
      navigate("/restaurants"); // Navigate on successful login
    }
  };

  // Redirect authenticated users
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/restaurants');
    }
  }, [isAuthenticated, navigate]);

  // For logging state (can be removed in production)
  useEffect(() => {
    console.log("Current Redux Auth State:", authState);
    console.log("Current Logged-in User:", currentUser);

    if (isAuthenticated && currentUser) {
      console.log("User logged in successfully:", currentUser);
      console.log("User Role:", role);
    }
  }, [authState, currentUser, isAuthenticated, role]);

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

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-coffee mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Icon name="mail" className="absolute inset-y-0 left-0 pl-3 h-5 w-5 text-medium-gray pointer-events-none" size={20} />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-3 border border-cream rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-charcoal placeholder-medium-gray transition-all duration-200"
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
                  <Icon name="lock" className="absolute inset-y-0 left-0 pl-3 h-5 w-5 text-medium-gray pointer-events-none" size={20} />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-10 py-3 border border-cream rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-charcoal placeholder-medium-gray transition-all duration-200"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (

                      <Icon name="eye-off" className="h-5 w-5 text-medium-gray hover:text-charcoal transition-colors duration-200" size={20} />
                    ) : (

                      <Icon name="eye" className="h-5 w-5 text-medium-gray hover:text-charcoal transition-colors duration-200" size={20} />
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
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-yellow-400 focus:ring-yellow-400 border-cream rounded"
                  />
                  <span className="ml-2 text-sm text-medium-gray">
                    Remember me
                  </span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-yellow-600 hover:text-yellow-700 font-medium transition-colors duration-200"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3 px-4 text-sm font-medium rounded-lg text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 disabled:opacity-50 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                ) : (
                  <>
                    Sign In

                    <Icon name="arrow-right" className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" size={16} /> 
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-cream" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-medium-gray">
                    New to our community?
                  </span>
                </div>
              </div>
            </div>

            {/* Sign-up button */}
            <div className="mt-6 text-center">
              <Link
                to="/signup"
                className="inline-flex justify-center py-3 px-4 border border-yellow-400 text-sm font-medium rounded-lg text-yellow-600 bg-yellow-50 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 transition-all duration-200"
              >
                Create New Account
              </Link>
            </div>
          </div>

          {/* Branding on small screens */}
          <div className="text-center lg:hidden">
            <h3 className="text-xl font-bold text-charcoal mb-2">🍽️ FoodieHub</h3>
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