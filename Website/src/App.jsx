// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar'; // Import NavBar
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import SellerPage from './components/SellerPage'; // Import SellerPage
import ShopperPage from './components/ShopperPage'; // Import ShopperPage
import AdminPage from './components/Admin'; 


const App = () => {
  return (
    <Router>
      <NavBar /> {/* Place NavBar here so it appears on all pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/NavBar" element={<NavBar />} />
        <Route path="/seller" element={<SellerPage />} /> {/* Add this route */}
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/shopper" element={<ShopperPage />} /> {/* Add this route */}
      </Routes>
    </Router>
  );
};

export default App;
