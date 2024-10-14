import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import productReducer from '../features/productSlice';
import cartReducer from '../features/cartSlice';

// Load users from local storage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('users');
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (err) {
    console.error("Could not load state", err);
    return undefined;
  }
};

// Save users to local storage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state.users);
    localStorage.setItem('users', serializedState);
  } catch (err) {
    console.error("Could not save state", err);
  }
};

// Load the persisted state for users
const persistedState = loadState();

const store = configureStore({
  reducer: {
    users: userReducer,
    products: productReducer,
    cart: cartReducer,
  },
  // Preload persisted state for users only
  preloadedState: {
    users: persistedState || {
      users: [],         // Default to an empty users array
      currentUser: null, // Default current user
    },
  },
});

// Subscribe to store changes and save users to local storage
store.subscribe(() => {
  saveState(store.getState());
});

export default store;
