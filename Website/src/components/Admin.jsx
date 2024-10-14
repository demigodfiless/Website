import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUser, updateUserRole, registerUser } from '../features/userSlice';

const AdminPage = () => {
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();

  // State for adding new user
  const [newUser, setNewUser] = useState({ username: '', password: '', role: 'shopper' });

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
  };

  const handleChangeRole = (id, newRole) => {
    dispatch(updateUserRole({ id, newRole }));
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    if (newUser.username && newUser.password) {
      const userToAdd = { id: Date.now(), ...newUser };
      dispatch(registerUser(userToAdd)); // Dispatch the registration action
      setNewUser({ username: '', password: '', role: 'shopper' }); // Reset the form
    }
  };

  return (
    <div className="admin-container">
      <h2 className="page-title">Manage Users</h2>

      {/* Form for adding new users */}
      <form onSubmit={handleAddUser} className="add-user-form">
        <input
          type="text"
          placeholder="Username"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          required
        />
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
        >
          <option value="admin">Admin</option>
          <option value="seller">Seller</option>
          <option value="shopper">Shopper</option>
        </select>
        <button type="submit">Add User</button>
      </form>

      <ul className="user-list">
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          users.map((user) => (
            <li key={user.id} className="user-item">
              <span>{user.username} ({user.role})</span>
              <select
                value={user.role}
                onChange={(e) => handleChangeRole(user.id, e.target.value)}
                className="role-select"
              >
                <option value="admin">Admin</option>
                <option value="seller">Seller</option>
                <option value="shopper">Shopper</option>
              </select>
              <button onClick={() => handleDeleteUser(user.id)} className="delete-button">
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default AdminPage;
