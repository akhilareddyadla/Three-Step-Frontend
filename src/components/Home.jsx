import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
      {/* Main Section */}
      <div className="w-full py-8 bg-gradient-to-r text-black shadow-lg">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Secure Access</h1>
          <p className="text-lg md:text-2xl font-light">Your three-level authentication system for ultimate security</p>
        </div>
      </div>

      {/* Content Section */}
      <main className="flex flex-col items-center py-16 px-6 space-y-16 w-full bg-white shadow-lg">
        {/* Introduction */}
        <section className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold mb-6 text-gray-900">
            Authenticate in Three Simple Steps
          </h2>
          <p className="text-lg text-gray-700">
            For enhanced security, our system uses a three-stage authentication process. Begin with a secure text-based password, proceed to graphical pattern verification, and finish with cutting-edge facial recognition technology.
          </p>
        </section>

        {/* Authentication Steps */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {/* Step 1: Text-based Password */}
          <Link
            to="/first_level"
            className="group flex flex-col items-center bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-2xl hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="bg-blue-500 p-4 rounded-full mt-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 2.485 0 4 2 4h.001c1.104 0 2-.896 2-2s-.896-2-2-2 0-4-2-4-2 1.515-2 4 0 2-2 2-2-.896-2-2-.896-2-2-2-2 2.485-2 4z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mt-6 text-gray-900 group-hover:text-blue-600">
              Password Authentication
            </h3>
            <p className="text-gray-600 mt-3 mb-8 text-center px-6">
              Enter your text-based password to start the authentication process.
            </p>
          </Link>

          {/* Step 2: Graphical Pattern */}
          <Link
            to="/second_level"
            className="group flex flex-col items-center bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-2xl hover:border-green-500 transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="bg-green-500 p-4 rounded-full mt-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 12h2m-1 1v2m0-6V9m-7.071-7.071a8 8 0 0111.314 0 8 8 0 010 11.314l-5.657 5.657a8 8 0 01-11.314 0 8 8 0 010-11.314L7.929 1.93z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mt-6 text-gray-900 group-hover:text-green-600">
              Graphical Pattern Recognition
            </h3>
            <p className="text-gray-600 mt-3 mb-8 text-center px-6">
              Draw your personalized pattern for the second step of verification.
            </p>
          </Link>

          {/* Step 3: Facial Recognition */}
          <Link
            to="/third_level"
            className="group flex flex-col items-center bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-2xl hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="bg-purple-500 p-4 rounded-full mt-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11V5a5 5 0 00-10 0v6M5 15v6a5 5 0 0010 0v-6m-7 0v-6a3 3 0 116 0v6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mt-6 text-gray-900 group-hover:text-purple-600">
              Facial Recognition
            </h3>
            <p className="text-gray-600 mt-3 mb-8 text-center px-6">
              Use facial recognition for the final step to complete the process.
            </p>
          </Link>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="w-full bg-gray-900 text-white py-6 mt-auto">
        <div className="text-center text-sm">
          &copy; {new Date().getFullYear()} Secure Access. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
