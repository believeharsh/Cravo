import React, { useState } from 'react';
import Icon from '../../../ui/Icon';
import LoadingSpinner from '../../../ui/LoadingSpinner';
import SocialLoginButton from '../SocialLoginButton';

const LoginForm = ({
  formData,
  onChange,
  onSubmit,
  isLoading,
  error,
  onGoogleLogin,
  onSwitchMode,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col flex-1 justify-between">
      <div>
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
          <p className="mt-2 text-gray-500 text-sm">
            Sign in to continue your journey.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-red-500 text-center mb-4 p-3 rounded-lg bg-red-50 border border-red-200">
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email address"
            required
            value={formData.email}
            onChange={onChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-200"
          />

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={onChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-200"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
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
            {isLoading ? <LoadingSpinner /> : 'Sign In'}
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

        <SocialLoginButton onClick={onGoogleLogin} />

        <p className="mt-4 text-sm text-gray-500">
          Don't have an account?
          <button
            onClick={onSwitchMode}
            className="text-yellow-600 font-semibold ml-1 hover:underline"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
