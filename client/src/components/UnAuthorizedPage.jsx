import React from 'react';
import { Link } from 'react-router-dom';

const UnauthorizedPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="mb-4 text-4xl font-bold text-red-600">
        403 - Unauthorized Access
      </h1>
      <p className="text-text-secondary mb-8 text-center text-lg">
        You do not have permission to view this page.
        <br />
        Please log in with an authorized account or contact support.
      </p>
      <Link
        to="/"
        className="focus:shadow-outline rounded-md bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
      >
        Go to Home
      </Link>
      <Link
        to="/login"
        className="mt-4 font-semibold text-blue-500 hover:text-blue-700"
      >
        Go to Login Page
      </Link>
    </div>
  );
};

export default UnauthorizedPage;
