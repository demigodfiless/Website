// src/components/Dashboard.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import SellerPage from './SellerPage'; // Import SellerPage
import ShopperPage from './ShopperPage'; // Import ShopperPage
import AdminPage from './Admin'; // Import AdminPage or any admin-related functionality

const Dashboard = () => {
  const currentUser = useSelector((state) => state.users.currentUser);

  if (!currentUser) {
    return <h2>Please log in</h2>;
  }

  return (
    <div>
      <h2>Welcome, {currentUser.username}!</h2>
      {currentUser.role === 'seller' && <SellerPage />}
      {currentUser.role === 'shopper' && <ShopperPage />}
      {currentUser.role === 'admin' && <AdminPage />}
    </div>
  );
};

export default Dashboard;
