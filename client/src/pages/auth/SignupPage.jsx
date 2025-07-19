import React, { useState } from "react";
import { Mail, Lock, User, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

const SignupPage = () => {
  const navigate = useNavigate();

  // form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // ui state
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // field change handler
  const handleInputChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  // submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if ([formData.name, formData.email, formData.password].some((f) => !f.trim())) {
      return setError("All fields are required.");
    }

    setIsLoading(true);
    try {
      await axiosInstance.post("/api/v1/auth/signup", formData, {
        headers: { "Content-Type": "application/json" },
        // so the browser keeps the access & refresh cookies
        withCredentials: true,
      });

      navigate("/restaurants");
    } catch (err) {
      if (err.response?.status === 409) {
        setError("A user already exists with this e-mail.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-md w-full space-y-8">
        {/* header */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-green-400 rounded-full flex items-center justify-center mb-6">
            <User className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
          <p className="mt-2 text-gray-600">Join us and get started today</p>
        </div>

        {/* form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-yellow-100">
          {error && (
            <p className="mb-4 text-sm text-red-500 text-center font-medium">{error}</p>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-yellow-800 mb-2">
                Full Name
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleInputChange}
                // className="block w-full px-3 py-3 border border-yellow-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent text-gray-800 placeholder-gray-500"
                placeholder="John Doe"
              />
            </div>

            {/* email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-yellow-800 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute inset-y-0 left-0 pl-3 h-5 w-5 text-gray-500 pointer-events-none" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  // className="block w-full pl-10 pr-3 py-3 border border-yellow-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent text-gray-800 placeholder-gray-500"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            {/* password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-yellow-800 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute inset-y-0 left-0 pl-3 h-5 w-5 text-gray-500 pointer-events-none" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  // className="block w-full pl-10 pr-10 py-3 border border-yellow-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent text-gray-800 placeholder-gray-500"
                  // placeholder="Create a strong password"
                />
                <Button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-500 hover:text-gray-800" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-500 hover:text-gray-800" />
                  )}
                </Button>
              </div>
            </div>

            {/* submit */}
            <Button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 text-sm font-medium rounded-lg text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 disabled:opacity-50 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </>
              )}
            </Button>
          </form>

          {/* sign in */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-yellow-600 hover:text-yellow-700">
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
