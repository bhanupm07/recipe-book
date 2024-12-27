import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        to="/"
        className="px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-md text-lg"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
