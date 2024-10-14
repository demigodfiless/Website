import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../features/userSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(''); // No default role
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ensure role is set before dispatching
    if (role) {
      dispatch(loginUser({ username, password, role }));
      navigate('/dashboard'); // Redirect to dashboard after login
    } else {
      alert('Please select a role before logging in!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-800 via-gray-600 to-gray-400 text-white">
      <form onSubmit={handleSubmit} className="bg-gray-900 bg-opacity-80 p-10 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">Login</h2>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full p-3 bg-gray-700 text-white border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 bg-gray-700 text-white border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <div className="mb-6">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            className="w-full p-3 bg-gray-700 text-white border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 cursor-pointer"
          >
            <option value="" disabled>Select Role</option>
            <option value="shopper">Shopper</option>
            <option value="seller">Seller</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-500 text-gray-900 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition duration-300 ease-in-out"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
