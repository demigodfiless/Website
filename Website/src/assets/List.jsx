// src/components/ProductList.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../features/productSlice';

const ProductList = () => {
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    if (product.quantity > 0) {
      dispatch(addToCart(product));
    } else {
      alert('This product is out of stock');
    }
  };

  const viewProductDetails = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <span>{product.name} - ${product.price} (Qty: {product.quantity})</span>
          <button onClick={() => handleAddToCart(product)} disabled={product.quantity === 0}>
            {product.quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
          <button onClick={() => viewProductDetails(product.id)}>View Details</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
