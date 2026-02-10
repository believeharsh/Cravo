import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Button from './ui/Button';
import Icon from './ui/Icon';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="via-cream flex min-h-screen items-center justify-center bg-gradient-to-br from-yellow-50 to-green-50 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="via-mint-green to-coffee bg-gradient-to-r from-yellow-400 bg-clip-text text-8xl font-bold text-transparent md:text-9xl">
            404
          </h1>
        </div>

        {/* Main Icon */}
        <div className="mb-8">
          <div className="border-border-focus mx-auto flex h-20 w-20 items-center justify-center rounded-full border-4 bg-white shadow-xl">
            <span className="text-3xl">🍽️</span>
          </div>
        </div>

        {/* Message */}
        <div className="mb-8">
          <h2 className="text-charcoal mb-4 text-2xl font-bold md:text-3xl">
            Page Not Found
          </h2>
          <p className="text-medium-gray mx-auto max-w-md text-lg">
            Sorry, the page you're looking for doesn't exist. Let's get you back
            on track!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/"
            className="bg-primary hover:bg-primary-hover inline-flex transform items-center rounded-xl px-8 py-4 font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
          >
            <Icon name={'home'} className="mr-2 h-5 w-5" />
            Back to Cravo
          </Link>

          <Button
            onClick={handleGoBack}
            className="bg-mint-green inline-flex transform items-center rounded-xl bg-green-500 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
          >
            <Icon name={'arrow-left'} className="mr-2 h-5 w-5" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
