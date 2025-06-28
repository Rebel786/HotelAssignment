import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-200 border-solid rounded-full animate-spin">
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-blue-600 border-solid rounded-full animate-spin"></div>
        </div>
      </div>
      <p className="mt-4 text-gray-600 font-medium">Searching for the best hotels...</p>
      <p className="text-sm text-gray-500">This may take a few moments</p>
    </div>
  );
};

export default LoadingSpinner;
