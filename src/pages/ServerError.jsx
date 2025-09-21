import React from 'react';

const ServerError = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <img 
        src="https://cdni.iconscout.com/illustration/premium/thumb/server-error-illustration-download-in-svg-png-gif-file-formats--unable-to-load-connection-lost-some-thing-went-wrong-simple-empty-state-pack-user-interface-illustrations-6024632.png" // Example image, replace with your own
        alt="Server Down"
        className="w-48 h-48 mb-6"
      />
      <h1 className="text-4xl font-bold text-gray-800 mb-4">😔 Oops! Server Failed</h1>
      <p className="text-lg text-gray-600 mb-8">
        We’re having trouble connecting to the server. Please try again later.
      </p>
      <button 
        className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-600 transition duration-300"
        onClick={() => window.location.reload()}
      >
        🔄 Reload Page
      </button>
    </div>
  );
};

export default ServerError;
