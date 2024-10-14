// src/components/NavBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from './Logout'; // Ensure the correct import for LogoutButton

const NavBar = () => {
  const isLoggedIn = useSelector((state) => state.users.currentUser);

  return (
    <nav className="navbar flex items-center justify-between p-4 bg-gray-800 bg-opacity-80 backdrop-filter backdrop-blur-lg border-b border-gray-700">
      <div className="logo text-2xl font-bold text-white">
        My eCommerce app
      </div>
      <div className="nav-links flex space-x-6">
        <Link to="/" className="nav-link text-white">Home</Link>
        <Link to="/cart" className="nav-link text-white">Cart</Link>
        <Link to="/dashboard" className="nav-link text-white">Dashboard</Link>
        
        {isLoggedIn ? (
          <LogoutButton /> // Render LogoutButton if user is logged in
        ) : (
          <Link to="/login" className="nav-link text-white">Login</Link> // Render Login link if user is logged out
        )}
      </div>
    </nav>
  );
};

export default NavBar;
