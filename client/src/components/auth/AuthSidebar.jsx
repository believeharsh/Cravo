import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { loginUser, setAuthState } from '../../features/auth/authSlice';
import { closeAuthModal } from '../../features/authModal/authModelSlice';

const AuthSidebar = ({ isOpen }) => {
  const [mode, setMode] = useState('login');
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const handleInputChange = e =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleLogin = async e => {
    e.preventDefault();
    const result = await dispatch(loginUser(formData));
    if (loginUser.fulfilled.match(result)) {
      dispatch(closeAuthModal());
    }
  };

  const handleSignup = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:8000/api/v1/auth/signup',
        formData,
        {
          withCredentials: true,
        }
      );
      dispatch(
        setAuthState({
          user: res.data.user,
          role: res.data.user?.role || null,
          token: null,
        })
      );
      dispatch(closeAuthModal());
    } catch (err) {
      console.error('Signup failed:', err);
    }
  };

  const handleGoogleLogin = () => {
    // The global listener in App.jsx will handle the postMessage event.
    window.open(
      'http://localhost:8000/api/v1/auth/google',
      'google-login',
      'width=500,height=600'
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ duration: 0.4 }}
          className="fixed top-0 left-0 h-full w-96 bg-white shadow-2xl z-50 flex flex-col p-8 md:p-10"
        >
          {/* Close button */}
          <button
            onClick={() => dispatch(closeAuthModal())}
            className="self-end text-gray-400 hover:text-gray-800 transition-colors duration-200 text-3xl mb-4"
          >
            &times;
          </button>

          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              {mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="mt-2 text-gray-500">
              {mode === 'login'
                ? 'Sign in to continue your journey.'
                : 'Join us and discover more.'}
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={mode === 'login' ? handleLogin : handleSignup}
            className="space-y-6 flex-1"
          >
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
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-500 text-white font-semibold py-3 rounded-xl shadow-lg hover:bg-yellow-600 transition-colors duration-200"
            >
              {mode === 'login' ? 'Sign In' : 'Sign Up'}
            </button>
          </form>

          {/* Separator */}
          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-200" />
            <span className="mx-4 text-gray-400 text-sm">or</span>
            <hr className="flex-grow border-gray-200" />
          </div>

          {/* Google login */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-xl hover:bg-gray-50 transition-colors duration-200"
          >
            <img
              src="https://img.icons8.com/color/48/000000/google-logo.png"
              alt="Google"
              className="w-6 h-6"
            />
            <span className="text-gray-700 font-medium">
              Continue with Google
            </span>
          </button>

          {/* Switch mode */}
          <p className="text-center mt-6 text-sm text-gray-500">
            {mode === 'login'
              ? 'Don’t have an account?'
              : 'Already have an account?'}{' '}
            <button
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              className="text-yellow-600 font-semibold hover:underline"
            >
              {mode === 'login' ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthSidebar;
