import React from "react";
import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa";

const NotFound = () => {
  return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">

          <FaExclamationTriangle className="text-5xl text-red-500 mb-4" />

          <h1 className="text-4xl md:text-5xl font-bold mb-2">
              404 - Page Not Found
          </h1>

          <p className="text-gray-600 mb-6 max-w-md">
              Sorry, the page you are looking for doesn’t exist.
          </p>

          <Link
              href="/"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition inline-block"
          >
              Go Back Home
          </Link>
      </div>
  );
};

export default NotFound;