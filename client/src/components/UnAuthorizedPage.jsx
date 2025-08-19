import React from 'react';
import { Link } from 'react-router-dom';

const UnauthorizedPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-red-600 mb-4">
        403 - Unauthorized Access
      </h1>
      <p className="text-lg text-gray-700 mb-8 text-center">
        You do not have permission to view this page.
        <br />
        Please log in with an authorized account or contact support.
      </p>
      <Link
        to="/"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
      >
        Go to Home
      </Link>
      <Link
        to="/login"
        className="mt-4 text-blue-500 hover:text-blue-700 font-semibold"
      >
        Go to Login Page
      </Link>
    </div>
  );
};

export default UnauthorizedPage;
