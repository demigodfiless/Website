// src/features/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [
    { id: 1, username: 'user1', password: 'pass1', role: 'shopper' },
    { id: 2, username: 'user2', password: 'pass2', role: 'seller' },
    { id: 3, username: 'user3', password: 'pass3', role: 'admin' },
  ],
  currentUser: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    registerUser: (state, action) => {
      state.users.push(action.payload);
    },
    loginUser: (state, action) => {
      const { username, password, role } = action.payload;
      const user = state.users.find(
        (user) => user.username === username && user.password === password && user.role === role
      );
      if (user) {
        state.currentUser = user;
      } else {
        alert('Invalid username, password, or role!'); // Alert for invalid login
      }
    },
    logoutUser: (state) => {
      state.currentUser = null;
    },
    deleteUser: (state, action) => {
      const idToDelete = action.payload;
      state.users = state.users.filter((user) => user.id !== idToDelete);
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    updateUserRole: (state, action) => {
      const { id, newRole } = action.payload;
      const user = state.users.find(user => user.id === id);
      if (user) {
        user.role = newRole; // Update user role
      }
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const { addUser, updateUserRole, setCurrentUser, registerUser, loginUser, logoutUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
