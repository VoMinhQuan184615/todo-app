import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 text-center">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">
        Welcome to My Website
      </h1>
      <p className="text-lg text-gray-700 mb-8">
        This is the Home Page. You can explore or test navigation below.
      </p>

      <div className="flex gap-4">
        <Link
          to="/"
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Go to Home
        </Link>

        <Link
          to="/something-wrong"
          className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Test 404 Page
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
