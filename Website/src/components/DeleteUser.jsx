// src/components/Dashboard.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUser } from '../features/userSlice';
import { addProduct, purchaseProduct } from '../features/productSlice';

const Dashboard = () => {
  const currentUser = useSelector((state) => state.users.currentUser);
  const users = useSelector((state) => state.users.users);
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();

  if (!currentUser) {
    return (
      <div>
        <h2>Please log in to access the dashboard.</h2>
        <button onClick={() => window.location.href = '/'}>Go to Home</button>
      </div>
    );
  }

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
  };

  const handleAddProduct = () => {
    const product = { id: Date.now(), name: 'New Product', price: 100, quantity: 10 };
    dispatch(addProduct(product));
  };

  const handlePurchase = (id) => {
    dispatch(purchaseProduct({ id, quantity: 1 }));
  };

  return (
    <div className="dashboard-container">
      <h2>Welcome, {currentUser.username}!</h2>

      {currentUser.role === 'admin' && (
        <div>
          <h3>Manage Users</h3>
          {users.map((user) => (
            <div key={user.id}>
              <span>{user.username} ({user.role})</span>
              <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}

      {currentUser.role === 'seller' && (
        <div>
          <h3>Add New Product</h3>
          <button onClick={handleAddProduct}>Add Product</button>
        </div>
      )}

      {currentUser.role === 'shopper' && (
        <div>
          <h3>Available Products</h3>
          {products.map((product) => (
            <div key={product.id}>
              <span>{product.name} - ${product.price} (Qty: {product.quantity})</span>
              <button onClick={() => handlePurchase(product.id)}>Buy</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
