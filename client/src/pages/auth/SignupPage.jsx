import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { ArrowRight, Eye, EyeOff, Lock, Mail, User } from 'lucide-react';

import axiosInstance from '../../api/axiosInstance';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const SignupPage = () => {
  const navigate = useNavigate();

  // form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  // ui state
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // field change handler
  const handleInputChange = e =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  // submit handler
  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    if (
      [formData.name, formData.email, formData.password].some(f => !f.trim())
    ) {
      return setError('All fields are required.');
    }

    setIsLoading(true);
    try {
      await axiosInstance.post('/api/v1/auth/signup', formData, {
        headers: { 'Content-Type': 'application/json' },
        // so the browser keeps the access & refresh cookies
        withCredentials: true,
      });

      navigate('/restaurants');
    } catch (err) {
      if (err.response?.status === 409) {
        setError('A user already exists with this e-mail.');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-yellow-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        {/* header */}
        <div className="text-center">
          <div className="bg-secondary mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full">
            <User className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-text-main text-3xl font-bold">Create Account</h2>
          <p className="text-text-secondary mt-2">
            Join us and get started today
          </p>
        </div>

        {/* form */}
        <div className="rounded-2xl border border-yellow-100 bg-white p-8 shadow-xl">
          {error && (
            <p className="mb-4 text-center text-sm font-medium text-red-500">
              {error}
            </p>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-yellow-800"
              >
                Full Name
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleInputChange}
                // className="block w-full px-3 py-3 border border-yellow-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent text-text-main placeholder-gray-500"
                placeholder="John Doe"
              />
            </div>

            {/* email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-yellow-800"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="text-text-muted pointer-events-none absolute inset-y-0 left-0 h-5 w-5 pl-3" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  // className="block w-full pl-10 pr-3 py-3 border border-yellow-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent text-text-main placeholder-gray-500"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            {/* password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-yellow-800"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="text-text-muted pointer-events-none absolute inset-y-0 left-0 h-5 w-5 pl-3" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  // className="block w-full pl-10 pr-10 py-3 border border-yellow-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent text-text-main placeholder-gray-500"
                  // placeholder="Create a strong password"
                />
                <Button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="text-text-muted hover:text-text-main h-5 w-5" />
                  ) : (
                    <Eye className="text-text-muted hover:text-text-main h-5 w-5" />
                  )}
                </Button>
              </div>
            </div>

            {/* submit */}
            <Button
              type="submit"
              disabled={isLoading}
              className="group bg-primary hover:bg-primary-hover relative flex w-full transform cursor-pointer justify-center rounded-lg px-4 py-3 text-sm font-medium text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
            >
              {isLoading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </>
              )}
            </Button>
          </form>

          {/* sign in */}
          <div className="mt-6 text-center">
            <p className="text-text-secondary">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-medium text-yellow-600 hover:text-yellow-700"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
