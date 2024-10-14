// src/features/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
    finalizeOrder: (state, action) => {
      // Action payload is the list of items from the cart
      action.payload.forEach(item => {
        // Update the product quantity here
        const productToUpdate = state.items.find(product => product.id === item.id);
        if (productToUpdate) {
          productToUpdate.quantity -= item.quantity; // Reduce stock
        }
      });
      state.items = []; // Clear cart after finalizing order
    },
  },
});

// Export the actions and the reducer
export const { addToCart, removeFromCart, clearCart, finalizeOrder } = cartSlice.actions;
export default cartSlice.reducer;
