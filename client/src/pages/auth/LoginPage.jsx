import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Add your login logic here
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Background Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          
          {/* Content on Image */}
          <div className="relative z-10 flex flex-col justify-center items-start p-12 text-white">
            <h1 className="text-4xl font-bold mb-4">Welcome Back to</h1>
            <h2 className="text-5xl font-bold text-yellow-400 mb-6">FoodieHub</h2>
            <p className="text-xl text-gray-200 max-w-md leading-relaxed">
              Discover amazing recipes, connect with fellow food lovers, and embark on your culinary journey.
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

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-yellow-50 to-cream">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-yellow-400 rounded-full flex items-center justify-center mb-6 shadow-lg">
              <span className="text-2xl">🍽️</span>
            </div>
            <h2 className="text-3xl font-bold text-charcoal">Welcome Back</h2>
            <p className="mt-2 text-medium-gray">Sign in to continue your culinary adventure</p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-cream backdrop-blur-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-coffee mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-medium-gray" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-3 border border-cream rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-charcoal placeholder-medium-gray transition-all duration-200"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-coffee mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-medium-gray" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-10 py-3 border border-cream rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-charcoal placeholder-medium-gray transition-all duration-200"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-medium-gray hover:text-charcoal transition-colors duration-200" />
                    ) : (
                      <Eye className="h-5 w-5 text-medium-gray hover:text-charcoal transition-colors duration-200" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-yellow-400 focus:ring-yellow-400 border-cream rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-medium-gray">
                    Remember me
                  </label>
                </div>
                <Link to="/forgot-password" className="text-sm text-yellow-600 hover:text-yellow-700 font-medium transition-colors duration-200">
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-cream"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-medium-gray">New to our community?</span>
                </div>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <Link 
                to="/signup" 
                className="w-full inline-flex justify-center py-3 px-4 border border-yellow-400 text-sm font-medium rounded-lg text-yellow-600 bg-yellow-50 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 transition-all duration-200"
              >
                Create New Account
              </Link>
            </div>
          </div>

          {/* Mobile App Branding */}
          <div className="text-center lg:hidden">
            <h3 className="text-xl font-bold text-charcoal mb-2">🍽️ FoodieHub</h3>
            <p className="text-sm text-medium-gray">Your culinary journey starts here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
