// src/components/Product.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cartSlice';
import { useSelector } from 'react-redux';

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  
  const handleAddToCart = () => {
    if (product.stock > 0) {
      dispatch(addToCart({ id: product.id, quantity: 1 }));
    }
  };

  return (
    <div>
      <h2>{product.name}</h2>
      <p>Price: ${product.price}</p>
      <p>Stock: {product.stock}</p>
      <button onClick={handleAddToCart} disabled={product.stock <= 0}>
        {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
      </button>
    </div>
  );
};

export default Product;
