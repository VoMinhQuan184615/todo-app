import React from "react";

const NotFound = () => {    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center bg-slate-50">
            <img src="404_NotFound.png" 
            alt="404 Not Found" 
            className="max-w-full mb-6 w-96" />

            <p className="text-xl font-semibold">
                Oops! The page you're looking for doesn't exist.
            </p>

            <a href="/" 
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                Go Back Home
            </a>
        </div>

       
    );
};

export default NotFound;