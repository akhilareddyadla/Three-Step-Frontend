import React from "react";

const ProfilePage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="text-center p-6 bg-white rounded-lg shadow-xl max-w-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome</h1>
        <p className="text-lg text-gray-600 mb-6">
          We are so happy to have you here. Enjoy your Browsing!
        </p>
        <button className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-500 transition-all duration-300">
          Explore
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
