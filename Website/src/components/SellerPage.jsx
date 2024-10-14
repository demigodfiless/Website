// src/components/SellerPage.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct, setProducts } from '../features/productSlice';
import { useNavigate } from 'react-router-dom';

const SellerPage = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.users.currentUser);
  const products = useSelector((state) => state.products.products);

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (name && price && quantity) {
      // Check if product with the same name already exists for this seller
      const existingProduct = products.find((product) => product.name === name && product.sellerId === currentUser.id);
      if (existingProduct) {
        alert("You already have a product with this name.");
        return;
      }

      const newProduct = {
        id: Date.now(),
        name,
        price: parseFloat(price),
        quantity: parseInt(quantity, 10),
        sellerId: currentUser.id,
      };
      dispatch(addProduct(newProduct));
      setName('');
      setPrice('');
      setQuantity('');
    }
  };

  const handleUpdateProduct = (productId, newQuantity) => {
    const updatedProducts = products.map((product) =>
      product.id === productId ? { ...product, quantity: newQuantity } : product
    );
    dispatch(setProducts(updatedProducts)); // Dispatch the updated products
  };

  if (!currentUser || currentUser.role !== 'seller') {
    return (
      <div className="alert">
        <h2>Please log in as a seller to add products.</h2>
        <button onClick={() => navigate('/')}>Go to Home</button>
      </div>
    );
  }

  return (
    <div className="seller-page-container">
      <h2 className="page-title">Add New Product</h2>
      <form onSubmit={handleAddProduct} className="product-form">
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="input-field"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="input-field"
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
          className="input-field"
        />
        <button type="submit" className="submit-button">Add Product</button>
      </form>

      <h3 className="your-products-title">Your Products</h3>
      {products.length > 0 ? (
        products
          .filter((product) => product.sellerId === currentUser.id || product.sellerId === undefined) // Display all products for the seller
          .map((product) => (
            <div key={product.id} className="product-item">
              <span>{product.name} - ${product.price} (Qty: </span>
              <input
                type="number"
                value={product.quantity}
                onChange={(e) => handleUpdateProduct(product.id, parseInt(e.target.value, 10))}
                className="quantity-input"
                min="0"
              />
              <span>)</span>
            </div>
          ))
      ) : (
        <p>No products added yet.</p>
      )}
    </div>
  );
};

export default SellerPage;
