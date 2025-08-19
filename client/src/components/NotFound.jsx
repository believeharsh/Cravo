import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from './ui/Icon';
import Button from './ui/Button';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-cream to-green-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-mint-green to-coffee">
            404
          </h1>
        </div>

        {/* Main Icon */}
        <div className="mb-8">
          <div className="mx-auto w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl border-4 border-yellow-400">
            <span className="text-3xl">🍽️</span>
          </div>
        </div>

        {/* Message */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-medium-gray max-w-md mx-auto">
            Sorry, the page you're looking for doesn't exist. Let's get you back
            on track!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/"
            className="inline-flex items-center px-8 py-4 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
          >
            <Icon name={'home'} className="w-5 h-5 mr-2" />
            Back to Cravo
          </Link>

          <Button
            onClick={handleGoBack}
            className="inline-flex items-center px-8 py-4 bg-mint-green bg-green-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
          >
            <Icon name={'arrow-left'} className="w-5 h-5 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
