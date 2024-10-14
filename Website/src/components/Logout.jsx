// src/components/LogoutButton.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../features/userSlice';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) { // Confirmation dialog
      dispatch(logoutUser());
      localStorage.removeItem('users'); // Clear localStorage
      alert('You have been logged out!'); // Feedback message
      navigate('/'); // Redirect to home page
    }
  };

  return (
    <button 
      onClick={handleLogout} 
      className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition duration-300 ease-in-out"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
