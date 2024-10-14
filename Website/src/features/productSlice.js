// src/features/productSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [
    { id: 1, name: 'Product 1', price: 20, quantity: 10, inStock: true },
    { id: 2, name: 'Product 2', price: 30, quantity: 0, inStock: false },
    { id: 3, name: 'Product 3', price: 15, quantity: 5, inStock: true },
  ],
  cart: [],
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    removeFromCart: (state, action) => {
      const productId = action.payload.id;
      const productIndex = state.cart.findIndex(item => item.id === productId);
      
      if (productIndex >= 0) {
        const product = state.cart[productIndex];
        const productInStock = state.products.find(item => item.id === product.id);
        
        if (productInStock) {
          productInStock.quantity += product.quantity; // Return quantity to stock
        }
        
        state.cart.splice(productIndex, 1); // Remove from cart
      }
    },
    clearCart: (state) => {
      state.cart.forEach(item => {
        const productInStock = state.products.find(product => product.id === item.id);
        if (productInStock) {
          productInStock.quantity += item.quantity; // Return quantity to stock
        }
      });
      state.cart = []; // Clear the cart
    },
    purchaseProduct: (state) => {
      state.cart = []; // Clear the cart after purchase
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    reduceStock: (state, action) => {
      const product = state.products.find((p) => p.id === action.payload.id);
      if (product && product.quantity >= action.payload.quantity) {
        product.quantity -= action.payload.quantity; // Reduce quantity
      }
    },
  },
});

// Export actions and reducer
export const { setProducts, reduceStock, addProduct, removeFromCart, clearCart, purchaseProduct } = productSlice.actions;

export default productSlice.reducer;
