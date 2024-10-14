// src/components/ShopperPage.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../features/cartSlice';

const ShopperPage = () => {
  const products = useSelector((state) => state.products.products); // This gets the current products
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    alert(`${product.name} has been added to your cart!`);
  };

  const handleCheckout = () => {
    navigate('/cart'); // Change to navigate to cart first
  };

  return (
    <div className="shopper-page-container" style={{ color: 'white', padding: '20px' }}>
      <h2 className="page-title" style={{ fontSize: '24px', fontWeight: 'bold' }}>Available Products</h2>
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product.id} className="product-item" style={{ marginBottom: '15px' }}>
            <span>{product.name} - ${product.price} (Qty: {product.quantity})</span>
            {product.quantity > 0 ? (
              <button 
                onClick={() => handleAddToCart(product)} 
                className="add-to-cart-button"
                style={{
                  backgroundColor: '#2D3748', // Darker background for the button
                  color: 'white',
                  padding: '10px 15px',
                  borderRadius: '5px',
                  marginLeft: '10px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s',
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#4A5568')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#2D3748')}
              >
                Add to Cart
              </button>
            ) : (
              <span style={{ color: 'red', marginLeft: '10px' }}>Out of Stock</span>
            )}
          </div>
        ))
      ) : (
        <p>No products available.</p>
      )}
      <button 
        onClick={handleCheckout} 
        className="checkout-button" 
        style={{
          backgroundColor: '#F56565', // Adjusted to fit the theme
          color: 'white',
          padding: '10px 15px',
          borderRadius: '5px',
          marginTop: '20px',
          cursor: 'pointer',
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#C53030')}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#F56565')}
      >
        Go to Checkout
      </button>
    </div>
  );
};

export default ShopperPage;
