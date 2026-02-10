import React from 'react';
import { Utensils, Clock, Sparkles, ArrowLeft } from 'lucide-react';

const DineoutRestaurantPage = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white flex items-center justify-center px-4">
      {/* Back Button */}
      <button
        onClick={handleGoBack}
        className="cursor-pointer absolute top-6 left-6 flex items-center gap-2 bg-white hover:bg-bg-subtle text-text-main font-semibold px-4 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all border border-border"
      >
        <ArrowLeft className="w-5 h-5" />
        Go Back
      </button>
      <div className="max-w-2xl w-full text-center">
        {/* Icon Container */}
        <div className="relative inline-block mb-8">
          <div className="absolute inset-0 bg-yellow-200 rounded-full blur-2xl opacity-50 animate-pulse"></div>
          <div className="relative w-24 h-24 bg-gradient-to-br from-yellow-400 to-primary-hover rounded-full flex items-center justify-center shadow-xl mx-auto">
            <Utensils className="w-12 h-12 text-text-main" />
          </div>
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
          <Sparkles className="w-4 h-4" />
          Coming Soon
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-text-main mb-4">
          We're Cooking Up
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-primary-hover">
            Something Special
          </span>
        </h1>

        {/* Description */}
        <p className="text-lg text-text-secondary mb-8 leading-relaxed">
          Our dine-out restaurants feature is currently under development. We're
          working hard to bring you an amazing experience very soon!
        </p>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <Clock className="w-5 h-5 text-yellow-600" />
          <p className="text-sm font-semibold text-text-secondary">
            Expected Launch: Very Soon
          </p>
        </div>

        {/* Decorative Element */}
        <div className="flex items-center justify-center gap-2 text-gray-400">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-primary rounded-full animate-bounce"
            style={{ animationDelay: '0.2s' }}
          ></div>
          <div
            className="w-2 h-2 bg-primary rounded-full animate-bounce"
            style={{ animationDelay: '0.4s' }}
          ></div>
        </div>

        {/* Bottom Info */}
        <div className="mt-12 p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
          <p className="text-sm text-text-secondary">
            In the meantime, explore our other amazing features and discover
            great restaurants near you!
          </p>
        </div>
      </div>
    </div>
  );
};

export default DineoutRestaurantPage;
