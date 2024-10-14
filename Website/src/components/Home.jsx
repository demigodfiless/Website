import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container flex flex-col items-center justify-center text-center py-10" 
      style={{
        background: 'linear-gradient(to bottom right, #4b4b4b, #d4af37)',
        minHeight: '100vh',
        color: 'white',
      }}
    >
      <h1 className="mb-6 text-4xl font-bold">Welcome to the eCommerce App</h1>
      <p className="text-lg mb-8">
        Manage users, post products, and make purchases. Start exploring!
      </p>

      <div className="home-navigation">
        <h2 className="mb-4 text-2xl font-semibold">Get Started:</h2>
        <ul className="flex flex-col space-y-4">
          <li>
            <Link to="/register" className="text-lg font-semibold transition duration-200 hover:text-gray-200 py-2 px-6 bg-white text-black rounded-lg">
              Register
            </Link>
          </li>
          <li>
            <Link to="/login" className="text-lg font-semibold transition duration-200 hover:text-gray-200 py-2 px-6 bg-white text-black rounded-lg">
              Login
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className="text-lg font-semibold transition duration-200 hover:text-gray-200 py-2 px-6 bg-white text-black rounded-lg">
              Go to Dashboard
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
